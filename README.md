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
│   ├── css/                # Stylesheet files
│   │   ├── common.css      # Global styles
│   │   ├── navigation.css  # Navigation styles
│   │   └── *.css           # Page-specific styles
│   ├── data/               # JSON/JS data files
│   │   ├── faculty.js      # Faculty information
│   │   ├── seminars.js     # Seminar data
│   │   ├── translations.js # Language translations
│   │   └── */              # Organized data directories
│   ├── img/                # Images
│   └── js/                 # JavaScript modules
│       ├── app.js          # Main application logic
│       ├── helpers.js      # Utility functions
│       └── *.js            # Page-specific scripts
├── *.html                  # HTML pages
├── footer.html             # Footer component
├── navigation.html         # Navigation component
└── site.webmanifest        # Web app manifest
```

## Getting Started

### Prerequisites

- A web server (Apache, Nginx, or development server)
- Modern web browser with JavaScript enabled

### Installation

1. **Clone or download** the project files to your web server directory
2. **Configure your web server** to serve the files from the project root
3. **Access the website** through your web server URL

For local development with XAMPP:

```bash
# Place files in: c:\xampp\htdocs\bilkent-math\
# Access via: http://localhost/bilkent-math/
```

### Development Setup

1. **Start your web server**
2. **Navigate to the project URL** in your browser
3. **Make changes** to HTML, CSS, or JavaScript files
4. **Refresh the browser** to see updates

## Content Management

Website content is managed through JavaScript data files located in `/assets/data/`.
Each data file exports structured objects that are consumed by the corresponding JavaScript modules.

### Data Files Structure

| File | Purpose | Structure |
|------|---------|-----------|
| `faculty.js` | Faculty member information | `CURRENT_FACULTY` array with bilingual objects |
| `news.js` | News and announcements | `NEWS` array with year, date, and content |
| `seminars.js` | Seminar listings | `SEMINARS` array with speaker, title, date, time info |
| `research.js` | Research areas | `RESEARCH_DATA` array with bilingual descriptions |
| `translations.js` | UI text translations | `TRANSLATIONS` object with key-value pairs |
| `graduate-students.js` | Student information | Arrays for current graduate students |
| `alumni.js` | Alumni data | Categorized by graduation year and degree |
| `project-courses.js` | Course information | Bilingual course descriptions |
| `history.js` | Department history | Timeline events |

### Updating Content

#### Faculty Information

```javascript
// assets/data/faculty.js
{
    name: "Faculty Name",
    isSupervisor: true,
    title: { en: "Professor", tr: "Profesör Dr." },
    degree: { en: "Ph.D. details", tr: "Doktora detayları" },
    research: { 
        en: ["Research Area 1", "Research Area 2"], 
        tr: ["Araştırma Alanı 1", "Araştırma Alanı 2"] 
    },
    office: "SA-144",
    phone: "+90 (312) 290-XXXX",
    email: "email [-at-] bilkent.edu.tr",
    photo: "photo.jpg",
    webpage: "personal-webpage-url"
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
    link: "seminars/2025-2026/file.pdf",
    date: "DD.MM.YYYY",
    time: "HH:MM",
    place: "Room Code"
}
```

### Translations

```javascript
// assets/data/translations.js
{
    home: { en: "Home", tr: "Ana Sayfa" },
    faculty: { en: "Faculty", tr: "Fakülte" },
    // More key-value pairs
}

```

## 📄 License

This website is maintained by the Department of Mathematics at Bilkent University. All rights reserved.

---

**Department of Mathematics**  
Bilkent University  
06800 Bilkent, Ankara, Turkey  
🌐 [math.bilkent.edu.tr](https://math.bilkent.edu.tr)
