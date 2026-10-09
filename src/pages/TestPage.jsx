//navbar, stats display, typing area, controls

import Navbar from "../components/Navbar";
import StatsDisplay from "../components/StatsDisplay"
import TypingArea from "../components/TypingArea"
import Controls from "../components/Controls"

export default function TestPage(){
    return(
        <>
        <Navbar/>
        <StatsDisplay/>
        <TypingArea/>
        <Controls/>
        </>
    )
}