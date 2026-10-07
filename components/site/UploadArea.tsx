'use client';

import { useState, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { UploadCloud, File as FileIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadAreaProps {
  acceptedFormats: string;
}

export function UploadArea({ acceptedFormats }: UploadAreaProps) {
  const t = useTranslations('ToolPage');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current?.click()}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all sm:p-10 lg:p-14',
        isDragging
          ? 'border-primary bg-primary/5 scale-[1.01]'
          : 'border-border hover:border-primary/40 hover:bg-muted/30'
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={acceptedFormats}
        onChange={handleFileSelect}
        className="hidden"
      />

      {selectedFile ? (
        <>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FileIcon className="h-7 w-7" />
          </div>
          <p className="font-medium text-sm text-foreground sm:text-base break-all max-w-full">
            {selectedFile.name}
          </p>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </>
      ) : (
        <>
          <div
            className={cn(
              'mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform',
              isDragging && 'scale-110'
            )}
          >
            <UploadCloud className="h-7 w-7" />
          </div>
          <p className="text-base font-semibold text-foreground sm:text-lg">
            {t('uploadTitle')}
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
            {t('uploadSubtitle')}
          </p>
          <button
            type="button"
            className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t('browse')}
          </button>
          <p className="mt-4 text-xs text-muted-foreground">
            {t('supportedFormats')}: {acceptedFormats}
          </p>
        </>
      )}
    </div>
  );
}
