import Timer from "./Timer";
import Button from "./Buttons";
import { useQuiz } from "../context/QuestionProvider";

export default function Footer() {
    const { answer, dispatch, index, questionsNumber, time } = useQuiz();

    return (
        <footer>
            <Timer dispatch={dispatch} time={time} />
            <Button
                index={index}
                numquestions={questionsNumber}
                answer={answer}
                dispatch={dispatch}
            />
        </footer>
    );
}
