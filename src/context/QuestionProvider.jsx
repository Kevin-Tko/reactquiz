import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

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

function QuizProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialstate);
    const { questions, status, index, answer, score, time, highScore } = state;

    //Derived state
    const questionsNumber = questions.length;
    const totalMarks = questions
        .map((question) => question.points)
        .reduce((prev, curr, idx) => prev + curr, 0);
    const percentage = Math.floor((state.score / totalMarks) * 100);

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
        <QuizContext.Provider
            value={{
                questions,
                status,
                index,
                answer,
                score,
                time,
                highScore,
                questionsNumber,
                totalMarks,
                percentage,
                dispatch,
                question: questions[index],
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}

function useQuiz() {
    const context = useContext(QuizContext);

    if (context === undefined)
        throw new Error("Context is used outside the provider");

    return context;
}

export { QuizProvider, useQuiz };
