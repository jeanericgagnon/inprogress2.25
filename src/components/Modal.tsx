import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  onClose: () => void;
  onRedirect: () => void;
}

export function Modal({ onClose, onRedirect }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white p-8 rounded-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full mx-4">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold mb-4">We're waiting to tell you</h2>
        <p className="text-gray-600 mb-6">But if you really want to know...</p>
        <button
          onClick={onRedirect}
          className="w-full px-6 py-3 bg-[#FF1493] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300"
        >
          Tell me anyway
        </button>
      </div>
    </div>
  );
}