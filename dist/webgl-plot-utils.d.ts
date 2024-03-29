import { WebglLine, WebglThickLine, WebglPlot, ColorRGBA } from 'webgl-plot';
export type WebglLineProps = {
    values?: number[];
    color?: [number, number, number, number] | ColorRGBA;
    position?: number;
    autoscale?: boolean | 2;
    scaled?: number[];
    ymin?: number;
    ymax?: number;
    centerZero?: boolean;
    xAxis?: boolean;
    xColor?: [number, number, number, number] | ColorRGBA;
    width?: number;
    interpolate?: boolean;
    useOverlay?: boolean;
    units?: string;
    viewing?: boolean;
    [key: string]: any;
} & ({
    nPoints?: number;
} | {
    nSec?: number;
    sps?: number;
} | {
    points?: number;
});
export type WebglLinePlotProps = {
    canvas: HTMLCanvasElement;
    width?: number;
    height?: number;
    webglOptions?: {
        antialias?: boolean;
        transparent?: boolean;
        desynchronized?: boolean;
        powerPerformance?: 'default' | 'high-performance' | 'low-power';
        preserveDrawing?: boolean;
        debug?: boolean;
    };
    mode?: 'scroll' | 'sweep';
    sweepColor?: string;
    overlay?: HTMLCanvasElement | boolean;
    overlayColor?: string;
    overlayFont?: string;
    lineWidth?: number;
    linePoints?: number;
    lines: {
        [key: string]: WebglLineProps | number[];
    };
    dividerColor?: [number, number, number, number] | ColorRGBA;
    generateNewLines?: boolean;
    cleanGeneration?: boolean;
    [key: string]: any;
};
export type WebglLinePlotInfo = {
    plot: WebglPlot;
    settings: WebglLinePlotProps;
    initial: WebglLinePlotProps;
    anim: any;
};
export declare class WebglLinePlotUtil {
    plots: {
        [key: string]: WebglLinePlotInfo;
    };
    initPlot(settings: WebglLinePlotProps, plot?: WebglPlot): WebglLinePlotInfo;
    deinitPlot(info: WebglLinePlotInfo | string): boolean;
    reinitPlot(info: WebglLinePlotInfo | string, settings: WebglLinePlotProps): WebglLinePlotInfo;
    getChartSettings(plotId: string, getValues?: boolean): WebglLinePlotProps;
    renderOverlay: (canvas: any, ctx: any, plotInfo: WebglLinePlotInfo, s: any, lineName: any, max?: number, min?: number) => void;
    update(plotInfo: WebglLinePlotInfo | string, lines?: {
        [key: string]: WebglLineProps | number[] | {
            [key: string]: any;
            values: number[];
        };
    }, draw?: boolean): boolean;
    updateLine(line: WebglLine | WebglThickLine, values: number[], interpolate?: boolean, autoscale?: boolean, autoscalePosition?: number, nLines?: number, centerZero?: boolean): boolean;
    formatTime(seconds: any): string;
    static autoscale(array: any, lineIdx?: number, nLines?: number, centerZero?: boolean, ymin?: number, ymax?: number, clamp?: boolean): any;
    static getYScalar(array: any, nLines?: number, centerZero?: boolean, ymin?: number, ymax?: number): any;
    static getYOffset(lineIdx?: number, nLines?: number, min?: number, scalar?: number): number;
    static absmax(array: any): number;
    static downsample(array: any, fitCount: any, scalar?: number): any;
    static upsample(array: any, fitCount: any, scalar?: number): any[];
    static interpolate(array: number[], fitCount: number, scalar?: number): any;
    static HSLToRGB(h: any, s: any, l: any, scalar?: number): [number, number, number];
    static circularBuffer(arr: any[], newEntries: any[]): any[];
    static formatDataForCharts(data: {
        [key: string]: number[] | number | {
            values: number[] | number;
            [key: string]: any;
        };
    } | string | ((number | number[])[]) | number, key?: string): string | number | {
        [key: string]: number | number[] | {
            [key: string]: any;
            values: number[] | number;
        };
    } | (number | number[])[];
    static padTime(data: number[], //new data, assumed to be sequential between a gap
    lastValue: number, //the last data point before the gap
    time: number, //interval that's passed to determine slope between samples
    targetFit: number): number[];
    static interpolateForTime(data: number[], //new data, assumed to be evenly spread over a time interval
    time: number, //the time interval passed (s)
    targetSPS: number): any;
}
