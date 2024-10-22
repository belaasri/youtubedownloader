const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');

const app = express();
const port = 3000;

app.use(cors());

app.get('/download', async (req, res) => {
  try {
    const videoURL = req.query.url;
    if (!videoURL) {
      return res.status(400).send('Video URL is required');
    }

    const info = await ytdl.getInfo(videoURL);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });

    res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);
    ytdl(videoURL, { format: format }).pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while downloading the video');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
