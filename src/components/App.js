import React, { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
import { type } from "@testing-library/user-event/dist/type";
import Loader from "./Loader";
import Error  from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialstate = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
}
function reducer(state, action) {
  
  switch(action.type){
    case "dataReceived":
      return{
        ...state,
        
        questions: action.payload,
        status: "ready"
      }
    case "datfail":
      return{
        ...state,
        status: "error"
      } 
    case "start":
      return{
        ...state,
        status : "active"
      }
    case "newAnswer":
      return{
        ...state,
        payload: action.payload,
      }

    default:
      throw new Error("Action undefined")    
    
  }

}
export default function App(){
 const[{questions, status, index, answer}, dispatch] = useReducer(reducer, initialstate)

const numQuestions = questions.length;


  useEffect(function() {
    fetch("http://localhost:8000/questions")
    .then((res) => res.json())
    .then((data) => dispatch({type : "dataReceived", payload: data}))
    .catch((err) => dispatch({type : "datafail" }))
  }, [])
  return(
    <div className="app">  
      {/* <DateCounter/> */}
      <Header/>
      <Main>
       {status=== 'loading' && <Loader/>}
       {status=== 'error' && <Error/>}
       {status=== 'ready' && <StartScreen numQuestions={numQuestions} dispatch ={dispatch}/>}
       {status=== 'active' && <Question question= {questions[index]} dispatch= {dispatch} answer= {answer}/>}
      </Main>
    </div>
  )
}