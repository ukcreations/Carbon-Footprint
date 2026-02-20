'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, FileText, Table, File, Code } from 'lucide-react';
import { DataExporter, ExportData } from '@/lib/export-utils';

interface ExportButtonProps {
  data: ExportData;
  className?: string;
}

export function ExportButton({ data, className }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'json' | 'csv' | 'pdf' | 'xml') => {
    setIsExporting(true);
    try {
      switch (format) {
        case 'json':
          DataExporter.exportToJSON(data);
          break;
        case 'csv':
          DataExporter.exportToCSV(data);
          break;
        case 'pdf':
          DataExporter.exportToPDF(data);
          break;
        case 'xml':
          DataExporter.exportToXML(data);
          break;
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`gap-2 ${className}`}
          disabled={isExporting}
        >
          <Download className="h-4 w-4" />
          {isExporting ? 'Exporting...' : 'Export'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => handleExport('json')} className="gap-2">
          <Code className="h-4 w-4" />
          Export as JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('csv')} className="gap-2">
          <Table className="h-4 w-4" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('pdf')} className="gap-2">
          <FileText className="h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('xml')} className="gap-2">
          <File className="h-4 w-4" />
          Export as XML
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
