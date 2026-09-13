import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cors from 'cors';
import {
  fields,
  universities,
  programs,
  getRecommendations,
  getAdmissionChances,
  normalizeAssessment
} from './db_data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Shared shape for simple list endpoints (fields/universities/programs)
const sendList = (res, data) => res.json({ success: true, status: 'success', count: data.length, data });

// --- STATIC ASSETS & JS/CSS CONNECTIVITY ---
const frontendDir = path.resolve(__dirname, '../frontend');
const frontendJsDir = path.resolve(frontendDir, 'js');
const frontendCssDir = path.resolve(frontendDir, 'css');

// 1. Serve JS directly from frontend/js
app.use('/js', express.static(frontendJsDir));

// 2. Serve CSS from frontend/css
app.use('/css', express.static(frontendCssDir));

// 3. Image file handling with case-insensitive fallback
app.get(['/*.jpg', '/*.jpeg', '/*.png', '/*.JPG', '/*.PNG', '/*.svg'], (req, res, next) => {
  try {
    const reqName = decodeURIComponent(req.path.replace(/^\//, ''));
    const fullPath = path.join(frontendDir, reqName);
    if (fs.existsSync(fullPath)) {
      return res.sendFile(fullPath);
    }
    const files = fs.readdirSync(frontendDir);
    const matched = files.find(f => f.toLowerCase() === reqName.toLowerCase());
    if (matched) {
      return res.sendFile(path.join(frontendDir, matched));
    }
  } catch (e) {}
  next();
});

// 4. Serve frontend root static assets
app.use(express.static(frontendDir));

// --- API ENDPOINTS ---

// 1. GET /api/fields
app.get('/api/fields', (req, res) => {
  sendList(res, fields);
});

// 2. GET /api/universities
app.get('/api/universities', (req, res) => {
  const { region, search, max_cutoff, min_cutoff, field, category } = req.query;
  let results = universities.map(u => {
    const uniProgs = programs.filter(p => p.university_id === u.university_id || p.university_code === u.code);
    return {
      ...u,
      programs: uniProgs,
      program_count: uniProgs.length
    };
  });

  if (region) {
    results = results.filter(u => (u.region || u.location || '').toLowerCase().includes(region.toLowerCase()));
  }
  if (search) {
    const s = search.toLowerCase();
    results = results.filter(u => 
      (u.university_name || '').toLowerCase().includes(s) ||
      (u.code || '').toLowerCase().includes(s) ||
      (u.location || '').toLowerCase().includes(s) ||
      (u.description || '').toLowerCase().includes(s) ||
      (u.programs && u.programs.some(p => (p.program_name || '').toLowerCase().includes(s)))
    );
  }
  if (category && category !== 'all') {
    const cat = category.toLowerCase();
    results = results.filter(u => {
      if (u.category_group && u.category_group.toLowerCase() === cat) return true;
      if (u.category && u.category.toLowerCase().includes(cat)) return true;
      if (cat === 'it & computing' && ((u.field_ids && u.field_ids.includes(1)) || (u.programs && u.programs.some(p => p.field_id === 1)))) return true;
      if (cat === 'engineering' && ((u.field_ids && u.field_ids.includes(2)) || (u.programs && u.programs.some(p => p.field_id === 2)))) return true;
      if (cat === 'medical' && ((u.field_ids && u.field_ids.includes(3)) || (u.programs && u.programs.some(p => p.field_id === 3)))) return true;
      if (cat === 'business' && ((u.field_ids && u.field_ids.includes(4)) || (u.programs && u.programs.some(p => p.field_id === 4)))) return true;
      if (cat.includes('arts') && ((u.field_ids && (u.field_ids.includes(8) || u.field_ids.includes(7) || u.field_ids.includes(10) || u.field_ids.includes(5))) || (u.programs && u.programs.some(p => [5, 7, 8, 10].includes(p.field_id))))) return true;
      if (cat === 'marine' && ((u.field_ids && u.field_ids.includes(11)) || (u.programs && u.programs.some(p => p.field_id === 11)))) return true;
      return false;
    });
  }
  if (field) {
    const f = field.toLowerCase();
    results = results.filter(u => 
      (u.category && u.category.toLowerCase().includes(f)) ||
      (u.programs && u.programs.some(p => (p.field_name || '').toLowerCase().includes(f)))
    );
  }

  sendList(res, results);
});

// 3. GET /api/universities/:id
app.get('/api/universities/:id', (req, res) => {
  const param = req.params.id;
  let uni = universities.find(u => String(u.university_id) === param);
  if (!uni) {
    uni = universities.find(u => u.code && u.code.toLowerCase() === param.toLowerCase());
  }

  if (!uni) {
    return res.status(404).json({
      success: false,
      status: 'error',
      message: `University not found with identifier: ${param}`
    });
  }

  const uniPrograms = programs.filter(p => p.university_id === uni.university_id || p.university_code === uni.code);

  res.json({
    success: true,
    status: 'success',
    data: {
      ...uni,
      programs: uniPrograms,
      program_count: uniPrograms.length
    }
  });
});

// 3b. POST /api/universities/:id/chances (estimated admission chance per program)
app.post('/api/universities/:id/chances', (req, res) => {
  const param = req.params.id;
  const uni = universities.find(u => String(u.university_id) === param)
    || universities.find(u => u.code && u.code.toLowerCase() === param.toLowerCase());

  if (!uni) {
    return res.status(404).json({
      success: false,
      status: 'error',
      message: `University not found with identifier: ${param}`
    });
  }

  const { gender, stream, marks } = req.body || {};
  const markValues = Object.values(marks || {});
  if (markValues.length === 0 || markValues.some(m => !Number.isInteger(m) || m < 0 || m > 100)) {
    return res.status(400).json({
      success: false,
      status: 'error',
      message: 'Marks must be whole numbers from 0 to 100.'
    });
  }

  res.json({
    success: true,
    status: 'success',
    data: getAdmissionChances(uni, { gender, stream, marks })
  });
});

// 4. GET /api/programs
app.get('/api/programs', (req, res) => {
  const { field, university_code, university_id, search } = req.query;
  let results = [...programs];

  if (field) {
    results = results.filter(p => p.field_name && p.field_name.toLowerCase().includes(field.toLowerCase()));
  }
  if (university_code) {
    results = results.filter(p => p.university_code && p.university_code.toLowerCase() === university_code.toLowerCase());
  }
  if (university_id) {
    results = results.filter(p => String(p.university_id) === String(university_id));
  }
  if (search) {
    const s = search.toLowerCase();
    results = results.filter(p => 
      (p.program_name && p.program_name.toLowerCase().includes(s)) ||
      (p.university_name && p.university_name.toLowerCase().includes(s))
    );
  }

  sendList(res, results);
});

// 5. GET & POST /api/recommendations (Assessment Recommendation Engine)
const handleRecommendations = (req, res) => {
  const params = { ...req.query, ...(req.body || {}) };
  
  if (params.fields && typeof params.fields === 'string') {
    params.fields = params.fields.split(',').map(f => f.trim()).filter(Boolean);
  }

  const recommendations = getRecommendations(params);

  res.json({
    success: true,
    status: 'success',
    total_recommendations: recommendations.length,
    count: recommendations.length,
    data: recommendations,
    recommendations: recommendations,
    matches: recommendations,
    user_summary: {
      total_marks: parseInt(params.total_marks) || 502,
      gender: params.gender || 'male',
      fields: params.fields || [],
      location: params.location || 'Yangon'
    }
  });
};

app.get('/api/recommendations', handleRecommendations);
app.post('/api/recommendations', handleRecommendations);
app.post('/api/assessment/calculate-matches', handleRecommendations);

// 6. POST /api/assessments (Normalize submitted marks and compute matches)
app.post('/api/assessments', (req, res) => {
  const normalizedRecord = normalizeAssessment(req.body);
  const recommendations = getRecommendations({
    ...req.body,
    total_marks: normalizedRecord.total_marks,
    gender: normalizedRecord.gender,
    fields: normalizedRecord.fields,
    location: normalizedRecord.location,
    learning_style: normalizedRecord.learning_style,
    marks: normalizedRecord.marks
  });

  res.json({
    success: true,
    status: 'success',
    record: normalizedRecord,
    recommendations: recommendations,
    data: recommendations,
    matches: recommendations
  });
});

// 7. GET /api/health
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok', time: new Date().toISOString() });
});

// --- PAGE ROUTING ---
app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(path.join(frontendDir, 'home.html'));
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`UniAdvisor backend service running on http://0.0.0.0:${PORT}`);
});
