'use client';

import { useEffect, useState } from 'react';
import { 
  Users, 
  ArrowRightLeft, 
  Server,
  Coins,
  UserCheck,
  LineChart as ChartIcon
} from 'lucide-react';

import { PageContainer } from '@/components/layout/page-container';
import { Header } from '@/components/dashboard/header';
import { Footer } from '@/components/dashboard/footer';
import { MetricCard } from '@/components/dashboard/metric-card';
import { ChartContainer } from '@/components/charts/chart-container';

import { useDashboardData } from '@/lib/hooks';
import { 
  formatNumber, 
  formatStake, 
  generateChartLabels, 
  calculatePercentageChange,
  chartColors 
} from '@/lib/utils';
import { Period } from '@/types';

export default function Home() {
  // Fetch dashboard data
  const { data, isLoading, period, setPeriod } = useDashboardData('7d');
  
  // Chart data state
  const [transactionChartData, setTransactionChartData] = useState({
    labels: [],
    datasets: []
  });
  
  const [addressChartData, setAddressChartData] = useState({
    labels: [],
    datasets: []
  });
  
  // Process data when it's available
  useEffect(() => {
    if (data && !isLoading) {
      // Process chart data
      const { faucet, synx } = data;
      
      // Make sure data exists and has trends
      if (
        faucet?.active_addresses?.trend?.[period] &&
        faucet?.transactions?.trend?.[period] &&
        synx?.active_addresses?.trend?.[period] &&
        synx?.transactions?.trend?.[period]
      ) {
        // Generate labels
        const labels = generateChartLabels(faucet.active_addresses.trend[period]);
        
        // Extract data for charts
        const faucetAddressData = faucet.active_addresses.trend[period].map(item => item.count);
        const faucetTxData = faucet.transactions.trend[period].map(item => item.count);
        const synxAddressData = synx.active_addresses.trend[period].map(item => item.count);
        const synxTxData = synx.transactions.trend[period].map(item => item.count);
        
        // Set transactions chart data
        setTransactionChartData({
          labels,
          datasets: [
            {
              label: 'Faucet Transactions',
              data: faucetTxData,
              borderColor: chartColors.faucetTransactions.border,
              backgroundColor: chartColors.faucetTransactions.background,
              fill: true
            },
            {
              label: 'Synx Transactions',
              data: synxTxData,
              borderColor: chartColors.synxTransactions.border,
              backgroundColor: chartColors.synxTransactions.background,
              fill: true
            }
          ]
        });
        
        // Set addresses chart data
        setAddressChartData({
          labels,
          datasets: [
            {
              label: 'Faucet Active Addresses',
              data: faucetAddressData,
              borderColor: chartColors.faucetAddresses.border,
              backgroundColor: chartColors.faucetAddresses.background,
              fill: true
            },
            {
              label: 'Synx Active Addresses',
              data: synxAddressData,
              borderColor: chartColors.synxAddresses.border,
              backgroundColor: chartColors.synxAddresses.background,
              fill: true
            }
          ]
        });
      }
    }
  }, [data, isLoading, period]);
  
  // Handle period change
  const handlePeriodChange = (newPeriod: Period) => {
    setPeriod(newPeriod);
  };
  
  // Calculate percentage changes (mock values for now)
  const faucetAddressChange = data ? calculatePercentageChange(
    data.faucet.active_addresses.period_count, 
    data.faucet.active_addresses.period_count * 0.94 // Simulated previous value
  ) : 0;
  
  const synxAddressChange = data ? calculatePercentageChange(
    data.synx.active_addresses.period_count, 
    data.synx.active_addresses.period_count * 0.97 // Simulated previous value
  ) : 0;
  
  const faucetTxChange = data ? calculatePercentageChange(
    data.faucet.transactions.period_count, 
    data.faucet.transactions.period_count * 0.91 // Simulated previous value
  ) : 0;
  
  const synxTxChange = data ? calculatePercentageChange(
    data.synx.transactions.period_count, 
    data.synx.transactions.period_count * 0.93 // Simulated previous value
  ) : 0;
  
  return (
    <PageContainer>
      <Header 
        currentPeriod={period} 
        onPeriodChange={handlePeriodChange} 
        isLoading={isLoading}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Active Addresses (Faucet)"
          value={data ? formatNumber(data.faucet.active_addresses.total) : '0'}
          change={faucetAddressChange}
          icon={<Users className="w-5 h-5 text-primary-light" />}
          chartData={data?.faucet.active_addresses.trend[period]?.slice(-20).map(item => item.count)}
          isLoading={isLoading}
        />
        
        <MetricCard
          title="Active Addresses (Synx)"
          value={data ? formatNumber(data.synx.active_addresses.total) : '0'}
          change={synxAddressChange}
          icon={<Users className="w-5 h-5 text-warning" />}
          chartData={data?.synx.active_addresses.trend[period]?.slice(-20).map(item => item.count)}
          isLoading={isLoading}
        />
        
        <MetricCard
          title="Transactions (Faucet)"
          value={data ? formatNumber(data.faucet.transactions.total) : '0'}
          change={faucetTxChange}
          icon={<ArrowRightLeft className="w-5 h-5 text-primary-light" />}
          chartData={data?.faucet.transactions.trend[period]?.slice(-20).map(item => item.count)}
          isLoading={isLoading}
        />
        
        <MetricCard
          title="Transactions (Synx)"
          value={data ? formatNumber(data.synx.transactions.total) : '0'}
          change={synxTxChange}
          icon={<ArrowRightLeft className="w-5 h-5 text-success" />}
          chartData={data?.synx.transactions.trend[period]?.slice(-20).map(item => item.count)}
          isLoading={isLoading}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartContainer
          title="Transaction Activity Over Time"
          icon={<ChartIcon className="w-5 h-5 text-primary-light mr-2" />}
          data={transactionChartData}
          isLoading={isLoading}
        />
        
        <ChartContainer
          title="Active Address Trend"
          icon={<ChartIcon className="w-5 h-5 text-warning mr-2" />}
          data={addressChartData}
          isLoading={isLoading}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Nodes"
          value={data ? formatNumber(data.nodes.total_nodes) : '0'}
          icon={<Server className="w-5 h-5 text-primary-light" />}
          isLoading={isLoading}
        />
        
        <MetricCard
          title="Total Stake"
          value={data ? formatStake(data.nodes.total_stake) : '0'}
          change={2.1} // Mock percentage change
          icon={<Coins className="w-5 h-5 text-warning" />}
          isLoading={isLoading}
        />
        
        <MetricCard
          title="Total Delegators"
          value={data ? formatNumber(data.nodes.total_delegators) : '0'}
          change={4.7} // Mock percentage change
          icon={<UserCheck className="w-5 h-5 text-success" />}
          isLoading={isLoading}
        />
      </div>
      
      <Footer />
    </PageContainer>
  );
}
