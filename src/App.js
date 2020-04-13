import React, {useReducer} from 'react';
import Progress from './components/Progress';
import Question from './components/Question';
import Answers from './components/Answers';
import {SET_ANSWERS, SET_CURRENT_QUESTION, SET_CURRENT_ANSWER, SET_ERROR, SET_SHOW_RESULTS, RESET_QUIZ} from './reducers/Types.js';
import quizReducer from './reducers/QuizReducer';
import QuizContext from './context/QuizContext';
import './App.css';

function App() {
  const questions = [
    {
      id: 1,
      question: 'Pitanje 1',
      answer_a: 'Pitanje 1, odgovor a',
      answer_b: 'Pitanje 1, odgovor b',
      answer_c: 'Pitanje 1, odgovor c',
      answer_d: 'Pitanje 1, odgovor d',
      correct_answer: 'a',
    },
    {
      id: 2,
      question: 'Pitanje 2',
      answer_a: 'Pitanje 2, odgovor a',
      answer_b: 'Pitanje 2, odgovor b',
      answer_c: 'Pitanje 2, odgovor c',
      answer_d: 'Pitanje 2, odgovor d',
      correct_answer: 'b',
    },
    {
      id: 3,
      question: 'Pitanje 3',
      answer_a: 'Pitanje 3, odgovor a',
      answer_b: 'Pitanje 3, odgovor b',
      answer_c: 'Pitanje 3, odgovor c',
      answer_d: 'Pitanje 3, odgovor d',
      correct_answer: 'c',
    },
    {
      id: 4,
      question: 'Pitanje 4',
      answer_a: 'Pitanje 4, odgovor a',
      answer_b: 'Pitanje 4, odgovor b',
      answer_c: 'Pitanje 4, odgovor c',
      answer_d: 'Pitanje 4, odgovor d',
      correct_answer: 'd',
    }
  ];

  const initialState = {
    questions,
    currentQuestion: 0,
    currentAnswer: '',
    answers: [],
    showResults: false,
    error: '',
  }
  
// const [currentQuestion, setCurrentQuestion] = useState(0);
// const [currentAnswer, setCurrentAnswer] = useState('');
// const [answers, setAnswers] = useState([]);
// const [showResults, setShowResults] = useState(false);
// const [error, setError] = useState('');

const [state, dispatch] = useReducer(quizReducer, initialState);
const {currentQuestion, currentAnswer, answers, showResults, error} = state;

const question = questions[currentQuestion];

const renderError = () => {
  if(!error) {
    return;
  }

  return <div className="error">{error}</div>
}

const renderResultMark = (question, answer) => {
  if(question.correct_answer === answer.answer) {
    return <span className="correct">Correct</span>
  }
  return <span className="failed">Failed</span>
}

const renderResultsData = () => {
  return answers.map( answer => {
    const question = questions.find(question => question.id === answer.questionId);

  return (
    <div key={question.id}>
      {question.question} - {renderResultMark(question, answer)}
    </div>
  );
  });

}

const restart = () => {
  dispatch({type: RESET_QUIZ});
}

const next = () => {
  const answer = {questionId:question.id, answer: currentAnswer};

  if(!currentAnswer) {
    dispatch({type: SET_ERROR, error: 'Please select an option'});
    return;
  }

  answers.push(answer);
  // setCurrentAnswer('');
  dispatch({type: SET_ANSWERS, answers});
  dispatch({type: SET_CURRENT_ANSWER, currentAnswer: ''});

  if(currentQuestion + 1 < questions.length) {
    dispatch({
      type: SET_CURRENT_QUESTION,
      currentQuestion: currentQuestion +1,
    });
    return;
  }

  dispatch({type: SET_SHOW_RESULTS, showResults: true});
}

if(showResults) {
  return (
    <div className="container results">
      <h2>Results</h2>
      <ul>{renderResultsData()}</ul>
      <button className="btn btn-primary" onClick={restart}>
        Restart
      </button>
    </div>
  )
} else {
  return (
    <QuizContext.Provider value={{state, dispatch}}>
      <div className="container">
        <Progress total={questions.length} current={currentQuestion + 1}></Progress>
        <Question></Question>
        {renderError()}
        <Answers></Answers>
        <button className="btn btn-primary" onClick={next}>
          Confirm and Continue
        </button>
    </div>
    </QuizContext.Provider>
  );
}

}

export default App;
