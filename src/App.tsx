import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import DeploymentMatrix from './pages/DeploymentMatrix';
import Versions from './pages/Versions';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/matrix" element={<DeploymentMatrix />} />
          <Route path="/versions" element={<Versions />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;