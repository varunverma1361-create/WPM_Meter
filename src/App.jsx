import React from 'react';
import { RecoilRoot } from 'recoil';
import StatsDisplay from './components/StatsDisplay';
import TypingArea from './components/TypingArea';
import Controls from './components/Controls';
import {useRecoilValue} from 'recoil'
import {targetTextState, userInputState, startTimeState, endTimeState} from './state/atoms'
import {isCompletedState, correctCharCountState, accuracyState, wpmState, charStatusListState} from './state/selectors.js'

function App() {
  const targetText = useRecoilValue(targetTextState);
  return (
    <>
      <div>
        <h1>Typing Speed Tester</h1>
        <StatsDisplay/>
        <TypingArea/>
        <Controls/>
      </div>
    </>
  )
}

export default App
