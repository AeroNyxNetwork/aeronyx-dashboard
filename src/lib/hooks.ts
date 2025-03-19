import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { fetchDashboardData } from './api';
import { Period } from '@/types';

/**
 * Custom hook for fetching dashboard data with SWR
 */
export function useDashboardData(initialPeriod: Period = '7d') {
  const [period, setPeriod] = useState<Period>(initialPeriod);
  
  // Use SWR for data fetching with caching
  const { data, error, isLoading, mutate } = useSWR(
    `dashboard-${period}`,
    () => fetchDashboardData(period),
    {
      revalidateOnFocus: false,
      refreshInterval: 60000, // Refresh every minute
    }
  );
  
  // Update data when period changes
  useEffect(() => {
    mutate();
  }, [period, mutate]);
  
  return {
    data,
    error,
    isLoading,
    period,
    setPeriod,
    mutate,
  };
}

/**
 * Custom hook for window size
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  return windowSize;
}

/**
 * Custom hook for handling chart resize
 */
export function useChartResize() {
  const { width } = useWindowSize();
  const [maxTicksLimit, setMaxTicksLimit] = useState(10);
  
  useEffect(() => {
    if (width < 640) {
      setMaxTicksLimit(5);
    } else if (width < 1024) {
      setMaxTicksLimit(8);
    } else {
      setMaxTicksLimit(10);
    }
  }, [width]);
  
  return { maxTicksLimit };
}
