import { CloudService, ServiceCategory, CloudProvider } from './types';
import pricingData from '../data/cloudPricing.json';

// Current USD to INR rate from the JSON file
export const USD_TO_INR = pricingData.exchangeRate.usdToInr;

// Convert the JSON data to our CloudService interface
export const cloudServices: CloudService[] = pricingData.services.map(service => ({
  ...service,
  category: service.category as ServiceCategory,
  provider: service.provider as CloudProvider,
  pricing: {
    usd: service.pricing.usd,
    inr: service.pricing.usd * USD_TO_INR,
    unit: service.pricing.unit,
    billingType: service.pricing.billingType as 'hourly' | 'monthly' | 'yearly' | 'per-request' | 'per-gb'
  }
}));

export const serviceCategories: { value: ServiceCategory; label: string; icon: string }[] = [
  { value: 'compute', label: 'Compute', icon: '🖥️' },
  { value: 'storage', label: 'Storage', icon: '💾' },
  { value: 'database', label: 'Database', icon: '🗃️' },
  { value: 'networking', label: 'Networking', icon: '🌐' },
  { value: 'ai-ml', label: 'AI/ML', icon: '🤖' },
  { value: 'analytics', label: 'Analytics', icon: '📊' },
  { value: 'security', label: 'Security', icon: '🔒' },
  { value: 'containers', label: 'Containers', icon: '📦' }
];

export const cloudProviders = [
  { value: 'aws', label: 'Amazon AWS', color: 'aws' },
  { value: 'azure', label: 'Microsoft Azure', color: 'azure' },
  { value: 'gcp', label: 'Google Cloud', color: 'gcp' }
];

// Helper functions for data analysis
export const getServicesByCategory = (category: ServiceCategory) => 
  cloudServices.filter(service => service.category === category);

export const getServicesByProvider = (provider: string) => 
  cloudServices.filter(service => service.provider === provider);

export const getCheapestService = () => 
  cloudServices.reduce((cheapest, service) => 
    service.pricing.inr < cheapest.pricing.inr ? service : cheapest
  );

export const getMostExpensiveService = () => 
  cloudServices.reduce((expensive, service) => 
    service.pricing.inr > expensive.pricing.inr ? service : expensive
  );

export const getAveragePriceByProvider = () => {
  const providers = ['aws', 'azure', 'gcp'];
  return providers.map(provider => {
    const services = getServicesByProvider(provider);
    const avgPrice = services.reduce((sum, service) => sum + service.pricing.inr, 0) / services.length;
    return {
      provider,
      avgPrice: avgPrice || 0,
      serviceCount: services.length
    };
  });
};

export const getPricingStats = () => {
  const prices = cloudServices.map(service => service.pricing.inr);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    avg: prices.reduce((sum, price) => sum + price, 0) / prices.length,
    median: prices.sort((a, b) => a - b)[Math.floor(prices.length / 2)]
  };
};