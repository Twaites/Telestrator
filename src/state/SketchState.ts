import { create } from 'zustand';
import { Tools } from 'react-sketch2';

interface SketchState {
  tool: string;
  lineColor: string;
  lineWidth: number;
  setTool: (tool: string) => void;
  setLineColor: (color: string) => void;
  setLineWidth: (width: number) => void;
}

export const useSketchStore = create<SketchState>((set) => ({
  tool: Tools.Pencil,
  lineColor: 'red',
  lineWidth: 3,
  setTool: (tool) => set({ tool }),
  setLineColor: (lineColor) => set({ lineColor }),
  setLineWidth: (lineWidth) => set({ lineWidth }),
})); 