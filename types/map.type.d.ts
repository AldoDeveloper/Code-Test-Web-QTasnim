import { MenuItem } from "primereact/menuitem"
import { CurveType } from "recharts/types/shape/Curve"

export type Concreate<Type> = {
    [Property in keyof Type] -?: Type[Property]
}

export type CreateMutable<TYPE> = {
    -readonly[Props in keyof TYPE] : TYPE[Props]
}

export type User = {
    readonly name : string,
    readonly email : string,
    readonly email_verified_at ?: string,
    readonly thumbnail ?: string
}

export type AuthUser = {
    auth: boolean,
    loading?: boolean,
    error?: any,
    resSuccess ?: {
        code?: number,
        error?: boolean,
        access_token?: string
    }
    users ?: User
}

export type PropsActionType = {
    type : 'login' | 'logout' | 'register',
    bodyLogin?: {email?: string, password ?: string}
    users ?: User
}

export type PropsComponentAdmin = {
    '--width-sidebar'?: string,
    visibleSidebar?: boolean,
    toogle_actived_notif?: boolean 
}

export interface PropsValueAdmin {
    props     ?: PropsSettingComponentAdmin,
    propsContextApp?: Readonly<PropsContextApp>
    setProps  ?: any,
    setPropsContextApp ?: any
    callbackVisibleSidebar?: void | Function | Promise<void>,
    notifSide ?: boolean
    setNotifSide?: any,
    visibleSidebarMobile?: boolean, 
    setSidebarVisibleMobile?: any,
    api ?: {
        propsApiProduct ?: StateOptionApiProdut,
        action ?: (action: OptionActionApiProduct) => void
    }
}

export type PropsActionTypeSettingAdmin = {
    type: 'set' | 'get' | 'set_actived_side',
    setting?: PropsComponentAdmin
}

export type PropsSettingComponentAdmin = {
    setting?: PropsComponentAdmin
}

export type PropsTypeSidebarAdmin = {
    menu?: MenuItem,
    index?: number
}

export type WavesSVG = {
    backgroundColor ?: string,
    gradientColor   ?: {
        color_one   ?: string,
        color_two   ?: string
    }
}

export type OptionProgressBar = {
    value             ?: string | number,
    colorStroke       ?: string,
    strokeWidth       ?: number,
    backgroundFill    ?: string,
    typeStrokeLineCap ?: 'butt' | 'round'
}

export type OptionCardDash = {
    children    ?: React.ReactNode | React.ReactElement,
    cardTitle   ?: React.ReactNode | string,
    className   ?: string,
    wave        ?: boolean,
    badges      ?: boolean,
    valueBadges ?: number,
    colorBadges ?: string,
    style       ?: React.CSSProperties,
    waves       ?: WavesSVG,
    progresBar  ?: OptionProgressBar
}

export type PropsChartBarAdmin<D = {} | any , O = {} | any> = {
    dataBar   ?: D
    optionBar ?: T
}

export type PropsDataChartArea = {
    name        ?: string | any,
    value       ?: number | string,
    created_at  ?: Date | number | string
}

export type TypeAreaChart = {
    name  ?: Readonly<CurveType | number | string>,
    icon  ?: any
}

export type StateLineChartAdmin = {
    data   ?: Array<PropsDataChartArea>,
    option ?: {
        typeAreaChart ?: TypeAreaChart,
        rangeChart ?: TypeAreaChart
    }
}

export type OptionsContextApp = {
    props?: Readonly<PropsContextApp>,
    setProps ?: any,
    scss ?: CSSModuleClasses,
}

export type PropsContextApp = {
     darkMode?: boolean,
     resizeWindow ?: number
}

export type PropsActionContextState = {
    type?: 'setMode' | 'def' | 'resize' 
    mode?: boolean,
    resizeValue ?: number
}

export type ApiCategoryProduct = {
    id?: string,
    slugh?: string,
    category_name ?: string,
    cretated_at ?: string,
    updated_at ?: string
}

export type ApiProduct ={
    id ?: string,
    id_category   ?: string,
    product_name  ?: string,
    product_description ?: string,
    product_stock ?: number,
    product_sold  ?: number,
    craeted_at    ?: string,
    updated_at    ?: string,
    category      ?: ApiCategoryProduct,
    media         ?: Array<any>
}

export type OptionDeleteProduct = {
    loading?: boolean,
    error?: any,
    data ?: any
} 

export type StateOptionApiProdut = {
    loading     ?: boolean,
    product     ?: Array<ApiProduct>,
    category    ?: Array<ApiCategoryProduct>,
    transaction ?: any,
    res ?: {
        delete ?: OptionDeleteProduct
    }
}

export type OptionActionApiProduct = {
    type ?: "all" | "search" | "filter" | "default" | "delete" | "reset" | "get-category" | "update-product" | "store-product" | "transaction",
    queryDeleteProduct ?: {
        id_product ?: string
    },
    bodyUpdateProduct ?: any,
    bodyStoreProduct  ?: any,
    bodyTransaction   ?: any,
    query ?: {
        token : string
    }
}