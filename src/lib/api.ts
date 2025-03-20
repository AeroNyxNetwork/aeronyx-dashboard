import { ApiResponse, NodesResponse, Period } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.aeronyx.network';

/**
 * Fetch faucet statistics
 */
export async function fetchFaucetStats(period: Period): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/stats/faucet/?format=json&period=${period}`, {
    next: { revalidate: 60 }, // Cache for 60 seconds
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch faucet stats: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Fetch synx statistics
 */
export async function fetchSynxStats(period: Period): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/stats/synx/?format=json&period=${period}`, {
    next: { revalidate: 60 }, // Cache for 60 seconds
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch synx stats: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Fetch nodes statistics
 */
export async function fetchNodesStats(period: Period): Promise<NodesResponse> {
  const response = await fetch(`${API_BASE_URL}/api/stats/nodes/?period=${period}`, {
    next: { revalidate: 60 }, // Cache for 60 seconds
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch nodes stats: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Fetch all dashboard data
 */
export async function fetchDashboardData(period: Period) {
  try {
    const [faucetData, synxData, nodesData] = await Promise.all([
      fetchFaucetStats(period),
      fetchSynxStats(period),
      fetchNodesStats(period),
    ]);
    
    return {
      faucet: faucetData,
      synx: synxData,
      nodes: nodesData,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
}
