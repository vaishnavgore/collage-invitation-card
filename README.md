# Engineering Day 2026 — Invitation Website
## Samarth College of Engineering & Management, Belhe

A single-page, no-build-step digital invitation website for Engineering Day 2026, jointly hosted by the Departments of **AIML** and **Computer Science & Engineering (Data Science)**.

---

## 📁 File Structure

```
/
├── index.html          ← Main page (all sections)
├── css/
│   └── style.css       ← All custom styles (glassmorphism, animations, layout)
├── js/
│   ├── main.js         ← All JS: countdown, GSAP reveals, modal, RSVP, tilt
│   └── hero-network.js ← Canvas neural-network particle animation
├── assets/             ← Place any images/icons here
└── README.md           ← This file
```

---

## ✏️ How to Edit Event Details

### 1. Change the Event Date / Time
Open `js/main.js` and edit line ~10:
```js
const EVENT_DATE = new Date('2026-10-15T09:00:00+05:30');
// Format: YYYY-MM-DDTHH:mm:ss+05:30
```
Update the same date in `index.html` wherever "October 15, 2026" appears (search & replace).

### 2. Change the RSVP Deadline
Search for "October 10, 2026" in `index.html` and replace.

### 3. Fill in HOD Names
In `index.html`, find:
```html
Prof. [HOD Name] · HOD – AIML
Prof. [HOD Name] · HOD – Data Science
```
Replace with the actual names.

### 4. Fill in Student Coordinator
In `index.html` (footer), find:
```html
Student Coordinator: [Name] · [Phone]
```

### 5. Change Department Cards
Edit the `DEPTS` object in `js/main.js` (~line 20) to update department names, accent colors, or invitation messages.

---

## 🎨 How to Change Colors

All accent colors are defined as CSS custom properties in `css/style.css`:
```css
:root {
  --indigo: #6C63FF;   /* Primary accent */
  --cyan:   #00D9FF;   /* Secondary accent */
  --violet: #B14EFF;   /* Tertiary accent */
  --bg:     #0A0E17;   /* Page background */
}
```

Department card colors are set via `style="--accent: #XXXXXX"` in `index.html`.

---

## 🔌 Wiring the RSVP Form to a Backend

### Option A — Formspree
1. Create a form at [formspree.io](https://formspree.io)
2. In `js/main.js`, find the comment block `OPTIONAL Formspree wiring` and uncomment the fetch block, replacing `YOUR_FORM_ID`.

### Option B — Google Forms
1. Create a Google Form with matching fields
2. Add `action="https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse"` and `method="POST"` to the `<form>` tag in `index.html`

---

## 🚀 Deployment

**No build step required.** Just upload all files to any static host:
- GitHub Pages
- Netlify (drag-and-drop the folder)
- Vercel
- Any web hosting with file upload (cPanel, etc.)

Ensure the folder structure is preserved exactly as shown above.

---

## 📦 CDN Dependencies (loaded automatically)
| Library | Version | Purpose |
|---------|---------|---------|
| Tailwind CSS | Latest | Layout utilities |
| GSAP | 3.12.5 | Scroll animations |
| ScrollTrigger | 3.12.5 | Scroll-driven reveals |
| canvas-confetti | 1.9.3 | RSVP success effect |
| Google Fonts | — | Space Grotesk + Inter |

---

## ♿ Accessibility
- All interactive elements are keyboard-navigable
- Modal has focus trapping and ARIA roles
- `prefers-reduced-motion` disables all animations gracefully
- Form fields have visible focus states and ARIA error announcements

---

*Built with ❤️ for Engineering Day 2026, Samarth College of Engineering & Management, Belhe*
