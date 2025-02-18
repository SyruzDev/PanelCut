import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Step } from '../types';

interface NavigationButtonsProps {
  currentStep: Step;
  onNext: () => void;
  onBack: () => void;
  canProgress: boolean;
}

export function NavigationButtons({ currentStep, onNext, onBack, canProgress }: NavigationButtonsProps) {
  return (
    <div className="flex justify-between mt-8">
      <button
        onClick={onBack}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          currentStep === 'material'
            ? 'opacity-50 cursor-not-allowed bg-gray-700'
            : 'bg-[#1C4A6E] hover:bg-[#2C5A7E]'
        }`}
        disabled={currentStep === 'material'}
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>
      
      <button
        onClick={onNext}
        disabled={!canProgress}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          canProgress
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'opacity-50 cursor-not-allowed bg-gray-700'
        }`}
      >
        {currentStep === 'export' ? 'Finish' : 'Next'}
        {currentStep !== 'export' && <ArrowRight className="w-5 h-5" />}
      </button>
    </div>
  );
}