// import { createCanvas, loadImage } from 'canvas';
// import path from 'path';
// import fs from 'fs';

// export const generateImage = async (title, content, imageUrl) => {
//   const canvas = createCanvas(1200, 630);
//   const ctx = canvas.getContext('2d');

//   // Load the base image
//   const image = await loadImage(imageUrl);
//   ctx.drawImage(image, 0, 0, 1200, 630);

//   // Add title and content
//   ctx.fillStyle = 'white';
//   ctx.font = 'bold 50px Arial';
//   ctx.fillText(title, 50, 100);

//   ctx.font = '30px Arial';
//   ctx.fillText(content, 50, 200);

//   // Save the image to a file
//   const ogImagePath = path.join(__dirname, '../uploads/og-image-' + Date.now() + '.png');
//   const out = fs.createWriteStream(ogImagePath);
//   const stream = canvas.createPNGStream();
//   stream.pipe(out);

//   return new Promise((resolve, reject) => {
//     out.on('finish', () => resolve(ogImagePath));
//     out.on('error', reject);
//   });
// };
