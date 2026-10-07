import React from 'react';
import { RecoilRoot } from 'recoil';
import StatsDisplay from './components/StatsDisplay';
import TypingArea from './components/TypingArea';
import Controls from './components/Controls';
import {useRecoilValue} from 'recoil'
import {targetTextState, userInputState, startTimeState, endTimeState} from './state/atoms'
import {isCompletedState, correctCharCountState, accuracyState, wpmState, charStatusListState} from './state/selectors.js'

async function testLogin(){
  const response = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: "v@example.com",
      password: "1234"
    })
  })

  const data = await response.json();

  console.log(data);
}

async function saveTestResult(wpm, accuracy, timeTaken){
  const response = await fetch("http://localhost:3000/results",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Brearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…yNTB9.ufboek0AUqdkgr37jpffjH96C3HiRWh_cWuZTkWSsw4`
    },
    body: JSON.stringify([
      wpm,
      accuracy,
      timeTaken
    ])
  })

  const data = await response.json();
  console.log(data);
}

function App() {
  const targetText = useRecoilValue(targetTextState);
  return (
    <>
      <div>
        <h1>Typing Speed Tester</h1>
        <StatsDisplay/>
        <TypingArea/>
        <Controls/>
        <button onClick={testLogin}>Test Login</button>
      </div>
    </>
  )
}

export default App
