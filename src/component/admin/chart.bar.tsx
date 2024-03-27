import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Label, Tooltip, Legend, LabelList } from 'recharts';
import { Card } from 'primereact/card'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { getRandomInt } from "../../help/help"

const defaultData = [
    {
        name: "Value",
        value1: 45,
        value2: 40,
        day: "Mon",
        created_at: new Date().toLocaleTimeString(),
    },
    {
        name: "Value",
        value1: 30,
        value2: 80,
        day: "Tus",
        created_at: new Date().toLocaleTimeString(),
    },
    {
        name: "Value",
        value1: 60,
        value2: 50,
        day: "Wed",
        created_at: new Date().toLocaleTimeString(),
    },
    {
        name: "Value",
        value1: 100,
        value2: 56,
        day: "Thu",
        created_at: new Date().toLocaleTimeString(),
    },
    {
        name: "Value",
        value1: 110,
        value2: 22,
        day: 'Fri',
        created_at: new Date().toLocaleTimeString(),
    },
    {
        name: "Value",
        value1: 94,
        value2: 42,
        day: "Sat",
        created_at: new Date().toLocaleTimeString(),
    },
    {
        name: "Value",
        value1: 94,
        value2: 42,
        day: "Sun",
        created_at: new Date().toLocaleTimeString(),
    },
];

interface PropsStateChart {
    dataValueBar?: typeof defaultData
}

export default class ChartBarAdmin extends React.PureComponent<any, PropsStateChart> {

    private intervalId?: number;
    public constructor(props: any) {
        super(props);
        this.BarRoundOptions = this.BarRoundOptions.bind(this);
        this.TitleCardBar = this.TitleCardBar.bind(this);
        this.custumizedLableBar = this.custumizedLableBar.bind(this);
        this.state = {
            dataValueBar: defaultData
        }
    }

    public componentDidMount(): void {
        this.intervalId = setInterval(() => {
            const valueUpdateData = this.state.dataValueBar?.map((props) => {
                return {
                    ...props,
                    value1: getRandomInt(10, 100),
                    value2: getRandomInt(10, 100)
                }
            });

            this.setState((props) => {
                return {
                    ...props,
                    dataValueBar: valueUpdateData
                }
            })
        }, 3000)
    }

    public componentWillUnmount(): void {
        clearInterval(this.intervalId)
    }

    public custumizedLableBar(props: any) {
        const { x, y } = props;
        return (
            <>
                <g>
                    <image
                        href="/img_aldo.png"
                        width={20}
                        height={20}
                        x={x + 1}
                        y={y - 22.5} />
                </g>
            </>
        )
    }

    public BarRoundOptions(props: any): React.ReactNode | React.ReactElement {
        const { x, y, width, height, background, value } = props;

        return (
            <React.Fragment>
                <g>
                    <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        rx={5}
                        ry={5}
                        fill={background} />
                    <text
                        x={x + width / 2}
                        y={y + value[1] * 1.5 / 2}
                        fill="#fff"
                        fontSize={8}
                        fontWeight={"bold"}
                        textAnchor="middle"
                        dominantBaseline="middle">
                        {String(value[1]) + "%"}
                    </text>
                </g>
            </React.Fragment>
        )
    }

    public TitleCardBar(): React.ReactNode | React.ReactElement {
        return (
            <React.Fragment>
                <div className="flex w-full align-items-center justify-content-between">
                    <h5 className="text-600">Value</h5>
                    <BsThreeDotsVertical size={22} className="text-600" />
                </div>
            </React.Fragment>
        )
    }

    public render(): React.ReactNode {
        return (
            <React.Fragment>
                <Card className="w-full box-shadow-card" title={this.TitleCardBar}>
                    <ResponsiveContainer width={"100%"} height={230}>
                        <BarChart
                            data={this.state.dataValueBar}
                            margin={{
                                top: 0,
                                right: 10,
                                left: 10,
                                bottom: 10
                            }}
                            barSize={22}>
                            <XAxis
                                fontSize={10}
                                fontWeight={"bold"}
                                dataKey={"day"}
                                strokeWidth={1.5}
                                stroke={'#8884d8'}>
                                <Label
                                    value="Date Time"
                                    fontWeight={"200"}
                                    stroke="#8884d8"
                                    fontSize={12}
                                    offset={-5}
                                    position="insideBottom" />
                            </XAxis>
                            <Tooltip cursor={false} />
                            <defs>
                                <clipPath id="round">
                                    <rect width={17} height={17} rx="20" ry="20" />
                                </clipPath>
                            </defs>
                            <Legend verticalAlign="top" height={40} />
                            <Bar
                                dataKey={"value1"}
                                stackId={"a"}
                                shape={(props: any) => <this.BarRoundOptions {...props} background={'var(--green-400)'} />}
                                fill="var(--green-400)">
                                <LabelList dataKey={"value2"} content={(props) => <this.custumizedLableBar {...props} />} />
                            </Bar>
                            <Bar
                                dataKey={"value2"}
                                stackId={"b"}
                                fill="var(--blue-400)"
                                shape={(props: any) => <this.BarRoundOptions {...props} background={'var(--blue-400)'} />}>
                                <LabelList dataKey={"value2"} content={(props) => <this.custumizedLableBar {...props} />} />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </React.Fragment>
        )
    }
}