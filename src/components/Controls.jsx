/* resets all atoms and picks a fresh random para*/
import React from 'react'
import {useSetRecoilState} from 'recoil'
import {userInputState, targetTextState, startTimeState, endTimeState} from '../state/atoms'
import {getRandomParagraph} from '../data/paragraphs'

export default function Controls(){
    const setUserInput = useSetRecoilState(userInputState);
    const setTargetText = useSetRecoilState(targetTextState);
    const setStartTime = useSetRecoilState(startTimeState);
    const setEndTime = useSetRecoilState(endTimeState);

    const handleReset = () =>{
        setUserInput('');
        setStartTime(null);
        setEndTime(null);
        setTargetText(getRandomParagraph());
    }

    return (
        <div>
            <button
                className="mt-4 bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-900 transition cursor-pointer"
                onClick={handleReset}
            >
                Reset / New Test
            </button>
        </div>
    )
}