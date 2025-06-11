import { type SystemPrompt } from '@/types';
import { DocumentTextIcon, ListBulletIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SystemPromptEditorProps {
  systemPrompt: SystemPrompt;
  onUpdate: (prompt: SystemPrompt) => void;
}

export function SystemPromptEditor({ systemPrompt, onUpdate }: SystemPromptEditorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <DocumentTextIcon className="w-6 h-6 text-blue-400" />
        <h2 className="text-2xl font-semibold">System Prompt</h2>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
          <DocumentTextIcon className="w-4 h-4" />
          Content
        </label>
        <textarea
          value={systemPrompt.content}
          onChange={(e) => onUpdate({
            ...systemPrompt,
            content: e.target.value
          })}
          className="w-full h-32 px-3 py-2 text-gray-200 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter the system prompt..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
          <ListBulletIcon className="w-4 h-4" />
          Restrictions
        </label>
        <div className="space-y-2">
          {systemPrompt.restrictions.map((restriction, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={restriction}
                onChange={(e) => {
                  const newRestrictions = [...systemPrompt.restrictions];
                  newRestrictions[index] = e.target.value;
                  onUpdate({
                    ...systemPrompt,
                    restrictions: newRestrictions
                  });
                }}
                className="flex-1 px-3 py-2 text-gray-200 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                onClick={() => {
                  onUpdate({
                    ...systemPrompt,
                    restrictions: systemPrompt.restrictions.filter((_, i) => i !== index)
                  });
                }}
                className="p-2 text-red-400 hover:text-red-300 transition-colors rounded-lg hover:bg-red-900/20"
                aria-label="Remove restriction"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              onUpdate({
                ...systemPrompt,
                restrictions: [...systemPrompt.restrictions, '']
              });
            }}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Add Restriction
          </button>
        </div>
      </div>
    </div>
  );
} 