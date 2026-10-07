/* renders char by char color stream and handles timer logic*/
import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  userInputState,
  targetTextState,
  startTimeState,
  endTimeState,
} from '../state/atoms';
import { charStatusListState, isCompletedState } from '../state/selectors';

export default function TypingArea(){
    const [userInput, setUserInput] = useRecoilState(userInputState);
    const [startTime, setStartTime] = useRecoilState(startTimeState);
    const setEndTime = useSetRecoilState(endTimeState);

    const targetText = useRecoilValue(targetTextState);
    const charStatusList = useRecoilValue(charStatusListState);
    const isCompleted = useRecoilValue(isCompletedState);

    const handleInputChange = (e)=>{
        const value = e.target.value;

        if(isCompleted || value.length > targetText.length) return;

        if(startTime === null && value.length === 1 && value[0] === targetText[0]){
            setStartTime(Date.now());
        }

        if(value.length === targetText.length){
            setEndTime(Date.now());
        }
        setUserInput(value);
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
            /*char stream display*/
            <div>
                {charStatusList.map((item, index) => (
                    <span key={index} style={getCharStyle(item.status)}>
                        {item.char}
                    </span>
                ))}
            </div>

            /*input area*/
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