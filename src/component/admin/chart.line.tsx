
import React, { PureComponent, createRef } from "react";
import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip, Legend, Label } from 'recharts';
import { getRandomInt, ucFirst } from "../../help/help";
import { Card } from "primereact/card";
import { BsGearFill, BsGraphDown, BsThreeDotsVertical } from 'react-icons/bs'
import { Button } from 'primereact/button';
import { OverlayPanel } from "primereact/overlaypanel";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { StateLineChartAdmin, TypeAreaChart } from "../../../types/map.type";
import { defaultDataChartArea, optionValueRangeAreaChart, optionsValueAreaChart } from "./props/prop.chart";
import { ContextAdminProps } from "../../context/context.property";

export default class LineChartAdmin extends PureComponent<any, StateLineChartAdmin> {

    static contextType?: React.Context<any> = ContextAdminProps;
    context !: React.ContextType<typeof ContextAdminProps>;
    private intervalId?: number;
    private overplayRef = createRef<any>();

    public constructor(props: any) {
        super(props);
        this.state = {
            data: defaultDataChartArea,
            option: {
                typeAreaChart: {
                    name: 'bump',
                },
                rangeChart: {
                    name: -25,
                }
            }
        }
        this.CustomizedDot = this.CustomizedDot.bind(this);
        this.TitleAreaChart = this.TitleAreaChart.bind(this);
        this.RealtimeMode = this.RealtimeMode.bind(this);
    }

    public componentDidUpdate(
        prevProps: Readonly<any>,
        prevState: Readonly<StateLineChartAdmin>,
        __?: any): void {
        if (prevState.option?.rangeChart?.name !== this.state.option?.rangeChart?.name) { }
        if (prevProps) { }
    }

    public componentDidMount(): void {
        this.RealtimeMode();
    }

    public componentWillUnmount(): void {
        clearInterval(this.intervalId)
    }

    public RealtimeMode(): void {
        this.intervalId = setInterval(() => {
            this.setState((props) => {
                return {
                    ...props,
                    data: [...props.data as any, {
                        name: "Temp",
                        value: getRandomInt(10, 1000),
                        created_at: new Date().toLocaleTimeString(),
                    }].slice(this.state.option?.rangeChart?.name as number)
                }
            })
        }, 1500);
    }

    public CustomizedDot(props: any): JSX.Element {
        const { cx, cy, value } = props
        return (
            <g>
                <circle cx={cx} cy={cy} r={3} fill="#50c5ff" />
                <Label value={value} position="top" />
            </g>
        );
    }

    public onClickChangeAreaChart = () => {
        this.setState((props) => {
            return {
                ...props,
                option: {
                    ...props.option,
                    typeAreaChart: {
                        name: "bump",
                        icon: <BsGearFill />
                    }
                }
            }
        })
    }

    public ItemTemplate = (props: TypeAreaChart) => {
        if (props) {
            return (
                <React.Fragment>
                    <div className="flex align-items-center py-2 px-3 gap-2">
                        <BsGraphDown
                            size={16}
                            className="font-bold"
                            fontWeight={"20px"}
                            color="orange" />
                        <div className="text-600 font-semibold">{ucFirst(props?.name as string)}</div>
                    </div>
                </React.Fragment>
            )
        }
    }

    public ItemTemplateRangeChart = (props: TypeAreaChart) => {
        if (props) {
            return (
                <React.Fragment>
                    <div className="flex align-items-center py-2 px-3 gap-2">
                        <BsGearFill
                            size={16}
                            color="orange" />
                        <div className="text-600 font-semibold">{String(props?.name)}</div>
                    </div>
                </React.Fragment>
            )
        }
    }

    public TitleAreaChart(): React.ReactNode | React.ReactElement {
        const { option } = this.state;
        const { propsContextApp } = this.context;

        return (
            <React.Fragment>
                <div className="flex justify-content-between">
                    <h5 className="text-600">Revenue</h5>
                    <div>
                        <Button
                            rounded
                            className="text-600 btn-non-active"
                            style={{ background: "none", border: "none" }}
                            onClick={(event) => this.overplayRef.current?.toggle(event)}
                            icon={(__) => <BsThreeDotsVertical size={22} color="text-600" />} />
                        <OverlayPanel
                            className={`py-2 px-2 ${propsContextApp?.darkMode ? 'surface-800' : ''}`}
                            ref={this.overplayRef}
                            style={{ borderRadius: '8px' }}>
                            <div className="grid p-fluid">
                                <div className="col-12 md:col-6">
                                    <span className="font-semibold text-500 mb-2">Type Chart</span>
                                    <Dropdown
                                        value={option?.typeAreaChart}
                                        onChange={(e: DropdownChangeEvent) => this.setState((props) => {
                                            return {
                                                ...props,
                                                option: {
                                                    ...props.option,
                                                    typeAreaChart: e.value
                                                }
                                            }
                                        })}
                                        className="w-full md:w-12rem mt-2"
                                        optionLabel="name"
                                        valueTemplate={(props) => <span className="text-500 font-semibold">{ucFirst(props?.name)}</span>}
                                        itemTemplate={this.ItemTemplate}
                                        placeholder={"Select Type"}
                                        options={optionsValueAreaChart} />
                                </div>
                                <div className="col-12 md:col-6">
                                    <span className="font-semibold text-500 mb-2">Range Chart</span>
                                    <Dropdown
                                        value={option?.rangeChart}
                                        onChange={(e: DropdownChangeEvent) => this.setState((props) => {
                                            return {
                                                ...props,
                                                option: {
                                                    ...props.option,
                                                    rangeChart: e.value
                                                }
                                            }
                                        })}
                                        className="w-full md:w-12rem mt-2"
                                        optionLabel="name"
                                        valueTemplate={(props) => <span className="text-500 font-semibold">{String(props?.name)}</span>}
                                        itemTemplate={this.ItemTemplateRangeChart}
                                        options={optionValueRangeAreaChart} />
                                </div>
                            </div>
                        </OverlayPanel>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    public render(): React.ReactNode {
        const { data, option } = this.state;
        return (
            <Card
                className="w-full box-shadow-card"
                title={this.TitleAreaChart}>
                <ResponsiveContainer width={"100%"} height={230}>
                    <AreaChart data={data}
                        margin={{
                            top: 0,
                            right: 10,
                            left: 10,
                            bottom: 10
                        }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#50c5ff" stopOpacity={0.6} />
                                <stop offset="95%" stopColor="#50c5ff" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Legend verticalAlign="top" height={30} />
                        <Area
                            type={option?.typeAreaChart?.name as any}
                            dataKey={"value"}
                            strokeWidth={1.5}
                            stroke="#50c5ff"
                            fill="url(#colorUv)"
                            dot={(props) => <this.CustomizedDot {...props} />}
                            isAnimationActive={true}
                            animationDuration={400}>
                        </Area>
                        <XAxis
                            fontSize={10}
                            dataKey={"created_at"}
                            strokeWidth={1.5}
                            stroke={'#50c5ff'}>
                            <Label
                                value="Date Time"
                                fontWeight={"200"}
                                stroke="#50c5ff"
                                fontSize={12}
                                offset={-5}
                                position="insideBottom" />
                        </XAxis>
                        <Tooltip
                            labelFormatter={() => ''}
                            formatter={(value) => value as number}
                            labelStyle={{ padding: 0, margin: 0 }}
                            position={{ x: 30, y: -30 }}
                            contentStyle={{
                                borderRadius: 5,
                                outline: "none",
                                border: 'none',
                                boxShadow: '1px 2px 2px 1px rgba(0, 0, 0, 0.2)'
                            }} />
                    </AreaChart>
                </ResponsiveContainer>
            </Card>
        )
    }
}


