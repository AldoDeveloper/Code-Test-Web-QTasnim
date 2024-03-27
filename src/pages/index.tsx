
import React from "react";
import CardDash from "../component/Card/card.dash";
import DataTableIndex from "../component/datatable/table.admin";
import TopScrool from "../component/top.scrool";
import { ContextAdminProps } from "../context/context.property";
import { PropsValueAdmin } from "../../types/map.type";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { BsBoxes } from "react-icons/bs";
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";
import { useCookies } from "react-cookie";


interface DateProps{
    startDate ?: Nullable<Date>,
    endDate   ?: Nullable<Date>,
}
export default function PagesRootIndexAdmin(): React.ReactNode | React.ReactElement {

    const { api } = React.useContext<PropsValueAdmin>(ContextAdminProps);
    const [visibleDialog, setVisibleDialog] = React.useState<boolean>(false);
    const product = api?.propsApiProduct?.product;
    const category = api?.propsApiProduct?.category;
    const action = api?.action;
    const transaction = api?.propsApiProduct?.transaction;
    const [dateds, setDateds] = React.useState<DateProps>({});
    const [cookie] = useCookies();

    const [intervalNumber, setIntervalNumber] = React.useState<{
        value1?: number,
        value2?: number,
        value3?: number
    }>({ value1: 10, value2: 10, value3: 10 });

    React.useEffect(() => {

    }, [intervalNumber]);

    const TitleCard = () => {
        return (
            <div className="flex justify-content-between align-items-center">
                <h4 className="text-700">Transaksi Terandah Dan Terbanyak</h4>
                <Button onClick={() => setVisibleDialog(true)} severity="info" rounded icon={() => <BsBoxes />} />
            </div>
        )
    }

    const HeaderDialog = () => {
        return (
            <h3 className="text-center">Filter Transaksi Produk</h3>
        )
    }

    const handleSubmitesRange = () => {
        api?.action({
            type: "filter",
            query:{
                token: cookie?.AUTH_TOKEN,
            },
            bodyTransaction: dateds
        })  as any;
        setVisibleDialog(false);
        setDateds({})
    }
    return (
        <React.Fragment>
            <Dialog
                header={HeaderDialog}
                style={{
                    width: '40vw'
                }}
                visible={visibleDialog}
                onHide={() => setVisibleDialog(false)}>

                <div className="grid">
                    <div className="col-12 md:col-6">
                        <p className="text-700 mb-2">Start Date</p>
                        <Calendar
                            className="w-full box-shadow-card"
                            style={{ borderRadius: '10px' }}
                            value={dateds.startDate}
                            onChange={(e) => setDateds((props) => {
                                return{
                                    ...props,
                                    startDate: e.value
                                }
                            })} />
                    </div>
                    <div className="col-12 md:col-6">
                        <p className="text-700 mb-2">End Date</p>
                        <Calendar
                            className="w-full box-shadow-card"
                            style={{ borderRadius: '10px' }}
                            value={dateds.endDate}
                            onChange={(e) => setDateds((props) => {
                                return {
                                    ...props,
                                    endDate: e.value
                                }
                            })} />
                    </div>
                    <div className="col-12">
                        <div className="flex justify-content-end">
                            <Button onClick={handleSubmitesRange} style={{width: "120px"}} rounded label="submited" />
                        </div>
                    </div>
                </div>
            </Dialog>
            <div className="grid-nogutter mt-3">
                <Card className="box-shadow-card"
                    title={TitleCard}>
                    <div className="col-12">
                        <h4 className="mb-3 text-700">Product Terjual Terbanyak</h4>
                        <div className="grid">
                            {
                                transaction?.penjual_terbanyak?.map((val: any, key: number) => (
                                    <div key={key} className="col-12 md:col-4 lg-col-4">
                                        <CardDash
                                            badges={true}
                                            wave={true}
                                            className="fade-in-bottom-right"
                                            cardTitle={<><h4>{val?.product_name}</h4></>}
                                            style={{ paddingBlock: '15px' }}
                                            waves={{ backgroundColor: 'rgba(50, 150, 250, 0.7)' }}
                                            progresBar={{
                                                colorStroke: 'rgba(80, 150, 250, 0.7)',
                                                value: val?.product_sold,
                                                typeStrokeLineCap: 'round'
                                            }}>
                                            <span className="text-700">Lorem ipsum dolor sit amet.</span>
                                        </CardDash>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-12">
                        <h4 className="mb-3 text-700">Product Terjual Terendah</h4>
                        <div className="grid">
                            {
                                transaction?.penjual_terndah?.map((val: any, key: number) => (
                                    <div key={key} className="col-12 md:col-4 lg-col-4">
                                        <CardDash
                                            badges={true}
                                            wave={true}
                                            className="fade-in-bottom-right"
                                            cardTitle={<><h4>{val?.product_name}</h4></>}
                                            style={{ paddingBlock: '15px' }}
                                            waves={{ backgroundColor: 'rgba(50, 150, 250, 0.7)' }}
                                            progresBar={{
                                                colorStroke: 'rgba(80, 150, 250, 0.7)',
                                                value: val?.product_sold,
                                                typeStrokeLineCap: 'round'
                                            }}>
                                            <span className="text-700">Lorem ipsum dolor sit amet.</span>
                                        </CardDash>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-12">
                        <h4 className="mb-3 text-700">Product Stock Terbanyak</h4>
                        <div className="grid">
                            {
                                transaction?.stock_terbanyak?.map((val: any, key: number) => (
                                    <div key={key} className="col-12 md:col-4 lg-col-4">
                                        <CardDash
                                            badges={true}
                                            wave={true}
                                            className="fade-in-bottom-right"
                                            cardTitle={<><h4>{val?.product_name}</h4></>}
                                            style={{ paddingBlock: '15px' }}
                                            waves={{ backgroundColor: 'rgba(50, 150, 250, 0.7)' }}
                                            progresBar={{
                                                colorStroke: 'rgba(80, 150, 250, 0.7)',
                                                value: val?.product_stock,
                                                typeStrokeLineCap: 'round'
                                            }}>
                                            <span className="text-700">Lorem ipsum dolor sit amet.</span>
                                        </CardDash>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-12">
                        <h4 className="mb-3 text-700">Product Stock Terendah</h4>
                        <div className="grid">
                            {
                                transaction?.stock_terendah?.map((val: any, key: number) => (
                                    <div key={key} className="col-12 md:col-4 lg-col-4">
                                        <CardDash
                                            badges={true}
                                            wave={true}
                                            className="fade-in-bottom-right"
                                            cardTitle={<><h4>{val?.product_name}</h4></>}
                                            style={{ paddingBlock: '15px' }}
                                            waves={{ backgroundColor: 'rgba(50, 150, 250, 0.7)' }}
                                            progresBar={{
                                                colorStroke: 'rgba(80, 150, 250, 0.7)',
                                                value: val?.product_stock,
                                                typeStrokeLineCap: 'round'
                                            }}>
                                            <span className="text-700">Lorem ipsum dolor sit amet.</span>
                                        </CardDash>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </Card>
                <div className="col-12 mt-3">
                    <div className="grid">
                        <div className="col-12">
                            <DataTableIndex
                                category={category}
                                product={product}
                                action={action} />
                        </div>
                    </div>
                </div>
            </div>
            <TopScrool />
        </React.Fragment>
    )
}