import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Dashboard } from '@/components/Dashboard';
import { ServiceComparison } from '@/components/ServiceComparison';
import { CostCalculator } from '@/components/CostCalculator';
import { AlertsManager } from '@/components/AlertsManager';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'compare':
        return <ServiceComparison />;
      case 'calculator':
        return <CostCalculator />;
      case 'alerts':
        return <AlertsManager />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>
      <Toaster />
    </div>
  );
};

export default Index;
