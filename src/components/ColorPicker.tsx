import { HexColorPicker } from "react-colorful";
import { useSketchStore } from '../state/SketchState';
import './ColorPicker.css';

const ColorPicker = () => {
    const { lineColor, setLineColor, colorHistory, updateColorHistory } = useSketchStore();

    const handleColorChange = (color: string) => {
        setLineColor(color);
        updateColorHistory(color);
    };

    return (
        <div className="color-picker-wrapper">
            <HexColorPicker
                color={lineColor}
                onChange={handleColorChange} />

            <div className="color-history-picker">
                {colorHistory.map((color) => (
                    <button
                        key={color}
                        className="previous-color"
                        style={{ background: color }}
                        onClick={() => setLineColor(color)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ColorPicker; 