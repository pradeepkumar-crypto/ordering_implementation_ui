import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './routes/Dashboard';
import OotbPage from './routes/OotbPage';
import { routes, actionRoutes, OOTB_BASE_PATH } from './routes/appRoutes';
import { NAV_SECTIONS } from './data/ootbData';
import './App.css';

function App() {
  return (
    <Router>
      <Layout routes={routes} actionRoutes={actionRoutes}>
        <Routes>
          <Route path="/" element={<Navigate to={`${OOTB_BASE_PATH}/${NAV_SECTIONS[0].id}`} replace />} />
          <Route path={`${OOTB_BASE_PATH}/:sectionId`} element={<OotbPage />} />
          <Route path="/decision-dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
