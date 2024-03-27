import { atom } from "jotai";
import { PropsApi, PropsMngAction, PropsStateTabel } from "./interafce.table";
import data from '../../../data/data.consumer.json';

export const OptionsStateTable = atom<PropsStateTabel>({});

export const DeriviedStateTable = atom((get) => get(OptionsStateTable), (get, set, action: PropsMngAction) => {
    const props = get(OptionsStateTable);
    switch(action.type){
        case 'DEF':
            set(OptionsStateTable, (__) => {
                return{
                    dataValue: action?.options?.stored
                }
            });
            break;
    }
})

DeriviedStateTable.onMount = (set) => {
    set({
        type: "DEF",
        options: {
            stored : data as Readonly<Array<PropsApi>>
        }
    })
}