// api/download.ts
import { NowRequest, NowResponse } from '@vercel/node'; // Or your serverless function framework's equivalent
import ytdl from 'ytdl-core';

export default async (req: NowRequest, res: NowResponse) => {
  const videoId = req.query.videoId as string;

  if (!videoId) {
    return res.status(400).json({ error: 'Video ID is required' });
  }

  try {
    const videoInfo = await ytdl.getInfo(videoId);
    const highestQualityFormat = ytdl.chooseFormat(videoInfo.formats, { quality: 'highestvideo' }); // Or choose the desired format

    if (!highestQualityFormat) {
      return res.status(404).json({ error: 'No suitable video format found' });
    }

    res.setHeader('Content-Disposition', `attachment; filename="video.mp4"`); // Set filename
    res.setHeader('Content-Type', 'video/mp4');

    ytdl(videoId, { format: highestQualityFormat }).pipe(res); // Pipe the video stream to the response

  } catch (error) {
    console.error('Error downloading video:', error);
    return res.status(500).json({ error: 'Failed to download video' });
  }
};
