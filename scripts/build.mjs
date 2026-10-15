// Builds www/index.html (the web build and the Android app's page) from src/game.html.
// src/game.html is a page fragment (no <html>/<head>) that loads Google Fonts; here we wrap it in a
// full document, swap the font links for the bundled fonts in www/fonts so the game works offline,
// and add the web-app manifest and offline service worker for the web build.
import { readFileSync, writeFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/game.html', import.meta.url), 'utf8');
const lines = src.split('\n').filter(l => !/fonts\.(googleapis|gstatic)\.com|claude:viewport/.test(l));

const fonts = `<style>
@font-face { font-family: "Baloo 2"; font-weight: 400 800; font-display: swap; src: url(fonts/baloo2.woff2) format("woff2"); }
@font-face { font-family: "Nunito"; font-weight: 200 1000; font-display: swap; src: url(fonts/nunito.woff2) format("woff2"); }
</style>`;

const head = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
<meta name="description" content="A no-login block puzzle. Drag pieces, clear lines, chain combos.">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon-192.png">
<link rel="apple-touch-icon" href="icon-192.png">
<meta name="mobile-web-app-capable" content="yes">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);box-sizing:border-box}[hidden]{display:none!important}</style>
${fonts}`;

const sw = `<script>
if ('serviceWorker' in navigator && location.protocol === 'https:' && !window.Capacitor) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
</script>`;

// The fragment starts with <title>/<meta>/<link>/<style>; everything up to </style> belongs in <head>.
const body = lines.join('\n');
const cut = body.indexOf('</style>') + '</style>'.length;
const out = `${head}\n${body.slice(0, cut)}\n</head>\n<body>\n${body.slice(cut).trim()}\n${sw}\n</body>\n</html>\n`;
writeFileSync(new URL('../www/index.html', import.meta.url), out);
console.log('Wrote www/index.html');
