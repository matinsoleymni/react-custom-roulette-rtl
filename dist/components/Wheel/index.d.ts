/// <reference types="react" />
import { PointerProps, WheelData } from './types';
interface Props {
    mustStartSpinning: boolean;
    prizeNumber: number;
    data: WheelData[];
    onStopSpinning?: () => any;
    backgroundColors?: string[];
    textColors?: string[];
    outerBorderColor?: string;
    outerBorderWidth?: number;
    innerRadius?: number;
    innerBorderColor?: string;
    innerBorderWidth?: number;
    radiusLineColor?: string;
    radiusLineWidth?: number;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number | string;
    fontStyle?: string;
    perpendicularText?: boolean;
    textDistance?: number;
    spinDuration?: number;
    startingOptionIndex?: number;
    pointerProps?: PointerProps;
    disableInitialAnimation?: boolean;
    isRTL?: boolean;
    baseImageSrc?: string;
    width?: string;
    height?: string;
    baseImageClassName?: string;
    selectedOptionBackgroundColor?: string;
}
export declare const Wheel: ({ mustStartSpinning, prizeNumber, data, onStopSpinning, backgroundColors, textColors, outerBorderColor, outerBorderWidth, innerRadius, innerBorderColor, innerBorderWidth, radiusLineColor, radiusLineWidth, fontFamily, fontSize, fontWeight, fontStyle, perpendicularText, textDistance, spinDuration, startingOptionIndex, pointerProps, disableInitialAnimation, isRTL, baseImageSrc, width, height, baseImageClassName, selectedOptionBackgroundColor, }: Props) => JSX.Element | null;
export {};
