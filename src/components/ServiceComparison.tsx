import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cloudServices, serviceCategories, cloudProviders } from '@/lib/cloudData';
import { CloudProvider, ServiceCategory, ComparisonFilter } from '@/lib/types';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

export const ServiceComparison = () => {
  const [filters, setFilters] = useState<ComparisonFilter>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'provider'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredServices = cloudServices
    .filter(service => {
      if (filters.category && service.category !== filters.category) return false;
      if (filters.provider && !filters.provider.includes(service.provider)) return false;
      if (filters.maxPrice && service.pricing.inr > filters.maxPrice) return false;
      if (searchTerm && !service.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.pricing.inr - b.pricing.inr;
          break;
        case 'provider':
          comparison = a.provider.localeCompare(b.provider);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleProviderFilter = (provider: CloudProvider) => {
    const currentProviders = filters.provider || [];
    const newProviders = currentProviders.includes(provider)
      ? currentProviders.filter(p => p !== provider)
      : [...currentProviders, provider];
    
    setFilters({ ...filters, provider: newProviders.length ? newProviders : undefined });
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const toggleSort = (field: 'name' | 'price' | 'provider') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
          <CardDescription>
            Filter and compare cloud services across providers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Services</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={filters.category || ''}
                onValueChange={(value) => 
                  setFilters({ ...filters, category: value as ServiceCategory || undefined })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All categories</SelectItem>
                  {serviceCategories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Price (INR)</label>
              <Input
                type="number"
                placeholder="Enter max price"
                value={filters.maxPrice || ''}
                onChange={(e) => 
                  setFilters({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })
                }
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Actions</label>
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
          
          {/* Provider Filter Badges */}
          <div className="mt-4">
            <label className="text-sm font-medium mb-2 block">Cloud Providers</label>
            <div className="flex gap-2 flex-wrap">
              {cloudProviders.map(provider => (
                <Badge
                  key={provider.value}
                  variant={filters.provider?.includes(provider.value as CloudProvider) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleProviderFilter(provider.value as CloudProvider)}
                >
                  {provider.label}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle>Service Comparison ({filteredServices.length} services)</CardTitle>
          <CardDescription>
            Compare pricing and specifications across cloud providers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleSort('name')}
                      className="font-medium p-0 h-auto"
                    >
                      Service Name <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleSort('provider')}
                      className="font-medium p-0 h-auto"
                    >
                      Provider <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleSort('price')}
                      className="font-medium p-0 h-auto"
                    >
                      Price (INR) <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>Price (USD)</TableHead>
                  <TableHead>Billing</TableHead>
                  <TableHead>Region</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map(service => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{service.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {service.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={`bg-${service.provider} text-${service.provider}-foreground border-${service.provider}`}
                      >
                        {service.provider.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        {service.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono font-bold text-success">
                      ₹{service.pricing.inr.toFixed(3)}
                    </TableCell>
                    <TableCell className="font-mono text-muted-foreground">
                      ${service.pricing.usd.toFixed(3)}
                    </TableCell>
                    <TableCell className="text-sm">
                      {service.pricing.billingType} / {service.pricing.unit}
                    </TableCell>
                    <TableCell className="text-sm">
                      {service.region}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};