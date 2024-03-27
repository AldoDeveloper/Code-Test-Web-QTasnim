import React from "react"
import { CircularProgresBar } from "../circular.progress.bar";
import { Card } from "primereact/card";

export const Progress = (): React.ReactNode | React.ReactElement => {

    const TitleCardProgress = (
        <div className="flex justify-content-between align-items-center mb-2">
            <h5 className="text-700">Progress</h5>
        </div>
    )
    return (
        <Card
            title={TitleCardProgress}
            className="w-full box-shadow-card border-card">
            <div className="grid justify-content-center gap-4 md:gap-2 lg:gap-0 xl:gap-0 align-items-center">
                <div className="col-3 md:col-4">
                    <CircularProgresBar
                        value={50}
                        strokeWidth={16}
                        minValue={0}
                        maxValue={100}
                        strokeColor={'rgba(10, 10, 240, 0.7)'}
                        strokeLinecap="round"
                        textFontSize={10}
                        textColor="text-600" />
                    <p className="text-center text-xl md:text-xs mt-2 font-semibold">Progress</p>
                </div>

                <div className="col-3 md:col-4">
                    <CircularProgresBar
                        value={79}
                        strokeWidth={16}
                        minValue={0}
                        maxValue={100}
                        strokeColor={'rgba(250, 20, 20, 0.7)'}
                        strokeLinecap="round"
                        textFontSize={10}
                        textColor="text-600" />
                    <p className="text-center text-xl md:text-xs mt-2 font-semibold">Progress</p>
                </div>
                <div className="col-3 md:col-4">
                    <CircularProgresBar
                        value={30}
                        strokeWidth={16}
                        minValue={0}
                        maxValue={100}
                        strokeColor={"rgba(80, 200, 50, 0.7)"}
                        strokeLinecap="round"
                        textFontSize={10}
                        textColor="text-600" />
                    <p className="text-center text-xl md:text-xs mt-2 font-semibold">Progress</p>
                </div>
            </div>
        </Card>
    )
}