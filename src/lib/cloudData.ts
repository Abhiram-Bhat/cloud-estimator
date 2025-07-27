import { CloudService, ServiceCategory } from './types';

// Current USD to INR rate (you'd fetch this from an API in production)
export const USD_TO_INR = 83.15;

export const cloudServices: CloudService[] = [
  // AWS Compute Services
  {
    id: 'aws-ec2-t3-micro',
    name: 'EC2 t3.micro',
    category: 'compute',
    provider: 'aws',
    pricing: {
      usd: 0.0104,
      inr: 0.0104 * USD_TO_INR,
      unit: 'hour',
      billingType: 'hourly'
    },
    description: 'General purpose burstable performance instance',
    specifications: {
      'vCPUs': '2',
      'Memory': '1 GiB',
      'Network': 'Up to 5 Gigabit',
      'Storage': 'EBS Only'
    },
    region: 'us-east-1'
  },
  {
    id: 'aws-ec2-m5-large',
    name: 'EC2 m5.large',
    category: 'compute',
    provider: 'aws',
    pricing: {
      usd: 0.096,
      inr: 0.096 * USD_TO_INR,
      unit: 'hour',
      billingType: 'hourly'
    },
    description: 'General purpose compute optimized instance',
    specifications: {
      'vCPUs': '2',
      'Memory': '8 GiB',
      'Network': 'Up to 10 Gigabit',
      'Storage': 'EBS Only'
    },
    region: 'us-east-1'
  },
  
  // Azure Compute Services
  {
    id: 'azure-vm-b1s',
    name: 'Virtual Machine B1s',
    category: 'compute',
    provider: 'azure',
    pricing: {
      usd: 0.0104,
      inr: 0.0104 * USD_TO_INR,
      unit: 'hour',
      billingType: 'hourly'
    },
    description: 'Burstable performance virtual machine',
    specifications: {
      'vCPUs': '1',
      'Memory': '1 GiB',
      'Storage': '4 GiB temp storage',
      'Network': 'Moderate'
    },
    region: 'east-us'
  },
  {
    id: 'azure-vm-d2s-v3',
    name: 'Virtual Machine D2s v3',
    category: 'compute',
    provider: 'azure',
    pricing: {
      usd: 0.096,
      inr: 0.096 * USD_TO_INR,
      unit: 'hour',
      billingType: 'hourly'
    },
    description: 'General purpose virtual machine',
    specifications: {
      'vCPUs': '2',
      'Memory': '8 GiB',
      'Storage': '16 GiB temp storage',
      'Network': 'Moderate'
    },
    region: 'east-us'
  },

  // GCP Compute Services
  {
    id: 'gcp-e2-micro',
    name: 'Compute Engine e2-micro',
    category: 'compute',
    provider: 'gcp',
    pricing: {
      usd: 0.008468,
      inr: 0.008468 * USD_TO_INR,
      unit: 'hour',
      billingType: 'hourly'
    },
    description: 'Cost-optimized machine type',
    specifications: {
      'vCPUs': '0.25-2 (shared)',
      'Memory': '1 GB',
      'Network': '1 Gbps',
      'Storage': 'Persistent disk'
    },
    region: 'us-central1'
  },
  {
    id: 'gcp-n1-standard-1',
    name: 'Compute Engine n1-standard-1',
    category: 'compute',
    provider: 'gcp',
    pricing: {
      usd: 0.0475,
      inr: 0.0475 * USD_TO_INR,
      unit: 'hour',
      billingType: 'hourly'
    },
    description: 'Standard machine type with balanced CPU and memory',
    specifications: {
      'vCPUs': '1',
      'Memory': '3.75 GB',
      'Network': '2 Gbps',
      'Storage': 'Persistent disk'
    },
    region: 'us-central1'
  },

  // Storage Services
  {
    id: 'aws-s3-standard',
    name: 'S3 Standard',
    category: 'storage',
    provider: 'aws',
    pricing: {
      usd: 0.023,
      inr: 0.023 * USD_TO_INR,
      unit: 'GB/month',
      billingType: 'monthly'
    },
    description: 'General purpose object storage',
    specifications: {
      'Durability': '99.999999999%',
      'Availability': '99.99%',
      'Min Storage Duration': 'None',
      'Retrieval Fee': 'None'
    },
    region: 'us-east-1'
  },
  {
    id: 'azure-blob-hot',
    name: 'Blob Storage Hot',
    category: 'storage',
    provider: 'azure',
    pricing: {
      usd: 0.0184,
      inr: 0.0184 * USD_TO_INR,
      unit: 'GB/month',
      billingType: 'monthly'
    },
    description: 'Frequently accessed data storage',
    specifications: {
      'Durability': '99.999999999%',
      'Availability': '99.9%',
      'Min Storage Duration': 'None',
      'Retrieval Fee': 'None'
    },
    region: 'east-us'
  },
  {
    id: 'gcp-standard-storage',
    name: 'Cloud Storage Standard',
    category: 'storage',
    provider: 'gcp',
    pricing: {
      usd: 0.020,
      inr: 0.020 * USD_TO_INR,
      unit: 'GB/month',
      billingType: 'monthly'
    },
    description: 'Standard object storage',
    specifications: {
      'Durability': '99.999999999%',
      'Availability': '99.95%',
      'Min Storage Duration': 'None',
      'Retrieval Fee': 'None'
    },
    region: 'us-central1'
  },

  // Database Services
  {
    id: 'aws-rds-mysql-t3-micro',
    name: 'RDS MySQL t3.micro',
    category: 'database',
    provider: 'aws',
    pricing: {
      usd: 0.017,
      inr: 0.017 * USD_TO_INR,
      unit: 'hour',
      billingType: 'hourly'
    },
    description: 'Managed MySQL database',
    specifications: {
      'Engine': 'MySQL 8.0',
      'vCPUs': '2',
      'Memory': '1 GiB',
      'Storage': '20-65536 GiB'
    },
    region: 'us-east-1'
  },
  {
    id: 'azure-sql-basic',
    name: 'Azure SQL Database Basic',
    category: 'database',
    provider: 'azure',
    pricing: {
      usd: 4.95,
      inr: 4.95 * USD_TO_INR,
      unit: 'month',
      billingType: 'monthly'
    },
    description: 'Basic tier managed SQL database',
    specifications: {
      'Engine': 'SQL Server',
      'DTU': '5',
      'Storage': '2 GB',
      'Backup Retention': '7 days'
    },
    region: 'east-us'
  },
  {
    id: 'gcp-cloud-sql-mysql',
    name: 'Cloud SQL MySQL db-f1-micro',
    category: 'database',
    provider: 'gcp',
    pricing: {
      usd: 0.0150,
      inr: 0.0150 * USD_TO_INR,
      unit: 'hour',
      billingType: 'hourly'
    },
    description: 'Managed MySQL database service',
    specifications: {
      'Engine': 'MySQL 8.0',
      'vCPU': '0.6 (shared)',
      'Memory': '0.6 GB',
      'Storage': 'Up to 3TB'
    },
    region: 'us-central1'
  }
];

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