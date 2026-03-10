const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

async function generate() {
    const inputSvg = path.join(__dirname, 'public', 'logo.svg');
    const outputPng = path.join(__dirname, 'src', 'app', 'icon.png');

    try {
        const svgBuffer = fs.readFileSync(inputSvg);
        await sharp(svgBuffer)
            .resize(144, 144, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .png()
            .toFile(outputPng);
        console.log('Successfully generated 144x144 png.');
    } catch (err) {
        console.error('Error generating image:', err);
    }
}

generate();
