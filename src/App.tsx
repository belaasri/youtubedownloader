import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import Home from './pages/Home';
import YoutubeDownloader from './pages/YoutubeDownloader';
import YoutubeToMp3 from './pages/YoutubeToMp3';
import YoutubeToMp4 from './pages/YoutubeToMp4';
import YoutubeShorts from './pages/YoutubeShorts';
import Copyright from './pages/Copyright';
import LanguageContext from './contexts/LanguageContext';
import translations from './translations';

const languages = ['English', 'Français', 'Español', 'Deutsch', 'Italiano'];

function App() {
  const [language, setLanguage] = useState('English');

  const translate = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <Router>
      <LanguageContext.Provider value={{ language, translate }}>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <header className="bg-white shadow-sm">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold text-blue-500">click-down</Link>
              <ul className="flex space-x-4">
                <li><Link to="/youtube-downloader" className="text-gray-600 hover:text-gray-900">{translate('youtubeDownloader')}</Link></li>
                <li><Link to="/youtube-to-mp3" className="text-gray-600 hover:text-gray-900">{translate('youtubeToMp3')}</Link></li>
                <li><Link to="/youtube-to-mp4" className="text-gray-600 hover:text-gray-900">{translate('youtubeToMp4')}</Link></li>
                <li><Link to="/youtube-shorts" className="text-gray-600 hover:text-gray-900">{translate('youtubeShortsDownloader')}</Link></li>
                <li><Link to="/copyright" className="text-gray-600 hover:text-gray-900">{translate('copyright')}</Link></li>
                <li className="relative group">
                  <button className="text-gray-600 hover:text-gray-900 flex items-center">
                    <Globe size={16} className="mr-1" />
                    {language}
                  </button>
                  <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block">
                    {languages.map((lang) => (
                      <li key={lang}>
                        <button
                          onClick={() => setLanguage(lang)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {lang}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </header>

          <main className="container mx-auto px-4 py-8 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/youtube-downloader" element={<YoutubeDownloader />} />
              <Route path="/youtube-to-mp3" element={<YoutubeToMp3 />} />
              <Route path="/youtube-to-mp4" element={<YoutubeToMp4 />} />
              <Route path="/youtube-shorts" element={<YoutubeShorts />} />
              <Route path="/copyright" element={<Copyright />} />
            </Routes>
          </main>

          <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">{translate('quickLinks')}</h3>
                  <ul className="space-y-2">
                    <li><Link to="/" className="hover:text-blue-300">{translate('home')}</Link></li>
                    <li><Link to="/youtube-downloader" className="hover:text-blue-300">{translate('youtubeDownloader')}</Link></li>
                    <li><Link to="/youtube-to-mp3" className="hover:text-blue-300">{translate('youtubeToMp3')}</Link></li>
                    <li><Link to="/youtube-to-mp4" className="hover:text-blue-300">{translate('youtubeToMp4')}</Link></li>
                    <li><Link to="/youtube-shorts" className="hover:text-blue-300">{translate('youtubeShortsDownloader')}</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">{translate('otherTools')}</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:text-blue-300">{translate('facebookVideoDownloader')}</a></li>
                    <li><a href="#" className="hover:text-blue-300">{translate('instagramDownloader')}</a></li>
                    <li><a href="#" className="hover:text-blue-300">{translate('twitterVideoDownloader')}</a></li>
                    <li><a href="#" className="hover:text-blue-300">{translate('youtubeThumbnailDownloader')}</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">{translate('legal')}</h3>
                  <ul className="space-y-2">
                    <li><Link to="/terms" className="hover:text-blue-300">{translate('termsOfUse')}</Link></li>
                    <li><Link to="/copyright" className="hover:text-blue-300">{translate('copyright')}</Link></li>
                    <li><Link to="/privacy" className="hover:text-blue-300">{translate('privacyPolicy')}</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">click-down</h3>
                  <p>{translate('footerDescription')}</p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p>&copy; {new Date().getFullYear()} click-down.com. {translate('allRightsReserved')}</p>
              </div>
            </div>
          </footer>
        </div>
      </LanguageContext.Provider>
    </Router>
  );
}

export default App;