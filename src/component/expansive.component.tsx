import React from "react";

export default function ExpansiveComponent({ count } :{ count: number}) : React.ReactNode | React.ReactElement{
    
    const countMemo = () => {
        let result = 0;
        for(let i = 0; i <= count; i++){
            result += i;
        }
        return result;
    }

    const resultCount = React.useMemo(() => countMemo(), [count]);

    return(
        <React.Fragment>
            <div>
                <p>Count : {count}</p>
                <p>ResulCount : {resultCount}</p>
            </div>
        </React.Fragment>
    )
}