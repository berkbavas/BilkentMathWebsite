# Bilkent University Mathematics Department Website

A modern, responsive website for the Department of Mathematics at Bilkent University.
The site provides comprehensive information about faculty, students, research areas, seminars, and academic programs.

## 🌟 Features

- **Multilingual Support**: Full Turkish and English language support
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Components**: Dynamic faculty listings, seminar schedules, and research areas
- **Data-Driven Content**: JSON-based data management for easy updates
- **Academic Resources**: Problem of the month, project courses, and alumni information
- **Modern UI/UX**: Clean, professional design with smooth interactions

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+ modules)
- **Styling**: Custom CSS with responsive design principles
- **Icons**: Font Awesome 6.5.0
- **Font**: Fira Sans
- **Charts**: Chart.js for alumni statistics visualization
- **Data**: JSON/JavaScript data files for content management

## 📁 Project Structure

```
bilkent-math/
├── assets/
│   ├── css/                 # Stylesheet files
│   │   ├── common.css       # Global styles
│   │   ├── navigation.css   # Navigation styles
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

## 🚀 Getting Started

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

## 📝 Content Management

### Adding Faculty Members

Edit `assets/data/faculty.js`:
```javascript
{
    name: "Faculty Name",
    rank: "Professor",
    email: "email@bilkent.edu.tr",
    webpage: "https://example.com",
    office: "Office Number",
    phone: "+90 312 290 XXXX",
    researchAreas: ["Research Area 1", "Research Area 2"]
}
```

### Adding Seminars

Edit `assets/data/seminars/seminars-YYYY-YYYY.js`:
```javascript
{
    date: "YYYY-MM-DD",
    time: "HH:MM",
    speaker: "Speaker Name",
    title: { en: "Title", tr: "Başlık" },
    abstract: { en: "Abstract", tr: "Özet" },
    location: "Room Number"
}
```

### Adding News

Edit `assets/data/news.js`:
```javascript
{
    date: "YYYY-MM-DD",
    title: { en: "News Title", tr: "Haber Başlığı" },
    content: { en: "Content", tr: "İçerik" },
    link: "optional-link-url"
}
```

### Language Translations

Update `assets/data/translations.js` to add or modify translations:
```javascript
key: {
    en: "English text",
    tr: "Türkçe metin"
}
```

## 📞 Support

For technical issues or questions:

**Department Email**: bilmath@fen.bilkent.edu.tr

## 📄 License

This website is maintained by the Department of Mathematics at Bilkent University. All rights reserved.

---

**Department of Mathematics**  
Bilkent University  
06800 Bilkent, Ankara, Turkey  
🌐 [math.bilkent.edu.tr](https://math.bilkent.edu.tr)