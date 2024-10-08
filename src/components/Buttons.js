import { useQuiz } from "../context/QuestionProvider";

export default function Button() {
    const { index, questionsNumber, answer, dispatch } = useQuiz();

    if (answer === null) return null;

    if (index < questionsNumber - 1) {
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

    if (index === questionsNumber - 1) {
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
