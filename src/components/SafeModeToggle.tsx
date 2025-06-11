import { ShieldCheckIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';

interface SafeModeToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export function SafeModeToggle({ enabled, onToggle }: SafeModeToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          {enabled ? (
            <ShieldCheckIcon className="w-5 h-5 text-green-400" />
          ) : (
            <ShieldExclamationIcon className="w-5 h-5 text-yellow-400" />
          )}
          <h3 className="text-lg font-medium">Safe Mode</h3>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          Pre-check prompts for potential injection attempts
        </p>
      </div>
      
      <button
        onClick={() => onToggle(!enabled)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
          ${enabled ? 'bg-green-600' : 'bg-gray-600'}
        `}
        aria-checked={enabled}
        role="switch"
      >
        <span className="sr-only">
          {enabled ? 'Disable safe mode' : 'Enable safe mode'}
        </span>
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${enabled ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
} 