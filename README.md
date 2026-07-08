# Skycast — Futuristic Weather App

A production-ready weather forecast app built with React, Vite, Tailwind CSS v4, and Framer
Motion. Search any city for current conditions, hourly and 5-day forecasts, and key weather
highlights — all in a dark, glassmorphic, animated UI.

## Stack

- React 19 + Vite
- Tailwind CSS v4 (CSS-first config via `@theme` in `src/index.css`)
- Framer Motion for entrance animations and micro-interactions
- react-icons (Weather Icons set) for animated weather iconography
- [Open-Meteo](https://open-meteo.com/) for weather + geocoding — completely free, no API key
- [BigDataCloud](https://www.bigdatacloud.com/free-api/free-reverse-geocode-to-city-api) for
  reverse geocoding (turning GPS coordinates into a city name), also free and key-less

## Getting Started

```bash
npm install
npm run dev
```

No environment variables are required to run this app — every API used is free and key-less.
See `.env.example` if you ever want to point the app at a different provider or a proxy.

## Project Structure

```
src/
  assets/        # static assets (icons, images) if any are added later
  components/
    layout/      # Header, animated background — app chrome
    ui/          # generic, content-agnostic building blocks (Button, GlassCard, Skeleton...)
    weather/     # weather-domain components (SearchBar, WeatherIcon, forecasts...)
  context/       # UnitContext — app-wide °C/°F preference
  hooks/         # reusable stateful logic (useWeather, useCitySearch, useDebounce...)
  pages/         # HomePage — composes everything into the single screen
  services/      # fetch logic only, no React, no UI
  utils/         # pure formatting/mapping functions (no side effects)
  App.jsx        # top-level providers + page
  main.jsx       # React entry point
```

## Build

```bash
npm run build
```

## Deploying to Netlify

`netlify.toml` is already configured (build command `npm run build`, publish directory `dist`).

1. Push this project to a GitHub repo.
2. In Netlify: "Add new site" → "Import an existing project" → pick the repo. Build settings
   auto-detect from `netlify.toml`. Click Deploy.
3. Once you have a live URL, update the placeholder `https://your-site.netlify.app` references in
   `public/robots.txt`, `public/sitemap.xml`, and the `og:image`/`twitter:image` tags in
   `index.html` to your real URL (needed for social share previews to resolve correctly).

## Notes on SEO

This is a client-only single-page app with no unique content per URL (it's a tool, not an
article/blog), so classic SEO ranking isn't really applicable here. What's included instead are
the practices that matter for a portfolio piece: a real `<title>`, meta description, Open Graph
tags for link previews, semantic HTML, and a favicon.
