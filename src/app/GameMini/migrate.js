const fs = require('fs');
const path = require('path');

const coDir = 'e:/Du_An_To/GameMini/Co';
const appDir = 'e:/Du_An_To/GameMini/APP/src/app';

const games = fs.readdirSync(coDir).filter(f => fs.statSync(path.join(coDir, f)).isDirectory() && f !== 'cau_sinh_vo_tan_game');

for (const game of games) {
  const gameDir = path.join(coDir, game);
  const outDir = path.join(appDir, game);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const htmlPath = path.join(gameDir, 'index.html');
  const cssPath = path.join(gameDir, 'style.css');
  const jsPath = path.join(gameDir, 'script.js');

  let htmlContent = '';
  if (fs.existsSync(htmlPath)) {
    const rawHtml = fs.readFileSync(htmlPath, 'utf8');
    const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
      htmlContent = bodyMatch[1]
        .replace(/<script.*?>.*?<\/script>/gi, '')
        .trim();
    }
  }

  let cssContent = '';
  if (fs.existsSync(cssPath)) {
    cssContent = fs.readFileSync(cssPath, 'utf8');
  }

  let jsContent = '';
  if (fs.existsSync(jsPath)) {
    jsContent = fs.readFileSync(jsPath, 'utf8');
  }

  // Create logic.ts
  const tsContent = `// @ts-nocheck
export function initLogic() {
  ${jsContent}
}
`;
  fs.writeFileSync(path.join(outDir, 'logic.ts'), tsContent);

  // Create page.tsx
  const componentName = game.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  const tsxContent = `"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { initLogic } from './logic';

export default function ${componentName}() {
  const initialized = useRef(false);

  useEffect(() => {
    // Inject CSS
    const styleId = 'style-${game}';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = \`${cssContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
      document.head.appendChild(style);
    }

    // Run logic once
    if (!initialized.current) {
      initialized.current = true;
      try {
        initLogic();
      } catch(err) {
        console.error("Error running logic for ${game}:", err);
      }
    }

    return () => {
      const s = document.getElementById(styleId);
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="${game}-wrapper" style={{ minHeight: '100vh', background: '#fff', position: 'relative' }}>
      <Link href="/" style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000, background: '#000', color: '#fff', padding: '5px 10px', textDecoration: 'none', borderRadius: '5px' }}>
        &larr; Về trang chủ
      </Link>
      <div dangerouslySetInnerHTML={{ __html: \`${htmlContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
    </div>
  );
}
`;

  fs.writeFileSync(path.join(outDir, 'page.tsx'), tsxContent);
  console.log(`Migrated ${game}`);
}
