const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = 'public/images/colleges';
const files = fs.readdirSync(dir);

let fixed = 0;

async function processFile(file) {
  if (!file.endsWith('.png')) return;
  const filePath = path.join(dir, file);
  const stats = fs.statSync(filePath);
  
  // If file is less than 1KB, it's a placeholder
  if (stats.size < 1024) {
    const name = file.replace('.png', '').split('-').join('+');
    const url = `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&size=200&font-size=0.4`;
    
    return new Promise((resolve) => {
      https.get(url, (res) => {
        const fileStream = fs.createWriteStream(filePath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          fixed++;
          resolve();
        });
      }).on('error', (err) => {
        console.error('Error downloading', file, err.message);
        resolve();
      });
    });
  }
}

async function main() {
  const promises = [];
  for (const file of files) {
    promises.push(processFile(file));
  }
  await Promise.all(promises);
  console.log(`Fixed ${fixed} placeholder images!`);
}

main();
