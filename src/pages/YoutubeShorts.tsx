import React from 'react';
import VideoDownloader from '../components/VideoDownloader';

function YoutubeShorts() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">YouTube Shorts Downloader</h1>
      <VideoDownloader isShorts={true} />
    </div>
  );
}

export default YoutubeShorts;