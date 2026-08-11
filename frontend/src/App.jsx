import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import AgentPage from "./pages/Agentpage";

// Components (used as pages)
import GeneticAssessmentAI from "./components/GeneticAssessmentAI";
import Home from "./components/Home";
import LearnGenetics from "./components/LearnGenetics";
import Disorders from "./components/Disorders";
import Counselling from "./components/Counselling";
import DNA from "./components/DNA";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import Resume from "./components/Resume";
import PatientDNAIntake from "./components/PatientDNAIntake";
import DNAAgentsDashboard from "./components/DNAAgentsDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home landing page */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Content pages */}
        <Route path="/learn-genetics" element={<LearnGenetics />} />
        <Route path="/genetic-disorders" element={<Disorders />} />
        <Route path="/counselling" element={<Counselling />} />
        <Route path="/genetic-counseling" element={<Counselling />} />
        <Route path="/genetic-assessment" element={<GeneticAssessmentAI />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />

        {/* DNA Testing section */}
        <Route path="/dna" element={<DNA />} />
        <Route path="/dna-testing" element={<DNA />} />
        <Route path="/dna/patient-intake" element={<PatientDNAIntake />} />
        <Route path="/dna/agents/:agentId" element={<DNAAgentsDashboard />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<Register />} />

        {/* Agent dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agent/:agentId" element={<AgentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;