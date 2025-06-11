import { useState } from 'react';
import type { AttackResult } from '@/types';
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  ChatBubbleBottomCenterTextIcon,
  ShieldExclamationIcon,
  ChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';

interface ResultsDisplayProps {
  results: AttackResult[];
}

const RESULTS_PER_PAGE = 5;

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedResult, setExpandedResult] = useState<number | null>(0);
  const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE);

  if (results.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
        <ExclamationTriangleIcon className="w-8 h-8 mx-auto mb-2" />
        No attack attempts yet. Try running a simulation!
      </div>
    );
  }

  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const displayedResults = results.slice(startIndex, startIndex + RESULTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedResult(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ChartBarIcon className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-semibold">Results</h2>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {displayedResults.map((result, index) => {
          const isExpanded = expandedResult === index;
          const actualIndex = startIndex + index;

          return (
            <div key={actualIndex} className="bg-gray-800 rounded-lg overflow-hidden">
              {/* Header - Always visible */}
              <button
                onClick={() => setExpandedResult(isExpanded ? null : index)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <ShieldExclamationIcon className="w-5 h-5 text-blue-400" />
                    <span className="text-lg font-medium">
                      {result.attempt.type.split('_').map(word => 
                        word.charAt(0) + word.slice(1).toLowerCase()
                      ).join(' ')}
                    </span>
                  </div>
                  <span className={`
                    px-3 py-1 text-sm rounded-full flex items-center gap-1
                    ${result.response.succeeded
                      ? 'bg-red-900/50 text-red-400'
                      : 'bg-green-900/50 text-green-400'}
                  `}>
                    {result.response.succeeded ? (
                      <XCircleIcon className="w-4 h-4" />
                    ) : (
                      <CheckCircleIcon className="w-4 h-4" />
                    )}
                    {result.response.succeeded ? 'Attack Succeeded' : 'Attack Failed'}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUpIcon className="w-5 h-5" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5" />
                )}
              </button>

              {/* Expandable Content */}
              {isExpanded && (
                <div className="p-4 border-t border-gray-700">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <ClockIcon className="w-4 h-4" />
                      {new Date(result.timestamp).toLocaleString()}
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-1">
                        <DocumentTextIcon className="w-4 h-4" />
                        Prompt
                      </h4>
                      <pre className="bg-gray-900 rounded p-3 overflow-x-auto text-sm">
                        <code>{result.attempt.prompt}</code>
                      </pre>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-1">
                        <ChatBubbleBottomCenterTextIcon className="w-4 h-4" />
                        Response
                      </h4>
                      <pre className="bg-gray-900 rounded p-3 overflow-x-auto text-sm">
                        <code>{result.response.content}</code>
                      </pre>
                    </div>

                    {result.response.defense_triggered && (
                      <div className="bg-yellow-900/20 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-yellow-400 mb-2 flex items-center gap-1">
                          <ShieldExclamationIcon className="w-4 h-4" />
                          Defense Details
                        </h4>
                        <p className="text-sm text-yellow-400">
                          {result.response.defense_details}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm bg-gray-900/50 rounded-lg p-3">
                      <div className="flex items-center gap-1">
                        <ChartBarIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400">Risk Score:</span>{' '}
                        <span className={`font-medium ${
                          result.attempt.risk_score > 0.7
                            ? 'text-red-400'
                            : result.attempt.risk_score > 0.4
                            ? 'text-yellow-400'
                            : 'text-green-400'
                        }`}>
                          {Math.round(result.attempt.risk_score * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`
              w-8 h-8 rounded-lg flex items-center justify-center text-sm
              ${currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}
            `}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
} 