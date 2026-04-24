import { User } from 'lucide-react';

interface TopHeaderProps {
  professorName: string;
  facultyName: string;
  onProfileClick: () => void;
}

export function TopHeader({ professorName, facultyName, onProfileClick }: TopHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{professorName}</h2>
        <p className="text-sm text-gray-600">{facultyName}</p>
      </div>
      
      <button
        onClick={onProfileClick}
        className="w-12 h-12 bg-[#1F3C88] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        aria-label="Open profile settings"
      >
        <User className="text-white" size={24} />
      </button>
    </div>
  );
}
