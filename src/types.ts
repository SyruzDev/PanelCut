export interface Material {
  type: string;
  thickness: number;
  width: number;
  height: number;
  kerf: number;
}

export interface Cabinet {
  height: number;
  width: number;
  depth: number;
  divisions: number;
  drawerSpacing: number;
  assemblyType: 'frameless' | 'faceframe';
  doorStyle: 'full-overlay' | 'half-overlay' | 'inset';
  quantity: number;
}

export interface Project {
  id: string;
  name: string;
  material: Material;
  cabinets: Cabinet[];
  createdAt: Date;
  updatedAt: Date;
}

export type Step = 'material' | 'cabinet' | 'visualization' | 'export';