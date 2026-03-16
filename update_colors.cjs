const fs = require('fs');
const path = require('path');

const directory = './client/src';
const colorMap = {
  '#C8A97E': '#1E73BE', // Blue for accents/icons/highlights
  '#2C1E16': '#1A1A1A', // Dark text
  '#FDFBF7': '#FFF6E6', // Background cream
  '#FAF8F5': '#FFF6E6', // Background cream
  '#F5F0E6': '#FFF6E6', // Background cream
  '#FCFAF8': '#FFFFFF', // Inputs bg
  '#EBE5D9': '#F0E5D1', // Borders
  '#8C7A6B': '#666666', // Muted text
  '#A39589': '#888888', // Muted text
  '#4A3B32': '#333333', // Darker muted
  '#3A2A20': '#E5E5E5', // Borders of dark cards
  '#1A1311': '#1A1A1A', // Very dark bg
  '#D4AF37': '#FFD83D', // Yellow highlight
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.css')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = walk(directory);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Specific override for Calculator button
  if (file.includes('calculator/index.tsx')) {
    content = content.replace(/bg-\[#2C1E16\] hover:bg-\[#3A2A20\] text-white font-medium text-xl shadow-\[0_10px_30px_-10px_rgba\(44,30,22,0\.5\)\] transition-all active:scale-\[0\.98\] border border-\[#4A3B32\]/g, 
      "bg-[#FF3B30] hover:bg-[#E6352B] text-white font-medium text-xl shadow-[0_10px_30px_-10px_rgba(255,59,48,0.5)] transition-all active:scale-[0.98] border border-[#D32F2F]");
  }
  
  // Generic color replacements
  for (const [oldColor, newColor] of Object.entries(colorMap)) {
    const regex = new RegExp(oldColor, 'gi');
    content = content.replace(regex, newColor);
  }
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated:', file);
  }
});
