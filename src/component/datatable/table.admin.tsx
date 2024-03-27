import React from "react";
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { useAtom } from "jotai";
import { DeriviedStateTable } from "./state.table";
import { Column, ColumnProps } from "primereact/column";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { PropsApi } from "./interafce.table";
import { BsSearch, BsThreeDotsVertical, BsTrashFill, BsFillClipboard2PlusFill, BsRCircle } from 'react-icons/bs';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag'
import { FilterMatchMode } from "primereact/api";
import { ApiCategoryProduct, ApiProduct } from "../../../types/map.type";
import styles from '../../App.module.scss';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup'
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from 'primereact/dropdown';

interface StateDateTable {
    rowClick?: boolean,
    selectedProduct?: Array<PropsApi>,
    searchGlobalValue?: string,
    filters?: DataTableFilterMeta | any,
    visibleDialog?: boolean,
    visibleDialogStore?: boolean,
    bodyDialog?: ApiProduct,
    categorySelect?: ApiCategoryProduct
}

interface PropsDataTable {
    product?: Array<ApiProduct>;
    category?: Array<ApiCategoryProduct>,
    action?: any
}
export default class DataTableIndex extends React.PureComponent<PropsDataTable, Readonly<StateDateTable>> {

    public constructor(props: PropsDataTable) {
        super(props);
        this.AppTableRender = this.AppTableRender.bind(this);
        this.TitleCard = this.TitleCard.bind(this);
        this.ColumSettingTable = this.ColumSettingTable.bind(this);
        this.HeaderTable = this.HeaderTable.bind(this);
        this.confirmPopupDelete = this.confirmPopupDelete.bind(this)
        this.state = {
            rowClick: false,
            visibleDialog: false,
            searchGlobalValue: '',
            filters: {
                global: {
                    value: null,
                    matchMode: FilterMatchMode.CONTAINS
                }
            }
        }
    }

    private onChangeGlobalValue = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const value = ev.target.value;
        const __filter = { ...this.state.filters };
        __filter['global'].value = value;
        this.setState((props) => {
            return {
                ...props,
                filters: __filter,
                searchGlobalValue: value
            }
        })
    }

    public async confirmPopupDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, token: Record<string, any>, id_product: string) {
        const action = this.props.action;
        const reject = async () => {
            toast.info("Hapus Product dibatalkan", {
                autoClose: 1500,
                theme: "colored",
                position: 'bottom-right'
            });
        }

        const accept = async () => {
            action({
                type: "delete",
                query: { token: token?.AUTH_TOKEN },
                queryDeleteProduct: {
                    id_product: id_product
                }
            })
        }

        confirmPopup({
            target: event.currentTarget,
            message: 'Apakah Kamu Yakin ingin Hapus Produk Ini ?',
            icon: () => <BsTrashFill size={20} color="red" />,
            acceptClassName: 'p-button-danger',
            defaultFocus: 'reject',
            reject,
            accept
        })
    }

    private ColumSettingTable(): Readonly<Array<ColumnProps>> {
        const [cookie] = useCookies();

        console.log(this.state.bodyDialog)
        return [
            {
                selectionMode: 'multiple',
                headerStyle: { width: '3rem' },
                style: {
                    background: 'var(--bg-card-dash)',
                }
            },
            {
                header: (__) => <span className="text-center text-700">Key</span>,
                style: { background: 'var(--bg-card-dash)' },
                align: 'center',
                body(props: ApiProduct) {
                    return (
                        <Avatar
                            label={props.category?.category_name?.slice(0, 1)}
                            shape="circle"
                            size="normal"
                            className="text-white font-semibold bg-blue-400" />
                    )
                },
            },
            {
                field: "product_name",
                header: () => <span className="text-700">Nama Barang</span>,
                align: 'center',
                body: (props: ApiProduct) => {
                    return <span>{props.product_name}</span>
                },
                style: { background: 'var(--bg-card-dash)' }
            },
            {
                field: "product_stock",
                header: () => (<span className="text-700">Stock</span>),
                body: (props: ApiProduct) => {
                    return <span className="text-700">{props.product_stock}</span>
                },
                align: "center",
                style: {
                    background: 'var(--bg-card-dash)',
                    width: '1rem'
                }
            },
            {
                field: "product_sold",
                header: () => <span className="text-700">Jumlah Terjual</span>,
                align: "center",
                body: (props: ApiProduct) => {
                    const optionSaverity = () => {
                        if (props.product_sold as number >= 100) return 'success'
                        else if (props.product_sold as number < 100) return 'warning';
                        else return 'danger';
                    }
                    return (
                        <Tag
                            value={props.product_sold}
                            severity={optionSaverity()}
                            rounded />
                    )
                },
                style: {
                    background: 'var(--bg-card-dash)',
                    width: '1rem'
                }
            },
            {
                field: "created_at",
                header: () => <span className="text-700">Created At</span>,
                align: "center",
                body: (props: ApiProduct) => {
                    const dated = new Date(props.craeted_at as string)
                    return (
                        <span className="text-700">{dated.toLocaleTimeString()}</span>
                    )
                },
                style: {
                    background: 'var(--bg-card-dash)',
                    width: '1rem'
                }
            },
            {
                field: 'updated_at',
                align: 'center',
                header: () => <span className="text-700">Updated At</span>,
                body: (props: ApiProduct) => {
                    const create_order = new Date(props.updated_at as string)
                    return (
                        <span className="text-700">{create_order.toLocaleTimeString()}</span>
                    )
                },
                style: {
                    background: 'var(--bg-card-dash)',
                    width: '1rem'
                },
            },
            {
                field: 'category.category_name',
                align: 'center',
                header: () => <span className="text-700">Jenis Barang</span>,
                body: (props: ApiProduct) => {
                    return (
                        <span className="text-700">{props.category?.category_name}</span>
                    )
                },
                style: {
                    background: 'var(--bg-card-dash)',
                    width: '1rem'
                },
            },
            {
                align: 'center',
                header: () => <span className="text-700">Action</span>,
                body: (body: ApiProduct) => {
                    return (
                        <React.Fragment>
                            <div className="flex gap-2">
                                <Button onClick={(ev) => this.confirmPopupDelete(ev, cookie, body.id as string)} severity="danger" rounded icon={(props) => <BsTrashFill color="white" />} />
                                <Button onClick={() => this.setState((props) => {
                                    return {
                                        ...props,
                                        visibleDialog: true,
                                        bodyDialog: body
                                    }
                                })} severity="info" rounded icon={(props) => <BsFillClipboard2PlusFill color="white" />} />
                            </div>
                        </React.Fragment>
                    )
                },
                style: {
                    background: 'var(--bg-card-dash)',
                    width: '1rem'
                },
            }
        ];
    }

    public TitleCard(): React.ReactNode | React.ReactElement {
        return (
            <React.Fragment>
                <div className="flex justify-content-between align-items-center">
                    <h5 className="text-700">List Product</h5>
                    <div>
                        <Button
                            className="text-700 btn-non-active"
                            rounded
                            style={{ background: "none", border: "none" }}
                            icon={() => <BsThreeDotsVertical size={22} color="text-700" />} />
                    </div>
                </div>
            </React.Fragment>
        )
    }

    public HeaderTable(): React.ReactNode | React.ReactElement {

        const callback = this.props.action
        const [cookie] = useCookies();

        const handleRefresh = async () => {
            callback({
                type: "reset",
                query: { token: cookie!.AUTH_TOKEN }
            })
        }
        return (
            <React.Fragment>
                <div className="flex justify-content-between align-items-center">
                    <div>
                        <div className={styles['a-input-icon-wrapper']}>
                            <BsSearch className={styles['a-icon']} />
                            <input
                                type="text"
                                className={styles['a-large']}
                                placeholder="Search"
                                onChange={this.onChangeGlobalValue} />
                        </div>
                    </div>
                    <div>
                        <div className="flex gap-3 align-items-center">
                            <Button
                                onClick={handleRefresh}
                                rounded
                                severity="info"
                                icon={() => <BsRCircle />} />
                            <Button
                                onClick={() => this.setState((args) => {
                                    return {
                                        ...args,
                                        visibleDialogStore: true
                                    }
                                })}
                                rounded
                                severity="success"
                                icon={() => <BsRCircle />} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    public AppTableRender(): React.ReactNode {

        const [cookie] = useCookies()
        const [props, setProps] = useAtom(DeriviedStateTable);
        const product = this.props.product;
        console.log(product);

        const onSelectionChange = async (ev: any) => {
            this.setState((props) => {
                return {
                    ...props,
                    selectedProduct: ev.value
                }
            })
        }
        const HeaderDialod = ({title} : {title: string}) => {
            return (
                <div className="flex justify-content-center align-items-center">
                    <div>
                        <h4 className="text-700">{title}</h4>
                    </div>
                </div>
            )
        }

        const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
            ev.preventDefault();
            const form = new FormData(ev.target as HTMLFormElement);
            const body = Object.fromEntries(form.entries());
            this.props.action({
                type: "update-product",
                query: { token: cookie?.AUTH_TOKEN },
                bodyUpdateProduct: {
                    id_product: this.state.bodyDialog?.id,
                    body: body
                }
            });
            this.setState((props) => {
                return {
                    ...props,
                    visibleDialog: false
                }
            })
        }

        const handleSubmitStore = async (ev: React.FormEvent<HTMLFormElement>) => {
            ev.preventDefault();
            const form = new FormData(ev.target as HTMLFormElement);
            const body = Object.fromEntries(form.entries());
            this.props.action({
                type: "store-product",
                query: { token: cookie?.AUTH_TOKEN },
                bodyStoreProduct : body
            });
            this.setState((props) => {
                return {
                    ...props,
                    visibleDialogStore: false
                }
            })
        }
        return (
            <React.Fragment>
                <ConfirmPopup />
                <Dialog
                    header={<HeaderDialod title="Update Product"/>}
                    style={{ width: '45vw', borderRadius: '20px' }}
                    visible={this.state.visibleDialog}
                    onHide={() => this.setState((props) => {
                        return {
                            ...props,
                            visibleDialog: !this.state.visibleDialog,
                            bodyDialog: undefined
                        }
                    })}>
                    <form onSubmit={handleSubmit}>
                        <div className="grid justify-content-center">
                            <div className="col-12">
                                <p className="mb-2 text-600 text-lg font-semibold">Nama Product</p>
                                <InputText name="product_name" defaultValue={this.state.bodyDialog?.product_name} className="p-inputtext-lg w-full input-auth box-shadow-card" />
                            </div>
                            <div className="col-12 md:col-4">
                                <p className="mb-2 text-600 text-lg font-semibold text-center">Stock</p>
                                <InputText name="product_stock" defaultValue={this.state.bodyDialog?.product_stock as any} className="p-inputtext-lg w-full input-auth box-shadow-card" />
                            </div>
                            <div className="col-12 md:col-4">
                                <p className="mb-2 text-600 text-lg font-semibold text-center">Terjual</p>
                                <InputText name="product_sold" defaultValue={this.state.bodyDialog?.product_sold as any} className="p-inputtext-lg w-full input-auth box-shadow-card" />
                            </div>
                            <div className="col-12 md:col-4">
                                <p className="mb-2 text-600 text-lg font-semibold text-center">Category</p>
                                <InputText type="hidden" name="id_category" defaultValue={this.state.categorySelect! != undefined ? this.state.categorySelect.id : this.state.bodyDialog?.category?.id} />
                                <Dropdown
                                    value={this.state.categorySelect ? this.state.categorySelect : this.state.bodyDialog?.category}
                                    onChange={(e) => this.setState((args) => {
                                        return {
                                            ...args,
                                            categorySelect: e.value
                                        }
                                    })}
                                    itemTemplate={(props: ApiCategoryProduct) => <p className="p-2">{props.category_name}</p>}
                                    options={this.props.category}
                                    optionLabel="category_name"
                                    className="w-full input-auth box-shadow-card"
                                    style={{
                                        padding: '6px'
                                    }} />
                            </div>
                            <div className="col-12">
                                <p className="mb-2 text-600 text-lg font-semibold">Product Deskripsi</p>
                                <InputTextarea name="product_description" defaultValue={this.state.bodyDialog?.product_description as any} rows={5} className="w-full input-auth box-shadow-card" />
                            </div>
                            <div className="col-12 mt-2">
                                <div className="flex justify-content-end">
                                    <Button type="submit" style={{
                                        width: "150px",
                                    }} rounded size="large" label="Update" />
                                </div>
                            </div>
                        </div>
                    </form>
                </Dialog>
                <Card
                    title={this.TitleCard}
                    className="w-full box-shadow-card border-card">
                    <DataTable
                        dataKey="id"
                        sortField="name"
                        sortMode="multiple"
                        value={product as any}
                        paginator
                        rows={5}
                        filters={this.state.filters}
                        globalFilterFields={["product_name", "category.category_name", "product_stock", "product_sold"]}
                        className="overflow-hidden"
                        filterDisplay="row"
                        emptyMessage="Not Found"
                        selectionMode={this.state.rowClick ? null : 'checkbox'}
                        selection={this.state.selectedProduct}
                        header={this.HeaderTable}
                        onSelectionChange={onSelectionChange}>
                        {
                            this.ColumSettingTable().map((props, idx) => (
                                <Column
                                    {...props}
                                    key={idx}
                                    sortable={idx === 0 ? false : true}
                                    className="text-700" />
                            ))
                        }
                    </DataTable>
                </Card>
                <Dialog
                    header={<HeaderDialod title="Tambah Product"/>}
                    style={{ width: '45vw', borderRadius: '20px' }}
                    visible={this.state.visibleDialogStore}
                    onHide={() => this.setState((props) => {
                        return {
                            ...props,
                            visibleDialogStore: !this.state.visibleDialogStore,
                        }
                    })}>

                    <form onSubmit={handleSubmitStore}>
                        <div className="grid justify-content-center">
                            <div className="col-12">
                                <p className="mb-2 text-600 text-lg font-semibold">Nama Product</p>
                                <InputText name="product_name" className="p-inputtext-lg w-full input-auth box-shadow-card" />
                            </div>
                            <div className="col-12 md:col-4">
                                <p className="mb-2 text-600 text-lg font-semibold text-center">Stock</p>
                                <InputText name="product_stock"  className="p-inputtext-lg w-full input-auth box-shadow-card" />
                            </div>
                            <div className="col-12 md:col-4">
                                <p className="mb-2 text-600 text-lg font-semibold text-center">Terjual</p>
                                <InputText name="product_sold"  className="p-inputtext-lg w-full input-auth box-shadow-card" />
                            </div>
                            <div className="col-12 md:col-4">
                                <p className="mb-2 text-600 text-lg font-semibold text-center">Category</p>
                                <InputText type="hidden" name="id_category" defaultValue={this.state.categorySelect! != undefined ? this.state.categorySelect.id : this.state.bodyDialog?.category?.id} />
                                <Dropdown
                                    value={this.state.categorySelect ? this.state.categorySelect : this.state.bodyDialog?.category}
                                    onChange={(e) => this.setState((args) => {
                                        return {
                                            ...args,
                                            categorySelect: e.value
                                        }
                                    })}
                                    itemTemplate={(props: ApiCategoryProduct) => <p className="p-2">{props.category_name}</p>}
                                    options={this.props.category}
                                    optionLabel="category_name"
                                    className="w-full input-auth box-shadow-card"
                                    style={{
                                        padding: '6px'
                                    }} />
                            </div>
                            <div className="col-12">
                                <p className="mb-2 text-600 text-lg font-semibold">Product Deskripsi</p>
                                <InputTextarea name="product_description" rows={5} className="w-full input-auth box-shadow-card" />
                            </div>
                            <div className="col-12 mt-2">
                                <div className="flex justify-content-end">
                                    <Button type="submit" style={{
                                        width: "150px",
                                    }} rounded size="large" label="Submited" />
                                </div>
                            </div>
                        </div>
                    </form>
                </Dialog>
            </React.Fragment>
        )
    }

    public render(): React.ReactNode | React.ReactElement {
        return <this.AppTableRender />
    }
}

