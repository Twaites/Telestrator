import { createContext, useState, PropsWithChildren } from 'react';
import { Tools } from 'react-sketch2';

export const SketchSetting = createContext({
  tool: Tools.Pencil,
  lineColor: 'red',
  lineWidth: 3,
  setTool: (tool: string) => {}
});

export const SketchSettingsProvider = ({ children }: PropsWithChildren) => {
  const [tool, setTool] = useState(Tools.Pencil);

  return (
    <SketchSetting.Provider value={{ tool, lineColor: 'red', lineWidth: 3, setTool }}>
      {children}
    </SketchSetting.Provider>
  );
};