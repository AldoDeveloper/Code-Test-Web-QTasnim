import { Badge } from "primereact/badge";
import React from "react";
import { motion } from "framer-motion";
import WavesCard from "./wave.card";
import { Tag } from 'primereact/tag'
import { BsArrowDown, BsEnvelope } from "react-icons/bs";
import { OptionCardDash } from '../../../types/map.type';
import AnimationNumberChanges from "../animation.text";
import { CircularProgresBar } from "../circular.progress.bar";

interface PropsState {
    toogle?: boolean,
    arrowNotif?: {
        show?: {
            transform?: string,
            transition?: string,
            scale?: string | number
        },
        hidde?: {
            transform?: string,
            transition?: string,
            scale?: string | number
        }
    }
}

export default class CardDash extends React.Component<OptionCardDash, PropsState> {

    public constructor(props: OptionCardDash) {
        super(props);
        this.state = {
            toogle: false,
            arrowNotif: {
                show: {
                    transform: 'rotate(180deg)',
                    transition: '0.3s ease-in-out',
                },
                hidde: {
                    transform: 'rotate(0deg)',
                    transition: '0.3s ease-in-out',
                }
            }
        };
        this.handleClick = this.handleClick.bind(this);
        this, this.ComponentProgressBar = this.ComponentProgressBar.bind(this)
    }

    public handleClick(): void {
        this.setState((props) => {
            return {
                ...props,
                toogle: !this.state.toogle
            }
        })
    }

    public ComponentProgressBar(): React.ReactNode | React.ReactElement {
        const { progresBar } = this.props;
        return (
            <React.Fragment>
                <CircularProgresBar
                    value={progresBar?.value as number}
                    strokeWidth={14}
                    minValue={0}
                    maxValue={100}
                    strokeColor={this.props.progresBar?.colorStroke}
                    strokeLinecap="round"
                    textFontSize={10}
                    textColor="text-600" />
            </React.Fragment>
        )
    }

    public render(): React.ReactNode {

        const {
            wave,
            badges,
            style,
            cardTitle,
            progresBar
        } = this.props;

        return (
            <React.Fragment>
                <motion.div
                    className={`relative card-dash ${this.props.className}`}
                    onClick={this.handleClick}
                    style={{ ...style }}>
                    {
                        cardTitle && (
                            <div className="card-dash-header text-600">
                                { cardTitle }
                            </div>
                        )
                    }
                    <div className="card-dash-body z-5 relative pb-4">
                        <div className="flex justify-content-between align-items-center">
                            <div className="flex gap-2">
                                <div className="text-green-500"><h2>{progresBar?.value}</h2></div>
                                <span className="align-self-center">
                                    <Tag
                                        style={{
                                            width: 20,
                                            height: 20,
                                            marginRight: "5px",
                                            padding: '5px 10px',
                                            backgroundColor: 'var(--green-400)'
                                        }}
                                        className="align-self-center"
                                        value={
                                            <BsArrowDown
                                                size={12}
                                                style={this.state.toogle ? { ...this.state.arrowNotif?.show } : this.state.arrowNotif?.hidde}
                                                className="font-bold mt-1" />}
                                        rounded={true} />
                                    <span className="text-xs text-green-400 font-bold">18%</span>
                                </span>
                            </div>
                        </div>
                        {this.props.children}
                    </div>
                    <div
                        className="absolute"
                        style={{ width: 40, height: 40, top: 22, right: 10 }}>
                        <this.ComponentProgressBar />
                    </div>
                    {
                        wave && (
                            <div
                                className="absolute"
                                style={{ right: 0, left: 0, bottom: -5 }}>
                                <WavesCard backgroundColor={progresBar?.colorStroke} />
                            </div>
                        )
                    }
                    {
                        badges && (
                            <div
                                className="absolute"
                                style={{ top: -10, left: -5 }}>
                                <Badge
                                    size={"normal"}
                                    style={{
                                        backgroundColor: progresBar?.colorStroke ? progresBar.colorStroke : 'var(--main--color)'
                                    }}
                                    value={<BsEnvelope size={10} className="font-bold" />} />
                            </div>
                        )
                    }
                </motion.div>
            </React.Fragment>
        )
    }
}