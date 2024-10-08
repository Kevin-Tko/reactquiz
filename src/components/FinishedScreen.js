import { useQuiz } from "../context/QuestionProvider";

export default function Finished() {
    const { score, percentage, totalMarks, dispatch, highScore } = useQuiz();

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
