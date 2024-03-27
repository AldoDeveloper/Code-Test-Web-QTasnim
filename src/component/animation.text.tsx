import React from "react";
import AnimatedNumber from "react-animated-numbers";

export default function AnimationNumberChanges({ targetNumber, style, className }: { targetNumber?: number, style?: React.CSSProperties, className?: string }) {

    const [number, setNumber] = React.useState<number>(0);
    React.useEffect(() => {
        setNumber(targetNumber as number)
    }, [targetNumber]);

    return (
        <React.Fragment>
            <AnimatedNumber
                includeComma={false}
                className={className}
                animateToNumber={number}
                fontStyle={{ ...style }}
                transitions={(index) => ({
                    type: "spring",
                    duration: index + 0.3,
                })}
            />
        </React.Fragment>
    )
}