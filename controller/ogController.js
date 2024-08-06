
// import multer from 'multer';
// import puppeteer from 'puppeteer';
// import path from 'path';
// import fs from 'fs';
// import Post from '../models/imagemodel.js';

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
// });
// const upload = multer({ storage });

// if (!fs.existsSync('uploads')) {
//   fs.mkdirSync('uploads');
// }

// const generateOgImage = async (req, res) => {
//   const { title, content } = req.body;
//   const imagePath = req.file ? `https://sde-server.onrender.com/uploads/${req.file.filename}` : null;

//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     const contentSnippet = content.length > 180 ? content.substring(0, 180) + '...' : content;

//     await page.setContent(`
//       <html>
//         <head>
//           <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
//           <style>
//             body {
//               margin: 0;
//               width: 1200px;
//               height: 630px;
//               display: flex;
//               flex-direction: column;
//               align-items: center;
//               justify-content: center;
//               font-family: Arial, sans-serif;
//               border: 1px solid #ddd;
//               box-sizing: border-box;
//               background-color: #fff;
//               overflow: hidden;
//             }
//             .container {
//               width: 100%;
//               height: 100%;
//               text-align: left;
//               display: flex;
//               flex-direction: column;
//               justify-content: center;
//               padding: 20px;
//               box-sizing: border-box;
//             }
//             .title {
//               font-size: 32px;
//               font-weight: bold;
//               margin-bottom: 20px;
//               word-wrap: break-word;
//               overflow: hidden;
//               text-overflow: ellipsis;
//             }
//             .content {
//               font-size: 24px;
//               margin-bottom: 20px;
//               word-wrap: break-word;
//             }
//             .image-container {
//               display: flex;
//               justify-content: center;
//               align-items: center;
//               width: 100%;
//               height: 200px; /* Adjust height as needed */
//               overflow: hidden;
//             }
//             .image {
//               width: 100%;
//               height: 100%;
//               object-fit: cover;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="title">${title}</div>
//             <div class="content">${contentSnippet}</div>
//             ${imagePath ? `<div class="image-container"><img class="image" src="${imagePath}" /></div>` : ''}
//           </div>
//         </body>
//       </html>
//     `);

//     // Adjust the font size to fit the title within the container
//     await page.evaluate(() => {
//       const titleElement = document.querySelector('.title');
//       let fontSize = 32;
//       while (titleElement.scrollHeight > titleElement.offsetHeight && fontSize > 12) {
//         fontSize -= 2;
//         titleElement.style.fontSize = `${fontSize}px`;
//       }
//     });

//     const ogImagePath = `uploads/og-image-${Date.now()}.png`;
//     await page.setViewport({ width: 1200, height: 630 });
//     await page.screenshot({ path: ogImagePath });
//     await browser.close();

//     const post = new Post({
//       title,
//       content,
//       imageUrl: imagePath,
//       ogImageUrl: `https://sde-server.onrender.com/${ogImagePath}`
//     });

//     await post.save();

//     res.json({ 
//       ogImageUrl: `https://sde-server.onrender.com/${ogImagePath}`,
//       imageUrl: imagePath // Include the original image URL in the response
//     });
//   } catch (error) {
//     console.error('Error generating OG image:', error);
//     res.status(500).json({ error: 'Failed to generate OG image' });
//   }
// };

// export { generateOgImage, upload };
import multer from 'multer';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import Post from '../models/imagemodel.js';
import express from 'express';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const generateOgImage = async (req, res) => {
  const { title, content } = req.body;
  const imagePath = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    const contentSnippet = content.length > 180 ? content.substring(0, 180) + '...' : content;

    await page.setContent(`
      <html>
        <head>
          <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
          <style>
            body {
              margin: 0;
              width: 1200px;
              height: 630px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              font-family: Arial, sans-serif;
              border: 1px solid #ddd;
              box-sizing: border-box;
              background-color: #fff;
              overflow: hidden;
            }
            .container {
              width: 100%;
              height: 100%;
              text-align: left;
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding: 20px;
              box-sizing: border-box;
            }
            .title {
              font-size: 32px;
              font-weight: bold;
              margin-bottom: 20px;
              word-wrap: break-word;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .content {
              font-size: 24px;
              margin-bottom: 20px;
              word-wrap: break-word;
            }
            .image-container {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 200px; /* Adjust height as needed */
              overflow: hidden;
            }
            .image {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="title">${title}</div>
            <div class="content">${contentSnippet}</div>
            ${imagePath ? `<div class="image-container"><img class="image" src="${imagePath}" /></div>` : ''}
          </div>
        </body>
      </html>
    `);

    // Adjust the font size to fit the title within the container
    await page.evaluate(() => {
      const titleElement = document.querySelector('.title');
      let fontSize = 32;
      while (titleElement.scrollHeight > titleElement.offsetHeight && fontSize > 12) {
        fontSize -= 2;
        titleElement.style.fontSize = `${fontSize}px`;
      }
    });

    const ogImagePath = `uploads/og-image-${Date.now()}.png`;
    await page.setViewport({ width: 1200, height: 630 });
    await page.screenshot({ path: ogImagePath });
    await browser.close();

    const post = new Post({
      title,
      content,
      imageUrl: imagePath,
      ogImageUrl: `${req.protocol}://${req.get('host')}/${ogImagePath}`
    });

    await post.save();

    res.json({ 
      ogImageUrl: `${req.protocol}://${req.get('host')}/${ogImagePath}`,
      imageUrl: imagePath // Include the original image URL in the response
    });
  } catch (error) {
    console.error('Error generating OG image:', error);
    res.status(500).json({ error: 'Failed to generate OG image' });
  }
};



export { generateOgImage, upload };
