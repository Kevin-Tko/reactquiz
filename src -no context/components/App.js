import "../index.css";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Welcome from "./Welcome";
import Question from "./Question";
import Finished from "../components/FinishedScreen";
import { useEffect, useReducer } from "react";

// initial state has to be an object
const initialstate = {
    questions: [],
    // status will change: loading, error, ready, start, finished
    status: "loading",
    index: 0,
    answer: null,
    score: 0,
    time: null,
    highScore: 0,
};

const secondsPerQuestion = 30;

// reducer function
function reducer(state, action) {
    switch (action.type) {
        case "dataReceived": {
            return {
                ...state,
                questions: action.payload,
                status: "ready",
            };
        }
        case "errorFetching": {
            return {
                ...state,
                status: "error",
            };
        }
        case "start": {
            return {
                ...state,
                status: "start",
                time: state.questions.length * secondsPerQuestion,
            };
        }

        case "selectedAnswer": {
            const question = state.questions.at(state.index);
            return {
                ...state,
                answer: action.payload,
                score:
                    action.payload === question.correctOption
                        ? state.score + question.points
                        : state.score,
            };
        }

        case "next": {
            return {
                ...state,
                index:
                    state.index < state.questions.length
                        ? state.index + 1
                        : state.index,
                answer: null,
            };
        }

        case "finish": {
            return {
                ...state,
                status: "finished",
                highScore:
                    state.score > state.highScore
                        ? state.score
                        : state.highScore,
            };
        }

        case "timer": {
            return {
                ...state,
                time: state.time - 1,
                status: state.time === 0 ? "finished" : state.status,
            };
        }

        case "restart": {
            return {
                ...initialstate,
                questions: state.questions,
                status: "ready",
            };
        }

        default:
            throw new Error("Unknown request");
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialstate);
    const { questions, status, index, answer, score, time, highScore } = state;

    //Derived state
    const questionsNumber = questions.length;
    const totalMarks = questions
        .map((question) => question.points)
        .reduce((prev, curr, idx) => prev + curr, 0);
    const percentage = Math.floor((state.score / totalMarks) * 100);

    // Useeffect running on mount
    useEffect(function () {
        async function fetchQuestions() {
            try {
                const response = await fetch("http://localhost:8000/questions");
                const data = await response.json();

                // dispatch function call for fetched data
                dispatch({
                    type: "dataReceived",
                    payload: data,
                });
            } catch (err) {
                console.error(err.message);
                // dispatch function call for error fetching data
                dispatch({
                    type: "errorFetching",
                });
            }
        }
        fetchQuestions();
    }, []);

    return (
        <div className="app">
            <Header />

            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && (
                    <Welcome
                        numQuestions={questionsNumber}
                        dispatch={dispatch}
                    />
                )}
                {status === "start" && (
                    <Question
                        question={questions[index]}
                        dispatch={dispatch}
                        answer={answer}
                        index={state.index}
                        numQuestions={questionsNumber}
                        score={state.score}
                        percentage={percentage}
                        totalMarks={totalMarks}
                        time={time}
                    />
                )}
                {status === "finished" && (
                    <Finished
                        score={score}
                        percentage={percentage}
                        totalMarks={totalMarks}
                        dispatch={dispatch}
                        highScore={highScore}
                        time={time}
                    />
                )}
            </Main>
        </div>
    );
}
