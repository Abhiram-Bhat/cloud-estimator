import { Cloud, Calculator, TrendingUp, Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navbar = ({ activeTab, onTabChange }: NavbarProps) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'compare', label: 'Compare Services', icon: Cloud },
    { id: 'calculator', label: 'Cost Calculator', icon: Calculator },
    { id: 'alerts', label: 'Alerts', icon: Bell },
  ];

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cloud className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              CloudCost Dashboard
            </h1>
          </div>
          
          <nav className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => onTabChange(tab.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline">{tab.label}</span>
                </Button>
              );
            })}
          </nav>

          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};