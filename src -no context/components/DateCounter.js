import { useReducer } from "react";

const intitialState = { count: 0, step: 1 };

//reducer function takes in the current state and the action as arguments
function reducer(state, action) {
    switch (action.type) {
        case "decrease": {
            return { ...state, count: state.count - 1 };
        }
        case "increase": {
            return { ...state, count: state.count + 1 };
        }
        case "defineCount": {
            return { ...state, count: action.count };
        }
        case "defineStep": {
            return { ...state, step: action.step };
        }
        case "reset": {
            return intitialState;
        }
        default:
            throw new Error("Action not found");
    }
}

function DateCounter() {
    //useReducer takes in the reducer function and the initialState
    const [state, dispatch] = useReducer(reducer, intitialState);

    const { count, step } = state;

    // This mutates the date object.
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + count);

    function decrease() {
        dispatch({ type: "decrease" });
    }

    function increase() {
        dispatch({ type: "increase" });
    }

    function defineCount(e) {
        dispatch({
            type: "defineCount",
            count: Number(e.target.value),
        });
    }

    function defineStep(e) {
        dispatch({ type: "defineStep", step: Number(e.target.value) });
    }

    function reset() {
        dispatch({ type: "reset" });
    }

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={step}
                    onChange={defineStep}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={decrease}>-</button>
                <input value={count} onChange={defineCount} />
                <button onClick={increase}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}
export default DateCounter;
