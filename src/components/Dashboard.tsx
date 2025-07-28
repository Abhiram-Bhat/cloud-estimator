import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Cloud } from 'lucide-react';
import { cloudServices, USD_TO_INR } from '@/lib/cloudData';
import { PricingChart } from './PricingChart';

export const Dashboard = () => {
  // Show only basic starter services for realistic first-time user experience
  const basicServices = cloudServices.filter(service => 
    service.name.includes('micro') || 
    service.name.includes('small') || 
    service.name.includes('e2-micro') ||
    service.name.includes('t3.micro') ||
    service.name.includes('B1s')
  );
  
  const totalServices = basicServices.length;
  const avgPriceUSD = basicServices.reduce((acc, service) => acc + service.pricing.usd, 0) / totalServices;
  const avgPriceINR = avgPriceUSD * USD_TO_INR;
  
  const providerCounts = {
    aws: basicServices.filter(s => s.provider === 'aws').length,
    azure: basicServices.filter(s => s.provider === 'azure').length,
    gcp: basicServices.filter(s => s.provider === 'gcp').length,
  };

  const categoryCounts = basicServices.reduce((acc, service) => {
    acc[service.category] = (acc[service.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const lowestPriceService = basicServices.reduce((lowest, service) => 
    service.pricing.usd < lowest.pricing.usd ? service : lowest
  );

  const highestPriceService = basicServices.reduce((highest, service) => 
    service.pricing.usd > highest.pricing.usd ? service : highest
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-card to-card/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Services</CardTitle>
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalServices}</div>
            <p className="text-xs text-muted-foreground">
              Basic tier services
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Price (INR)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{avgPriceINR.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              ${avgPriceUSD.toFixed(3)} USD
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lowest Price</CardTitle>
            <TrendingDown className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              ₹{lowestPriceService.pricing.inr.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {lowestPriceService.name}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Price</CardTitle>
            <TrendingUp className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              ₹{highestPriceService.pricing.inr.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {highestPriceService.name}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analysis */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Price Comparison by Provider</CardTitle>
            <CardDescription>
              Average pricing across different cloud providers (INR)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PricingChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Provider Distribution</CardTitle>
            <CardDescription>
              Number of services tracked per provider
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(providerCounts).map(([provider, count]) => (
                <div key={provider} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="outline" 
                      className={`bg-${provider} text-${provider}-foreground border-${provider}`}
                    >
                      {provider.toUpperCase()}
                    </Badge>
                    <span className="text-sm font-medium">{count} services</span>
                  </div>
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div 
                      className={`bg-${provider} h-2 rounded-full`}
                      style={{ width: `${(count / totalServices) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Service Categories</CardTitle>
          <CardDescription>
            Distribution of services by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <div key={category} className="text-center p-4 border rounded-lg bg-muted/20">
                <div className="text-2xl font-bold text-primary">{count}</div>
                <div className="text-sm text-muted-foreground capitalize">{category}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};