import Header from "./QuestionHeader";
import Options from "./Options";
import Footer from "./Footer";

export default function Question({
    question,
    dispatch,
    answer,
    index,
    numQuestions,
    score,
    percentage,
    totalMarks,
    time,
}) {
    return (
        <>
            <Header
                index={index}
                numQuestions={numQuestions}
                score={score}
                answer={answer}
            />
            <Options
                question={question}
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
                score={score}
                percentage={percentage}
                totalMarks={totalMarks}
            />
            <Footer
                answer={answer}
                dispatch={dispatch}
                index={index}
                numQuestions={numQuestions}
                time={time}
            />
        </>
    );
}
