export default function Welcome({ numQuestions, dispatch }) {
    return (
        <div className="start">
            <h2>Welcome to React Quiz!!</h2>
            <h3>{numQuestions} question to test your react understanding.</h3>
            <button
                className="btn btn-ui"
                onClick={() => {
                    dispatch({ type: "start" });
                }}
            >
                Begin
            </button>
        </div>
    );
}
