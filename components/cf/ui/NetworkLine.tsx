import { Icon } from '@/components/ui/icon';
import { clsx } from 'clsx';

type NetworkStatus = 'success' | 'error';

interface NetworkLineProps {
  status: NetworkStatus;
  width?: number;
}

/**
 * Renders a network line with arrows and an optional 'X' for error status.
 *
 * @param {NetworkStatus} status - The status of the network connection.
 * @param {number} [width=48] - The width of the line.
 * @returns
 */
export const NetworkLine = ({ status, width = 48 }: NetworkLineProps) => {
  const isSuccess = status === 'success';
  const strokeColor = isSuccess ? 'text-blue-500' : 'text-red-500';

  return (
    <div className="relative flex items-center justify-center" style={{ width }}>
      <svg width="100%" height="24" viewBox={`0 0 ${width} 24`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={`M11 12 H ${width - 11}`} className={clsx('stroke-current', strokeColor)} strokeWidth="2" strokeDasharray="0 6" strokeLinecap="round" />
        <path d="M5 12 L10 7" className={clsx('stroke-current', strokeColor)} strokeWidth="2" strokeLinecap="round" />
        <path d="M5 12 L10 17" className={clsx('stroke-current', strokeColor)} strokeWidth="2" strokeLinecap="round" />
        <path d={`M${width - 5} 12 L${width - 10} 7`} className={clsx('stroke-current', strokeColor)} strokeWidth="2" strokeLinecap="round" />
        <path d={`M${width - 5} 12 L${width - 10} 17`} className={clsx('stroke-current', strokeColor)} strokeWidth="2" strokeLinecap="round" />
      </svg>
      {!isSuccess && (
        <Icon
          name="x"
          className="absolute w-4 h-4 text-red-500"
        />
      )}
    </div>
  );
};