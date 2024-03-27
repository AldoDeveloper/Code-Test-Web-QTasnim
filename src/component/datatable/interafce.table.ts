
export interface PropsOrderProductApi{
    type_product ?: string,
    name_product ?: string,
    images_product ?: string,
    count_product ?: number,
    price_product ?: number
}

export interface PropsPaymentApiOrder{
    status ?: 'PENDING' | "COMPLETED" | "FAILED",
    payment_type ?: string,
    created_at ?: Date | number | string,
    expired_at ?: Date | number | string
}

export interface PropsApi {
    readonly id?: number,
    readonly name?: string,
    readonly email?: string,
    readonly thumbnail_profile ?: string,
    readonly order_product?: PropsOrderProductApi,
    readonly payment ?: PropsPaymentApiOrder
}

export interface PropsStateTabel {
     dataValue?: Readonly<Array<PropsApi>>
}

export interface PropsMngAction {
    type    ?: Readonly<"SET" | "GET" | "DELETE" | "DEF">,
    options ?: {
        stored ?: Readonly<Array<PropsApi>>
    }
}