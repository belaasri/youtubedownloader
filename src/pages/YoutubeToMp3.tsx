import React from 'react';
import VideoDownloader from '../components/VideoDownloader';

function YoutubeToMp3() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">YouTube to MP3 Converter</h1>
      <VideoDownloader format="mp3" />
    </div>
  );
}

export default YoutubeToMp3;