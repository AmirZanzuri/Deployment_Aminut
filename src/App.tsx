import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import DeploymentMatrix from './pages/DeploymentMatrix';
import Projects from './pages/Projects';
import Platforms from './pages/Platforms';
import Versions from './pages/Versions';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/matrix" element={<DeploymentMatrix />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/versions" element={<Versions />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App