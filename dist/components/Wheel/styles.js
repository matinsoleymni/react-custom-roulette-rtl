var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from 'styled-components';
import { NonDraggableImage } from '../common/styledComponents';
export var RouletteContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  width: 80vw;\n  max-width: 445px;\n  height: 80vw;\n  max-height: 445px;\n  object-fit: contain;\n  flex-shrink: 0;\n  z-index: 5;\n  pointer-events: none;\n"], ["\n  position: relative;\n  width: 80vw;\n  max-width: 445px;\n  height: 80vw;\n  max-height: 445px;\n  object-fit: contain;\n  flex-shrink: 0;\n  z-index: 5;\n  pointer-events: none;\n"])));
export var RotationContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0px;\n  right: 0px;\n  top: 0px;\n  bottom: 0px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transform: rotate(", "deg);\n\n  &.started-spinning {\n    animation: spin-", " ", "s cubic-bezier(\n          0.71,\n          ", ",\n          0.96,\n          0.9\n        ) 0s 1 normal forwards running,\n      continueSpin-", " ", "s linear ", "s 1 normal forwards running,\n      stopSpin-", " ", "s cubic-bezier(0, 0, 0.35, 1.02) ", "s 1 normal forwards\n        running;\n  }\n\n  @keyframes spin-", " {\n    from {\n      transform: rotate(", "deg);\n    }\n    to {\n      transform: rotate(", "deg);\n    }\n  }\n  @keyframes continueSpin-", " {\n    from {\n      transform: rotate(", "deg);\n    }\n    to {\n      transform: rotate(", "deg);\n    }\n  }\n  @keyframes stopSpin-", " {\n    from {\n      transform: rotate(", "deg);\n    }\n    to {\n      transform: rotate(", "deg);\n    }\n  }\n"], ["\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0px;\n  right: 0px;\n  top: 0px;\n  bottom: 0px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transform: rotate(", "deg);\n\n  &.started-spinning {\n    animation: spin-", " ", "s cubic-bezier(\n          0.71,\n          ", ",\n          0.96,\n          0.9\n        ) 0s 1 normal forwards running,\n      continueSpin-", " ", "s linear ", "s 1 normal forwards running,\n      stopSpin-", " ", "s cubic-bezier(0, 0, 0.35, 1.02) ", "s 1 normal forwards\n        running;\n  }\n\n  @keyframes spin-", " {\n    from {\n      transform: rotate(", "deg);\n    }\n    to {\n      transform: rotate(", "deg);\n    }\n  }\n  @keyframes continueSpin-", " {\n    from {\n      transform: rotate(", "deg);\n    }\n    to {\n      transform: rotate(", "deg);\n    }\n  }\n  @keyframes stopSpin-", " {\n    from {\n      transform: rotate(", "deg);\n    }\n    to {\n      transform: rotate(", "deg);\n    }\n  }\n"])), function (props) { return props.startRotationDegrees; }, function (_a) {
    var classKey = _a.classKey;
    return classKey;
}, function (_a) {
    var startSpinningTime = _a.startSpinningTime;
    return startSpinningTime / 1000;
}, function (props) { return (props.disableInitialAnimation ? 0 : -0.29); }, function (_a) {
    var classKey = _a.classKey;
    return classKey;
}, function (_a) {
    var continueSpinningTime = _a.continueSpinningTime;
    return continueSpinningTime / 1000;
}, function (_a) {
    var startSpinningTime = _a.startSpinningTime;
    return startSpinningTime / 1000;
}, function (_a) {
    var classKey = _a.classKey;
    return classKey;
}, function (_a) {
    var stopSpinningTime = _a.stopSpinningTime;
    return stopSpinningTime / 1000;
}, function (_a) {
    var startSpinningTime = _a.startSpinningTime, continueSpinningTime = _a.continueSpinningTime;
    return (startSpinningTime + continueSpinningTime) / 1000;
}, function (_a) {
    var classKey = _a.classKey;
    return classKey;
}, function (props) { return props.startRotationDegrees; }, function (props) { return props.startRotationDegrees + 360; }, function (_a) {
    var classKey = _a.classKey;
    return classKey;
}, function (props) { return props.startRotationDegrees; }, function (props) { return props.startRotationDegrees + 360; }, function (_a) {
    var classKey = _a.classKey;
    return classKey;
}, function (props) { return props.startRotationDegrees; }, function (props) { return 1440 + props.finalRotationDegrees; });
export var RoulettePointerImage = styled(NonDraggableImage)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: absolute;\n  z-index: 5;\n  width: 17%;\n  right: 6px;\n  top: 15px;\n"], ["\n  position: absolute;\n  z-index: 5;\n  width: 17%;\n  right: 6px;\n  top: 15px;\n"])));
export var WheelContainer = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  position: relative;\n  width: 100%;\n  height: 100%;\n  max-width: 900px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"], ["\n  position: relative;\n  width: 100%;\n  height: 100%;\n  max-width: 900px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"])));
export var BaseImage = styled.img(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 100%;\n  max-width: 900px;\n  margin-top: -100px;\n  height: auto;\n  position: absolute;\n  bottom: 0;\n  z-index: 1;\n"], ["\n  width: 100%;\n  max-width: 900px;\n  margin-top: -100px;\n  height: auto;\n  position: absolute;\n  bottom: 0;\n  z-index: 1;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
