import { Period } from "@/types";
import { PeriodToggle } from "./period-toggle";

interface HeaderProps {
  currentPeriod: Period;
  onPeriodChange: (period: Period) => void;
  isLoading?: boolean;
}

export function Header({ currentPeriod, onPeriodChange, isLoading }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center py-5 px-1 border-b border-border mb-8">
      <div className="logo flex items-center gap-4 mb-4 sm:mb-0">
        <div className="flex items-center gap-4">
          <a 
            href="https://aeronyx.network/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center hover:opacity-80 transition-opacity"
            aria-label="Visit AeroNyx Website"
          >
            <svg className="h-9 w-9" viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0,512) scale(0.1,-0.1)">
                <path
                  d="M1277 3833 l-1277 -1278 0 -1275 0 -1275 1280 1280 1280 1280 -2 1273 -3 1272 -1278 -1277z"
                  fill="#7a14f5"
                />
                <path
                  d="M3838 3833 l-1278 -1278 0 -1275 0 -1275 1280 1280 1280 1280 -2 1273 -3 1272 -1277 -1277z"
                  fill="#9747ff"
                />
              </g>
            </svg>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">
              AeroNyx
            </h1>
          </a>
        </div>
        
        <div className="flex items-center text-xs text-foreground-muted">
          <span>on</span>
          <a 
            href="https://soo.network/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            aria-label="Visit SOON Network Website"
          >
            <img src="https://binary.aeronyx.network/soon-logo.svg" alt="SOON Blockchain" className="h-4 ml-2" />
          </a>
        </div>
      </div>
      
      <PeriodToggle 
        currentPeriod={currentPeriod} 
        onPeriodChange={onPeriodChange}
        isLoading={isLoading}
      />
    </header>
  );
}
