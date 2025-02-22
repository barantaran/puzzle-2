import React, { useEffect, useRef } from 'react';
import { Canvas, painters } from 'headbreaker';
import './PuzzleView.css';

interface PuzzleViewProps {
  imageUrl: string;
  title: string;
  description: string;
  theme: 'light' | 'dark';
  onBack: () => void;
}

export const PuzzleView: React.FC<PuzzleViewProps> = ({ imageUrl, theme, onBack }) => {
  const isLight = theme === 'light';
  const puzzleRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<Canvas | null>(null);

  const getPrizeUrl = (url: string) => {
    return url.replace('wallpaper', 'prize');
  };

  useEffect(() => {
    if (!puzzleRef.current) return;

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      if (!puzzleRef.current) return;

      const containerWidth = 1000;
      const containerHeight = 650;
      const pieceSize = 75;

      canvasRef.current = new Canvas(puzzleRef.current.id, {
        width: containerWidth,
        height: containerHeight,
        pieceSize,
        proximity: 20,
        borderFill: 8,
        strokeWidth: 0,
        lineSoftness: 0.05,
        painter: new painters.Konva(),
        image: image,
        preventOffstageDrag: true,
      });

      // Add type assertion to suppress the error
      (canvasRef.current as Canvas & { adjustImagesToPuzzleHeight: () => void }).adjustImagesToPuzzleHeight();

      canvasRef.current.autogenerate({
        horizontalPiecesCount: 3,
        verticalPiecesCount: 2,
      });

      canvasRef.current.shuffleGrid();
      canvasRef.current.draw();
      canvasRef.current.attachSolvedValidator();
      canvasRef.current.onValid(() => {
        alert('Solved!');
      });
    };

    return () => {
      // Add safety check for destroy method
      if (canvasRef.current && typeof canvasRef.current.destroy === 'function') {
        try {
          canvasRef.current.destroy();
        } catch (error) {
          console.warn('Failed to destroy canvas:', error);
        }
      }
    };
  }, [imageUrl, theme]); // Added theme dependency

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="relative min-h-screen">
      <div className="absolute top-8 left-8 z-10 flex items-center gap-6">
        <button
          onClick={onBack}
          className={`flex items-center ${
            isLight ? 'text-gray-700 hover:text-gray-900' : 'text-gray-300 hover:text-gray-100'
          } transition-colors text-lg`}>
          <span className="mr-2">←</span> Back to gallery
        </button>
        <a
          href={getPrizeUrl(imageUrl)}
          download
          className={`flex items-center ${
            isLight ? 'text-gray-700 hover:text-gray-900' : 'text-gray-300 hover:text-gray-100'
          } transition-colors text-lg`}>
          <span className="mr-2">↓</span> Download
        </a>
      </div>
      <div className={`min-h-screen flex items-center ${isLight ? 'bg-slate-50' : 'bg-gray-800'}`}>
        <div ref={puzzleRef} id="puzzle-container" className="w-full flex justify-center" />
      </div>
    </div>
  );
};
