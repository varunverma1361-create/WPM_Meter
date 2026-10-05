import {selector} from 'recoil'
import {userInputState, targetTextState, startTimeState, endTimeState} from './atoms'

export const isCompletedState = selector({
    key: "isCompletedStateKey",
    get: ({get})=>{
        let targetText = get(targetTextState)
        let userInput = get(userInputState)
        return targetText.length > 0 && userInput.length >= targetText.length;
    },
})

export const correctCharCountState = selector({
    key: "correctCharCountStateKey",
    get: ({get})=>{
        const targetText = get(targetTextState);
        const userInput = get(userInputState);

        let count = 0;
        for(let i = 0; i < userInput.length; i++){
            if(userInput[i] === targetText[i]){
                count++;
            }
        }
        return count;
    }
})

export const accuracyState = selector({
    key: "accuracyStateKey",
    get: ({get})=>{
        let userInput = get(userInputState)

        if(userInput.length === 0) return 100;

        const correctCount = get(correctCharCountState);

        const accuracy = (correctCount/userInput.length)*100;

        return Math.round(accuracy);
    },
})

export const wpmState = selector({
    key: "wpmStateKey",
    get: ({get})=>{
        let userInput = get(userInputState) 
        let startTime = get(startTimeState) 
        let endTime = get(endTimeState) 

        if(!startTime || userInput.length === 0) return 0;

        const timeTakenMs = (endTime || Date.now()) - startTime;

        if(timeTakenMs < 1000) return 0;

        const correctCount = get(correctCharCountState);

        const timeInMinutes = timeTakenMs/60000;
        const wordsTyped = correctCount/5;
        const wpm = wordsTyped/timeInMinutes;

        return Math.round(wpm);
    },
})

export const charStatusListState = selector({
    key: "charStatusListStateKey",
    get: ({get})=>{
        let targetText = get(targetTextState)
        let userInput = get(userInputState)

        return targetText.split('').map((char,index)=>{
            let status = 'pending';

            if(index < userInput.length){
                status = userInput[index] === char ? 'correct' : 'incorrect';
            }else if(index === userInput.length){
                status = 'current';
            }

            return {
                char,
                status,
            }
        })
    }
})