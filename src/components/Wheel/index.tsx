import React, { useEffect, useRef, useState } from 'react';

import { getQuantity, getRotationDegrees, makeClassKey } from '../../utils';
import { roulettePointer } from '../common/images';
import {
  RotationContainer,
  RouletteContainer,
  WheelContainer,
  BaseImage,
} from './styles';
import {
  DEFAULT_BACKGROUND_COLORS,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_STYLE,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_INNER_BORDER_COLOR,
  DEFAULT_INNER_BORDER_WIDTH,
  DEFAULT_INNER_RADIUS,
  DEFAULT_OUTER_BORDER_COLOR,
  DEFAULT_OUTER_BORDER_WIDTH,
  DEFAULT_RADIUS_LINE_COLOR,
  DEFAULT_RADIUS_LINE_WIDTH,
  DEFAULT_SPIN_DURATION,
  DEFAULT_TEXT_COLORS,
  DEFAULT_TEXT_DISTANCE,
  WEB_FONTS,
  DISABLE_INITIAL_ANIMATION,
} from '../../strings';
import { PointerProps, WheelData } from './types';
import WheelCanvas from '../WheelCanvas';

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

const STARTED_SPINNING = 'started-spinning';

const START_SPINNING_TIME = 2600;
const CONTINUE_SPINNING_TIME = 750;
const STOP_SPINNING_TIME = 8000;

export const Wheel = ({
  mustStartSpinning,
  prizeNumber,
  data,
  onStopSpinning = () => null,
  backgroundColors = DEFAULT_BACKGROUND_COLORS,
  textColors = DEFAULT_TEXT_COLORS,
  outerBorderColor = DEFAULT_OUTER_BORDER_COLOR,
  outerBorderWidth = DEFAULT_OUTER_BORDER_WIDTH,
  innerRadius = DEFAULT_INNER_RADIUS,
  innerBorderColor = DEFAULT_INNER_BORDER_COLOR,
  innerBorderWidth = DEFAULT_INNER_BORDER_WIDTH,
  radiusLineColor = DEFAULT_RADIUS_LINE_COLOR,
  radiusLineWidth = DEFAULT_RADIUS_LINE_WIDTH,
  fontFamily = WEB_FONTS[0],
  fontSize = DEFAULT_FONT_SIZE,
  fontWeight = DEFAULT_FONT_WEIGHT,
  fontStyle = DEFAULT_FONT_STYLE,
  perpendicularText = false,
  textDistance = DEFAULT_TEXT_DISTANCE,
  spinDuration = DEFAULT_SPIN_DURATION,
  startingOptionIndex = -1,
  pointerProps = {},
  disableInitialAnimation = DISABLE_INITIAL_ANIMATION,
  isRTL = false,
  baseImageSrc,
  width = '900',
  height = '900',
  baseImageClassName,
  selectedOptionBackgroundColor = '#bf34fa',
}: Props): JSX.Element | null => {
  const [wheelData, setWheelData] = useState<WheelData[]>([...data]);
  const [prizeMap, setPrizeMap] = useState<number[][]>([[0]]);
  const [startRotationDegrees, setStartRotationDegrees] = useState(0);
  const [finalRotationDegrees, setFinalRotationDegrees] = useState(0);
  const [hasStartedSpinning, setHasStartedSpinning] = useState(false);
  const [hasStoppedSpinning, setHasStoppedSpinning] = useState(false);
  const [isCurrentlySpinning, setIsCurrentlySpinning] = useState(false);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [rouletteUpdater, setRouletteUpdater] = useState(false);
  const [loadedImagesCounter, setLoadedImagesCounter] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const mustStopSpinning = useRef<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number>(-1);

  const classKey = makeClassKey(5);

  const normalizedSpinDuration = Math.max(0.01, spinDuration);

  const startSpinningTime = START_SPINNING_TIME * normalizedSpinDuration;
  const continueSpinningTime = CONTINUE_SPINNING_TIME * normalizedSpinDuration;
  const stopSpinningTime = STOP_SPINNING_TIME * normalizedSpinDuration;

  const totalSpinningTime =
    startSpinningTime + continueSpinningTime + stopSpinningTime;

  useEffect(() => {
    let initialMapNum = 0;
    const auxPrizeMap: number[][] = [];
    const dataLength = data?.length || 0;
    const wheelDataAux = [{ option: '', optionSize: 1 }] as WheelData[];

    setIsFontLoaded(true);

    const imagePromises: Promise<void>[] = [];

    for (let i = 0; i < dataLength; i++) {
      wheelDataAux[i] = {
        ...data[i],
        style: {
          backgroundColor:
            data[i].style?.backgroundColor ||
            backgroundColors?.[i % backgroundColors?.length] ||
            DEFAULT_BACKGROUND_COLORS[0],
          fontFamily:
            data[i].style?.fontFamily || fontFamily || DEFAULT_FONT_FAMILY,
          fontSize: data[i].style?.fontSize || fontSize || DEFAULT_FONT_SIZE,
          fontWeight:
            data[i].style?.fontWeight || fontWeight || DEFAULT_FONT_WEIGHT,
          fontStyle:
            data[i].style?.fontStyle || fontStyle || DEFAULT_FONT_STYLE,
          textColor:
            data[i].style?.textColor ||
            textColors?.[i % textColors?.length] ||
            DEFAULT_TEXT_COLORS[0],
        },
      };

      auxPrizeMap.push([]);
      for (let j = 0; j < (wheelDataAux[i].optionSize || 1); j++) {
        auxPrizeMap[i][j] = initialMapNum++;
      }

      if (data[i].image) {
        setTotalImages(prevCounter => prevCounter + 1);

        const imagePromise = new Promise<void>(resolve => {
          const img = new Image();
          img.src = data[i].image?.uri || '';
          img.onload = () => {
            img.height = 200 * (data[i].image?.sizeMultiplier || 1);
            img.width = (img.naturalWidth / img.naturalHeight) * img.height;
            wheelDataAux[i].image = {
              uri: data[i].image?.uri || '',
              offsetX: data[i].image?.offsetX || 0,
              offsetY: data[i].image?.offsetY || 0,
              landscape: data[i].image?.landscape || false,
              sizeMultiplier: data[i].image?.sizeMultiplier || 1,
              _imageHTML: img,
            };
            setLoadedImagesCounter(prevCounter => prevCounter + 1);
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to load image: ${data[i].image?.uri}`);
            resolve();
          };
        });
        imagePromises.push(imagePromise);
      }
    }

    setWheelData([...wheelDataAux]);
    setPrizeMap(auxPrizeMap);
    setStartingOption(startingOptionIndex, auxPrizeMap);
    setIsDataUpdated(true);

    if (imagePromises.length > 0) {
      Promise.all(imagePromises).then(() => {
        setRouletteUpdater(prev => !prev);
      });
    }
  }, [data, backgroundColors, textColors, fontFamily]);

  useEffect(() => {
    if (mustStartSpinning && !isCurrentlySpinning) {
      setIsCurrentlySpinning(true);
      startSpinning();
      const selectedPrize =
        prizeMap[prizeNumber][
          Math.floor(Math.random() * prizeMap[prizeNumber]?.length)
        ];
      const finalRotationDegreesCalculated = getRotationDegrees(
        selectedPrize,
        getQuantity(prizeMap)
      );
      setFinalRotationDegrees(finalRotationDegreesCalculated);
    }
  }, [mustStartSpinning]);

  useEffect(() => {
    if (hasStoppedSpinning) {
      setIsCurrentlySpinning(false);
      setStartRotationDegrees(finalRotationDegrees);
      setSelectedOption(prizeNumber);
    }
  }, [hasStoppedSpinning]);

  const startSpinning = () => {
    setHasStartedSpinning(true);
    setHasStoppedSpinning(false);
    mustStopSpinning.current = true;
    setTimeout(() => {
      if (mustStopSpinning.current) {
        mustStopSpinning.current = false;
        setHasStartedSpinning(false);
        setHasStoppedSpinning(true);
        onStopSpinning();
      }
    }, totalSpinningTime);
  };

  const setStartingOption = (optionIndex: number, optionMap: number[][]) => {
    if (startingOptionIndex >= 0) {
      const idx = Math.floor(optionIndex) % optionMap?.length;
      const startingOption =
        optionMap[idx][Math.floor(optionMap[idx]?.length / 2)];
      setStartRotationDegrees(
        getRotationDegrees(startingOption, getQuantity(optionMap), false)
      );
    }
  };

  const getRouletteClass = () => {
    if (hasStartedSpinning) {
      return STARTED_SPINNING;
    }
    return '';
  };

  if (!isDataUpdated) {
    return null;
  }

  return (
    <WheelContainer>
      {baseImageSrc && (
        <BaseImage
          className={baseImageClassName}
          width={width}
          height={height}
          src={baseImageSrc}
          alt="wheel-base"
        />
      )}
      <RouletteContainer
        style={
          !isFontLoaded ||
          (totalImages > 0 && loadedImagesCounter !== totalImages)
            ? { visibility: 'hidden' }
            : {}
        }
      >
        <RotationContainer
          className={getRouletteClass()}
          classKey={classKey}
          startSpinningTime={startSpinningTime}
          continueSpinningTime={continueSpinningTime}
          stopSpinningTime={stopSpinningTime}
          startRotationDegrees={startRotationDegrees}
          finalRotationDegrees={finalRotationDegrees}
          disableInitialAnimation={disableInitialAnimation}
        >
          <WheelCanvas
            width={width}
            height={height}
            data={wheelData}
            outerBorderColor={outerBorderColor}
            outerBorderWidth={outerBorderWidth}
            innerRadius={innerRadius}
            innerBorderColor={innerBorderColor}
            innerBorderWidth={innerBorderWidth}
            radiusLineColor={radiusLineColor}
            radiusLineWidth={radiusLineWidth}
            fontFamily={fontFamily}
            fontWeight={fontWeight}
            fontStyle={fontStyle}
            fontSize={fontSize}
            perpendicularText={perpendicularText}
            prizeMap={prizeMap}
            rouletteUpdater={rouletteUpdater}
            textDistance={textDistance}
            isRTL={isRTL}
            selectedOption={selectedOption}
            selectedOptionBackgroundColor={selectedOptionBackgroundColor}
          />
        </RotationContainer>
        <img
          className="RoulettePointerImage"
          style={pointerProps?.style}
          src={pointerProps?.src || roulettePointer.src}
          alt="roulette-static"
        />
      </RouletteContainer>
    </WheelContainer>
  );
};
