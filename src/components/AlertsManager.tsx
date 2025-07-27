import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UsageAlert } from '@/lib/types';
import { Bell, Plus, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AlertsManager = () => {
  const [alerts, setAlerts] = useState<UsageAlert[]>([
    {
      id: '1',
      name: 'Monthly Budget Alert',
      threshold: 10000,
      currentUsage: 7500,
      isActive: true,
      currency: 'inr'
    },
    {
      id: '2',
      name: 'Compute Costs Warning',
      threshold: 5000,
      currentUsage: 5200,
      isActive: true,
      currency: 'inr'
    },
    {
      id: '3',
      name: 'Storage Cost Monitor',
      threshold: 2000,
      currentUsage: 1200,
      isActive: false,
      currency: 'inr'
    }
  ]);
  
  const [newAlert, setNewAlert] = useState({
    name: '',
    threshold: '',
    currency: 'inr' as 'usd' | 'inr'
  });
  
  const { toast } = useToast();

  const addAlert = () => {
    if (!newAlert.name || !newAlert.threshold) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const alert: UsageAlert = {
      id: Date.now().toString(),
      name: newAlert.name,
      threshold: Number(newAlert.threshold),
      currentUsage: 0,
      isActive: true,
      currency: newAlert.currency
    };

    setAlerts([...alerts, alert]);
    setNewAlert({ name: '', threshold: '', currency: 'inr' });
    
    toast({
      title: "Alert Created",
      description: `${alert.name} alert has been created`,
    });
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast({
      title: "Alert Deleted",
      description: "Alert has been removed",
    });
  };

  const getAlertStatus = (alert: UsageAlert) => {
    const percentage = (alert.currentUsage / alert.threshold) * 100;
    if (percentage >= 100) return { status: 'critical', color: 'destructive' };
    if (percentage >= 80) return { status: 'warning', color: 'warning' };
    return { status: 'ok', color: 'success' };
  };

  const criticalAlerts = alerts.filter(alert => 
    alert.isActive && (alert.currentUsage / alert.threshold) >= 1
  );

  const warningAlerts = alerts.filter(alert => 
    alert.isActive && (alert.currentUsage / alert.threshold) >= 0.8 && (alert.currentUsage / alert.threshold) < 1
  );

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">
              {criticalAlerts.length}
            </div>
            <p className="text-sm text-muted-foreground">
              Budget exceeded
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5 text-warning" />
              Warning Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">
              {warningAlerts.length}
            </div>
            <p className="text-sm text-muted-foreground">
              80%+ of budget used
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">
              {alerts.filter(a => a.isActive).length}
            </div>
            <p className="text-sm text-muted-foreground">
              Monitoring your costs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Create New Alert */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Alert
          </CardTitle>
          <CardDescription>
            Set up budget alerts to monitor your cloud spending
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Alert Name</label>
              <Input
                placeholder="e.g., Monthly Budget Alert"
                value={newAlert.name}
                onChange={(e) => setNewAlert({ ...newAlert, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Threshold Amount</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={newAlert.threshold}
                onChange={(e) => setNewAlert({ ...newAlert, threshold: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Currency</label>
              <Select
                value={newAlert.currency}
                onValueChange={(value: 'usd' | 'inr') => 
                  setNewAlert({ ...newAlert, currency: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inr">INR (₹)</SelectItem>
                  <SelectItem value="usd">USD ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Action</label>
              <Button onClick={addAlert} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Management</CardTitle>
          <CardDescription>
            Monitor and manage your cost alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Alerts Created</h3>
              <p className="text-muted-foreground">
                Create your first alert to start monitoring costs
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alert Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Current Usage</TableHead>
                    <TableHead>Threshold</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts.map((alert) => {
                    const { status, color } = getAlertStatus(alert);
                    const percentage = Math.min((alert.currentUsage / alert.threshold) * 100, 100);
                    
                    return (
                      <TableRow key={alert.id}>
                        <TableCell className="font-medium">
                          {alert.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant={color === 'success' ? 'default' : 'destructive'}>
                            {status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono">
                          {alert.currency === 'inr' ? '₹' : '$'}{alert.currentUsage.toLocaleString()}
                        </TableCell>
                        <TableCell className="font-mono">
                          {alert.currency === 'inr' ? '₹' : '$'}{alert.threshold.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted rounded-full h-2">
                              <div 
                                className={`bg-${color} h-2 rounded-full transition-all`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {percentage.toFixed(0)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={alert.isActive}
                            onCheckedChange={() => toggleAlert(alert.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteAlert(alert.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};