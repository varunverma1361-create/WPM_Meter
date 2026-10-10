import ProfilePage from "./pages/ProfilePage";
import StatsPage from "./pages/StatsPage";
import HistoryPage from "./pages/HistoryPage";
import AuthPage from "./pages/AuthPage";
import TestPage from "./pages/TestPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicRoute><AuthPage/></PublicRoute>}></Route>
        <Route path="/test" element={<ProtectedRoute><TestPage/></ProtectedRoute>}></Route>
        <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}></Route>
        <Route path="/stats" element={<ProtectedRoute><StatsPage/></ProtectedRoute>}></Route>
        <Route path="/history" element={<ProtectedRoute><HistoryPage/></ProtectedRoute>}></Route>
      </Routes>
    </>
  )
}

export default App
