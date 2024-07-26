import React from 'react'
import Option from './Option'

export default function Question({question, dispatch, answer}) {
  console.log(question)
  return (     
    <>    
      <h3>{question.question}</h3>   
      <Option question={question} dispatch= {dispatch}  answer= {answer}/>
      
      </>  
       
  )
}
