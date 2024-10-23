// components/VideoDownloader.tsx
import React from 'react';

interface VideoDownloaderProps {
  videoId: string;
}


const VideoDownloader: React.FC<VideoDownloaderProps> = ({ videoId }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/download?videoId=${videoId}`); // Call your API route
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'video.mp4';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Download failed:', response.status, await response.text()); // Log the error details
      }
    } catch (error) {
      console.error('Error during download:', error);
    }
  };

  return (
    <div>
      {/* ... other JSX ... */}
      <button onClick={handleDownload}>Download Video</button>
    </div>
  );
};

export default VideoDownloader;
