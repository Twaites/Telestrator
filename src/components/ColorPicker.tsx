import { HexColorPicker } from "react-colorful";
import { useSketchStore } from '../state/SketchState';
import './ColorPicker.css';

const ColorPicker = () => {
    const { lineColor, setLineColor, colorHistory, addUsedColor } = useSketchStore();

    const handleColorChange = (color: string) => {
        setLineColor(color);
    };

    const handleColorComplete = () => {
        addUsedColor(lineColor);
    };

    return (
        <div className="color-picker-wrapper">
            <HexColorPicker
                color={lineColor}
                onChange={handleColorChange}
                onMouseUp={handleColorComplete}
                onTouchEnd={handleColorComplete}
            />

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