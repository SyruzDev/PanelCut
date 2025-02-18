import React, { useState } from 'react';
import { MaterialForm } from './components/MaterialForm';
import { CabinetForm } from './components/CabinetForm';
import { CutOptimizationLayout } from './components/CutOptimizationLayout';
import { StepIndicator } from './components/StepIndicator';
import { NavigationButtons } from './components/NavigationButtons';
import type { Material, Cabinet, Step } from './types';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('material');
  const [material, setMaterial] = useState<Material>({
    type: 'mdf',
    thickness: 18,
    width: 2440,
    height: 1220,
    kerf: 3,
  });
  const [cabinet, setCabinet] = useState<Cabinet>({
    height: 720,
    width: 600,
    depth: 580,
    divisions: 1,
    drawerSpacing: 100,
    assemblyType: 'frameless',
    doorStyle: 'full-overlay',
    quantity: 1,
  });

  const handleNext = () => {
    const steps: Step[] = ['material', 'cabinet', 'visualization', 'export'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: Step[] = ['material', 'cabinet', 'visualization', 'export'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const canProgress = () => {
    switch (currentStep) {
      case 'material':
        return material.thickness > 0 && material.width > 0 && material.height > 0 && material.kerf > 0;
      case 'cabinet':
        return cabinet.height > 0 && cabinet.width > 0 && cabinet.depth > 0 && cabinet.quantity > 0;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-[#051829] text-white p-6">
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">Panel Cut Optimizer</h1>
        <p className="text-gray-400 mt-2">
          Optimize your carpentry panel cuts with precision and efficiency
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        <StepIndicator currentStep={currentStep} />
        
        <div className="space-y-8">
          {currentStep === 'material' && (
            <MaterialForm 
              material={material}
              onMaterialChange={setMaterial}
            />
          )}
          {currentStep === 'cabinet' && (
            <CabinetForm
              cabinet={cabinet}
              onCabinetChange={setCabinet}
            />
          )}
          {currentStep === 'visualization' && (
            <CutOptimizationLayout
              cabinet={cabinet}
              material={material}
              cabinetNumber={1}
            />
          )}
        </div>

        <NavigationButtons
          currentStep={currentStep}
          onNext={handleNext}
          onBack={handleBack}
          canProgress={canProgress()}
        />
      </main>
    </div>
  );
}

export default App;