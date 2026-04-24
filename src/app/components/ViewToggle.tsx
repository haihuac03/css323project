import { Monitor, Smartphone } from 'lucide-react';

interface ViewToggleProps {
  view: 'desktop' | 'mobile';
  onToggle: (view: 'desktop' | 'mobile') => void;
}

export function ViewToggle({ view, onToggle }: ViewToggleProps) {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-full shadow-2xl border border-gray-200 p-2 flex gap-2">
        <button
          onClick={() => onToggle('desktop')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
            view === 'desktop'
              ? 'bg-[#1F3C88] text-white shadow-lg'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Monitor size={18} />
          <span>Professor Portal</span>
        </button>
        <button
          onClick={() => onToggle('mobile')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
            view === 'mobile'
              ? 'bg-[#1F3C88] text-white shadow-lg'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Smartphone size={18} />
          <span>Student App</span>
        </button>
      </div>
    </div>
  );
}
