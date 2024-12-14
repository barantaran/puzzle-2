import React, { useEffect, useRef } from 'react';
import { Canvas, painters } from 'headbreaker';

interface PuzzleViewProps {
  imageUrl: string;
  title: string;
  description: string;
  theme: 'light' | 'dark';
  onBack: () => void;
}

export const PuzzleView: React.FC<PuzzleViewProps> = ({ imageUrl, title, description, theme, onBack }) => {
  const isLight = theme === 'light';
  const puzzleRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<Canvas | null>(null);

  useEffect(() => {
    if (!puzzleRef.current) return;

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      if (!puzzleRef.current) return;

      // Calculate piece size to maintain aspect ratio
      const aspectRatio = image.width / image.height;
      const containerWidth = 800;
      const containerHeight = containerWidth / aspectRatio;
      const pieceSize = containerWidth / 3; // 3x3 puzzle

      canvasRef.current = new Canvas(puzzleRef.current.id, {
        width: containerWidth,
        height: containerHeight,
        pieceSize,
        proximity: 20,
        borderFill: 10,
        strokeWidth: 2,
        lineSoftness: 0.18,
        painter: new painters.Konva(),
      });

      canvasRef.current.autogenerate({
        horizontalPiecesCount: 3,
        verticalPiecesCount: 3,
        image: {
          element: image,
          width: containerWidth,
          height: containerHeight,
        },
      });

      canvasRef.current.draw();
      canvasRef.current.shuffle();
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
  }, [imageUrl]);

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

        <div className={`rounded-xl overflow-hidden shadow-xl ${isLight ? 'bg-white' : 'bg-gray-900'} p-4`}>
          <div ref={puzzleRef} id="puzzle-container" className="w-full flex justify-center" />
          <div className="p-4">
            <h2 className={`text-xl font-semibold mb-2 ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>
              {title} Puzzle
            </h2>
            <p className={`${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
