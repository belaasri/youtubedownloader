import React from 'react';
import VideoDownloader from '../components/VideoDownloader';

function YoutubeToMp4() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">YouTube to MP4 Converter</h1>
      <VideoDownloader format="mp4" />
    </div>
  );
}

export default YoutubeToMp4;