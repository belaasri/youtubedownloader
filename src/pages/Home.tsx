import React, { useContext } from 'react';
import VideoDownloader from '../components/VideoDownloader';
import LanguageContext from '../contexts/LanguageContext';
import { Download, Zap, DollarSign } from 'lucide-react';

function Home() {
  const { translate } = useContext(LanguageContext);

  return (
    <div>
      <VideoDownloader />
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4">{translate('bestYoutubeDownloader')}</h1>
        <p className="text-gray-700 mb-4">
          {translate('youtubeDescription')}
        </p>
        <p className="text-gray-700">
          {translate('downloaderDescription')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {[
          { icon: Download, title: 'noDownloadsNoHassles', description: 'noDownloadsDescription' },
          { icon: Zap, title: 'versatilityInFormats', description: 'versatilityDescription' },
          { icon: DollarSign, title: 'absolutelyFree', description: 'freeDescription' }
        ].map(({ icon: Icon, title, description }, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon size={32} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{translate(title)}</h3>
            <p className="text-gray-600">{translate(description)}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">{translate('howToDownload')}</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>{translate('step1')}</li>
          <li>{translate('step2')}</li>
          <li>{translate('step3')}</li>
        </ol>
      </div>
    </div>
  );
}

export default Home;