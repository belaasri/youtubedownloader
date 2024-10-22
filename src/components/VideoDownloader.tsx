import React, { useState } from 'react';

const VideoDownloader: React.FC = () => {
  const [url, setUrl] = useState('');

  const handleDownload = async () => {
    try {
      const response = await fetch(`http://localhost:3000/download?url=${encodeURIComponent(url)}`, {
        method: 'GET',
      });

      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = downloadUrl;
        a.download = 'video.mp4';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
      } else {
        console.error('Download failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube URL"
      />
      <button onClick={handleDownload}>Download Video</button>
    </div>
  );
};

export default VideoDownloader;
