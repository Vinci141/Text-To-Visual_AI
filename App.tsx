
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Controls } from './components/Controls';
import { Canvas } from './components/Canvas';
import { Header } from './components/Header';
import { ExportControls } from './components/ExportControls';
import { generateVisualData } from './services/geminiService';
import type { VisualType, StyleConfig, VisualData } from './types';
import { VISUAL_TYPES, PALETTES, FONTS } from './constants';
import { toPng, toSvg } from 'html-to-image';
// @ts-ignore
import { jsPDF } from 'jspdf';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('Project Kick-off Plan:\n1. Discovery Phase: Understand requirements, research market.\n2. Design Phase: Create wireframes, mockups, and prototypes.\n3. Development: Build frontend and backend, integrate APIs.\n4. Testing: Perform unit, integration, and user acceptance testing.\n5. Deployment: Launch the product, monitor performance.');
  const [visualType, setVisualType] = useState<VisualType>(VISUAL_TYPES[0]);
  const [styleConfig, setStyleConfig] = useState<StyleConfig>({
    palette: PALETTES[0],
    font: FONTS[0],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [visualData, setVisualData] = useState<VisualData | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Effect to embed Google Fonts to prevent CORS issues with html-to-image
  useEffect(() => {
    const fontUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lexend:wght@400;500;600;700&family=Roboto+Mono:wght@400;500&display=swap';

    const embedFonts = async () => {
      // Prevent adding the style tag multiple times
      if (document.getElementById('google-fonts-embedded')) {
        return;
      }
      try {
        const response = await fetch(fontUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch font CSS');
        }
        const cssText = await response.text();
        
        const styleElement = document.createElement('style');
        styleElement.id = 'google-fonts-embedded';
        styleElement.innerHTML = cssText;
        document.head.appendChild(styleElement);
      } catch (err) {
        console.error("Could not embed fonts for export:", err);
      }
    };

    embedFonts();
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to generate a visual.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setVisualData(null);

    try {
      const data = await generateVisualData(inputText, visualType.id);
      setVisualData(data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText, visualType]);

  const handleExport = useCallback(async (format: 'png' | 'svg' | 'pdf') => {
    if (!canvasRef.current) return;

    const canvasElement = canvasRef.current.querySelector('#visual-output');
    if (!canvasElement) return;
    
    const options = {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: '#111827'
    };

    try {
      if (format === 'png') {
        const dataUrl = await toPng(canvasElement as HTMLElement, options);
        const link = document.createElement('a');
        link.download = `${visualType.label.toLowerCase().replace(' ', '-')}-export.png`;
        link.href = dataUrl;
        link.click();
      } else if (format === 'svg') {
        const dataUrl = await toSvg(canvasElement as HTMLElement, { backgroundColor: '#111827' });
        const link = document.createElement('a');
        link.download = `${visualType.label.toLowerCase().replace(' ', '-')}-export.svg`;
        link.href = dataUrl;
        link.click();
      } else if (format === 'pdf') {
        const dataUrl = await toPng(canvasElement as HTMLElement, options);
        const doc = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [canvasElement.clientWidth, canvasElement.clientHeight]
        });
        doc.addImage(dataUrl, 'PNG', 0, 0, canvasElement.clientWidth, canvasElement.clientHeight);
        doc.save(`${visualType.label.toLowerCase().replace(' ', '-')}-export.pdf`);
      }
    } catch (error) {
      console.error('Export failed:', error);
      setError('Failed to export image. Please try again.');
    }
  }, [visualType]);

  return (
    <div className={`min-h-screen bg-gray-900 text-gray-100 font-sans ${styleConfig.font.className}`}>
      <Header />
      <main className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
        <aside className="w-full lg:w-96 bg-gray-800/50 border-r border-gray-700 p-6 overflow-y-auto shrink-0">
          <Controls
            inputText={inputText}
            setInputText={setInputText}
            visualType={visualType}
            setVisualType={setVisualType}
            styleConfig={styleConfig}
            setStyleConfig={setStyleConfig}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        </aside>
        <div className="flex-1 flex flex-col relative">
          <Canvas
            ref={canvasRef}
            visualData={visualData}
            visualType={visualType.id}
            isLoading={isLoading}
            error={error}
            styleConfig={styleConfig}
          />
          {visualData && !isLoading && <ExportControls onExport={handleExport} />}
        </div>
      </main>
    </div>
  );
};

export default App;