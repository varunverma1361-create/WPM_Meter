/* listens to wpmState, accuracyState, isCompletedState to display real-time analytics*/
import React from 'react';
import { useRecoilValue } from 'recoil';
import { wpmState, accuracyState, isCompletedState } from '../state/selectors';

export default function StatsDisplay(){
    const wpm = useRecoilValue(wpmState);
    const accuracy = useRecoilValue(accuracyState);
    const isCompleted = useRecoilValue(isCompletedState);

    return (
        <div>
            Speed: {wpm} wpm
            Accuracy: {accuracy}%
            {isCompleted ? 'Complete' : 'In progress'}
        </div>
    )
}