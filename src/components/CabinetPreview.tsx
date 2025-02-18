import React from 'react';
import type { Cabinet } from '../types';

interface CabinetPreviewProps {
  cabinet: Cabinet;
}

export function CabinetPreview({ cabinet }: CabinetPreviewProps) {
  // Scale the cabinet dimensions to fit the preview area
  const scale = 0.25; // 1mm = 0.25px
  const width = cabinet.width * scale;
  const height = cabinet.height * scale;
  const depth = cabinet.depth * scale;

  // Calculate door dimensions based on style
  const doorInset = cabinet.doorStyle === 'inset' ? 2 : 0;
  const doorOverlay = cabinet.doorStyle === 'full-overlay' ? 20 : 
                     cabinet.doorStyle === 'half-overlay' ? 10 : 0;

  // SVG viewBox dimensions
  const viewBoxWidth = width + 100; // Add padding
  const viewBoxHeight = height + 100;

  return (
    <div className="bg-[#0A2A43] p-6 rounded-lg shadow-xl">
      <h3 className="text-lg font-semibold mb-4">Cabinet Preview</h3>
      <div className="relative bg-[#051829] rounded-lg p-4 overflow-hidden">
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="w-full h-auto"
          style={{ maxHeight: '400px' }}
        >
          {/* Front View */}
          <g transform={`translate(50, 50)`}>
            {/* Cabinet Box */}
            <rect
              x="0"
              y="0"
              width={width}
              height={height}
              fill="none"
              stroke="#CCCCCC"
              strokeWidth="2"
            />

            {/* Face Frame (if selected) */}
            {cabinet.assemblyType === 'faceframe' && (
              <rect
                x="-10"
                y="-10"
                width={width + 20}
                height={height + 20}
                fill="none"
                stroke="#CCCCCC"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            )}

            {/* Door */}
            <rect
              x={doorInset - doorOverlay}
              y={doorInset - doorOverlay}
              width={width + (doorOverlay * 2) - (doorInset * 2)}
              height={height + (doorOverlay * 2) - (doorInset * 2)}
              fill="none"
              stroke="#4A90E2"
              strokeWidth="2"
            />

            {/* Divisions */}
            {Array.from({ length: cabinet.divisions }).map((_, index) => {
              const y = (height / (cabinet.divisions + 1)) * (index + 1);
              return (
                <line
                  key={index}
                  x1="0"
                  y1={y}
                  x2={width}
                  y2={y}
                  stroke="#CCCCCC"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              );
            })}

            {/* Dimensions */}
            <g className="dimensions" fill="#CCCCCC" fontSize="12">
              {/* Width */}
              <text x={width / 2} y={-20} textAnchor="middle">
                Width: {cabinet.width}mm
              </text>
              {/* Height */}
              <text x={-20} y={height / 2} textAnchor="middle" transform={`rotate(-90, ${-20}, ${height / 2})`}>
                Height: {cabinet.height}mm
              </text>
              {/* Depth */}
              <text x={width + 20} y={20} textAnchor="start">
                Depth: {cabinet.depth}mm
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}