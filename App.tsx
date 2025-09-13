// Implemented the main App component, which was previously empty.
import React, { useState, useCallback } from 'react';
import { Controls } from './components/Controls';
import { Canvas } from './components/Canvas';
import { Header } from './components/Header';
import { SAMPLE_TEXT } from './constants';
import { VisualType, VisualData } from './types';
import { generateVisualData } from './services/geminiService';

const App: React.FC = () => {
  const [text, setText] = useState<string>(SAMPLE_TEXT);
  const [visualType, setVisualType] = useState<VisualType>('mind_map');
  const [visualData, setVisualData] = useState<VisualData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!text.trim()) {
        setError("Please enter some text to visualize.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setVisualData(null);
    try {
      const data = await generateVisualData(text, visualType);
      setVisualData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [text, visualType]);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col font-sans">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-1/4 min-w-[350px] max-w-[450px] overflow-y-auto">
          <Controls
            text={text}
            setText={setText}
            visualType={visualType}
            setVisualType={setVisualType}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        </aside>
        <main className="flex-1">
          <Canvas
            visualData={visualData}
            visualType={visualType}
            isLoading={isLoading}
            error={error}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
