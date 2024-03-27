import React from 'react'
import { OptionsContextApp, PropsValueAdmin } from '../../types/map.type';

export const ContextAdminProps = React.createContext<PropsValueAdmin>({});
export const ContextApp = React.createContext<OptionsContextApp>({});