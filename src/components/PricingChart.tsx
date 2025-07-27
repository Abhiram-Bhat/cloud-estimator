import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cloudServices } from '@/lib/cloudData';

export const PricingChart = () => {
  const providerData = ['aws', 'azure', 'gcp'].map(provider => {
    const services = cloudServices.filter(s => s.provider === provider);
    const avgPrice = services.reduce((acc, service) => acc + service.pricing.inr, 0) / services.length;
    
    return {
      provider: provider.toUpperCase(),
      avgPrice: avgPrice.toFixed(2),
      count: services.length
    };
  });

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={providerData}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="provider" 
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            label={{ value: 'Price (INR)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
            formatter={(value, name) => [
              `₹${value}`, 
              'Average Price'
            ]}
          />
          <Bar 
            dataKey="avgPrice" 
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};