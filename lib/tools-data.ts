import {
  FileText,
  FileType,
  Image as ImageIcon,
  FileImage,
  Sheet,
  FileCode,
  Combine,
  Scissors,
  Trash2,
  RotateCw,
  Minimize2,
  ScanText,
  type LucideIcon,
} from 'lucide-react';

export type ToolSlug =
  | 'pdf-to-word'
  | 'word-to-pdf'
  | 'jpg-to-pdf'
  | 'pdf-to-jpg'
  | 'pdf-to-excel'
  | 'pdf-to-text'
  | 'merge-pdf'
  | 'split-pdf'
  | 'delete-pages'
  | 'rotate-pdf'
  | 'compress-pdf'
  | 'arabic-ocr';

export type ToolCategory = 'organize' | 'convert' | 'edit' | 'ocr';

export interface ToolDefinition {
  slug: ToolSlug;
  icon: LucideIcon;
  messageKey: string;
  category: ToolCategory;
  acceptedFormats: string;
  related: ToolSlug[];
}

export const tools: ToolDefinition[] = [
  {
    slug: 'pdf-to-word',
    icon: FileText,
    messageKey: 'pdfToWord',
    category: 'convert',
    acceptedFormats: '.pdf',
    related: ['pdf-to-excel', 'pdf-to-text', 'pdf-to-jpg'],
  },
  {
    slug: 'word-to-pdf',
    icon: FileType,
    messageKey: 'wordToPdf',
    category: 'convert',
    acceptedFormats: '.doc,.docx',
    related: ['jpg-to-pdf', 'merge-pdf', 'compress-pdf'],
  },
  {
    slug: 'jpg-to-pdf',
    icon: ImageIcon,
    messageKey: 'jpgToPdf',
    category: 'convert',
    acceptedFormats: '.jpg,.jpeg,.png',
    related: ['word-to-pdf', 'merge-pdf', 'compress-pdf'],
  },
  {
    slug: 'pdf-to-jpg',
    icon: FileImage,
    messageKey: 'pdfToJpg',
    category: 'convert',
    acceptedFormats: '.pdf',
    related: ['pdf-to-word', 'pdf-to-text', 'compress-pdf'],
  },
  {
    slug: 'pdf-to-excel',
    icon: Sheet,
    messageKey: 'pdfToExcel',
    category: 'convert',
    acceptedFormats: '.pdf',
    related: ['pdf-to-word', 'pdf-to-text', 'pdf-to-jpg'],
  },
  {
    slug: 'pdf-to-text',
    icon: FileCode,
    messageKey: 'pdfToText',
    category: 'convert',
    acceptedFormats: '.pdf',
    related: ['pdf-to-word', 'pdf-to-excel', 'arabic-ocr'],
  },
  {
    slug: 'merge-pdf',
    icon: Combine,
    messageKey: 'mergePdf',
    category: 'organize',
    acceptedFormats: '.pdf',
    related: ['split-pdf', 'rotate-pdf', 'compress-pdf'],
  },
  {
    slug: 'split-pdf',
    icon: Scissors,
    messageKey: 'splitPdf',
    category: 'organize',
    acceptedFormats: '.pdf',
    related: ['merge-pdf', 'delete-pages', 'rotate-pdf'],
  },
  {
    slug: 'delete-pages',
    icon: Trash2,
    messageKey: 'deletePages',
    category: 'edit',
    acceptedFormats: '.pdf',
    related: ['split-pdf', 'rotate-pdf', 'merge-pdf'],
  },
  {
    slug: 'rotate-pdf',
    icon: RotateCw,
    messageKey: 'rotatePdf',
    category: 'edit',
    acceptedFormats: '.pdf',
    related: ['merge-pdf', 'split-pdf', 'delete-pages'],
  },
  {
    slug: 'compress-pdf',
    icon: Minimize2,
    messageKey: 'compressPdf',
    category: 'edit',
    acceptedFormats: '.pdf',
    related: ['merge-pdf', 'jpg-to-pdf', 'word-to-pdf'],
  },
  {
    slug: 'arabic-ocr',
    icon: ScanText,
    messageKey: 'arabicOcr',
    category: 'ocr',
    acceptedFormats: '.pdf,.jpg,.jpeg,.png',
    related: ['pdf-to-text', 'pdf-to-word', 'pdf-to-excel'],
  },
];

export const toolsBySlug = (slug: string): ToolDefinition | undefined =>
  tools.find((t) => t.slug === slug);

export const getRelatedTools = (slug: ToolSlug): ToolDefinition[] => {
  const tool = toolsBySlug(slug);
  if (!tool) return [];
  return tool.related
    .map((s) => toolsBySlug(s))
    .filter((t): t is ToolDefinition => t !== undefined);
};

export const toolsByCategory = (category: ToolCategory): ToolDefinition[] =>
  tools.filter((t) => t.category === category);
