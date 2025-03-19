// Period type
export type Period = '1d' | '7d' | '30d';

// Data point for trends
export interface DataPoint {
  timestamp: number;
  count: number;
}

// Trend data structure
export interface TrendData {
  '1d'?: DataPoint[];
  '7d'?: DataPoint[];
  '30d'?: DataPoint[];
}

// Active addresses data structure
export interface ActiveAddressesData {
  total: number;
  period_count: number;
  trend: TrendData;
}

// Transactions data structure
export interface TransactionsData {
  total: number;
  period_count: number;
  trend: TrendData;
}

// Faucet and Synx API response
export interface ApiResponse {
  active_addresses: ActiveAddressesData;
  transactions: TransactionsData;
}

// Nodes API response
export interface NodesResponse {
  total_nodes: number;
  total_stake: number;
  total_delegators: number;
  trend: TrendData | null;
}

// Metric card props
export interface MetricCardProps {
  title: string;
  value: number | string;
  change?: number;
  icon?: React.ReactNode;
  chartData?: number[];
  isLoading?: boolean;
}

// Period toggle props
export interface PeriodToggleProps {
  currentPeriod: Period;
  onPeriodChange: (period: Period) => void;
  isLoading?: boolean;
}

// Chart data type
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill?: boolean;
  }[];
}
