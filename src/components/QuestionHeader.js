export default function Header({ index, numQuestions, score, answer }) {
    return (
        <header className="progress">
            <progress
                max={numQuestions}
                value={index + Number(answer !== null)}
            ></progress>
            <p>
                Question <strong>{index + 1}</strong>/{numQuestions}
            </p>
            <p>{score}/280</p>
        </header>
    );
}
