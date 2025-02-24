/// <reference types="react" />
import { WheelData } from '../Wheel/types';
interface WheelCanvasProps extends DrawWheelProps {
    width: string;
    height: string;
    data: WheelData[];
    isRTL?: boolean;
    selectedOption?: number;
    selectedOptionBackgroundColor?: string;
}
interface DrawWheelProps {
    outerBorderColor: string;
    outerBorderWidth: number;
    innerRadius: number;
    innerBorderColor: string;
    innerBorderWidth: number;
    radiusLineColor: string;
    radiusLineWidth: number;
    fontFamily: string;
    fontWeight: number | string;
    fontSize: number;
    fontStyle: string;
    perpendicularText: boolean;
    prizeMap: number[][];
    rouletteUpdater: boolean;
    textDistance: number;
    isRTL?: boolean;
    selectedOption?: number;
    selectedOptionBackgroundColor?: string;
}
declare const WheelCanvas: ({ width, height, data, outerBorderColor, outerBorderWidth, innerRadius, innerBorderColor, innerBorderWidth, radiusLineColor, radiusLineWidth, fontFamily, fontWeight, fontSize, fontStyle, perpendicularText, prizeMap, rouletteUpdater, textDistance, isRTL, selectedOption, selectedOptionBackgroundColor, }: WheelCanvasProps) => JSX.Element;
export default WheelCanvas;
