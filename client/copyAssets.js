const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, 'public', 'assets');
const destDir = path.join(__dirname, 'build', 'assets');

// Ensure the destination directory exists
fs.ensureDirSync(destDir);

// Copy the assets directory
fs.copySync(sourceDir, destDir, {
    overwrite: true
});

console.log('Assets copied successfully!');
