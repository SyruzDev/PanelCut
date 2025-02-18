import React from 'react';
import type { Cabinet, Material } from '../types';
import { ArrowRight, ArrowLeft, ArrowUp, ArrowDown } from 'lucide-react';

interface CutOptimizationLayoutProps {
  cabinet: Cabinet;
  material: Material;
  cabinetNumber: number;
}

interface Panel {
  id: string;
  width: number;
  height: number;
  quantity: number;
  edgeBanding: string[];
  type: string;
}

export function CutOptimizationLayout({ cabinet, material, cabinetNumber }: CutOptimizationLayoutProps) {
  // Calculate panel dimensions based on cabinet measurements
  const panels: Panel[] = [
    {
      id: `C${cabinetNumber}-L1`,
      width: cabinet.depth,
      height: cabinet.height,
      quantity: 1,
      edgeBanding: ['top', 'front'],
      type: 'Left Side'
    },
    {
      id: `C${cabinetNumber}-R1`,
      width: cabinet.depth,
      height: cabinet.height,
      quantity: 1,
      edgeBanding: ['top', 'front'],
      type: 'Right Side'
    },
    {
      id: `C${cabinetNumber}-T1`,
      width: cabinet.width,
      height: cabinet.depth,
      quantity: 1,
      edgeBanding: ['front', 'left', 'right'],
      type: 'Top'
    },
    {
      id: `C${cabinetNumber}-B1`,
      width: cabinet.width,
      height: cabinet.depth,
      quantity: 1,
      edgeBanding: ['front', 'left', 'right'],
      type: 'Bottom'
    },
    {
      id: `C${cabinetNumber}-D1`,
      width: cabinet.width + 40, // Adding overlay
      height: cabinet.height + 40,
      quantity: 1,
      edgeBanding: ['all'],
      type: 'Door'
    },
    ...Array.from({ length: cabinet.divisions }).map((_, index) => ({
      id: `C${cabinetNumber}-S${index + 1}`,
      width: cabinet.width - 4, // Account for shelf pins
      height: cabinet.depth - 20, // Set back from front
      quantity: 1,
      edgeBanding: ['front'],
      type: 'Shelf'
    }))
  ];

  const scale = 0.15; // Scale factor for SVG drawing

  return (
    <div className="space-y-8">
      {/* Panel Diagrams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {panels.map((panel) => (
          <div key={panel.id} className="bg-[#0A2A43] p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4">{panel.id} - {panel.type}</h3>
            <div className="bg-[#051829] rounded-lg p-4">
              <svg
                viewBox={`0 0 ${panel.width * scale + 100} ${panel.height * scale + 100}`}
                className="w-full h-auto"
                style={{ maxHeight: '300px' }}
              >
                <g transform="translate(50, 50)">
                  {/* Panel Outline */}
                  <rect
                    x="0"
                    y="0"
                    width={panel.width * scale}
                    height={panel.height * scale}
                    fill="none"
                    stroke="#CCCCCC"
                    strokeWidth="2"
                  />

                  {/* Edge Banding Indicators */}
                  {panel.edgeBanding.includes('top') && (
                    <line
                      x1="0"
                      y1="0"
                      x2={panel.width * scale}
                      y2="0"
                      stroke="#4A90E2"
                      strokeWidth="4"
                    />
                  )}
                  {panel.edgeBanding.includes('front') && (
                    <line
                      x1={panel.width * scale}
                      y1="0"
                      x2={panel.width * scale}
                      y2={panel.height * scale}
                      stroke="#4A90E2"
                      strokeWidth="4"
                    />
                  )}

                  {/* Cut Direction Arrows */}
                  <ArrowRight className="absolute" style={{ 
                    transform: `translate(${panel.width * scale / 2}px, ${-20}px)`,
                    color: '#CCCCCC'
                  }} />
                  <ArrowDown className="absolute" style={{ 
                    transform: `translate(${panel.width * scale + 20}px, ${panel.height * scale / 2}px)`,
                    color: '#CCCCCC'
                  }} />

                  {/* Dimensions */}
                  <g fill="#CCCCCC" fontSize="12">
                    {/* Width */}
                    <text x={panel.width * scale / 2} y={-30} textAnchor="middle">
                      {panel.width}mm ({(panel.width / 10).toFixed(1)}cm)
                    </text>
                    {/* Height */}
                    <text 
                      x={panel.width * scale + 40} 
                      y={panel.height * scale / 2} 
                      textAnchor="middle"
                      transform={`rotate(90, ${panel.width * scale + 40}, ${panel.height * scale / 2})`}
                    >
                      {panel.height}mm ({(panel.height / 10).toFixed(1)}cm)
                    </text>
                  </g>

                  {/* Kerf Lines */}
                  <g stroke="#CCCCCC" strokeDasharray="5,5" strokeWidth="1">
                    <line
                      x1="-10"
                      y1="-material.kerf"
                      x2={panel.width * scale + 10}
                      y2="-material.kerf"
                    />
                    <line
                      x1={panel.width * scale + material.kerf}
                      y1="-10"
                      x2={panel.width * scale + material.kerf}
                      y2={panel.height * scale + 10}
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="bg-[#0A2A43] p-6 rounded-lg shadow-xl overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Cut List Inventory</h3>
        <table className="w-full min-w-[800px] text-sm">
          <thead>
            <tr className="border-b border-[#2C5A7E]">
              <th className="text-left py-2 px-4">Reference</th>
              <th className="text-left py-2 px-4">Type</th>
              <th className="text-left py-2 px-4">Dimensions (W × H × D)</th>
              <th className="text-left py-2 px-4">Material</th>
              <th className="text-left py-2 px-4">Edge Banding</th>
              <th className="text-center py-2 px-4">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {panels.map((panel) => (
              <tr key={panel.id} className="border-b border-[#2C5A7E]">
                <td className="py-2 px-4">{panel.id}</td>
                <td className="py-2 px-4">{panel.type}</td>
                <td className="py-2 px-4">
                  {panel.width} × {panel.height} × {material.thickness} mm
                </td>
                <td className="py-2 px-4">{material.type.toUpperCase()}</td>
                <td className="py-2 px-4">
                  {panel.edgeBanding.join(', ')}
                </td>
                <td className="py-2 px-4 text-center">{panel.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}