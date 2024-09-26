export default function Finished({
    score,
    percentage,
    totalMarks,
    dispatch,
    highScore,
}) {
    return (
        <>
            <p className="result">
                You Scored {score} out of {totalMarks} ({percentage}%)
            </p>
            <p className="highscore">The Highscore is {highScore}</p>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "restart" })}
            >
                Restart Quiz
            </button>
        </>
    );
}
