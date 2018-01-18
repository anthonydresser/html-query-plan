import { drawSvgLines } from './svgLines';
interface Options {
    jsTooltips?: boolean;
}
declare function showPlan(container: Element, planXml: string, options?: Options): void;
export { Options, drawSvgLines as drawLines, showPlan };
