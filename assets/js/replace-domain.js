// Script para reemplazar el dominio en archivos estáticos
// Uso: node replace-domain.js <dominio_nuevo>

const fs = require('fs');
const path = require('path');

const files = [
  '../index.html',
  '../sitemap.xml',
  '../robots.txt'
];

const baseDir = __dirname;
const oldDomain = /tudominio\.com/g;
const newDomain = process.argv[2];

if (!newDomain) {
  console.error('Debes indicar el nuevo dominio. Ejemplo: node replace-domain.js miweb.com');
  process.exit(1);
}

files.forEach(file => {
  const filePath = path.join(baseDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(oldDomain, newDomain);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Dominio reemplazado en ${file}`);
  }
});
