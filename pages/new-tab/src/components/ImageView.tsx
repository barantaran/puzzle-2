import React from 'react';

interface ImageViewProps {
  imageUrl: string;
  title: string;
  description: string;
  theme: 'light' | 'dark';
  onBack: () => void;
}

export const ImageView: React.FC<ImageViewProps> = ({ imageUrl, title, description, theme, onBack }) => {
  const isLight = theme === 'light';

  return (
    <div className={`min-h-screen ${isLight ? 'bg-slate-50' : 'bg-gray-800'} p-8`}>
      <div className="w-full max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className={`mb-6 flex items-center ${
            isLight ? 'text-gray-700 hover:text-gray-900' : 'text-gray-300 hover:text-gray-100'
          } transition-colors text-lg`}>
          <span className="mr-2">←</span> Back to gallery
        </button>

        <div className={`rounded-xl overflow-hidden shadow-xl ${isLight ? 'bg-white' : 'bg-gray-900'}`}>
          <img src={imageUrl} alt={title} className="w-full h-auto max-h-[80vh] object-contain" />
          <div className="p-4">
            <h2 className={`text-xl font-semibold mb-2 ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>{title}</h2>
            <p className={`${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
