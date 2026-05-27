import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AgentPage from "./pages/Agentpage";
import GeneticAssessmentAI from "./components/GeneticAssessmentAI";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GeneticAssessmentAI />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agent/:agentId" element={<AgentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;