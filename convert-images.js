const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, 'public', 'projects');
const files = ['project1.png', 'project2.png', 'project3.png', 'project4.png'];

async function run() {
    for (const f of files) {
        const inp = path.join(dir, f);
        const out = path.join(dir, f.replace('.png', '.webp'));
        const stats = fs.statSync(inp);
        console.log(f + ': ' + Math.round(stats.size / 1024) + 'KB');
        await sharp(inp).webp({ quality: 80 }).toFile(out);
        const outStats = fs.statSync(out);
        console.log('  -> ' + f.replace('.png', '.webp') + ': ' + Math.round(outStats.size / 1024) + 'KB');
    }
    console.log('Done!');
}

run();
