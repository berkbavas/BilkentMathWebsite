# Bilkent University Mathematics Department Website

A modern, responsive website for the Department of Mathematics at Bilkent University.
The site provides comprehensive information about faculty, students, research areas, seminars, and academic programs.

## Features

- **Multilingual Support**: Full Turkish and English language support
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Components**: Dynamic faculty listings, seminar schedules, and research areas
- **Data-Driven Content**: JSON-based data management for easy updates
- **Academic Resources**: Problem of the month, project courses, and alumni information
- **Modern UI/UX**: Clean, professional design with smooth interactions

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+ modules)
- **Styling**: Custom CSS with responsive design principles
- **Icons**: Font Awesome 6.5.0
- **Font**: Fira Sans
- **Charts**: Chart.js for alumni statistics visualization
- **Data**: JSON/JavaScript data files for content management

## Project Structure

```
bilkent-math/
├── assets/
│   ├── css/                     # Stylesheet files
│   │   ├── common.css           # Global styles
│   │   ├── navigation.css       # Navigation styles
│   │   ├── about.css            # About page styles
│   │   ├── alisbah-awards.css   # Alisbah awards styles
│   │   ├── alumni-statistics.css # Alumni statistics styles
│   │   ├── alumni.css           # Alumni page styles
│   │   ├── double-major.css     # Double major styles
│   │   ├── faculty.css          # Faculty page styles
│   │   ├── graduate-program.css # Graduate program styles
│   │   ├── graduate-students.css # Graduate students styles
│   │   ├── history.css          # History page styles
│   │   ├── index.css            # Homepage styles
│   │   ├── links.css            # Links page styles
│   │   ├── master.css           # Master's program styles
│   │   ├── news.css             # News page styles
│   │   ├── phd.css              # PhD program styles
│   │   ├── problem-of-the-month.css # Problem of the month styles
│   │   ├── project-courses.css  # Project courses styles
│   │   ├── research.css         # Research page styles
│   │   ├── seminars-archive.css # Seminar archive styles
│   │   ├── seminars.css         # Seminars page styles
│   │   └── undergraduate-program.css # Undergraduate program styles
│   ├── data/                    # JSON/JS data files
│   │   ├── alisbah-awards.js    # Alisbah award recipients
│   │   ├── alumni-statistics.js # Alumni statistics data
│   │   ├── alumni.js            # Alumni information
│   │   ├── emeriti.js           # Emeritus faculty data
│   │   ├── faculty.js           # Current faculty information
│   │   ├── graduate-students.js # Graduate student data
│   │   ├── history.js           # Department history timeline
│   │   ├── news.js              # News and announcements
│   │   ├── problem-of-the-month.js  # Current problem of the month
│   │   ├── project-courses.js   # Project course information
│   │   ├── research.js          # Research areas and descriptions
│   │   ├── seminars.js          # Current seminar listings
│   │   ├── translations.js      # UI text translations
│   │   ├── problem-of-month/    # Historical problem data
│   │   │   ├── problem-of-month-2006.js
│   │   │   ├── problem-of-month-2007.js
│   │   │   ├── ...
│   │   │   └── problem-of-month-2025.js
│   │   └── seminars/            # Historical seminar data
│   │       ├── seminars-2013-2014.js
│   │       ├── seminars-2014-2015.js
│   │       ├── ...
│   │       └── seminars-2024-2025.js
│   ├── img/                     # Image assets
│   └── js/                      # JavaScript modules
│       ├── app.js               # Main application logic
│       ├── helpers.js           # Utility functions
│       ├── alisbah-awards.js    # Alisbah awards functionality
│       ├── alumni-statistics.js # Alumni statistics charts
│       ├── alumni.js            # Alumni page logic
│       ├── faculty.js           # Faculty page interactions
│       ├── graduate-program.js  # Graduate program functionality
│       ├── graduate-students.js # Graduate students page
│       ├── history.js           # History timeline functionality
│       ├── index.js             # Homepage interactions
│       ├── news.js              # News page functionality
│       ├── problem-of-the-month.js  # Problem of the month logic
│       ├── project-courses.js   # Project courses functionality
│       ├── research.js          # Research page interactions
│       ├── seminars-archive.js  # Seminar archive functionality
│       └── seminars.js          # Current seminars page
├── public/                      # Static assets
│   └── site.webmanifest         # Web app manifest
├── about.html                   # About page
├── alisbah-awards.html          # Alisbah awards page
├── alumni-statistics.html       # Alumni statistics page
├── alumni.html                  # Alumni page
├── double-major.html            # Double major information
├── empty.html                   # Empty template page
├── faculty.html                 # Faculty page
├── footer.html                  # Footer component
├── graduate-program.html        # Graduate program information
├── graduate-students.html       # Graduate students page
├── history.html                 # Department history page
├── index.html                   # Homepage
├── links.html                   # Links page
├── master.html                  # Master's program page
├── navigation.html              # Navigation component
├── news.html                    # News and announcements
├── phd.html                     # PhD program page
├── problem-of-month.html        # Problem of the month page
├── project-courses.html         # Project courses page
├── research.html                # Research areas page
├── seminars-archive.html        # Seminar archive page
├── seminars.html                # Current seminars page
├── undergraduate-program.html   # Undergraduate program page
├── universite-adaylari-icin-bilgiler.html # University candidates info
├── package.json                 # Node.js dependencies
├── vite.config.js               # Vite build configuration
└── README.md                    # Project documentation
```

## Build

This project uses Vite as the build tool. Make sure you have Node.js installed on your system.

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:3000` (or another available port).

### Production Build

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

The production files will be generated in the `dist/` directory.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally

## Content Management

Website content is managed through JavaScript data files located in `/assets/data/`.
Each data file exports structured objects that are consumed by the corresponding JavaScript modules.

### Data Files Structure

| File | Purpose | Structure |
|------|---------|-----------|
| `faculty.js` | Current faculty member information | `CURRENT_FACULTY` array with bilingual objects |
| `emeriti.js` | Emeritus faculty information | `EMERITI_FACULTY` array with faculty details |
| `graduate-students.js` | Graduate student information | Arrays for PhD and Master's students |
| `alumni.js` | Alumni data and statistics | Categorized by graduation year and degree |
| `alumni-statistics.js` | Alumni statistics for visualization | Data for charts and graphs |
| `news.js` | News and announcements | `NEWS` array with year, date, and content |
| `seminars.js` | Current semester seminar listings | `SEMINARS` array with speaker, title, date, time info |
| `seminars/*.js` | Historical seminar data by year | Academic year-based seminar archives |
| `research.js` | Research areas and descriptions | `RESEARCH_DATA` array with bilingual descriptions |
| `project-courses.js` | Project course information | Bilingual course descriptions and requirements |
| `history.js` | Department history timeline | Historical events and milestones |
| `problem-of-month.js` | Current problem of the month | Current problem and solution data |
| `problem-of-month/*.js` | Historical problems by year | Year-based problem archives |
| `alisbah-awards.js` | Alisbah award recipients | Award recipients by year with photos |
| `translations.js` | UI text translations | `TRANSLATIONS` object with Turkish/English pairs |

### Updating Content

#### Translations

```javascript
// assets/data/translations.js
{
    home: { en: "Home", tr: "Ana Sayfa" },
    faculty: { en: "Faculty", tr: "Fakülte" },
    // More key-value pairs
}

```

#### Faculty Information

```javascript
// assets/data/faculty.js
{
    name: "Faculty Name",
    isSupervisor: true,
    title: { en: "Professor", tr: "Profesör Dr." },
    degree: { en: "Ph.D. details", tr: "Doktora detayları" },
    research: [
        { en: "Research Area 1", tr: "Araştırma Alanı 1" },
        { en: "Research Area 2", tr: "Araştırma Alanı 2" }
        ],
    office: "SA-144",
    phone: "+90 (312) 290-XXXX",
    email: "email [-at-] bilkent.edu.tr",
    photo: "photo.jpg",
    webpage: "personal-webpage-url",
    researchGroups: ["group1", "group2"]
}
```

#### Graduate Students

```javascript
// assets/data/graduate-students.js
{
    name: "Student Name",
    office: "SA-150",
    phone: "XXXX",
    email: "email [-at-] bilkent.edu.tr",
    advisor: "Advisor Name",
    photo: "photo.jpg"
}
```

#### News Items

```javascript
// assets/data/news.js
{
    year: 2025,
    date: { en: "January 1, 2025", tr: "1 Ocak 2025" },
    content: { 
        en: "English news content with <a href='#'>links</a>", 
        tr: "Türkçe haber içeriği <a href='#'>linklerle</a>" 
    }
}
```

#### Seminars

```javascript
// assets/data/seminars.js
{
    speaker: "Speaker Name",
    title: "Seminar Title",
    link: "seminars/YYYY-YYYY/file.pdf",
    date: "DD.MM.YYYY",
    time: "HH:MM",
    place: "Room Code"
}
```

#### Problem of the Month

```javascript
// assets/data/problem-of-the-month-YYYY.js
{
  month: "January",
  year: 2025,
  question: "Problem/YYMMq.pdf",
  solution: "Problem/YYMMa.pdf",
  solvers: [
    { name: "Name Surname", affiliation: "University" },
    { name: "Name Surname", affiliation: "University" }
  ]
}
```

#### Alisbah Awards

```javascript
// assets/data/alisbah-awards.js
{
    year: 2025,
    recipients: ["Name Surname", "Name Surname"],
    photos: "photo.jpg"
}
```

#### Emeritus Faculty

```javascript
// assets/data/emeriti.js
{
    name: "Faculty Name",
    title: { en: "Professor Emeritus", tr: "Emekli Profesör" },
    degree: { en: "Ph.D. details", tr: "Doktora detayları" },
    research: { 
        en: ["Research Area 1", "Research Area 2"], 
        tr: ["Araştırma Alanı 1", "Araştırma Alanı 2"] 
    },
    email: "email [-at-] bilkent.edu.tr",
    photo: "photo.jpg",
    webpage: "personal-webpage-url"
}
```

## License

This website is maintained by the Department of Mathematics at Bilkent University. All rights reserved.

---

**Department of Mathematics**  
Bilkent University  
06800 Bilkent, Ankara, Turkey  
🌐 [math.bilkent.edu.tr](https://math.bilkent.edu.tr)
