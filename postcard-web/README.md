# ✉ Vintage Postcard Maker — Web

A beautiful browser-based vintage postcard creator. No build tools required — just open `index.html`.

## Features
- Upload 1–4 photos on the front
- 6 vintage font choices
- 7 card background colors + 6 text colors
- Editable caption, message, and address
- Flip between front and back
- Download as a high-resolution PNG

## Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/vintage-postcard-maker.git
cd vintage-postcard-maker
open index.html   # or just double-click the file
```

No npm, no bundler, no server required.

## File Structure

```
├── index.html   — markup
├── style.css    — all styles
├── app.js       — all interactivity
└── README.md
```

## Dependencies (loaded via CDN)
- [Google Fonts](https://fonts.google.com) — Playfair Display, Dancing Script, Special Elite, Pinyon Script, IM Fell English, Abril Fatface
- [html2canvas 1.4.1](https://html2canvas.hertzen.com) — postcard download

## Deploying to GitHub Pages
1. Push to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, root folder
4. Your app will be live at `https://YOUR_USERNAME.github.io/vintage-postcard-maker`

## License
MIT
