import React from 'react';
import { Cabinet } from '../types';
import { Ruler, Box, Layers, DoorOpen, Grid2X2 } from 'lucide-react';
import { CabinetPreview } from './CabinetPreview';

interface CabinetFormProps {
  cabinet: Cabinet;
  onCabinetChange: (cabinet: Cabinet) => void;
}

export function CabinetForm({ cabinet, onCabinetChange }: CabinetFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onCabinetChange({
      ...cabinet,
      [name]: name === 'assemblyType' || name === 'doorStyle' ? value : Number(value),
    });
  };

  return (
    <div className="space-y-8">
      {/* Cabinet Preview */}
      <CabinetPreview cabinet={cabinet} />

      {/* Overall Dimensions */}
      <div className="bg-[#0A2A43] p-6 rounded-lg shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <Box className="w-6 h-6" />
          <h2 className="text-xl font-bold">Overall Dimensions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                <span>Height (mm)</span>
              </div>
            </label>
            <input
              type="number"
              name="height"
              value={cabinet.height}
              onChange={handleChange}
              min="1"
              className="w-full bg-[#1C4A6E] border border-[#2C5A7E] rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Width (mm)</label>
            <input
              type="number"
              name="width"
              value={cabinet.width}
              onChange={handleChange}
              min="1"
              className="w-full bg-[#1C4A6E] border border-[#2C5A7E] rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Depth (mm)</label>
            <input
              type="number"
              name="depth"
              value={cabinet.depth}
              onChange={handleChange}
              min="1"
              className="w-full bg-[#1C4A6E] border border-[#2C5A7E] rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Cabinet Style */}
      <div className="bg-[#0A2A43] p-6 rounded-lg shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <DoorOpen className="w-6 h-6" />
          <h2 className="text-xl font-bold">Cabinet Style</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Construction Type</label>
            <select
              name="assemblyType"
              value={cabinet.assemblyType}
              onChange={handleChange}
              className="w-full bg-[#1C4A6E] border border-[#2C5A7E] rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="frameless">Frameless (Euro Style)</option>
              <option value="faceframe">Face Frame Style</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Door Style</label>
            <select
              name="doorStyle"
              value={cabinet.doorStyle}
              onChange={handleChange}
              className="w-full bg-[#1C4A6E] border border-[#2C5A7E] rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="full-overlay">Full Overlay</option>
              <option value="half-overlay">Half Overlay</option>
              <option value="inset">Inset</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interior Components */}
      <div className="bg-[#0A2A43] p-6 rounded-lg shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <Grid2X2 className="w-6 h-6" />
          <h2 className="text-xl font-bold">Interior Components</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>Number of Divisions</span>
              </div>
            </label>
            <input
              type="number"
              name="divisions"
              value={cabinet.divisions}
              onChange={handleChange}
              min="0"
              className="w-full bg-[#1C4A6E] border border-[#2C5A7E] rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Drawer Spacing (mm)</label>
            <input
              type="number"
              name="drawerSpacing"
              value={cabinet.drawerSpacing}
              onChange={handleChange}
              min="0"
              className="w-full bg-[#1C4A6E] border border-[#2C5A7E] rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Quantity */}
      <div className="bg-[#0A2A43] p-6 rounded-lg shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <Layers className="w-6 h-6" />
          <h2 className="text-xl font-bold">Production Details</h2>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Quantity to Manufacture</label>
          <input
            type="number"
            name="quantity"
            value={cabinet.quantity}
            onChange={handleChange}
            min="1"
            className="w-full max-w-xs bg-[#1C4A6E] border border-[#2C5A7E] rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </div>
  );
}