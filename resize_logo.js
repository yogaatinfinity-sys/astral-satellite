const sharp = require('sharp');
const path = require('path');

async function processImages() {
    const inputPath = path.join(__dirname, 'public', 'logo_extracted.png');
    const iconPath = path.join(__dirname, 'src', 'app', 'icon.png');
    const logoPath = path.join(__dirname, 'public', 'logo.png');

    try {
        // 144x144 for icon.png
        await sharp(inputPath)
            .resize(144, 144, { fit: 'contain' })
            .png()
            .toFile(iconPath);
        console.log('Successfully generated src/app/icon.png');

        // copy to public/logo.png
        await sharp(inputPath)
            .png()
            .toFile(logoPath);
        console.log('Successfully generated public/logo.png');
    } catch (err) {
        console.error(err);
    }
}

processImages();
