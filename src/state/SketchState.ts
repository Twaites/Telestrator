import { create } from 'zustand';
import { Tools } from 'react-sketch2';

interface SketchState {
  currentTool: string;
  lineColor: string;
  lineWidth: number;
  colorHistory: string[];
  sketchRef: React.RefObject<any> | null;
  setCurrentTool: (tool: string) => void;
  setLineColor: (color: string) => void;
  setLineWidth: (width: number) => void;
  addUsedColor: (color: string) => void;
  setSketchRef: (ref: React.RefObject<any> | null) => void;
}

export const useSketchStore = create<SketchState>((set) => ({
  currentTool: Tools.Pencil,
  lineColor: '#ff0000',
  lineWidth: 3,
  colorHistory: ['#ff0000'],
  sketchRef: null,
  setCurrentTool: (tool) => set({ currentTool: tool }),
  setLineColor: (lineColor) => set({ lineColor }),
  setLineWidth: (lineWidth) => set({ lineWidth }),
  addUsedColor: (color) => set((state) => ({
    colorHistory: [...new Set([color, ...state.colorHistory])].slice(0, 7)
  })),
  setSketchRef: (sketchRef) => set({ sketchRef }),
})); 