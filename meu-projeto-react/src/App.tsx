import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AESSimetricaPage from './Criptografia-Pages/AES-Simetrica';
import RSAAssimetricaPage from './Criptografia-Pages/RSA-Assimetrica';
import GestorDeChaves from './Criptografia-Pages/GestorDeChaves';

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial' }}>
        {/* Barra de navegação */}
        <nav style={{
          padding: '10px',
          marginBottom: '20px',
        }}>
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            gap: '20px',
            margin: 0,
            padding: 0
          }}>
            <li>
              <Link to="/Criptografia-Pages/AES-Simetrica" style={{
                textDecoration: 'none',
                color: '#000',
                padding: '10px 20px',
                fontSize: '18px',
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '8px',
                backdropFilter: 'blur(5px)',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}>
                Criptografia AES Simétrica
              </Link>
            </li>
            <li>
              <Link to="/Criptografia-Pages/RSA-Assimetrica" style={{
                textDecoration: 'none',
                color: '#000',
                padding: '10px 20px',
                fontSize: '18px',
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '8px',
                backdropFilter: 'blur(5px)',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}>
                Criptografia RSA Assimétrica
              </Link>
            </li>
            <li>
              <Link to="/Criptografia-Pages/GestorDeChaves" style={{
                textDecoration: 'none',
                color: '#000',
                padding: '10px 20px',
                fontSize: '18px',
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '8px',
                backdropFilter: 'blur(5px)',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}>
                Gestor de Chaves
              </Link>
            </li>
          </ul>
        </nav>

        {/* Rotas para cada página */}
        <Routes>
          <Route path="/Criptografia-Pages/AES-Simetrica" element={<AESSimetricaPage />} />
          <Route path="/Criptografia-Pages/RSA-Assimetrica" element={<RSAAssimetricaPage />} />
          <Route path="/Criptografia-Pages/GestorDeChaves" element={<GestorDeChaves />} />
          {/* Rota padrão que pode servir como página de boas-vindas */}
          <Route path="*" element={
            <div style={{ padding: '20px' }}>
              <h2>Bem-vindo ao Sistema de Criptografia</h2>
              <p>Escolha uma das opções na barra de navegação para testar.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;