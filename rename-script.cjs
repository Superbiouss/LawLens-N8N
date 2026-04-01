const fs = require('fs');
const path = require('path');

const root = __dirname;
const excludeDirs = ['.git', 'node_modules', '.gemini', 'dist'];
const excludeExts = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.ico', '.webp', '.woff', '.woff2', '.ttf'];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        
        if (stat && stat.isDirectory()) {
            if (!excludeDirs.some(ex => file.includes('/' + ex) || file.endsWith('/' + ex))) {
                results = results.concat(walk(file));
            }
        } else {
            if (!excludeExts.some(ext => file.toLowerCase().endsWith(ext)) && !file.endsWith('-lock.json')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(root);
let modifiedCount = 0;

for (const file of files) {
    // Skip this script itself
    if (file.endsWith('rename-script.js')) continue;

    try {
        const content = fs.readFileSync(file, 'utf8');
        
        let newContent = content
            .replace(/LAWLENS/g, 'LAWLENS')
            .replace(/LAWLENS/g, 'LAWLENS')
            .replace(/lawlens/g, 'lawlens')
            .replace(/lawlens/g, 'lawlens');
            
        if (newContent !== content) {
            fs.writeFileSync(file, newContent, 'utf8');
            modifiedCount++;
            console.log(`Updated: ${file.replace(root, '')}`);
        }
    } catch (e) {
        console.error(`Failed to process ${file}:`, e);
    }
}

console.log(`\n✅ Successfully updated ${modifiedCount} files.`);
