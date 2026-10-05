import {atom} from 'recoil'
import {getRandomParagraph} from '../data/paragraphs'

export const targetTextState = atom({
    key: "targetTextStateKey",
    default: getRandomParagraph(),
})

export const userInputState = atom({
    key: "userInputStateKey",
    default: "",
})

export const startTimeState = atom({
    key: "startTimeStateKey",
    default: null,
})

export const endTimeState = atom({
    key: "endTimeStatekey",
    default: null,
})