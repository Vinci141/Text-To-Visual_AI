// Implemented the ExportControls component, which was previously empty.
import React from 'react';
import { toPng, toSvg } from 'html-to-image';
import { Download } from 'lucide-react';
import { Button } from './ui/Button';

interface ExportControlsProps {
  targetRef: React.RefObject<HTMLElement>;
}

export const ExportControls: React.FC<ExportControlsProps> = ({ targetRef }) => {
  
  const handleExport = (format: 'png' | 'svg') => {
    if (!targetRef.current) {
      console.error('Export target element not found.');
      return;
    }

    const exporter = format === 'png' ? toPng : toSvg;

    exporter(targetRef.current, { cacheBust: true, backgroundColor: '#111827' })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `visualizer-export.${format}`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Export failed:', err);
      });
  };

  return (
    <div className="absolute top-4 right-4 z-10 flex gap-2">
      <Button variant="secondary" onClick={() => handleExport('png')}>
        <Download size={16} className="mr-2" />
        PNG
      </Button>
      <Button variant="secondary" onClick={() => handleExport('svg')}>
        <Download size={16} className="mr-2" />
        SVG
      </Button>
    </div>
  );
};

export default ExportControls;
