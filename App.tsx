import React, { useState, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { Canvas } from './components/Canvas';
import { generateVisualData } from './services/geminiService';
import { VisualData, VisualType } from './types';
import { SAMPLE_TEXT } from './constants';
import { toPng, toSvg, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';

const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [visualType, setVisualType] = useState<VisualType>('mind_map');
  const [visualData, setVisualData] = useState<VisualData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError("Please enter some text to generate a visual.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setVisualData(null);

    try {
      const data = await generateVisualData(text, visualType);
      setVisualData(data);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLoadSample = () => {
    setText(SAMPLE_TEXT);
  };

  const handleExport = useCallback((format: 'png' | 'svg' | 'pdf') => {
    if (!canvasRef.current) return;

    const fileName = `ai-visual-${visualType}.${format}`;

    switch (format) {
      case 'png':
        toPng(canvasRef.current, { cacheBust: true, backgroundColor: '#1f2937' })
          .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = fileName;
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.error('oops, something went wrong!', err);
            setError('Failed to export as PNG.');
          });
        break;
      case 'svg':
        toSvg(canvasRef.current, { cacheBust: true, backgroundColor: '#1f2937' })
          .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = fileName;
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.error('oops, something went wrong!', err);
            setError('Failed to export as SVG.');
          });
        break;
      case 'pdf':
        toJpeg(canvasRef.current, { quality: 0.95, cacheBust: true, backgroundColor: '#1f2937' })
          .then((dataUrl) => {
            const pdf = new jsPDF();
            const imgProps= pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(fileName);
          })
          .catch((err) => {
            console.error('oops, something went wrong!', err);
            setError('Failed to export as PDF.');
          });
        break;
    }
  }, [visualType]);

  return (
    <div className="flex flex-col h-screen font-sans text-gray-200 bg-gray-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Controls
          text={text}
          setText={setText}
          visualType={visualType}
          setVisualType={setVisualType}
          onGenerate={handleGenerate}
          isLoading={isLoading}
          onSample={handleLoadSample}
        />
        <Canvas
          visualType={visualType}
          data={visualData}
          isLoading={isLoading}
          error={error}
          canvasRef={canvasRef}
          onExport={handleExport}
        />
      </div>
    </div>
  );
};

export default App;
