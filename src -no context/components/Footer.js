import Timer from "./Timer";
import Button from "./Buttons";

export default function Footer({
    answer,
    dispatch,
    index,
    numQuestions,
    time,
}) {
    return (
        <footer>
            <Timer dispatch={dispatch} time={time} />
            <Button
                index={index}
                numquestions={numQuestions}
                answer={answer}
                dispatch={dispatch}
            />
        </footer>
    );
}
