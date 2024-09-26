export default function Button({ index, numquestions, answer, dispatch }) {
    if (answer === null) return null;

    if (index < numquestions - 1) {
        return (
            <button
                className="btn btn-ui"
                onClick={() =>
                    dispatch({
                        type: "next",
                    })
                }
            >
                Next
            </button>
        );
    }

    if (index === numquestions - 1) {
        return (
            <button
                className="btn btn-ui"
                onClick={() =>
                    dispatch({
                        type: "finish",
                    })
                }
            >
                Finish
            </button>
        );
    }
}
