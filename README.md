# AI University Advisor for Myanmar Students

An intelligent university pathway and degree recommendation platform designed specifically for Myanmar high school graduates and Matriculation Examination students. The platform evaluates academic scores, individual subject marks, personal interests, career aspirations, and financial preferences to provide tailored university recommendations and career roadmaps.

---

## 🌟 Key Features

- **Matriculation Score & Subject Marks Analyzer**:
  - Input total Matriculation score and detailed individual subject breakdown (Mathematics, English, Myanmar, Physics, Chemistry, Biology, **Economics (Eco)**, Geography, History).
  - Handles subject prerequisites and min-mark eligibility thresholds across diverse degree specifications.

- **Smart Eligibility & Fit Scoring Engine**:
  - Calculates percentage match, eligibility status (Eligible, Borderline, Above Requirements), and personalized reasoning.
  - Matches student interests and target career goals against nationwide university offerings.

- **Comprehensive University Database**:
  - Includes major Myanmar public and private institutions (Computer University, Technological University, University of Medicine, Yangon University, YUEco, Myanmar Maritime University, and more).
  - Detailed program breakdown: tuition costs, degree duration, location, required minimum marks, and job pathways.

- **AI Career & Education Advisor Chatbot**:
  - Interactive Gemini-powered advisor offering contextualized guidance in both **English** and **Myanmar Language (မြန်မာဘာသာ)**.
  - Tailored advice on scholarship applications, entrance exams, and career roadmaps.

- **University & Program Comparison Tool**:
  - Side-by-side comparison of up to 3 programs on prerequisites, tuition fees, program duration, location, and potential career outcomes.

- **Scholarships & Deadline Tracking**:
  - Active tracking for local and international scholarships relevant to Myanmar students.
  - Deadline alerts and preparation checklists for upcoming university application cycles.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React Icons
- **Build Tooling & Dev Server**: Vite, Express (`server.ts`)
- **AI Integration**: Google GenAI SDK (`@google/genai`) for server-side AI Advisor responses

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and `npm` installed.

### Installation & Running Locally

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set environment variables**:
   Create a `.env` file or export your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

5. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
