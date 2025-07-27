export interface CloudService {
  id: string;
  name: string;
  category: ServiceCategory;
  provider: CloudProvider;
  pricing: {
    usd: number;
    inr: number;
    unit: string;
    billingType: 'hourly' | 'monthly' | 'yearly' | 'per-request' | 'per-gb';
  };
  description: string;
  specifications: Record<string, string>;
  region: string;
}

export type CloudProvider = 'aws' | 'azure' | 'gcp';

export type ServiceCategory = 
  | 'compute' 
  | 'storage' 
  | 'database' 
  | 'networking' 
  | 'ai-ml' 
  | 'analytics' 
  | 'security' 
  | 'containers';

export interface CostCalculation {
  service: CloudService;
  quantity: number;
  duration: number;
  totalUSD: number;
  totalINR: number;
}

export interface ComparisonFilter {
  category?: ServiceCategory;
  provider?: CloudProvider[];
  maxPrice?: number;
  region?: string;
}

export interface UsageAlert {
  id: string;
  name: string;
  threshold: number;
  currentUsage: number;
  isActive: boolean;
  currency: 'usd' | 'inr';
}