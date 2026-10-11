/* listens to wpmState, accuracyState, isCompletedState to display real-time analytics*/
import React from 'react';
import { useRecoilValue } from 'recoil';
import { wpmState, accuracyState, isCompletedState } from '../state/selectors';

export default function StatsDisplay(){
    const wpm = useRecoilValue(wpmState);
    const accuracy = useRecoilValue(accuracyState);
    const isCompleted = useRecoilValue(isCompletedState);

    return (
        <div className="flex gap-4 mb-6">
            <div className="bg-blue-50 px-4 py-3 rounded-lg">
                <div className="text-sm text-slate-500">Speed</div>
                <div className="text-xl font-bold text-blue-600">{wpm} WPM</div>
            </div>

            <div className="bg-green-50 px-4 py-3 rounded-lg">
                <div className="text-sm text-slate-500">Accuracy</div>
                <div className="text-xl font-bold text-green-600">{accuracy}%</div>
            </div>

            <div className="bg-slate-50 px-4 py-3 rounded-lg">
                <div className="text-sm text-slate-500">Status</div>
                <div className="text-xl font-bold text-slate-700">
                    {isCompleted ? "Complete" : "Typing"}
                </div>
            </div>
        </div>
    );
}