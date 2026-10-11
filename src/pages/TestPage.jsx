import Navbar from "../components/Navbar";
import StatsDisplay from "../components/StatsDisplay";
import TypingArea from "../components/TypingArea";
import Controls from "../components/Controls";

export default function TestPage() {
    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />

            <main className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold text-slate-800 mb-6">
                    Typing Test
                </h1>

                <StatsDisplay />
                <TypingArea />
                <Controls />
            </main>
        </div>
    );
}