import { useQuiz } from "../context/QuestionProvider";

export default function Header() {
    const { index, questionsNumber, score, answer } = useQuiz();

    return (
        <header className="progress">
            <progress
                max={questionsNumber}
                value={index + Number(answer !== null)}
            ></progress>
            <p>
                Question <strong>{index + 1}</strong>/{questionsNumber}
            </p>
            <p>{score}/280</p>
        </header>
    );
}
