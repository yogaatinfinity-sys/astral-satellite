const sharp = require('sharp');
const fs = require('fs');

async function processSvg() {
    const svgBuffer = fs.readFileSync('public/logo.svg');
    try {
        await sharp(svgBuffer)
            .resize(144, 144, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .png()
            .toFile('src/app/icon.png');
        console.log('Generated icon.png from SVG');
    } catch (err) {
        console.error(err);
    }
}
processSvg();
