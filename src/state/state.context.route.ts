import { atom } from "jotai";
import { ApiProduct, AuthUser, OptionActionApiProduct, PropsActionContextState, PropsActionType, PropsActionTypeSettingAdmin, PropsContextApp, PropsSettingComponentAdmin, StateOptionApiProdut } from '../../types/map.type';
import { toast } from 'react-toastify';


export const url = "http://localhost:4500/v1/"
export const UserRootContext = atom<AuthUser>({
    auth: false,
});

export const DeriviedRootUser = atom((get) => get(UserRootContext), (__, set, action: PropsActionType) => {
    switch (action.type) {
        case 'login':
            set(UserRootContext, (args) => {
                const id = toast.loading("Loading", {
                    theme: "colored"
                });
                setTimeout(() => {
                    fetch(`${url}auth/login`, {
                        headers: { "Content-Type": "application/json" },
                        method: "POST",
                        body: JSON.stringify(action.bodyLogin)
                    }).then(async (response) => {
                        if (response.status === 201 && response.ok) {
                            const resSuccess = await response.json()
                            toast.done(id);
                            toast.success("Login Berhasil", {
                                theme: "colored"
                            });

                            set(UserRootContext, (args) => {
                                return {
                                    ...args,
                                    loading: false,
                                    error: undefined,
                                    resSuccess: {
                                        ...resSuccess
                                    }
                                }
                            });
                        } else {
                            const resErr = await response.json();
                            set(UserRootContext, (args) => {
                                toast.done(id);
                                toast.error(`Error! ${resErr?.message}`, {
                                    autoClose: 2000,
                                    theme: "colored"
                                });
                                return {
                                    ...args,
                                    loading: false,
                                    error: resErr
                                }
                            })
                        }
                    });
                }, 2000)
                return {
                    ...args,
                    loading: true,
                    users: action.users
                }
            });
            break;
        default:
            break;
    }
});

DeriviedRootUser.onMount = (set) => {

}


export const SettingComponentAdmin = atom<PropsSettingComponentAdmin>({});
export const DeriviedSettingComponentAdmin = atom((get) => get(SettingComponentAdmin), (get, set, action: PropsActionTypeSettingAdmin) => {

    const props = get(SettingComponentAdmin);

    switch (action.type) {
        case 'set':
            set(SettingComponentAdmin, (args) => {
                return {
                    ...args,
                    setting: action.setting
                }
            });
            break;
        case 'set_actived_side':
            set(SettingComponentAdmin, (__) => {
                return {
                    ...props.setting,
                    setting: {
                        toogle_actived_notif: !props.setting?.toogle_actived_notif
                    }
                }
            });
            break
        default:
            break
    }
})

DeriviedSettingComponentAdmin.onMount = (set) => {
    set({
        type: 'set',
        setting: {
            '--width-sidebar': '215px',
            visibleSidebar: false,
            toogle_actived_notif: false
        }
    })
}

export const SettingPropsContextApp = atom<PropsContextApp>({})
export const DeriviedStateContextApp = atom((get) => get(SettingPropsContextApp), (get, set, action: Readonly<PropsActionContextState>) => {

    const updateProps = get(SettingPropsContextApp);

    switch (action?.type) {
        case 'setMode':
            set(SettingPropsContextApp, (args) => {
                return {
                    ...args,
                    darkMode: !updateProps.darkMode
                }
            });
            break;
        case 'def':
            if (action?.type == 'def' && action?.mode == undefined) {
                set(SettingPropsContextApp, (__) => {
                    return {
                        darkMode: false
                    }
                });
                return;
            };
            set(SettingPropsContextApp, (__) => {
                return {
                    darkMode: action.mode
                }
            })
            break;
        case 'resize':
            set(SettingPropsContextApp, (props) => {
                return {
                    ...props,
                    resizeWindow: action?.resizeValue
                }
            })
            break;
        default:
            break
    }
});

DeriviedStateContextApp.onMount = (set) => {
    set({ type: "def" });
}

export const Product = atom<StateOptionApiProdut>({});

export const DeriviedApiProduct = atom((get) => get(Product), (__, set, action: OptionActionApiProduct) => {

    switch (action.type) {
        case 'all':
            fetch(`${url}product/find`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${action.query?.token}`
                }
            }).then(async (res) => {
                if (res.status === 200 && res.ok) {
                    const body = await res.json();
                    set(Product, (args) => {
                        return {
                            ...args,
                            loading: false,
                            product: body
                        }
                    })
                }
            });

            fetch(`${url}product/transaction`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${action.query?.token}`
                }
            }).then(async (res) => {
                if (res.status === 200 && res.ok) {
                    const body = await res.json();
                    set(Product, (args) => {
                        return {
                            ...args,
                            transaction: body
                        }
                    })
                }
            });
            break;
        case "default":
            set(Product, (args) => {
                return {
                    ...args,
                    loading: true,
                    product: []
                }
            });
            break;

        case "delete":
            const apiUrlDelete = `${url}product/remove`;
            const id = toast.loading("Loading Delete");
            fetch(apiUrlDelete, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${action.query?.token}`
                },
                body: JSON.stringify(action.queryDeleteProduct)
            }).then(async (res) => {
                if (res.status === 200 && res.ok) {
                    const responseBody = await res.json();
                    toast.done(id);
                    toast.success("Delete Success", {
                        autoClose: 1500,
                        theme: "colored"
                    })
                    set(Product, (args) => {
                        return {
                            ...args,
                            res: {
                                delete: {
                                    loading: false,
                                    error: undefined,
                                    data: responseBody
                                }
                            }
                        }
                    })
                } else {
                    const responseBody = await res.json();
                    toast.done(id);
                    toast.error("Delete Error", {
                        autoClose: 1500,
                        theme: "colored"
                    })
                    set(Product, (args) => {
                        return {
                            ...args,
                            res: {
                                delete: {
                                    loading: false,
                                    error: responseBody
                                }
                            }
                        }
                    })
                }
            });
            break;

        case "reset":
            const ids = toast.loading("Refresh");
            fetch(`${url}product/find`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${action.query?.token}`
                }
            }).then(async (res) => {
                if (res.status === 200 && res.ok) {
                    const body = await res.json();
                    toast.done(ids);
                    toast.success("List Product Berhasil di refresh")
                    set(Product, (args) => {
                        return {
                            ...args,
                            loading: false,
                            product: body
                        }
                    })
                }
            });
            break;
        case "default":
            set(Product, (args) => {
                return {
                    ...args,
                    loading: true,
                    product: []
                }
            });
            break;
        case "get-category":
            fetch(`${url}category/find`, {
                method: "GET",
                headers: {
                    "Conten-Type": "application/json",
                    "Authorization": `Bearer ${action.query?.token}`,
                }
            }).then(async (res) => {
                if (res.status === 200 && res.ok) {
                    const categoryBody = await res.json();
                    set(Product, (args) => {
                        return {
                            ...args,
                            category: categoryBody
                        }
                    })
                }
            });
            break;
        case "update-product":
            const idss = toast.loading("Loading Update")
            fetch(`${url}product/update`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${action.query?.token}`
                },
                body: JSON.stringify(action.bodyUpdateProduct)
            }).then(async (res) => {
                if (res.status === 200 && res.ok) {
                    // const responses = await res.json();
                    toast.done(idss);
                    toast.success("Update Product Success", {
                        autoClose: 1500
                    })
                } else {
                    toast.done(idss);
                    toast.error("Update Product Gagal", {
                        autoClose: 1500
                    })
                }
            });
            break;
        case "store-product":
            const igf = toast.loading("Loading Store Product");
            fetch(`${url}product/store`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${action.query?.token}`,
                },
                body: JSON.stringify(action.bodyStoreProduct)
            }).then(async (res) => {
                if (res.status === 201 && res.ok) {
                    const responseBody = await res.json();
                    toast.done(igf);
                    toast.success("Store Product Success", {
                        autoClose: 1500,
                        theme: 'colored'
                    })
                } else {
                    const respo = await res.json();
                    toast.done(igf);
                    toast.error(respo?.message ? respo?.message : "Store Product Gagal", {
                        autoClose: 1500,
                        theme: 'colored'
                    })
                }
            });
            break;

        case "filter":

            const startDate = new Date(action.bodyTransaction.startDate);
            const endDate = new Date(action.bodyTransaction.endDate);

            const day_1 = startDate.getDate().toString().padStart(2, '0'); // Menggunakan padStart untuk menambahkan nol di depan jika hanya satu digit
            const month_1 = (startDate.getMonth() + 1).toString().padStart(2, '0'); // Bulan dimulai dari 0, sehingga perlu ditambahkan 1
            const year_1 = startDate.getFullYear();

            const day_2 = endDate.getDate().toString().padStart(2, '0'); // Menggunakan padStart untuk menambahkan nol di depan jika hanya satu digit
            const month_2 = (endDate.getMonth() + 1).toString().padStart(2, '0'); // Bulan dimulai dari 0, sehingga perlu ditambahkan 1
            const year_2 = endDate.getFullYear();

            const formattedDateStart = `${day_1}-${month_1}-${year_1}`;
            const formattedDateEnd = `${day_2}-${month_2}-${year_2}`;

            console.log(formattedDateEnd, formattedDateStart)
            const mn = toast.loading("Loading Update")
            fetch(`${url}product/transaction?start=${formattedDateStart}&end=${formattedDateEnd}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${action.query?.token}`
                }
            }).then(async (res) => {
                if (res.status === 200 && res.ok) {
                    const body = await res.json();
                    toast.done(mn)
                    toast.success("Filter Berhasil", {
                        autoClose: 1500,
                        theme: 'colored'
                    })
                    set(Product, (args) => {
                        return {
                            ...args,
                            transaction: body
                        }
                    })
                }else{
                    toast.done(mn)
                    toast.error("Filter Gagal", {
                        autoClose: 1500,
                        theme: 'colored'
                    })
                }
            });
            break;
    }
});

DeriviedApiProduct.onMount = (set) => {
    set({ type: "default" });
}