import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface VideoDownloaderProps {
  format?: 'mp3' | 'mp4';
  isShorts?: boolean;
}

interface VideoInfo {
  title: string;
  thumbnail: string;
  views: string;
  likes: string;
  duration: string;
}

function VideoDownloader({ format, isShorts }: VideoDownloaderProps) {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setVideoInfo(null);

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError('Invalid YouTube URL. Please enter a valid YouTube video link.');
      return;
    }

    try {
      const response = await fetch(`https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${videoId}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
          'x-rapidapi-key': 'd1c53133acmsh2e7c470c0bfbb2ep1a074cjsne9dd522da151'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch video information');
      }

      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const item = data.items[0];
        setVideoInfo({
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          views: item.statistics.viewCount,
          likes: item.statistics.likeCount,
          duration: formatDuration(item.contentDetails.duration)
        });
      } else {
        setError('Video not found');
      }
    } catch (error) {
      setError('An error occurred while fetching video information');
      console.error('Error fetching video info:', error);
    }
  };

  const handleDownload = () => {
    // Here you would typically initiate the download process
    // For demonstration, we'll just log a message
    console.log(`Downloading video as ${format || 'mp4'}...`);
  };

  const extractVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const formatDuration = (duration: string): string => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (match[1] && match[1].slice(0, -1)) || 0;
    const minutes = (match[2] && match[2].slice(0, -1)) || 0;
    const seconds = (match[3] && match[3].slice(0, -1)) || 0;
    return `${hours ? hours + ':' : ''}${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  };

  return (
    <div className="bg-blue-50 rounded-lg p-8 text-center">
      <h2 className="text-4xl font-bold mb-2">
        {isShorts ? 'YouTube Shorts Downloader' : `YouTube ${format ? format.toUpperCase() : 'Video'} Downloader`}
      </h2>
      <p className="text-gray-600 mb-6">
        {isShorts
          ? 'Download YouTube Shorts videos for free'
          : `Download ${format ? format.toUpperCase() : 'online videos'} from YouTube for free`}
      </p>
      
      <form onSubmit={handleSubmit} className="flex max-w-2xl mx-auto mb-8">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube video link here"
          className="flex-grow px-4 py-2 rounded-l-full border-2 border-r-0 border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-r-full hover:bg-blue-600 focus:outline-none">
          <Search size={24} />
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {videoInfo && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <img src={videoInfo.thumbnail} alt="Video thumbnail" className="w-full rounded-lg mb-4" />
          <h3 className="text-xl font-semibold mb-2">{videoInfo.title}</h3>
          <div className="text-sm text-gray-600 mb-4">
            <p>Views: {parseInt(videoInfo.views).toLocaleString()}</p>
            <p>Likes: {parseInt(videoInfo.likes).toLocaleString()}</p>
            <p>Duration: {videoInfo.duration}</p>
          </div>
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 focus:outline-none"
          >
            Download {format ? format.toUpperCase() : 'Video'}
          </button>
        </div>
      )}
    </div>
  );
}

export default VideoDownloader;