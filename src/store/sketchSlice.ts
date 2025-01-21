import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tools } from 'react-sketch2';

interface SketchState {
  tool: string;
  lineColor: string;
  lineWidth: number;
}

const initialState: SketchState = {
  tool: Tools.Pencil,
  lineColor: 'red',
  lineWidth: 3,
};

export const sketchSlice = createSlice({
  name: 'sketch',
  initialState,
  reducers: {
    setTool: (state, action: PayloadAction<string>) => {
      state.tool = action.payload;
    },
    setLineColor: (state, action: PayloadAction<string>) => {
      state.lineColor = action.payload;
    },
    setLineWidth: (state, action: PayloadAction<number>) => {
      state.lineWidth = action.payload;
    },
  },
});

export const { setTool, setLineColor, setLineWidth } = sketchSlice.actions;
export default sketchSlice.reducer; 