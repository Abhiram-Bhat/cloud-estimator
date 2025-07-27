import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cloudServices, serviceCategories, USD_TO_INR } from '@/lib/cloudData';
import { CostCalculation, CloudService } from '@/lib/types';
import { Calculator, Plus, Trash2, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CostCalculator = () => {
  const [calculations, setCalculations] = useState<CostCalculation[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [duration, setDuration] = useState<number>(1);
  const { toast } = useToast();

  const addCalculation = () => {
    const service = cloudServices.find(s => s.id === selectedService);
    if (!service) {
      toast({
        title: "Error",
        description: "Please select a service",
        variant: "destructive",
      });
      return;
    }

    const calculation: CostCalculation = {
      service,
      quantity,
      duration,
      totalUSD: service.pricing.usd * quantity * duration,
      totalINR: service.pricing.inr * quantity * duration,
    };

    setCalculations([...calculations, calculation]);
    setSelectedService('');
    setQuantity(1);
    setDuration(1);
    
    toast({
      title: "Service Added",
      description: `${service.name} added to cost calculation`,
    });
  };

  const removeCalculation = (index: number) => {
    setCalculations(calculations.filter((_, i) => i !== index));
    toast({
      title: "Service Removed",
      description: "Service removed from calculation",
    });
  };

  const totalUSD = calculations.reduce((sum, calc) => sum + calc.totalUSD, 0);
  const totalINR = calculations.reduce((sum, calc) => sum + calc.totalINR, 0);

  const exportCalculation = () => {
    const csvContent = [
      ['Service', 'Provider', 'Category', 'Quantity', 'Duration', 'Unit Price (INR)', 'Total (INR)'],
      ...calculations.map(calc => [
        calc.service.name,
        calc.service.provider.toUpperCase(),
        calc.service.category,
        calc.quantity.toString(),
        calc.duration.toString(),
        calc.service.pricing.inr.toFixed(2),
        calc.totalINR.toFixed(2)
      ]),
      ['', '', '', '', '', 'Total:', totalINR.toFixed(2)]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cloud-cost-calculation.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: "Cost calculation exported to CSV",
    });
  };

  return (
    <div className="space-y-6">
      {/* Calculator Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Cost Calculator
          </CardTitle>
          <CardDescription>
            Calculate costs for cloud services with real-time INR pricing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2 lg:col-span-2">
              <label className="text-sm font-medium">Select Service</label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map(category => (
                    <div key={category.value}>
                      <div className="px-2 py-1 text-sm font-semibold text-muted-foreground">
                        {category.icon} {category.label}
                      </div>
                      {cloudServices
                        .filter(service => service.category === category.value)
                        .map(service => (
                          <SelectItem key={service.id} value={service.id}>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={`bg-${service.provider}`}>
                                {service.provider.toUpperCase()}
                              </Badge>
                              {service.name}
                              <span className="text-muted-foreground">
                                (₹{service.pricing.inr.toFixed(2)})
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity</label>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="1"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <Input
                type="number"
                min="1"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                placeholder="1"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Action</label>
              <Button 
                onClick={addCalculation} 
                className="w-full"
                disabled={!selectedService}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Summary */}
      {calculations.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Cost (INR)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                ₹{totalINR.toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground">
                ${totalUSD.toFixed(2)} USD
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Services Count</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">
                {calculations.length}
              </div>
              <p className="text-sm text-muted-foreground">
                Services selected
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={exportCalculation}
                variant="outline"
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Calculations Table */}
      {calculations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown</CardTitle>
            <CardDescription>
              Detailed breakdown of your cloud service costs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Unit Price (INR)</TableHead>
                    <TableHead>Total (INR)</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {calculations.map((calc, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {calc.service.name}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={`bg-${calc.service.provider}`}
                        >
                          {calc.service.provider.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">
                          {calc.service.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{calc.quantity}</TableCell>
                      <TableCell>{calc.duration}</TableCell>
                      <TableCell className="font-mono">
                        ₹{calc.service.pricing.inr.toFixed(2)}
                      </TableCell>
                      <TableCell className="font-mono font-bold text-success">
                        ₹{calc.totalINR.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCalculation(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {calculations.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Services Added</h3>
            <p className="text-muted-foreground">
              Select cloud services above to start calculating costs
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};