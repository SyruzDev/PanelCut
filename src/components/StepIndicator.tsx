import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import type { Step } from '../types';

interface StepIndicatorProps {
  currentStep: Step;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps: { id: Step; label: string }[] = [
    { id: 'material', label: 'Material' },
    { id: 'cabinet', label: 'Cabinet' },
    { id: 'visualization', label: 'Preview' },
    { id: 'export', label: 'Export' },
  ];

  const getStepStatus = (stepId: Step) => {
    const stepOrder = steps.findIndex(s => s.id === stepId);
    const currentStepOrder = steps.findIndex(s => s.id === currentStep);
    return stepOrder < currentStepOrder ? 'completed' : stepOrder === currentStepOrder ? 'current' : 'upcoming';
  };

  return (
    <div className="flex items-center justify-center w-full max-w-3xl mx-auto mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center">
            <div className={`flex flex-col items-center ${
              getStepStatus(step.id) === 'completed' ? 'text-green-500' :
              getStepStatus(step.id) === 'current' ? 'text-blue-500' : 'text-gray-500'
            }`}>
              <div className="flex items-center justify-center w-8 h-8">
                {getStepStatus(step.id) === 'completed' ? (
                  <CheckCircle2 className="w-8 h-8" />
                ) : (
                  <Circle className={`w-8 h-8 ${
                    getStepStatus(step.id) === 'current' ? 'fill-blue-500/20' : ''
                  }`} />
                )}
              </div>
              <span className="text-sm mt-1">{step.label}</span>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className="w-16 h-px bg-gray-600 mx-2" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}