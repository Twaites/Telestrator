import { create } from 'zustand';
import { Tools } from 'react-sketch2';

interface SketchState {
  currentTool: string;
  lineColor: string;
  lineWidth: number;
  colorHistory: string[];
  setCurrentTool: (tool: string) => void;
  setLineColor: (color: string) => void;
  setLineWidth: (width: number) => void;
  addUsedColor: (color: string) => void;
}

export const useSketchStore = create<SketchState>((set) => ({
  currentTool: Tools.Pencil,
  lineColor: '#ff0000',
  lineWidth: 3,
  colorHistory: [],
  setCurrentTool: (tool) => set({ currentTool: tool }),
  setLineColor: (lineColor) => set({ lineColor }),
  setLineWidth: (lineWidth) => set({ lineWidth }),
  addUsedColor: (color) => set((state) => ({
    colorHistory: [...new Set([color, ...state.colorHistory])].slice(0, 7)
  })),
})); 