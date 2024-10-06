export default function Options({ question, dispatch, answer }) {
    const hasAnswered = answer !== null;

    return (
        <div>
            <h4>{question.question}</h4>
            <div className="options">
                {question.options.map((opt, idx) => (
                    <button
                        className={`btn btn-option ${
                            idx === answer ? "answer" : ""
                        } ${
                            hasAnswered
                                ? idx === question.correctOption
                                    ? "correct"
                                    : "wrong"
                                : ""
                        }`}
                        key={idx}
                        disabled={hasAnswered}
                        onClick={() => {
                            console.log(answer === question.correctOption);
                            dispatch({
                                type: "selectedAnswer",
                                payload: idx,
                            });
                        }}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}
