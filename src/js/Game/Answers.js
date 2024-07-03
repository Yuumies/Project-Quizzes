import React, {useContext, useEffect, useState} from 'react';
import {deleteNumber,randomNewQuestion} from "./RandomAnswers";
import {
    AnswersContext,
    AnswersPoll,
    CorrectAnswerContext,
    LeftAnswers,
    NumberQuestion,
    PointsContext
} from "../MyContext";


const Answers = ({level}) => {

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const {numberQuestion, setNumberQuestion} = useContext(NumberQuestion)
    const question = numberQuestion + ". Jakiego kraju to flaga?";
    const {points, setPoints} = useContext(PointsContext);
    const {answers, setAnswers} = useContext(AnswersContext);
    const {correctAnswer, setCorrectAnswer} = useContext(CorrectAnswerContext);
    const {answersPoll, setAnswersPoll} = useContext(AnswersPoll);
    const {leftAnswers, setLeftAnswers} = useContext(LeftAnswers);
    const [hardInput, setHardInput] = useState('');

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        if (answer === answersPoll[Object.keys(answersPoll).at(correctAnswer)]) {
            setPoints(points + 1);
        }
        setNumberQuestion(numberQuestion + 1);
        console.log(leftAnswers)
        randomNewQuestion(setAnswers, answersPoll, setAnswersPoll, setCorrectAnswer, correctAnswer, leftAnswers)

    };
    useEffect(() => {
        deleteNumber(leftAnswers, setLeftAnswers, correctAnswer);
        console.log(`Count has changed to: ${correctAnswer}`);
    }, [correctAnswer]);
    const handleHardInputChange = (event) => {
        setHardInput(event.target.value);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            submitAnswer();
        }
    };
    const submitAnswer = () => {
        if (hardInput.toLowerCase() === answersPoll[Object.keys(answersPoll).at(correctAnswer)].toLowerCase()) {
            setPoints(points + 1);
        }
        setNumberQuestion(numberQuestion + 1);
        setHardInput('');
        randomNewQuestion(setAnswers, answersPoll, setAnswersPoll, setCorrectAnswer, correctAnswer, leftAnswers)
    };

    return (
        <div className="quiz-container">
            <h2>{question}</h2>
            <div className="answers-container">
                {level==="hard" ? (
                    <div className="hardGameFields">
                        <input className="hardGameInput" value={hardInput} onChange={handleHardInputChange} onKeyDown={handleKeyDown} />
                        <button className="hardGameButton" onClick={() => submitAnswer()}>...</button>
                    </div>
                ) : (
                    answers.map((answer, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerClick(answer)}
                                className="answerButton"
                            >
                                {answer}
                            </button>
                        ))
                )}
            </div>
        </div>
    );
};

export default Answers;