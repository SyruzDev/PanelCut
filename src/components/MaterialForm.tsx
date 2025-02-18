import React from 'react';
import { Settings2, Ruler } from 'lucide-react';
import type { Material } from '../types';

interface MaterialFormProps {
  material: Material;
  onMaterialChange: (material: Material) => void;
}

export function MaterialForm({ material, onMaterialChange }: MaterialFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onMaterialChange({
      ...material,
      [name]: name === 'type' ? value : Number(value),
    });
  };

  return (
    <div className="bg-[#0A2A43] text-white p-6 rounded-lg shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <Settings2 className="w-6 h-6" />
        <h2 className="text-xl font-bold">Material Specifications</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Material Type</label>
            <select
              name="type"
              value={material.type}
              onChange={handleChange}
              className="w-full bg-[#1C4A6E] border border-[#2C5A7E] rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="mdf">MDF</option>
              <option value="particleboard">Particle Board</option>
              <option value="plywood">Plywood</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Thickness (mm)
            </label>
            <input
              type="number"
              name="thickness"
              value={material.thickness}
              onChange={handleChange}
              min="1"
              step="0.1"
              className="w-full bg-[#1C4A6E] border border-[#2C5A7E] rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Width (mm)
              </label>
              <input
                type="number"
                name="width"
                value={material.width}
                onChange={handleChange}
                min="1"
                className="w-full bg-[#1C4A6E] border border-[#2C5A7E] rounded-md p-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Height (mm)
              </label>
              <input
                type="number"
                name="height"
                value={material.height}
                onChange={handleChange}
                min="1"
                className="w-full bg-[#1C4A6E] border border-[#2C5A7E] rounded-md p-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                <span>Cut Width (Kerf) (mm)</span>
              </div>
            </label>
            <input
              type="number"
              name="kerf"
              value={material.kerf}
              onChange={handleChange}
              min="0.1"
              step="0.1"
              className="w-full bg-[#1C4A6E] border border-[#2C5A7E] rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}