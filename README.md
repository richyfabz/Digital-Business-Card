# Digital Business Card

A personal digital business card built with React and Vite.

Dark glass aesthetic — frosted card, gradient mesh background, spinning avatar ring, animated status pill, and smooth entrance animation. No component libraries, no Tailwind — just React, plain CSS, and Google Fonts.


## Stack

- React 18
- Vite
- Plain CSS (no Tailwind, no UI libraries)
- Google Fonts — DM Serif Display + DM Sans


## Project Structure

```
digital-card/
├── public/
│   └── index.html          # HTML entry point
├── src/
│   ├── DigitalCard.jsx     # Card component + hooks
│   ├── DigitalCard.css     # All styles
│   └── main.jsx            # React root
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/richyfabz/digital-card.git
cd digital-card

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.


## Deploying to Vercel

```bash
npm install -g vercel
vercel
```

Vercel auto-detects Vite. Your card will be live in under a minute. You can also connect the GitHub repo in the Vercel dashboard for automatic deploys on every push to `main`.

---

## License

MIT