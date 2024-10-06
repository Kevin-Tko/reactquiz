import Loader from "./Loader";
import Error from "./Error";
import Welcome from "./Welcome";
import Question from "./Question";
import Finished from "../components/FinishedScreen";
import { useQuiz } from "../context/QuestionProvider";

export default function Main() {
    const { status } = useQuiz();
    return (
        <main className="main">
            {status === "loading" && <Loader />}
            {status === "error" && <Error />}
            {status === "ready" && <Welcome />}
            {status === "start" && <Question />}
            {status === "finished" && <Finished />}
        </main>
    );
}
