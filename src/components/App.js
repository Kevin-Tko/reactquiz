import "../index.css";
import Header from "./Header";
import Main from "./Main";
import { QuizProvider } from "../context/QuestionProvider";

export default function App() {
    return (
        <div className="app">
            <QuizProvider>
                <Header />
                <Main></Main>
            </QuizProvider>
        </div>
    );
}
