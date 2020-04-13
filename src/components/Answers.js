import React, {useContext} from 'react';
import Answer from './Answer';
import QuizContext from '../context/QuizContext';

function Answers() {
    const {state, dispatch} = useContext(QuizContext);
    const {currentAnswer, currentQuestion, questions} = state;
    const question = questions[currentQuestion];

    return (
        <>
            <Answer letter="a" answer={question.answer_a} dispatch={dispatch} selected={currentAnswer == 'a'}></Answer>
            <Answer letter="b" answer={question.answer_b} dispatch={dispatch} selected={currentAnswer == 'b'}></Answer>
            <Answer letter="c" answer={question.answer_c} dispatch={dispatch} selected={currentAnswer == 'c'}></Answer>
            <Answer letter="d" answer={question.answer_d} dispatch={dispatch} selected={currentAnswer == 'd'}></Answer>
        </>
    );
}

export default Answers;