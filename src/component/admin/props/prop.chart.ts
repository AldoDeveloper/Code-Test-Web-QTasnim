import { PropsDataChartArea } from "../../../../types/map.type";

export interface PropsOption{
    name ?: string | number,
    code ?: string | number
}

export const defaultDataChartArea: Array<PropsDataChartArea> = [
    {
        name: "Temp",
        value: 10,
        created_at: new Date().toLocaleTimeString(),
    },
    {
        name: "Temp",
        value: 40,
        created_at: new Date().toLocaleTimeString(),
    },
    {
        name: "Temp",
        value: 35,
        created_at: new Date().toLocaleTimeString(),
    },
];

export const optionsValueAreaChart : Array<PropsOption> = [
    {
        name: "bump",
    },
    {
        name: "step",
    },
    {
        name: "basis",
    },
    {
        name: "motone",
    },
];

export const optionValueRangeAreaChart : Array<PropsOption> = [
    {
        name: -10,
    },
    {
        name: -25,
    },
    {
        name: -35,
    },
    {
        name: -50
    }
];