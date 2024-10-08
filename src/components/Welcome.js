import { useQuiz } from "../context/QuestionProvider";

export default function Welcome() {
    const { questionsNumber, dispatch } = useQuiz();

    return (
        <div className="start">
            <h2>Welcome to React Quiz!!</h2>
            <h3>
                {questionsNumber} question to test your react understanding.
            </h3>
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
