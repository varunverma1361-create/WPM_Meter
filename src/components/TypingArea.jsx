/* renders char by char color stream and handles timer logic*/
import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  userInputState,
  targetTextState,
  startTimeState,
  endTimeState,
} from '../state/atoms';
import { charStatusListState, isCompletedState, wpmState, accuracyState } from '../state/selectors';

async function saveTestResult(wpm, accuracy, timeTaken){
  const response = await fetch("http://localhost:3000/results",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YWM0ODBmMGE2OWE1MGM4OWNjNDE0ZTciLCJpYXQiOjE3OTEyNjM3Mzl9.qHuBEtpYNiiNa3Amd25Cj-MO6SMB9KfD3Eiz99cu7Q0`
    },
    body: JSON.stringify({
      wpm,
      accuracy,
      timeTaken
    })
  })

  const data = await response.json();
  console.log(data);
}

export default function TypingArea(){
    const [userInput, setUserInput] = useRecoilState(userInputState);
    const [startTime, setStartTime] = useRecoilState(startTimeState);
    const setEndTime = useSetRecoilState(endTimeState);

    const targetText = useRecoilValue(targetTextState);
    const charStatusList = useRecoilValue(charStatusListState);
    const isCompleted = useRecoilValue(isCompletedState);

    const wpm = useRecoilValue(wpmState);
    const accuracy = useRecoilValue(accuracyState);

    const handleInputChange = (e)=>{
        const value = e.target.value;

        if(isCompleted || value.length > targetText.length) return;

        if(startTime === null && value.length === 1 && value[0] === targetText[0]){
            setStartTime(Date.now());
        }

        setUserInput(value);

        if(value.length === targetText.length){
            const completedAt = Date.now();
            setEndTime(completedAt);

            const timeTaken = (completedAt-startTime)/1000;

            saveTestResult(wpm, accuracy, timeTaken);
        }
    }

    const getCharStyle = (status) => {
        switch(status){
            case 'correct':
                return {color:'#22c55e'};
            case 'incorrect':
                return {color:'#ef4444', backgroundColor: '#fee2e2'}
            case 'current':
                return {borderBottom: '2px solid #3b82f6', color: '#1f2937'}
            default:
                return {color:'#9ca3af'}
        }
    }

    return (

        <div>
            {/*char stream display*/}
            <div>
                {charStatusList.map((item, index) => (
                    <span key={index} style={getCharStyle(item.status)}>
                        {item.char}
                    </span>
                ))}
            </div>

            {/*input area*/}
            <textarea
            value={userInput}
            onChange={handleInputChange}
            disabled={isCompleted}
            placeholder={isCompleted ? "Test Completed!" : "Start typing here"}
            rows={4}
            />
        </div>
    )
}