// Database Data & Relational Schema Logic for UniAdvisor
// Derived from /database/university_recommendation_db.sql.sql

export const fields = [
  { field_id: 1, field_name: "Programming & Technology", icon: "💻", description: "Computer Science, Software Engineering, AI, Data Science", popular: true },
  { field_id: 2, field_name: "Engineering", icon: "🔧", description: "Civil, Mechanical, Electrical, Electronic, Mechatronics, Architecture", popular: true },
  { field_id: 3, field_name: "Medicine and health", icon: "🏥", description: "Medicine (MBBS), Dental, Pharmacy, Nursing, Medical Tech, Public Health", popular: true },
  { field_id: 4, field_name: "Economics", icon: "📊", description: "Commerce, Business Admin, Accounting, Statistics, Economics, Public Admin", popular: false },
  { field_id: 5, field_name: "Science", icon: "🔬", description: "Physics, Chemistry, Biochemistry, Biotechnology, Marine Science, Geology", popular: false },
  { field_id: 6, field_name: "Mathematics", icon: "📐", description: "Pure Mathematics, Applied Mathematics, Computational Statistics", popular: false },
  { field_id: 7, field_name: "Education", icon: "🎓", description: "Educational Science (BSc), Educational Arts (BA), Library Studies", popular: false },
  { field_id: 8, field_name: "Arts & Humanities", icon: "🏛️", description: "Law (LLB), International Relations, Political Science, Philosophy, History", popular: false },
  { field_id: 9, field_name: "Environment & Geography", icon: "🌿", description: "Environmental Studies, Geography, Fisheries, Water Resource Studies", popular: false },
  { field_id: 10, field_name: "Languages", icon: "🗣️", description: "English, Japanese, Chinese, Korean, French, German, Russian, Myanmar", popular: true },
  { field_id: 11, field_name: "Marine", icon: "⚓", description: "Nautical Science, Marine Engineering, Port & Harbour, Naval Architecture", popular: false }
];

export const universities = [
  {
    university_id: 1,
    code: "UIT",
    university_name: "University of Information Technology (UIT)",
    location: "Hlaing, Yangon",
    region: "Yangon",
    type: "Specialized State University",
    category: "IT & Computing",
    category_group: "IT & Computing",
    field_ids: [1],
    established: 2012,
    rating: "4.9",
    detail_url: "university-detail.html?id=1",
    image_url: "uit.jpg",
    description: "Myanmar's premier specialized university in Information Technology, Software Engineering, AI, and Cybersecurity.",
    highlights: ["#1 in IT Education", "Center of Excellence", "High Industry Placement Rate", "Japanese & Global Tech Partnerships"],
    address: "Parami Road, Hlaing Campus, Yangon",
    contact_phone: "+95 1 9664254",
    contact_email: "contact@uit.edu.mm",
    website: "https://www.uit.edu.mm",
    campus_facilities: ["AI & High Performance Computing Lab", "Software Engineering Project Suites", "Cybersecurity Training Center", "Modern Tech Library", "High-speed Campus WiFi", "Student Innovation Hub"],
    admission_process: "Admission is highly competitive based strictly on total matriculation examination marks.",
    career_prospects: "Software Engineer, AI/ML Specialist, Full Stack Developer, Data Scientist, Cybersecurity Analyst, Network Architect.",
    overview: "The University of Information Technology (UIT) is Myanmar's leading specialized technological university under the Ministry of Science and Technology. Founded to nurture next-generation leaders in the digital economy, UIT offers internationally aligned undergraduate and graduate degrees in Computer Science, Software Engineering, Business Information Systems, and High Performance Computing. With cutting-edge computer laboratories and strong corporate ties with global technology leaders, UIT alumni enjoy one of the highest employment rates in Southeast Asia."
  },
  {
    university_id: 2,
    code: "YTU",
    university_name: "Yangon Technological University (YTU)",
    location: "Insein, Yangon",
    region: "Yangon",
    type: "Center of Excellence (COE)",
    category: "Engineering",
    category_group: "Engineering",
    field_ids: [2],
    established: 1924,
    rating: "4.9",
    detail_url: "university-detail.html?id=2",
    image_url: "ytu.jpg",
    description: "The flagship engineering institution in Myanmar with state-of-the-art engineering laboratories and prestigious COE programs.",
    highlights: ["Oldest & Top Engineering University", "International Accreditation", "COE Programs", "JICA Engineering Cooperation"],
    address: "Gyogone, Insein Township, Yangon",
    contact_phone: "+95 1 664284",
    contact_email: "rector@ytu.edu.mm",
    website: "https://www.ytu.edu.mm",
    campus_facilities: ["Heavy Engineering Workshops", "Civil & Structural Materials Testing Lab", "Robotics & Mechatronics Center", "Historic Engineering Library", "Auditorium & Sports Complex", "Student Dormitories"],
    admission_process: "COE admission requires top-tier matriculation total marks and prerequisite scores in English, Mathematics, Physics, and Chemistry.",
    career_prospects: "Professional Chartered Engineer, Civil/Structural Engineer, Mechatronics Designer, Petrochemical Specialist, Project Director.",
    overview: "Yangon Technological University (YTU), established in 1924 as the Department of Engineering under Rangoon University (BOC College), is the mother of technological and engineering education in Myanmar. Operating as a Center of Excellence (COE), YTU delivers 12 specialized Bachelor of Engineering (B.E.) disciplines and Bachelor of Architecture (B.Arch). With upgraded laboratories supported by international academic partnerships and JICA, YTU graduates lead Myanmar's infrastructure, industrial, and high-tech sectors."
  },
  {
    university_id: 3,
    code: "WYTU",
    university_name: "West Yangon Technological University (WYTU)",
    location: "Htantabin, Yangon",
    region: "Yangon",
    type: "Public Technological University",
    category: "Engineering",
    category_group: "Engineering",
    field_ids: [2],
    established: 2005,
    rating: "4.6",
    detail_url: "university-detail.html?id=3",
    image_url: "westuni.jpg",
    description: "Major engineering university serving western Yangon, offering comprehensive Bachelor of Engineering programs.",
    highlights: ["Broad Engineering Specializations", "Strong Practical Training", "Spacious 200+ Acre Campus", "Applied Research Focus"],
    address: "Htantabin Township, Western District, Yangon",
    contact_phone: "+95 1 645120",
    contact_email: "info@wytu.edu.mm",
    website: "https://www.wytu.edu.mm",
    campus_facilities: ["Mechanical & Electrical Workshops", "CEIT Computer Labs", "Materials & Soils Lab", "Central Technical Library", "Football Pitch & Athletics Ground", "Campus Ferry Network"],
    admission_process: "Selection is based on matriculation examination scores in the 4-subject combination (English, Maths, Chemistry, Physics).",
    career_prospects: "Civil Site Engineer, Electrical Grid Engineer, IT Systems Administrator, Mechanical Plant Engineer, QA/QC Specialist.",
    overview: "West Yangon Technological University (WYTU) is a major public engineering university situated on a scenic 220-acre campus in Htantabin, Yangon. WYTU provides rigorous undergraduate programs across Civil, Architecture, Computer Engineering, Electronic, Electrical Power, Mechanical, Mechatronic, Chemical, Metallurgical, Textile, and Agricultural Engineering. The university emphasizes practical workshop training and real-world project delivery."
  },
  {
    university_id: 4,
    code: "TTU",
    university_name: "Technological University, Thanlyin (TTU)",
    location: "Thanlyin, Yangon",
    region: "Yangon",
    type: "Public Technological University",
    category: "Engineering",
    category_group: "Engineering",
    field_ids: [2],
    established: 1999,
    rating: "4.5",
    detail_url: "university-detail.html?id=4",
    image_url: "eastuni.jpg",
    description: "Prominent technological university in the Thanlyin industrial corridor specializing in engineering degrees.",
    highlights: ["Industry Collaboration", "Modern Engineering Labs", "Proximity to Thilawa SEZ", "Applied Technology Degrees"],
    address: "Thanlyin-Kyauktan Highway, Thanlyin Township, Yangon",
    contact_phone: "+95 56 21540",
    contact_email: "admin@ttu.edu.mm",
    website: "https://www.ttu.edu.mm",
    campus_facilities: ["Industrial Automation Lab", "Petroleum & Chemical Analysis Lab", "Modern Computing Suites", "Engineering Drawing Studios", "Campus Canteen", "Hostel Quarters"],
    admission_process: "Admission based on matriculation marks, prioritizing applicants who meet the departmental cutoff in technical combinations.",
    career_prospects: "Petroleum Engineer, Plant Maintenance Specialist, Logistics & Automation Engineer, Construction Engineer, Industrial Consultant.",
    overview: "Technological University, Thanlyin (TTU) is strategically located adjacent to the Thilawa Special Economic Zone in eastern Yangon. TTU delivers comprehensive Bachelor of Engineering programs tailored to meet the needs of Myanmar's expanding industrial, manufacturing, and petroleum processing industries."
  },
  {
    university_id: 5,
    code: "HBTU",
    university_name: "Technological University, Hmawbi (HBTU)",
    location: "Hmawbi, Yangon",
    region: "Yangon",
    type: "Public Technological University",
    category: "Engineering",
    category_group: "Engineering",
    field_ids: [2],
    established: 1999,
    rating: "4.5",
    detail_url: "university-detail.html?id=5",
    image_url: "hbtu.jpg",
    description: "Leading engineering university located in northern Yangon region.",
    highlights: ["Applied Engineering", "Spacious Green Campus", "Hands-on Workshop Practicals", "Modern CEIT Labs"],
    address: "Pyay Road, Hmawbi Township, Northern Yangon",
    contact_phone: "+95 1 620150",
    contact_email: "contact@hbtu.edu.mm",
    website: "https://www.hbtu.edu.mm",
    campus_facilities: ["Electrical Power Systems Lab", "Civil Construction Studio", "Computer Hardware Lab", "Library & Study Halls", "Sports Complex", "Student Transport Service"],
    admission_process: "Admission determined through matriculation marks with 4-subject requirement benchmarks.",
    career_prospects: "Power Systems Technician, Infrastructure Engineer, Software Developer, Electronics Specialist, Industrial Supervisor.",
    overview: "Technological University, Hmawbi (HBTU) provides specialized engineering degree programs to students across northern Yangon and surrounding districts. The campus features dedicated workshops in electronics, civil structures, and mechanical fabrication."
  },
  {
    university_id: 6,
    code: "UCSY",
    university_name: "University of Computer Studies (UCSY)",
    location: "Shwe Pyi Thar / Hlawga, Yangon",
    region: "Yangon",
    type: "Center of Excellence (COE)",
    category: "IT & Computing",
    category_group: "IT & Computing",
    field_ids: [1],
    established: 1971,
    rating: "4.8",
    detail_url: "university-detail.html?id=6",
    image_url: "ucsy.jpg",
    description: "Pioneering computer science and technology university offering B.C.Sc and B.C.Tech degrees.",
    highlights: ["COE Computing Institution", "AI & Robotics Labs", "Top CS Alumni Network", "Postgraduate Research Excellence"],
    address: "Hlawga Road, Shwe Pyi Thar Township, Yangon",
    contact_phone: "+95 1 610662",
    contact_email: "rector@ucsy.edu.mm",
    website: "https://www.ucsy.edu.mm",
    campus_facilities: ["Natural Language Processing (NLP) Lab", "Robotics & Embedded Systems Suite", "Software Incubation Center", "Digital Research Library", "On-campus Hostel Buildings", "High-speed Fiber Network"],
    admission_process: "Merit-based admission from the matriculation examination. Requires high aptitude and score in Mathematics and English.",
    career_prospects: "AI Engineer, Software Architect, Cloud Developer, Database Administrator, Security Engineer, IT Project Manager.",
    overview: "The University of Computer Studies, Yangon (UCSY) is the oldest and most prestigious institution dedicated exclusively to computing in Myanmar. Founded in 1971 as the Universities' Computer Center (UCC), UCSY has produced the majority of Myanmar's computer science faculty and software leaders. Recognized as a national Center of Excellence, UCSY awards Bachelor of Computer Science (B.C.Sc.) and Bachelor of Computer Technology (B.C.Tech.) degrees."
  },
  {
    university_id: 7,
    code: "UM1",
    university_name: "University of Medicine 1 (UM1)",
    location: "Lanmadaw, Yangon",
    region: "Yangon",
    type: "Medical University",
    category: "Medical & Health",
    category_group: "Medical",
    field_ids: [3],
    established: 1907,
    rating: "5.0",
    detail_url: "university-detail.html?id=7",
    image_url: "um1.jpg",
    description: "The most prestigious and oldest medical school in Myanmar, training leading physicians and surgeons.",
    highlights: ["Top Medical Institution", "Teaching Hospital Affiliation", "Highest Admission Cutoffs", "Yangon General Hospital Training"],
    address: "245 Bogyoke Aung San Road, Lanmadaw Township, Yangon",
    contact_phone: "+95 1 251090",
    contact_email: "admin@um1ygn.edu.mm",
    website: "https://www.um1ygn.edu.mm",
    campus_facilities: ["Yangon General Hospital Clinical Wards", "Anatomy & Pathology Museums", "Medical Simulation Suites", "Biochemistry Research Labs", "Historic Central Medical Library", "Student Clinical Dorms"],
    admission_process: "Admission requires the highest matriculation cutoff scores in Myanmar, with special minimum thresholds in English, Chemistry, and Biology.",
    career_prospects: "Medical Doctor (M.B.,B.S.), Specialist Surgeon, Clinical Researcher, Public Health Director, Hospital Consultant.",
    overview: "The University of Medicine 1, Yangon (UM1) is the premier and oldest medical school in Myanmar, established in 1907. Affiliated with Yangon General Hospital (YGH), Yangon ENT Hospital, and several specialized teaching centers, UM1 is renowned for medical excellence and rigorous clinical training. It commands the highest matriculation scores in the country."
  },
  {
    university_id: 8,
    code: "UM2",
    university_name: "University of Medicine 2 (UM2)",
    location: "North Okkalapa, Yangon",
    region: "Yangon",
    type: "Medical University",
    category: "Medical & Health",
    category_group: "Medical",
    field_ids: [3],
    established: 1963,
    rating: "4.9",
    detail_url: "university-detail.html?id=8",
    image_url: "um2.jpg",
    description: "Premier medical university in eastern Yangon with extensive clinical facilities and research departments.",
    highlights: ["Excellence in Clinical Medicine", "Modern Hospital Complex", "North Okkalapa General Hospital Affiliation", "Advanced Surgical Labs"],
    address: "Kha Wei Chan, North Okkalapa Township, Yangon",
    contact_phone: "+95 1 9699854",
    contact_email: "office@um2ygn.edu.mm",
    website: "https://www.um2ygn.edu.mm",
    campus_facilities: ["North Okkalapa General & Teaching Hospital", "Pediatric Simulation Center", "Physiology & Pharmacology Labs", "Digital Medical Library", "Campus Lecture Theatres", "Student Residence Complex"],
    admission_process: "Direct selection of top-scoring science matriculation graduates based on English, Chemistry, and Biology combined scores.",
    career_prospects: "Medical Practitioner, Pediatrician, Internal Medicine Specialist, Radiologist, Clinical Researcher.",
    overview: "The University of Medicine 2, Yangon (UM2), founded in 1963, is a world-class medical school located in North Okkalapa. Affiliated with North Okkalapa General Hospital and Thingangyun Sanpya Hospital, UM2 trains physicians with a focus on modern diagnostic techniques, surgery, and public health care."
  },
  {
    university_id: 9,
    code: "UOPY",
    university_name: "University of Pharmacy (UOPY)",
    location: "Yangon",
    region: "Yangon",
    type: "Specialized Medical University",
    category: "Medical & Health",
    category_group: "Medical",
    field_ids: [3],
    established: 1992,
    rating: "4.7",
    detail_url: "university-detail.html?id=9",
    image_url: "uopy.jpg",
    description: "Dedicated pharmaceutical university producing pharmacists and pharmaceutical research specialists.",
    highlights: ["Pharmaceutical Sciences", "Industry & Clinical Pharmacy", "B.Pharm Degree", "Drug Formulation Laboratories"],
    address: "Pyay Road, Dagon Township / University Avenue, Yangon",
    contact_phone: "+95 1 534212",
    contact_email: "contact@uopy.edu.mm",
    website: "https://www.uopy.edu.mm",
    campus_facilities: ["Pharmaceutical Chemistry Lab", "Pharmacognosy & Herbal Research Suite", "Drug Formulation Pilot Plant", "Clinical Pharmacy Simulation Unit", "Specialized Pharmacy Library"],
    admission_process: "Admission based on high matriculation scores with strong marks in Chemistry, Biology, and English.",
    career_prospects: "Clinical Pharmacist, Industrial Drug Formulator, Quality Assurance Manager, Regulatory Affairs Specialist, Pharmacology Researcher.",
    overview: "The University of Pharmacy, Yangon (UOPY) is Myanmar's leading center for pharmaceutical higher education. UOPY confers the Bachelor of Pharmacy (B.Pharm.) degree and prepares graduates for leadership roles in clinical hospitals, pharmaceutical manufacturing plants, and healthcare regulatory bodies."
  },
  {
    university_id: 10,
    code: "UMT",
    university_name: "University of Medical Technology",
    location: "Yangon",
    region: "Yangon",
    type: "Specialized Health University",
    category: "Medical & Health",
    category_group: "Medical",
    field_ids: [3],
    established: 1992,
    rating: "4.6",
    detail_url: "university-detail.html?id=10",
    image_url: "umt.jpg",
    description: "Trains specialized medical laboratory technologists, radiographers, and physiotherapists.",
    highlights: ["Diagnostic Tech", "Biomedical Laboratory", "B.Med.Tech Degree", "State-of-the-Art Radiology Labs"],
    address: "Insein Road, Yangon",
    contact_phone: "+95 1 642890",
    contact_email: "info@umtygn.edu.mm",
    website: "https://www.umtygn.edu.mm",
    campus_facilities: ["Biomedical Science Labs", "Diagnostic Imaging Suites", "Physiotherapy & Rehabilitation Clinic", "Medical Microbiology Lab", "Specialized Tech Library"],
    admission_process: "Competitive selection based on science stream matriculation scores in Chemistry, Biology, and Physics.",
    career_prospects: "Medical Lab Technologist, Diagnostic Radiographer, Physiotherapist, Clinical Pathology Specialist.",
    overview: "The University of Medical Technology, Yangon trains allied health professionals who perform clinical diagnostic analyses, radiologic imaging, and therapeutic physical rehabilitation across Myanmar's healthcare system."
  },
  {
    university_id: 11,
    code: "UDM",
    university_name: "University of Dental Medicine",
    location: "Thingangyun, Yangon",
    region: "Yangon",
    type: "Specialized Medical University",
    category: "Medical & Health",
    category_group: "Medical",
    field_ids: [3],
    established: 1964,
    rating: "4.8",
    detail_url: "university-detail.html?id=11",
    image_url: "udm.jpg",
    description: "Leading institution for dental surgery, oral health sciences, and orthodontics.",
    highlights: ["B.D.S. Degree", "Specialized Dental Hospital", "Maxillofacial Surgery Training", "Advanced Dental Simulation Lab"],
    address: "Thanthumar Road, Thingangyun Township, Yangon",
    contact_phone: "+95 1 578052",
    contact_email: "office@udmygn.edu.mm",
    website: "https://www.udmygn.edu.mm",
    campus_facilities: ["Dental Teaching Hospital (200-chair capacity)", "Phantom Head Simulation Lab", "Prosthodontics Workshop", "Oral Pathology Research Unit", "Dental Sciences Library"],
    admission_process: "Admission requires top matriculation scores with specific cutoff criteria in English, Chemistry, and Biology.",
    career_prospects: "Dental Surgeon (B.D.S.), Orthodontist, Periodontist, Oral & Maxillofacial Surgeon, Dental Academic.",
    overview: "The University of Dental Medicine, Yangon (UDM) is the premier dental institution in Myanmar, awarding the Bachelor of Dental Surgery (B.D.S.) degree. With an attached 200-chair teaching hospital, students receive extensive patient-facing clinical experience."
  },
  {
    university_id: 12,
    code: "UNursing",
    university_name: "University of Nursing",
    location: "Lanmadaw, Yangon",
    region: "Yangon",
    type: "Specialized Health University",
    category: "Medical & Health",
    category_group: "Medical",
    field_ids: [3],
    established: 1991,
    rating: "4.6",
    detail_url: "university-detail.html?id=12",
    image_url: "unursing.jpg",
    description: "Dedicated to advancing nursing sciences and healthcare delivery in Myanmar.",
    highlights: ["B.N.Sc Degree", "Clinical Practice", "Critical Care Training", "Global Nursing Standards"],
    address: "Bogyoke Aung San Road, Lanmadaw Township, Yangon",
    contact_phone: "+95 1 245150",
    contact_email: "nursing@unygn.edu.mm",
    website: "https://www.unygn.edu.mm",
    campus_facilities: ["Nursing Simulation & Skills Lab", "ICU Simulation Suite", "Community Health Resource Unit", "Nursing Digital Library", "On-campus Student Residence"],
    admission_process: "Admissions selected by matriculation score benchmarks with preference for applicants committed to nursing sciences.",
    career_prospects: "Registered Nurse, Clinical Nurse Specialist, Healthcare Supervisor, Hospital Nursing Director, Public Health Officer.",
    overview: "The University of Nursing, Yangon is Myanmar's flagship institution for nursing education and research, offering Bachelor of Nursing Science (B.N.Sc.) degrees. Students complete rotations at Yangon General Hospital and Yangon Children's Hospital."
  },
  {
    university_id: 13,
    code: "UPH",
    university_name: "University of Public Health",
    location: "Yangon",
    region: "Yangon",
    type: "Public Health University",
    category: "Medical & Health",
    category_group: "Medical",
    field_ids: [3],
    established: 2007,
    rating: "4.5",
    detail_url: "university-detail.html?id=13",
    image_url: "uph.jpg",
    description: "Center for epidemiology, community health, and public health policy.",
    highlights: ["Public Health Sciences", "Global Health Partnerships", "B.P.H. Degree", "Epidemiology Center"],
    address: "Bahan Township, Yangon",
    contact_phone: "+95 1 385412",
    contact_email: "info@uphygn.edu.mm",
    website: "https://www.uphygn.edu.mm",
    campus_facilities: ["Epidemiology Data Lab", "Community Health Center", "Public Health Research Archives", "Multimedia Seminar Theatres"],
    admission_process: "Selection based on matriculation examination scores in science and arts combinations.",
    career_prospects: "Public Health Officer, Epidemiologist, Health Policy Analyst, NGO Project Director, Health Educator.",
    overview: "The University of Public Health, Yangon provides specialized undergraduate and postgraduate degrees in public health, biostatistics, environmental health, and healthcare policy management."
  },
  {
    university_id: 14,
    code: "YUFL",
    university_name: "Yangon University of Foreign Languages (YUFL)",
    location: "Kamayut, Yangon",
    region: "Yangon",
    type: "Specialized Languages University",
    category: "Languages & Arts",
    category_group: "Languages",
    field_ids: [10],
    established: 1964,
    rating: "4.8",
    detail_url: "university-detail.html?id=14",
    image_url: "yufl.jpg",
    description: "Myanmar's premier foreign language academy offering degree programs in 8 major international languages.",
    highlights: ["International Language Degrees", "Cultural Exchange Programs", "Diplomatic Pathways", "Native Speaker Faculty"],
    address: "119 University Avenue Road, Kamayut Township, Yangon",
    contact_phone: "+95 1 535634",
    contact_email: "info@yufl.edu.mm",
    website: "https://www.yufl.edu.mm",
    campus_facilities: ["Digital Language Audio Labs", "Cultural Centers (Japan, France, China, Korea)", "Foreign Language Library", "Conference Hall", "Student Coffee Lounge & Gardens"],
    admission_process: "Direct admission based on matriculation overall marks with high weighting on English language scores.",
    career_prospects: "Diplomat, International Translator/Interpreter, Global Business Executive, Tourism Director, Cross-border Consultant.",
    overview: "Yangon University of Foreign Languages (YUFL) is Myanmar's prestigious institution for foreign language studies, linguistics, and cultural diplomacy. YUFL offers Bachelor of Arts (B.A.) degrees in English, Japanese, Chinese, Korean, French, German, Russian, and Thai. Located on historic University Avenue, YUFL provides immersion language labs and direct study-abroad pathways."
  },
  {
    university_id: 15,
    code: "YUE-Hlaing",
    university_name: "Yangon University of Economics (Hlaing)",
    location: "Hlaing, Yangon",
    region: "Yangon",
    type: "Specialized Business & Economics",
    category: "Business & Economics",
    category_group: "Business",
    field_ids: [4],
    established: 1964,
    rating: "4.8",
    detail_url: "university-detail.html?id=15",
    image_url: "yueco.jpg",
    description: "Top university in Myanmar for commerce, accounting, business administration, and economic statistics.",
    highlights: ["BCom, BBA, BAct Programs", "Top Corporate Recruitment", "Executive MBA Center", "Financial Analytics Labs"],
    address: "Parami Road, Hlaing Campus, Yangon",
    contact_phone: "+95 1 664984",
    contact_email: "info@yueco.edu.mm",
    website: "https://www.yueco.edu.mm",
    campus_facilities: ["Financial Trading & Statistics Lab", "Case Study Discussion Rooms", "Business & Economics Library", "Auditorium & Career Center", "Sports Grounds"],
    admission_process: "High cutoff requirement on matriculation scores with strong scores in Mathematics and English.",
    career_prospects: "Financial Analyst, Certified Public Accountant (CPA), Management Consultant, Banking Executive, Marketing Strategist.",
    overview: "Yangon University of Economics (Hlaing Campus) is the most prestigious business school in Myanmar. Specializing in Bachelor of Commerce (B.Com), Bachelor of Business Administration (B.B.A.), and Bachelor of Accounting (B.Act.), YUE produces top corporate leaders, financial executives, and economic researchers."
  },
  {
    university_id: 16,
    code: "YUE-YTG",
    university_name: "Yangon University of Economics (Ywar Thar Gyi)",
    location: "Ywar Thar Gyi, Yangon",
    region: "Yangon",
    type: "Specialized Business & Economics",
    category: "Business & Economics",
    category_group: "Business",
    field_ids: [4],
    established: 2000,
    rating: "4.6",
    detail_url: "university-detail.html?id=16",
    image_url: "yueco_ytg.jpg",
    description: "Expansive economics campus delivering high-quality business, finance, and public administration degrees.",
    highlights: ["Modern Campus", "Broad Economics Disciplines", "Public Administration", "Development Economics"],
    address: "Ywar Thar Gyi, East Dagon / South Dagon Border, Yangon",
    contact_phone: "+95 1 582410",
    contact_email: "ytg@yueco.edu.mm",
    website: "https://www.yueco.edu.mm",
    campus_facilities: ["Economics Research Center", "Computing & Statistical Labs", "Spacious Main Library", "Student Canteen & Hostels", "Athletic Fields"],
    admission_process: "Admission determined through matriculation aggregate marks across commerce and economics specializations.",
    career_prospects: "Public Policy Officer, Microfinance Manager, Auditor, Trade Specialist, Business Operations Manager.",
    overview: "The Ywar Thar Gyi campus of Yangon University of Economics was founded to expand access to high-caliber business, economics, public administration, and development studies. It features a spacious campus with modern academic and residential facilities."
  },
  {
    university_id: 17,
    code: "Co-op",
    university_name: "Co-operative University, Thanlyin",
    location: "Thanlyin, Yangon",
    region: "Yangon",
    type: "Business & Co-operative University",
    category: "Business & Economics",
    category_group: "Business",
    field_ids: [4],
    established: 1994,
    rating: "4.4",
    detail_url: "university-detail.html?id=17",
    image_url: "coop.png",
    description: "Specialized university focusing on regional economics, microfinance, marketing, and business management.",
    highlights: ["Practical Business & Accounting", "Affordable Education", "Microfinance & Regional Trade", "Applied Management Degrees"],
    address: "Thanlyin Township, Yangon",
    contact_phone: "+95 56 21102",
    contact_email: "info@tcu.edu.mm",
    website: "https://www.tcu.edu.mm",
    campus_facilities: ["Accounting & Computer Labs", "Co-operative Resource Center", "Library & Reading Rooms", "Student Canteen", "Sports Ground"],
    admission_process: "Standard matriculation score cutoff across arts, science, and commerce streams.",
    career_prospects: "Co-operative Enterprise Manager, Microfinance Officer, Accountant, Marketing Coordinator, Business Owner.",
    overview: "Co-operative University, Thanlyin is dedicated to providing education in business administration, accounting, marketing management, and regional co-operative enterprise development."
  },
  {
    university_id: 18,
    code: "YUOE",
    university_name: "Yangon University of Education (YUOE)",
    location: "Kamayut, Yangon",
    region: "Yangon",
    type: "Teacher Training & Education University",
    category: "Education",
    category_group: "Education",
    field_ids: [7],
    established: 1931,
    rating: "4.7",
    detail_url: "university-detail.html?id=18",
    image_url: "yuoe.jpg",
    description: "Historic university dedicated to pedagogical training, educational science, and teacher development.",
    highlights: ["Government Teaching Cadre", "Comprehensive Arts & Science Education", "Pedagogical Excellence", "High Graduate Placement"],
    address: "Pyay Road, Kamayut Township, Yangon",
    contact_phone: "+95 1 534015",
    contact_email: "admin@yuoe.edu.mm",
    website: "https://www.yuoe.edu.mm",
    campus_facilities: ["Practicing Teacher Demonstration Schools", "Science Education Labs", "Historic Pedagogical Library", "Audio-visual Lecture Halls", "Student Dorms"],
    admission_process: "Admission based on matriculation marks with specific gender quotas and academic interview requirements.",
    career_prospects: "Senior High School Teacher, Educational Administrator, Curriculum Designer, Education Inspector, University Lecturer.",
    overview: "Yangon University of Education (YUOE), established in 1931 as the Teachers' Training College (TTC), is the premier institution for teacher education in Myanmar. YUOE prepares qualified secondary school educators across science and arts disciplines."
  },
  {
    university_id: 19,
    code: "MMU",
    university_name: "Myanmar Maritime University (MMU)",
    location: "Thanlyin, Yangon",
    region: "Yangon",
    type: "Maritime & Naval Engineering",
    category: "Marine & Maritime",
    category_group: "Marine",
    field_ids: [11, 2],
    established: 2002,
    rating: "4.9",
    detail_url: "university-detail.html?id=19",
    image_url: "mmu.jpg",
    description: "Myanmar's specialized maritime university offering international standard maritime and naval engineering degrees.",
    highlights: ["High Global Employment", "Nautical & Marine Engineering", "International STCW Standards", "Naval Architecture Excellence"],
    address: "Thanlyin Township, Yangon",
    contact_phone: "+95 56 21588",
    contact_email: "rector@mmu.edu.mm",
    website: "https://www.mmu.edu.mm",
    campus_facilities: ["Bridge & Engine Room Simulators", "Naval Towing Tank & Wave Basin", "Marine Engineering Workshop", "Maritime Training Ship", "Cadet Quarters & Sports Arena"],
    admission_process: "Competitive selection requiring high matriculation marks in English, Mathematics, Chemistry, and Physics, followed by physical fitness evaluation.",
    career_prospects: "Marine Chief Engineer, Ocean Captain/Deck Officer, Naval Architect, Port & Harbor Director, Marine Surveyor.",
    overview: "Myanmar Maritime University (MMU) is the nation's premier maritime education institution, established under the Ministry of Transport and Communications. Certified under international IMO / STCW standards, MMU degrees in Marine Engineering, Nautical Science, Naval Architecture, and Port & Harbour Engineering enable graduates to work globally with major international shipping lines."
  },
  {
    university_id: 20,
    code: "MMMC",
    university_name: "Myanmar Mercantile Marine College (MMMC)",
    location: "Yangon",
    region: "Yangon",
    type: "Maritime College",
    category: "Marine & Maritime",
    category_group: "Marine",
    field_ids: [11],
    established: 1963,
    rating: "4.5",
    detail_url: "university-detail.html?id=20",
    image_url: "mmmc.jpg",
    description: "Renowned college training maritime officers, deck officers, and marine engineers.",
    highlights: ["Merchant Navy Careers", "Cadetship Programs", "Hands-on Seamanship", "Direct Seafarer Certification"],
    address: "Bayint Naung Road, Sinmalaik, Kamayut Township, Yangon",
    contact_phone: "+95 1 525890",
    contact_email: "contact@mmmc.edu.mm",
    website: "https://www.mmmc.edu.mm",
    campus_facilities: ["Radar & Navigation Simulators", "Firefighting & Sea Survival Facility", "Marine Engine Testing Bay", "Cadet Barracks & Mess Hall"],
    admission_process: "Admission based on matriculation marks, medical clearance, and seamanship entrance aptitude testing.",
    career_prospects: "Merchant Marine Officer, Ship Engineer, Navigation Officer, Maritime Logistics Supervisor.",
    overview: "Myanmar Mercantile Marine College (MMMC) has trained merchant marine officers and shipboard engineering professionals since 1963. MMMC delivers hands-on practical training that complies with global maritime requirements."
  },
  {
    university_id: 21,
    code: "NMDC",
    university_name: "National Management Degree College (NMDC)",
    location: "Botahtaung, Yangon",
    region: "Yangon",
    type: "Autonomous Degree College",
    category: "Business & Management",
    category_group: "Business",
    field_ids: [4],
    established: 2004,
    rating: "4.7",
    detail_url: "university-detail.html?id=21",
    image_url: "nmdc.jpg",
    description: "Modern college specializing in Business Management, Tourism & Hospitality, Journalism, and Professional English.",
    highlights: ["Tourism & Hospitality", "Media & Journalism", "Modern Curriculum", "Downtown Central Location"],
    address: "Corner of Merchant & 56th Street, Botahtaung Township, Yangon",
    contact_phone: "+95 1 296714",
    contact_email: "info@nmdc.edu.mm",
    website: "https://www.nmdc.edu.mm",
    campus_facilities: ["Media & Journalism Broadcasting Studio", "Hospitality Training Suite", "Business IT Computer Rooms", "College Library", "Student Seminar Rooms"],
    admission_process: "Selection based on matriculation aggregate marks with high scoring in English and general subjects.",
    career_prospects: "Journalist & News Producer, Hotel General Manager, Tourism Executive, Corporate Communications Officer, Business Analyst.",
    overview: "National Management Degree College (NMDC) is a vibrant autonomous degree college in downtown Yangon. NMDC offers modern undergraduate programs in Business Management, Tourism and Hospitality Management, Journalism, and English for Professional Purposes (EPP)."
  },
  {
    university_id: 22,
    code: "NUAC",
    university_name: "National University of Arts and Culture (NUAC)",
    location: "Dagon Myothit (South), Yangon",
    region: "Yangon",
    type: "Arts & Culture University",
    category: "Arts & Culture",
    category_group: "Comprehensive / Arts",
    field_ids: [8],
    established: 1993,
    rating: "4.5",
    detail_url: "university-detail.html?id=22",
    image_url: "nuac_orch.jpg",
    description: "Preserves and promotes Myanmar traditional performing arts, music, dramatic arts, painting, and sculpture.",
    highlights: ["Visual & Performing Arts", "Cultural Heritage", "Music & Dramatic Arts Studios", "Sculpture Workshops"],
    address: "Aung Zeya Road, 26th Ward, South Dagon Township, Yangon",
    contact_phone: "+95 1 590214",
    contact_email: "arts@nuac.edu.mm",
    website: "https://www.nuac.edu.mm",
    campus_facilities: ["Grand Performing Arts Theatre", "Traditional Music Sound Studios", "Fine Arts Painting Galleries", "Sculpture Studios", "Cultural Research Archives"],
    admission_process: "Admission based on matriculation pass certificates and artistic aptitude testing (auditions/portfolio reviews).",
    career_prospects: "Professional Artist, Musician & Composer, Theatre Director, Museum Curator, Cultural Heritage Specialist.",
    overview: "The National University of Arts and Culture, Yangon (NUAC) is dedicated to the study, preservation, and innovation of Myanmar fine arts, music, dramatic performance, painting, and cultural history."
  },
  {
    university_id: 23,
    code: "YU",
    university_name: "University of Yangon",
    location: "Kamayut, Yangon",
    region: "Yangon",
    type: "Flagship National University",
    category: "Comprehensive Arts & Sciences",
    category_group: "Comprehensive / Arts",
    field_ids: [1, 2, 5, 6, 7, 8, 9, 10],
    established: 1920,
    rating: "5.0",
    detail_url: "university-detail.html?id=23",
    image_url: "yangonuniversity.jpg",
    description: "The crown jewel of higher education in Myanmar, renowned for arts, pure sciences, law, and international relations.",
    highlights: ["Centennial Institution", "Historic Convocation Hall", "Top Research Departments", "Centennial Green Campus on Inya Lake"],
    address: "University Avenue Road, Kamayut Township, Yangon",
    contact_phone: "+95 1 534345",
    contact_email: "rector@uy.edu.mm",
    website: "https://www.uy.edu.mm",
    campus_facilities: ["Historic Convocation Hall", "Universities' Central Library", "Advanced Science Research Center", "Inya Lake Recreation Grounds", "Departmental Heritage Buildings", "Student Hostels (Inya, Shwebo, Prome)"],
    admission_process: "Selection is highly competitive based on matriculation examination scores into specific honors and degree departments.",
    career_prospects: "Advocate/Legal Counsel, Diplomat/Foreign Affairs Officer, Research Scientist, Environmental Policy Advisor, Academic.",
    overview: "The University of Yangon, founded in 1920, is the flagship and most renowned national university in Myanmar. Situated on a lush 400-acre estate on the shores of Inya Lake, the University of Yangon offers prestigious degrees across Arts, Pure Sciences, Law (LLB), International Relations, Environmental Studies, and Computer Science. It has educated Myanmar's most prominent scholars, statesmen, and researchers."
  },
  {
    university_id: 24,
    code: "Dagon",
    university_name: "Dagon University",
    location: "Dagon Myothit (East), Yangon",
    region: "Yangon",
    type: "Comprehensive State University",
    category: "Comprehensive Arts & Sciences",
    category_group: "Comprehensive / Arts",
    field_ids: [1, 4, 5, 6, 8, 9, 10],
    established: 1993,
    rating: "4.5",
    detail_url: "university-detail.html?id=24",
    image_url: "dagonuni.jpg",
    description: "One of the largest universities in Myanmar by student population, offering 20+ disciplines across science and arts.",
    highlights: ["Large Campus", "Broad Range of Majors", "Active Student Community", "Comprehensive Research Departments"],
    address: "Min Ye Kyaw Swa Road, East Dagon Township, Yangon",
    contact_phone: "+95 1 580124",
    contact_email: "contact@dagonuniversity.edu.mm",
    website: "https://www.dagonuniversity.edu.mm",
    campus_facilities: ["Central University Library", "Science & Chemistry Labs", "Student Union Complex", "Football Stadium & Sports Center", "Botanical Garden", "Campus Bus Terminal"],
    admission_process: "Direct selection based on matriculation marks according to departmental quotas across arts and science.",
    career_prospects: "Corporate Professional, Legal Officer, Educator, IT Specialist, Geologist, Industrial Chemist.",
    overview: "Dagon University is one of the largest comprehensive state universities in Myanmar. Spread across 1,000 acres in eastern Yangon, Dagon University offers undergraduate and postgraduate degrees in more than 20 academic disciplines across arts, humanities, social sciences, and natural sciences."
  },
  {
    university_id: 25,
    code: "UVS",
    university_name: "University of Veterinary Science",
    location: "Yangon Campus / Yezin",
    region: "Yangon",
    type: "Specialized Veterinary University",
    category: "Medical & Health",
    category_group: "Medical",
    field_ids: [3],
    established: 1957,
    rating: "4.8",
    detail_url: "university-detail.html?id=25",
    image_url: "veterinary.jpg",
    description: "The sole veterinary medicine institution in Myanmar granting the Doctor of Veterinary Medicine (B.V.Sc.) degree.",
    highlights: ["Exclusive Veterinary Degree", "Research Farms & Animal Clinics", "B.V.Sc Degree", "Zoological & Animal Health Care"],
    address: "Insein Road, Yangon Clinical Center",
    contact_phone: "+95 1 640192",
    contact_email: "info@uvs.edu.mm",
    website: "https://www.uvs.edu.mm",
    campus_facilities: ["Veterinary Teaching Hospital & Clinic", "Animal Pathology Lab", "Anatomy Museum", "Livestock Research Farm", "Veterinary Library"],
    admission_process: "Admission based on high matriculation scores in Biology, Chemistry, and English.",
    career_prospects: "Veterinary Doctor (B.V.Sc.), Livestock Health Consultant, Animal Nutritionist, Wildlife Conservationist, Quarantine Inspector.",
    overview: "The University of Veterinary Science is Myanmar's only university dedicated to veterinary medicine and animal sciences. Offering the Bachelor of Veterinary Science (B.V.Sc.) degree, the institution trains veterinarians for clinical practice, livestock production, and disease surveillance."
  },
  {
    university_id: 26,
    code: "UTM",
    university_name: "University of Traditional Medicine",
    location: "Yangon Teaching Center",
    region: "Yangon",
    type: "Specialized Traditional Medicine",
    category: "Medical & Health",
    category_group: "Medical",
    field_ids: [3],
    established: 2001,
    rating: "4.6",
    detail_url: "university-detail.html?id=26",
    image_url: "utm.jpg",
    description: "Myanmar's university dedicated to Indigenous Traditional Medicine, herbal pharmacology, and holistic healthcare.",
    highlights: ["B.T.M. Degree", "Herbal Research Gardens", "Traditional Medicine Hospital", "Pharmacognosy Labs"],
    address: "Yangon Teaching Hospital Center, Yangon",
    contact_phone: "+95 1 570912",
    contact_email: "contact@utm.edu.mm",
    website: "https://www.utm.edu.mm",
    campus_facilities: ["Traditional Medicine Teaching Hospital", "Herbal Botanical Garden", "Formulation & Processing Lab", "Indigenous Medicine Library"],
    admission_process: "Selection based on matriculation marks in science and arts combinations.",
    career_prospects: "Traditional Medical Practitioner (B.T.M.), Herbal Medicine Formulator, Holistic Health Advisor, Healthcare Researcher.",
    overview: "The University of Traditional Medicine offers specialized undergraduate training granting the Bachelor of Traditional Medicine (B.T.M.) degree, integrating traditional medical principles with modern diagnostic science."
  }
];

export const programs = [
  { program_id: 1, university_id: 7, field_id: 3, program_name: "M.B.,B.S. (UM1)", min_score: 450, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 252, min_eng_chem_bio_female: 259, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 2, university_id: 8, field_id: 3, program_name: "M.B.,B.S. (UM2)", min_score: 450, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 252, min_eng_chem_bio_female: 259, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 3, university_id: 11, field_id: 3, program_name: "B.D.S. (Dental Surgery)", min_score: 450, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 246, min_eng_chem_bio_female: 256, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 4, university_id: 10, field_id: 3, program_name: "B.Med.Tech (Medical Technology)", min_score: 466, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 5, university_id: 9, field_id: 3, program_name: "B.Pharm. (Pharmacy)", min_score: 452, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 6, university_id: 12, field_id: 3, program_name: "B.N.Sc. (Nursing)", min_score: 425, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 7, university_id: 13, field_id: 3, program_name: "B.P.H. (Public Health)", min_score: 396, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 8, university_id: 25, field_id: 3, program_name: "B.V.Sc. (Veterinary Science)", min_score: 416, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 9, university_id: 26, field_id: 3, program_name: "B.T.M. (Traditional Medicine)", min_score: 386, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 10, university_id: 1, field_id: 1, program_name: "B.C.Sc / B.C.Tech (UIT)", min_score: 480, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 11, university_id: 6, field_id: 1, program_name: "B.C.Sc / B.C.Tech (UCSY)", min_score: 397, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 12, university_id: 2, field_id: 2, program_name: "Civil Engineering", min_score: 0, min_score_male: 504, min_score_female: 498, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 346, min_4sub_female: 339 },
  { program_id: 13, university_id: 2, field_id: 2, program_name: "Mechanical Engineering", min_score: 0, min_score_male: 502, min_score_female: 476, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 331, min_4sub_female: 327 },
  { program_id: 14, university_id: 2, field_id: 2, program_name: "Electrical Power Engineering", min_score: 0, min_score_male: 484, min_score_female: 477, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 322, min_4sub_female: 327 },
  { program_id: 15, university_id: 2, field_id: 2, program_name: "Electronic Engineering", min_score: 0, min_score_male: 466, min_score_female: 500, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 329, min_4sub_female: 329 },
  { program_id: 16, university_id: 2, field_id: 2, program_name: "Computer Engineering & Information Technology", min_score: 0, min_score_male: 500, min_score_female: 496, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 333, min_4sub_female: 334 },
  { program_id: 17, university_id: 2, field_id: 2, program_name: "Mechatronic Engineering", min_score: 0, min_score_male: 491, min_score_female: 480, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 325, min_4sub_female: 326 },
  { program_id: 18, university_id: 2, field_id: 2, program_name: "Chemical Engineering", min_score: 0, min_score_male: 482, min_score_female: 492, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 310, min_4sub_female: 325 },
  { program_id: 19, university_id: 2, field_id: 2, program_name: "Textile Engineering", min_score: 0, min_score_male: 478, min_score_female: 491, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 316, min_4sub_female: 320 },
  { program_id: 20, university_id: 2, field_id: 2, program_name: "Mining Engineering", min_score: 0, min_score_male: 478, min_score_female: 467, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 315, min_4sub_female: 320 },
  { program_id: 21, university_id: 2, field_id: 2, program_name: "Petroleum Engineering", min_score: 0, min_score_male: 482, min_score_female: 489, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 318, min_4sub_female: 320 },
  { program_id: 22, university_id: 2, field_id: 2, program_name: "Metallurgical Engineering", min_score: 0, min_score_male: 468, min_score_female: 469, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 315, min_4sub_female: 319 },
  { program_id: 23, university_id: 2, field_id: 2, program_name: "Architecture", min_score: 0, min_score_male: 501, min_score_female: 486, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 333, min_4sub_female: 338 },
  { program_id: 24, university_id: 2, field_id: 2, program_name: "Telecommunication Engineering", min_score: 0, min_score_male: 472, min_score_female: 465, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 317, min_4sub_female: 321 },
  { program_id: 25, university_id: 2, field_id: 2, program_name: "Food Engineering", min_score: 0, min_score_male: 461, min_score_female: 468, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 315, min_4sub_female: 320 },
  { program_id: 26, university_id: 3, field_id: 2, program_name: "Civil Engineering", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 294, min_4sub_female: 294 },
  { program_id: 27, university_id: 3, field_id: 2, program_name: "Architecture", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 288, min_4sub_female: 288 },
  { program_id: 28, university_id: 3, field_id: 2, program_name: "Computer Engineering & Information Technology (CEIT)", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 282, min_4sub_female: 282 },
  { program_id: 29, university_id: 3, field_id: 2, program_name: "Electronic Engineering", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 270, min_4sub_female: 270 },
  { program_id: 30, university_id: 3, field_id: 2, program_name: "Mechanical Engineering", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 269, min_4sub_female: 269 },
  { program_id: 31, university_id: 3, field_id: 2, program_name: "Electrical Power Engineering", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 266, min_4sub_female: 266 },
  { program_id: 32, university_id: 3, field_id: 2, program_name: "Mechatronic Engineering", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 261, min_4sub_female: 261 },
  { program_id: 33, university_id: 3, field_id: 2, program_name: "Chemical Engineering", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 258, min_4sub_female: 258 },
  { program_id: 34, university_id: 3, field_id: 2, program_name: "Metallurgical Engineering", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 247, min_4sub_female: 247 },
  { program_id: 35, university_id: 3, field_id: 2, program_name: "Textile Engineering", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 243, min_4sub_female: 243 },
  { program_id: 36, university_id: 3, field_id: 2, program_name: "Agricultural Engineering", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 240, min_4sub_female: 240 },
  { program_id: 37, university_id: 4, field_id: 2, program_name: "Civil Engineering", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 291, min_4sub_female: 291 },
  { program_id: 38, university_id: 4, field_id: 2, program_name: "Architecture", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 284, min_4sub_female: 284 },
  { program_id: 39, university_id: 4, field_id: 2, program_name: "Computer Engineering & Information Technology (CEIT)", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 271, min_4sub_female: 271 },
  { program_id: 40, university_id: 4, field_id: 2, program_name: "Mechanical Engineering (ME)", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 259, min_4sub_female: 259 },
  { program_id: 41, university_id: 4, field_id: 2, program_name: "Electronic Engineering (EC)", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 252, min_4sub_female: 252 },
  { program_id: 42, university_id: 4, field_id: 2, program_name: "Mechatronic Engineering (MC)", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 251, min_4sub_female: 251 },
  { program_id: 43, university_id: 4, field_id: 2, program_name: "Electrical Power Engineering (EP)", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 249, min_4sub_female: 249 },
  { program_id: 44, university_id: 4, field_id: 2, program_name: "Chemical Engineering (CHE)", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 246, min_4sub_female: 246 },
  { program_id: 45, university_id: 4, field_id: 2, program_name: "Petroleum Engineering (PE)", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 246, min_4sub_female: 246 },
  { program_id: 46, university_id: 5, field_id: 2, program_name: "Civil Engineering", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 279, min_4sub_female: 279 },
  { program_id: 47, university_id: 5, field_id: 2, program_name: "Architecture", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 275, min_4sub_female: 275 },
  { program_id: 48, university_id: 5, field_id: 2, program_name: "Computer Engineering & Information Technology (CEIT)", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 269, min_4sub_female: 269 },
  { program_id: 49, university_id: 5, field_id: 2, program_name: "Electronic Engineering (EC)", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 256, min_4sub_female: 256 },
  { program_id: 50, university_id: 5, field_id: 2, program_name: "Electrical Power Engineering (EP)", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 254, min_4sub_female: 254 },
  { program_id: 51, university_id: 5, field_id: 2, program_name: "Mechanical Engineering (ME)", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 246, min_4sub_female: 246 },
  { program_id: 52, university_id: 5, field_id: 2, program_name: "Mechatronic Engineering (MC)", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 240, min_4sub_female: 240 },
  { program_id: 53, university_id: 15, field_id: 4, program_name: "Bachelor of Commerce (BCom)", min_score: 426, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 54, university_id: 15, field_id: 4, program_name: "Bachelor of Business Administration (BBA)", min_score: 412, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 55, university_id: 15, field_id: 4, program_name: "Bachelor of Accounting (BAct)", min_score: 410, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 56, university_id: 15, field_id: 4, program_name: "Bachelor of Economics (Statistics)", min_score: 404, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 57, university_id: 15, field_id: 4, program_name: "Bachelor of Economics (Economics)", min_score: 402, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 58, university_id: 15, field_id: 4, program_name: "Bachelor of Public Administration (BPA)", min_score: 394, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 59, university_id: 15, field_id: 4, program_name: "Bachelor of Economics (Development Studies)", min_score: 391, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 60, university_id: 15, field_id: 4, program_name: "Bachelor of Applied Science (BAS)", min_score: 389, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 61, university_id: 15, field_id: 4, program_name: "Bachelor of Political Science (BPS)", min_score: 386, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 62, university_id: 16, field_id: 4, program_name: "Bachelor of Commerce (BCom)", min_score: 383, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 63, university_id: 16, field_id: 4, program_name: "Bachelor of Business Administration (BBA)", min_score: 372, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 64, university_id: 16, field_id: 4, program_name: "Bachelor of Accounting (BAct)", min_score: 370, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 65, university_id: 16, field_id: 4, program_name: "Bachelor of Economics (Statistics)", min_score: 364, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 66, university_id: 16, field_id: 4, program_name: "Bachelor of Economics (Economics)", min_score: 360, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 67, university_id: 16, field_id: 4, program_name: "Bachelor of Public Administration (BPA)", min_score: 356, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 68, university_id: 16, field_id: 4, program_name: "Bachelor of Economics (Development Studies)", min_score: 352, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 69, university_id: 16, field_id: 4, program_name: "Bachelor of Applied Science (BAS)", min_score: 351, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 70, university_id: 16, field_id: 4, program_name: "Bachelor of Political Science (BPS)", min_score: 350, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 71, university_id: 17, field_id: 4, program_name: "Co-operative & Business Degree", min_score: 301, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 72, university_id: 21, field_id: 4, program_name: "Business Management (BM)", min_score: 414, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 73, university_id: 21, field_id: 4, program_name: "English for Professional Purpose (EPP)", min_score: 376, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 74, university_id: 21, field_id: 4, program_name: "Tourism and Hospitality Management (THM)", min_score: 356, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 75, university_id: 21, field_id: 4, program_name: "Economic and Finance (EF)", min_score: 351, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 76, university_id: 21, field_id: 4, program_name: "Journalism (JNL)", min_score: 337, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 77, university_id: 23, field_id: 10, program_name: "Myanmar", min_score: 340, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 78, university_id: 23, field_id: 10, program_name: "English", min_score: 372, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 79, university_id: 23, field_id: 9, program_name: "Geography", min_score: 320, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 80, university_id: 23, field_id: 9, program_name: "Environmental Studies", min_score: 350, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 81, university_id: 23, field_id: 9, program_name: "Fisheries and Agriculture", min_score: 320, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 82, university_id: 23, field_id: 9, program_name: "Environmental and Water Studies", min_score: 320, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 83, university_id: 23, field_id: 9, program_name: "Environmental Science", min_score: 360, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 84, university_id: 23, field_id: 8, program_name: "History", min_score: 320, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 85, university_id: 23, field_id: 8, program_name: "Philosophy", min_score: 320, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 86, university_id: 23, field_id: 8, program_name: "Psychology", min_score: 320, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 87, university_id: 23, field_id: 8, program_name: "Law", min_score: 360, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 88, university_id: 23, field_id: 8, program_name: "Oriental Studies", min_score: 320, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 89, university_id: 23, field_id: 8, program_name: "International Relations", min_score: 371, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 90, university_id: 23, field_id: 8, program_name: "Political Science", min_score: 350, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 91, university_id: 23, field_id: 8, program_name: "Anthropology", min_score: 300, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 92, university_id: 23, field_id: 8, program_name: "Archaeology", min_score: 320, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 93, university_id: 23, field_id: 7, program_name: "Library and Information studies", min_score: 300, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 94, university_id: 23, field_id: 5, program_name: "Chemistry", min_score: 350, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 95, university_id: 23, field_id: 5, program_name: "Biochemistry", min_score: 360, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 96, university_id: 23, field_id: 5, program_name: "Physics", min_score: 352, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 97, university_id: 23, field_id: 5, program_name: "Zoology", min_score: 320, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 98, university_id: 23, field_id: 5, program_name: "Botany", min_score: 320, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 99, university_id: 23, field_id: 5, program_name: "Marine Science", min_score: 350, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 100, university_id: 23, field_id: 5, program_name: "Geology", min_score: 330, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 101, university_id: 23, field_id: 5, program_name: "Industrial Chemistry", min_score: 360, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 102, university_id: 23, field_id: 5, program_name: "Food Science", min_score: 350, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 103, university_id: 23, field_id: 6, program_name: "Mathematics", min_score: 350, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 104, university_id: 23, field_id: 1, program_name: "Computer Science", min_score: 385, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 105, university_id: 23, field_id: 2, program_name: "Engineering Physics", min_score: 350, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 106, university_id: 24, field_id: 1, program_name: "Computer Science", min_score: 345, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 107, university_id: 24, field_id: 5, program_name: "Industrial Chemistry", min_score: 340, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 108, university_id: 24, field_id: 5, program_name: "Physics", min_score: 314, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 109, university_id: 24, field_id: 5, program_name: "Nuclear Physics", min_score: 303, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 110, university_id: 24, field_id: 5, program_name: "Chemistry", min_score: 299, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 111, university_id: 24, field_id: 5, program_name: "Zoology", min_score: 275, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 112, university_id: 24, field_id: 5, program_name: "Botany", min_score: 257, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 113, university_id: 24, field_id: 5, program_name: "Geology", min_score: 251, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 114, university_id: 24, field_id: 5, program_name: "Biochemistry", min_score: 250, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 115, university_id: 24, field_id: 5, program_name: "Biotechnology", min_score: 250, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 116, university_id: 24, field_id: 5, program_name: "Microbiology", min_score: 240, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 117, university_id: 24, field_id: 8, program_name: "International Relations", min_score: 340, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 118, university_id: 24, field_id: 8, program_name: "Law (LLB)", min_score: 330, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 119, university_id: 24, field_id: 8, program_name: "Law (BA)", min_score: 305, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 120, university_id: 24, field_id: 8, program_name: "Literature", min_score: 273, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 121, university_id: 24, field_id: 8, program_name: "Psychology", min_score: 265, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 122, university_id: 24, field_id: 8, program_name: "History", min_score: 245, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 123, university_id: 24, field_id: 8, program_name: "Philosophy", min_score: 244, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 124, university_id: 24, field_id: 8, program_name: "Oriental Studies", min_score: 242, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 125, university_id: 24, field_id: 8, program_name: "Anthropology", min_score: 240, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 126, university_id: 24, field_id: 8, program_name: "Archaeology", min_score: 240, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 127, university_id: 24, field_id: 4, program_name: "Business Information Technology", min_score: 320, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 128, university_id: 24, field_id: 4, program_name: "Economics", min_score: 315, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 129, university_id: 24, field_id: 10, program_name: "English", min_score: 310, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 130, university_id: 24, field_id: 10, program_name: "Myanmar Language", min_score: 280, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 131, university_id: 24, field_id: 10, program_name: "Myanmar Studies", min_score: 240, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 132, university_id: 24, field_id: 6, program_name: "Mathematics", min_score: 294, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 133, university_id: 24, field_id: 9, program_name: "Geography", min_score: 255, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 134, university_id: 14, field_id: 10, program_name: "English", min_score: 466, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 135, university_id: 14, field_id: 10, program_name: "Japanese (Japan)", min_score: 442, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 136, university_id: 14, field_id: 10, program_name: "Chinese (China)", min_score: 437, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 137, university_id: 14, field_id: 10, program_name: "Korean", min_score: 434, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 138, university_id: 14, field_id: 10, program_name: "English for business purposes", min_score: 420, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 139, university_id: 14, field_id: 10, program_name: "French (France)", min_score: 409, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 140, university_id: 14, field_id: 10, program_name: "German", min_score: 405, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 141, university_id: 14, field_id: 10, program_name: "Russian", min_score: 402, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 142, university_id: 14, field_id: 10, program_name: "Thai (Thailand)", min_score: 402, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 143, university_id: 18, field_id: 7, program_name: "Science (BSc)", min_score: 0, min_score_male: 360, min_score_female: 392, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 144, university_id: 18, field_id: 7, program_name: "Art (BA)", min_score: 0, min_score_male: 340, min_score_female: 361, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 145, university_id: 18, field_id: 7, program_name: "Arts and Science (BASc)", min_score: 0, min_score_male: 360, min_score_female: 395, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 146, university_id: 22, field_id: 8, program_name: "National University of Arts and Culture Programs", min_score: 0, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 147, university_id: 19, field_id: 11, program_name: "Port and Harbour Engineering (PH)", min_score: 477, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 148, university_id: 19, field_id: 11, program_name: "Nautical Science (NS)", min_score: 475, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 149, university_id: 19, field_id: 11, program_name: "Marine Engineering (ME)", min_score: 473, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 150, university_id: 19, field_id: 11, program_name: "Marine Electrical System and Electronics Engineering (MESE)", min_score: 465, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 151, university_id: 19, field_id: 11, program_name: "Naval Architecture (NA)", min_score: 465, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 152, university_id: 19, field_id: 11, program_name: "Marine Mechanical (MM)", min_score: 465, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 153, university_id: 19, field_id: 11, program_name: "River and Coastal Engineering (RC)", min_score: 465, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 },
  { program_id: 154, university_id: 20, field_id: 11, program_name: "Mercantile Marine Diploma Programs", min_score: 421, min_score_male: 0, min_score_female: 0, min_eng_chem_bio_male: 0, min_eng_chem_bio_female: 0, min_4sub_male: 0, min_4sub_female: 0 }
];

// In-memory Database Store for Students Assessments and Contact Inquiries
export const studentAssessmentsStore = [];
export const contactInquiriesStore = [];

/**
 * Calculates recommendations based on student marks, subject-specific criteria,
 * gender-based cutoffs, and selected interest fields.
 * Supports both object parameter ({ total_marks, gender, fields, ... }) and positional parameters.
 */
export function getRecommendations(inputScore, maybeGender = 'any', maybeFieldName = 'ALL', maybeOptions = {}) {
  let studentScore = 0;
  let gender = 'any';
  let fieldName = 'ALL';
  let options = {};

  if (typeof inputScore === 'object' && inputScore !== null) {
    options = inputScore;
    studentScore = Number(options.total_marks ?? options.studentScore ?? options.score ?? options.user_score);
    if (Number.isNaN(studentScore)) studentScore = 502;
    gender = options.gender || 'any';
    fieldName = options.field || options.field_name || (Array.isArray(options.fields) && options.fields.length > 0 ? options.fields[0] : 'ALL');
  } else {
    studentScore = Number(inputScore);
    if (Number.isNaN(studentScore)) studentScore = 502;
    gender = maybeGender || 'any';
    fieldName = maybeFieldName || 'ALL';
    options = maybeOptions || {};
  }

  const normGender = (gender || 'any').toLowerCase();
  const normField = fieldName || 'ALL';
  const selectedFields = Array.isArray(options.fields) && options.fields.length > 0
    ? options.fields
    : (normField !== 'ALL' ? [normField] : []);
  const locationPref = (options.location || options.preferred_location || 'all').toLowerCase();
  const learningStyle = (options.learning_style || options.learningStyle || 'practical').toLowerCase();

  // Subject-specific marks breakdown if provided
  const marks = options.marks || {};
  const myanmarMark = parseInt(marks.myanmar ?? options.myanmar, 10) || 0;
  const englishMark = parseInt(marks.english ?? options.english, 10) || 0;
  const mathMark = parseInt(marks.mathematics ?? marks.math ?? options.mathematics ?? options.math, 10) || 0;
  const physicsMark = parseInt(marks.physics ?? options.physics, 10) || 0;
  const chemistryMark = parseInt(marks.chemistry ?? options.chemistry, 10) || 0;
  const biologyMark = parseInt(marks.biology ?? options.biology, 10) || 0;
  const ecoMark = parseInt(marks.economics ?? options.economics, 10) || 0;

  // Key combination scores used in Myanmar admissions:
  // 1. Eng + Chem + Bio (for Medical / Dental / Pharmacy / Nursing admissions)
  const studentEngChemBio = englishMark + chemistryMark + biologyMark;
  // 2. Eng + Math + Chem + Physics (for Engineering / TU admissions)
  const student4Sub = englishMark + mathMark + chemistryMark + physicsMark;

  const uniMap = new Map(universities.map(u => [u.university_id, u]));
  const fieldMap = new Map(fields.map(f => [f.field_id, f]));

  const results = [];

  for (const prog of programs) {
    const fObj = fieldMap.get(prog.field_id);
    const uObj = uniMap.get(prog.university_id);
    if (!fObj || !uObj) continue;

    const fName = fObj.field_name;

    // Check if program matches user's chosen interest fields
    const isInterestMatched = selectedFields.length === 0 || selectedFields.some(sf => {
      if (!sf || sf === 'ALL' || sf === 'all') return true;
      const sfStr = String(sf).toLowerCase().trim();
      const fnNorm = (fName || '').toLowerCase().trim();
      const progNorm = (prog.program_name || '').toLowerCase().trim();

      // Direct or substring match
      if (sfStr === fnNorm || fnNorm.includes(sfStr) || sfStr.includes(fnNorm)) return true;

      // Cleaned strings (handles hyphens, slashes, ampersands: eco-science, art/humanities, arts & humanities)
      const sfClean = sfStr.replace(/[^a-z0-9]/g, ' ');
      const fnClean = fnNorm.replace(/[^a-z0-9]/g, ' ');

      // Eco-Science / Economics / Business / Commerce
      const isEcoUser = sfStr.includes('eco') || sfStr.includes('business') || sfStr.includes('commerce') || sfStr.includes('finance') || sfStr.includes('accounting') || sfStr.includes('bba') || sfStr.includes('bcom');
      const isEcoProgram = fnNorm.includes('economics') || progNorm.includes('economics') || progNorm.includes('commerce') || progNorm.includes('business') || progNorm.includes('accounting') || progNorm.includes('co-operative') || progNorm.includes('public administration');
      if (isEcoUser && isEcoProgram) return true;

      // Arts & Humanities / Social Science / Law / Literature / History
      const isArtsUser = sfStr.includes('art') || sfStr.includes('humanities') || sfStr.includes('social') || sfStr.includes('law') || sfStr.includes('history') || sfStr.includes('philosophy') || sfStr.includes('international') || sfStr.includes('language');
      const isArtsProgram = fnNorm.includes('arts') || fnNorm.includes('humanities') || fnNorm.includes('language') || fnNorm.includes('environment') || fnNorm.includes('education') || progNorm.includes('law') || progNorm.includes('international relations') || progNorm.includes('history') || progNorm.includes('philosophy') || progNorm.includes('geography') || progNorm.includes('literature') || progNorm.includes('political') || progNorm.includes('oriental');
      if (isArtsUser && isArtsProgram) return true;

      // Programming & Tech
      if ((sfStr.includes('tech') || sfStr.includes('computer') || sfStr.includes('programming') || sfStr.includes('it') || sfStr.includes('software')) && (fnNorm.includes('programming') || fnNorm.includes('tech') || progNorm.includes('computer') || progNorm.includes('tech') || progNorm.includes('software'))) return true;

      // Engineering
      if (sfStr.includes('engineer') && (fnNorm.includes('engineer') || progNorm.includes('engineering') || progNorm.includes('architecture'))) return true;

      // Medicine & Health
      if ((sfStr.includes('med') || sfStr.includes('health') || sfStr.includes('nurs') || sfStr.includes('pharm') || sfStr.includes('dent') || sfStr.includes('bio')) && (fnNorm.includes('medicine') || fnNorm.includes('health') || progNorm.includes('m.b.,b.s.') || progNorm.includes('b.d.s.') || progNorm.includes('pharm') || progNorm.includes('nursing'))) return true;

      // Science
      if ((sfStr.includes('sci') || sfStr.includes('pure science')) && (fnNorm.includes('science') || fnNorm.includes('mathematics') || progNorm.includes('physics') || progNorm.includes('chemistry') || progNorm.includes('biology') || progNorm.includes('geology') || progNorm.includes('botany') || progNorm.includes('zoology'))) return true;

      // Marine
      if (sfStr.includes('marin') && (fnNorm.includes('marine') || progNorm.includes('nautical') || progNorm.includes('marine') || progNorm.includes('harbour') || progNorm.includes('naval'))) return true;

      // Word intersection
      const sfWords = sfClean.split(/\s+/).filter(w => w.length > 2);
      const fnWords = fnClean.split(/\s+/).filter(w => w.length > 2);
      if (sfWords.some(w => fnWords.includes(w))) return true;

      return false;
    });

    // 1. Determine overall cutoff score based on gender
    let requiredCutoff = Number(prog.min_score) || 0;
    if (normGender === 'male' && prog.min_score_male > 0) {
      requiredCutoff = prog.min_score_male;
    } else if (normGender === 'female' && prog.min_score_female > 0) {
      requiredCutoff = prog.min_score_female;
    } else if (requiredCutoff === 0) {
      if (normGender === 'male' && prog.min_score_male > 0) {
        requiredCutoff = prog.min_score_male;
      } else if (normGender === 'female' && prog.min_score_female > 0) {
        requiredCutoff = prog.min_score_female;
      } else if (prog.min_score_male > 0 && prog.min_score_female > 0) {
        requiredCutoff = Math.min(prog.min_score_male, prog.min_score_female);
      } else if (prog.min_4sub_male > 0) {
        requiredCutoff = prog.min_4sub_male;
      }
    }

    // 2. Check subject-specific requirements
    let reqEngChemBio = 0;
    if (normGender === 'male' && prog.min_eng_chem_bio_male > 0) {
      reqEngChemBio = prog.min_eng_chem_bio_male;
    } else if (normGender === 'female' && prog.min_eng_chem_bio_female > 0) {
      reqEngChemBio = prog.min_eng_chem_bio_female;
    } else if (prog.min_eng_chem_bio_male > 0) {
      reqEngChemBio = Math.min(prog.min_eng_chem_bio_male, prog.min_eng_chem_bio_female || 999);
    }

    let req4Sub = 0;
    if (normGender === 'male' && prog.min_4sub_male > 0) {
      req4Sub = prog.min_4sub_male;
    } else if (normGender === 'female' && prog.min_4sub_female > 0) {
      req4Sub = prog.min_4sub_female;
    } else if (prog.min_4sub_male > 0) {
      req4Sub = Math.min(prog.min_4sub_male, prog.min_4sub_female || 999);
    }

    // 3. Evaluate eligibility
    let eligible = false;
    let cutoffMet = false;
    let subjectCriteriaMet = true;
    let subjectCriteriaDetail = "";

    // Overall cutoff check
    if (prog.min_score === 0 && (!prog.min_score_male || prog.min_score_male === 0) && (!prog.min_score_female || prog.min_score_female === 0)) {
      cutoffMet = true;
    } else if (prog.min_score > 0 && studentScore >= prog.min_score) {
      cutoffMet = true;
    } else if (normGender === 'male' && prog.min_score_male > 0 && studentScore >= prog.min_score_male) {
      cutoffMet = true;
    } else if (normGender === 'female' && prog.min_score_female > 0 && studentScore >= prog.min_score_female) {
      cutoffMet = true;
    } else if (normGender === 'any') {
      const minApplicable = (prog.min_score > 0 ? prog.min_score : Math.min(prog.min_score_male || 999, prog.min_score_female || 999));
      if (minApplicable < 999 && studentScore >= minApplicable) {
        cutoffMet = true;
      }
    }

    // Check specific Eng+Chem+Bio criteria for Medicine/Dental (Strict Dual Requirement)
    let isMedicineOrDental = (reqEngChemBio > 0) || (prog.field_id === 3 && (uObj.type.includes('Medical') || prog.program_name.includes('M.B.,B.S.') || prog.program_name.includes('B.D.S.')));
    let engChemBioMet = true;

    if (reqEngChemBio > 0) {
      if (studentEngChemBio > 0) {
        if (studentEngChemBio >= reqEngChemBio) {
          engChemBioMet = true;
          subjectCriteriaMet = true;
          subjectCriteriaDetail = `Eng+Chem+Bio: ${studentEngChemBio}/${reqEngChemBio} (Met ✓)`;
        } else {
          engChemBioMet = false;
          subjectCriteriaMet = false;
          subjectCriteriaDetail = `Eng+Chem+Bio: ${studentEngChemBio}/${reqEngChemBio} (Failed: ${reqEngChemBio - studentEngChemBio} marks short)`;
        }
      } else {
        subjectCriteriaDetail = `Req. Eng+Chem+Bio: ≥ ${reqEngChemBio}`;
      }
    }

    // Check 4-Subject criteria for Engineering
    if (req4Sub > 0) {
      if (student4Sub > 0) {
        if (student4Sub >= req4Sub) {
          subjectCriteriaMet = true;
          subjectCriteriaDetail = `4-Subject: ${student4Sub}/${req4Sub} (Met ✓)`;
        } else {
          subjectCriteriaMet = false;
          subjectCriteriaDetail = `4-Subject: ${student4Sub}/${req4Sub} (Failed: ${req4Sub - student4Sub} marks short)`;
        }
      } else {
        subjectCriteriaDetail = `Req. 4-Subject: ≥ ${req4Sub}`;
      }
    }

    eligible = cutoffMet && subjectCriteriaMet;

    // 4. Calculate Profile Match Score (0 - 100%) and Admission Probability
    const baselineCutoff = requiredCutoff > 0 ? requiredCutoff : 300;
    const diff = Number.isNaN(studentScore - baselineCutoff) ? 0 : (studentScore - baselineCutoff);
    let profileMatch = 70;
    let admissionChance = "Moderate";
    let admissionRate = "80%";
    let tier = "Target Program";

    // Hard Rule for Medical University: Must achieve BOTH Total >= 450 AND Eng+Chem+Bio >= 252
    if (isMedicineOrDental && reqEngChemBio > 0) {
      if (!cutoffMet || !engChemBioMet) {
        eligible = false;
        admissionChance = "Ineligible (No Chance)";
        admissionRate = "0%";
        tier = "Ineligible - Criteria Unmet";
        profileMatch = 30;
      } else {
        // Both conditions met!
        const engDiff = studentEngChemBio - reqEngChemBio;
        if (diff >= 30 && engDiff >= 15) {
          profileMatch = 98;
          admissionChance = "Very High";
          admissionRate = "95%";
          tier = "Top Medical Match";
        } else if (diff >= 10 && engDiff >= 5) {
          profileMatch = 92;
          admissionChance = "High";
          admissionRate = "88%";
          tier = "Strong Medical Match";
        } else {
          profileMatch = 85;
          admissionChance = "Moderate";
          admissionRate = "78%";
          tier = "Competitive Target";
        }
      }
    } else if (requiredCutoff > 0) {
      if (!eligible) {
        profileMatch = 45;
        admissionChance = "Low / Ineligible";
        admissionRate = "15%";
        tier = "Criteria Not Met";
      } else if (diff >= 35) {
        profileMatch = 96;
        admissionChance = "Very High";
        admissionRate = "98%";
        tier = "Safe Match";
      } else if (diff >= 15) {
        profileMatch = 91;
        admissionChance = "High";
        admissionRate = "92%";
        tier = "Top Match";
      } else if (diff >= 0) {
        profileMatch = 85;
        admissionChance = "Moderate";
        admissionRate = "82%";
        tier = "Target Match";
      } else if (diff >= -15) {
        profileMatch = 73;
        admissionChance = "Reach";
        admissionRate = "60%";
        tier = "Reach Program";
      } else {
        profileMatch = 52;
        admissionChance = "Competitive";
        admissionRate = "35%";
        tier = "Highly Competitive";
      }
    } else {
      profileMatch = 86;
      admissionChance = "High";
      admissionRate = "90%";
      tier = "Open Admission";
    }

    // Boost/adjust for Interest match
    if (isInterestMatched) {
      profileMatch = Math.min(99, profileMatch + 4);
    } else {
      profileMatch = Math.max(40, profileMatch - 15);
    }

    // Top-tier Medical University special handling for UM1 and UM2
    const isUM1orUM2 = (uObj.code === 'UM1' || uObj.code === 'UM2');
    if (isUM1orUM2 && eligible && isInterestMatched) {
      profileMatch = (uObj.code === 'UM1') ? 99 : 98;
      admissionChance = "Very High";
      admissionRate = "96%";
      tier = (uObj.code === 'UM1') ? "No. 1 Top-Tier Medical University" : "No. 2 Top-Tier Medical University";
    }

    // Boost/adjust for Location preference
    let locationMatched = false;
    if (locationPref === 'yangon' && uObj.region === 'Yangon') {
      profileMatch = Math.min(99, profileMatch + 2);
      locationMatched = true;
    } else if (locationPref.includes('mandalay') && uObj.location.toLowerCase().includes('mandalay')) {
      profileMatch = Math.min(99, profileMatch + 3);
      locationMatched = true;
    } else if (locationPref === 'anywhere' || locationPref === 'all' || locationPref === 'no preference') {
      locationMatched = true;
    }

    // Boost for practical learning style on engineering/tech/applied campuses
    if (learningStyle.includes('practical') && (fName.includes('Engineering') || fName.includes('Technology') || fName.includes('Marine'))) {
      profileMatch = Math.min(99, profileMatch + 2);
    }

    // Ensure profileMatch is a clean integer
    profileMatch = Math.min(99, Math.max(30, Math.round(profileMatch) || 75));

    // Generate specific reasoning bullet points
    const matchReasons = [];

    if (isMedicineOrDental && reqEngChemBio > 0) {
      if (studentEngChemBio > 0) {
        if (cutoffMet && engChemBioMet) {
          if (isUM1orUM2) {
            matchReasons.push(`🏆 ${uObj.code} is Myanmar's Top-Tier Premier Medical University — you meet 100% of the rigorous entrance requirements.`);
          }
          matchReasons.push(`✅ Satisfies both mandatory Medical University criteria: Total Marks (${studentScore} ≥ ${requiredCutoff}) and Eng+Chem+Bio (${studentEngChemBio} ≥ ${reqEngChemBio}).`);
        } else {
          matchReasons.push(`🚫 Ineligible for University of Medicine: Admission requires achieving BOTH Total Marks ≥ ${requiredCutoff} and Eng+Chem+Bio ≥ ${reqEngChemBio}. Failing either condition disqualifies the application.`);
        }
      } else {
        if (cutoffMet) {
          matchReasons.push(`Total marks (${studentScore} ≥ ${requiredCutoff}) satisfy the aggregate cutoff. Note: Admission also requires Eng+Chem+Bio ≥ ${reqEngChemBio}.`);
        } else {
          matchReasons.push(`Total marks (${studentScore}) are below the required medical cutoff (${requiredCutoff}).`);
        }
      }
    }

    if (diff >= 0) {
      matchReasons.push(`Total marks (${studentScore}) exceed the required cutoff (${requiredCutoff}) by +${diff} points.`);
    } else {
      matchReasons.push(`Total marks (${studentScore}) are ${Math.abs(diff)} points below the historical cutoff (${requiredCutoff}).`);
    }

    if (isInterestMatched) {
      matchReasons.push(`Directly matches your selected field interest: ${fName}.`);
    }

    if (subjectCriteriaDetail) {
      matchReasons.push(subjectCriteriaDetail);
    }

    if (locationMatched && locationPref !== 'anywhere' && locationPref !== 'all') {
      matchReasons.push(`Campus in ${uObj.location} matches your preferred location.`);
    }

    results.push({
      program_id: prog.program_id,
      university_id: uObj.university_id,
      university_name: uObj.university_name,
      university_code: uObj.code,
      university_location: uObj.location,
      university_region: uObj.region,
      university_type: uObj.type,
      detail_url: uObj.detail_url,
      image_url: uObj.image_url,
      field_id: fObj.field_id,
      field_name: fName,
      field_icon: fObj.icon,
      program_name: prog.program_name,
      required_cutoff_score: Number(requiredCutoff) || 0,
      user_score: Number(studentScore) || 0,
      min_score_male: Number(prog.min_score_male) || 0,
      min_score_female: Number(prog.min_score_female) || 0,
      min_eng_chem_bio_male: Number(prog.min_eng_chem_bio_male) || 0,
      min_eng_chem_bio_female: Number(prog.min_eng_chem_bio_female) || 0,
      min_4sub_male: Number(prog.min_4sub_male) || 0,
      min_4sub_female: Number(prog.min_4sub_female) || 0,
      score_difference: Number(diff) || 0,
      eligible: Boolean(eligible),
      is_interest_matched: Boolean(isInterestMatched),
      is_top_tier_medical: Boolean(isUM1orUM2 && eligible),
      profile_match_percent: profileMatch,
      admission_chance: admissionChance,
      admission_rate: admissionRate,
      tier,
      subject_criteria_detail: subjectCriteriaDetail,
      match_reasons: matchReasons
    });
  }

  // Sort results:
  // 1. Interest-matched & Eligible first
  // 2. If student is interested in Medicine and eligible for UM1/UM2, prioritize UM1 first then UM2
  // 3. Highest profile match percent
  // 4. Highest required cutoff
  results.sort((a, b) => {
    if (a.is_interest_matched !== b.is_interest_matched) {
      return a.is_interest_matched ? -1 : 1;
    }
    if (a.eligible !== b.eligible) {
      return a.eligible ? -1 : 1;
    }

    // Top-tier Medical Priority: UM1 and UM2 rank #1 and #2 when student likes medicine and meets requirements
    const isTopMedA = a.eligible && (a.university_code === 'UM1' || a.university_code === 'UM2') && a.is_interest_matched;
    const isTopMedB = b.eligible && (b.university_code === 'UM1' || b.university_code === 'UM2') && b.is_interest_matched;
    if (isTopMedA !== isTopMedB) {
      return isTopMedA ? -1 : 1;
    }
    if (isTopMedA && isTopMedB) {
      if (a.university_code === 'UM1') return -1;
      if (b.university_code === 'UM1') return 1;
    }

    if (b.profile_match_percent !== a.profile_match_percent) {
      return b.profile_match_percent - a.profile_match_percent;
    }
    return b.required_cutoff_score - a.required_cutoff_score;
  });

  // Assign recommendation suggestion numbering (No. 1, No. 2, No. 3, ...)
  results.forEach((item, index) => {
    item.suggestion_no = index + 1;
    item.rank_label = `No. ${index + 1}`;
  });

  return results;
}

/**
 * Saves a student assessment into the database
 */
export function saveStudentAssessment(data) {
  const student_id = studentAssessmentsStore.length + 1;
  const assessmentRecord = {
    student_id,
    gender: data.gender || 'male',
    myanmar: parseInt(data.myanmar ?? data.marks?.myanmar) || 0,
    english: parseInt(data.english ?? data.marks?.english) || 0,
    mathematics: parseInt(data.mathematics ?? data.math ?? data.marks?.mathematics ?? data.marks?.math) || 0,
    physics: parseInt(data.physics ?? data.marks?.physics) || 0,
    chemistry: parseInt(data.chemistry ?? data.marks?.chemistry) || 0,
    biology: parseInt(data.biology ?? data.marks?.biology) || 0,
    history: parseInt(data.history ?? data.marks?.history) || 0,
    geography: parseInt(data.geography ?? data.marks?.geography) || 0,
    economics: parseInt(data.economics ?? data.marks?.economics) || 0,
    total_marks: parseInt(data.total_marks) || 0,
    fields: Array.isArray(data.fields) ? data.fields : (data.field ? [data.field] : []),
    location: data.location || data.preferred_location || 'Yangon',
    learning_style: data.learning_style || 'practical',
    subjects: Array.isArray(data.subjects) ? data.subjects : [],
    marks: data.marks || {},
    created_at: new Date().toISOString()
  };

  // If total_marks is 0, auto-compute from subject sum
  if (!assessmentRecord.total_marks) {
    assessmentRecord.total_marks =
      assessmentRecord.myanmar +
      assessmentRecord.english +
      assessmentRecord.mathematics +
      assessmentRecord.physics +
      assessmentRecord.chemistry +
      assessmentRecord.biology +
      assessmentRecord.history +
      assessmentRecord.geography +
      assessmentRecord.economics;
  }

  studentAssessmentsStore.push(assessmentRecord);
  return assessmentRecord;
}

/**
 * Saves a contact inquiry
 */
export function saveContactInquiry(data) {
  const inquiry_id = contactInquiriesStore.length + 1;
  const inquiry = {
    inquiry_id,
    name: data.name || data.fullName || 'Anonymous',
    email: data.email || '',
    subject: data.subject || 'General Inquiry',
    message: data.message || '',
    phone: data.phone || '',
    created_at: new Date().toISOString()
  };
  contactInquiriesStore.push(inquiry);
  return inquiry;
}
