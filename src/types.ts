export type DocumentType = 'BOLETA' | 'FACTURA' | 'NOTA_CREDITO' | 'NOTA_DEBITO' | 'GUIA_REMISION';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface ClientSearchResult {
  documentNumber: string;
  type: 'DNI' | 'RUC';
  name: string;
  address?: string;
  status?: string; // For RUC: ACTIVO, Habido, etc.
  ubigeo?: string;
}

export interface PricingPlan {
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  features: string[];
  cta: string;
  badge?: string;
  popular?: boolean;
}

export type ApiLanguage = 'curl' | 'nodejs' | 'python' | 'php';
