import { useEffect } from "react";
export default function Timer({ dispatch, time }) {
    //UseEffect to create a timer
    useEffect(
        function () {
            const timeHandler = setInterval(() => {
                dispatch({
                    type: "timer",
                });
            }, 1000);

            //cleanup the effect
            return function () {
                clearInterval(timeHandler);
            };
        },
        [dispatch]
    );

    // convert seconds to minutes and seconds
    const minutes = String(Math.floor(time / 60));
    const seconds = String(Math.floor(time % 60));
    return (
        <div className="timer">
            {`${minutes.padStart(2, 0)}:${seconds.padStart(2, 0)}`}
        </div>
    );
}
