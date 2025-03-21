import { format } from 'date-fns';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DataPoint, Period } from '@/types';

/**
 * Merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Format timestamp to readable date
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return format(date, 'MMM d');
}

/**
 * Format timestamp to readable time
 */
export function formatTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return format(date, 'HH:mm');
}

/**
 * Format timestamp to readable date and time
 */
export function formatDateTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return format(date, 'MMM d, HH:mm');
}

/**
 * Generate labels for charts based on timestamps
 */
export function generateChartLabels(dataPoints: DataPoint[]): string[] {
  return dataPoints.map((point, index) => {
    if (index % 6 === 0) {
      return formatDate(point.timestamp) + ' ' + formatTime(point.timestamp);
    }
    return formatTime(point.timestamp);
  });
}

/**
 * Calculate percentage change
 */
export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return parseFloat(((current - previous) / previous * 100).toFixed(1));
}

/**
 * Format stake value 
 * @param stake The stake value to format
 * @param decimals Number of decimal places to show (default: 2)
 * @returns Formatted stake value with appropriate suffix (K, M, B, T)
 */
export function formatStake(stake: number, decimals: number = 2): string {
  if (stake === 0) return '0';
  
  // For small numbers, just return the formatted number
  if (stake < 1000) {
    return stake.toFixed(decimals);
  }
  
  const units = ['', 'K', 'M', 'B', 'T'];
  const unitIndex = Math.floor(Math.log10(stake) / 3);
  
  // Don't go beyond available units
  const limitedUnitIndex = Math.min(unitIndex, units.length - 1);
  
  // Calculate the scaled value
  const scaledValue = stake / Math.pow(10, limitedUnitIndex * 3);
  
  // Format the value with the specified number of decimal places
  return scaledValue.toFixed(decimals) + units[limitedUnitIndex];
}

/**
 * Generate chart colors
 */
export const chartColors = {
  faucetAddresses: {
    border: '#9747ff',
    background: 'rgba(151, 71, 255, 0.1)',
  },
  faucetTransactions: {
    border: '#7a14f5',
    background: 'rgba(122, 20, 245, 0.1)',
  },
  synxAddresses: {
    border: '#ff9f47',
    background: 'rgba(255, 159, 71, 0.1)',
  },
  synxTransactions: {
    border: '#00c48c',
    background: 'rgba(0, 196, 140, 0.1)',
  },
};

/**
 * Get readable period name
 */
export function getPeriodName(period: Period): string {
  const periodNames = {
    '1d': 'Day',
    '7d': 'Week',
    '30d': 'Month',
  };
   
  return periodNames[period];
}
