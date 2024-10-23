import React, { useState } from 'react';

const VideoDownloader = () => {
  // Replace this URL with the actual URL of your video
  const [videoUrl] = useState('https://example.com/path-to-your-video.mp4');

  return (
    <div className="video-container">
      <h2>Mastery Summarized in 8 Minutes by Robert Greene</h2>
      <video controls width="100%">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <a href={videoUrl} download="mastery-summary.mp4">
        <button className="download-button" style={{ marginTop: '10px' }}>
          Download Video
        </button>
      </a>
    </div>
  );
};

export default VideoDownloader;
