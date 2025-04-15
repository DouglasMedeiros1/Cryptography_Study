import React, { useState } from 'react';
import CryptoJS from 'crypto-js'; // Certifique-se de ter instalado a biblioteca: npm install crypto-js

// Chave fixa definida pelo sistema (16 caracteres para AES-128)
const FIXED_AES_KEY = "0123456789abcdef";

const App: React.FC = () => {
  // Estados para armazenar a mensagem, chave, mensagem criptografada e descriptografada
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');

  // Função para criptografar e descriptografar a mensagem usando a chave definida
  const handleSend = () => {
    if (!message) return; // Se não houver mensagem, não faz nada

    // Utiliza a chave fixa definida no sistema
    const key = FIXED_AES_KEY;
    setEncryptionKey(key);

    // Criptografa a mensagem utilizando AES e a chave fixa
    const encrypted = CryptoJS.AES.encrypt(message, key).toString();
    setEncryptedMessage(encrypted);

    // Descriptografa a mensagem usando a mesma chave fixa
    const decrypted = CryptoJS.AES.decrypt(encrypted, key);
    const originalText = decrypted.toString(CryptoJS.enc.Utf8);
    setDecryptedMessage(originalText);
  };

  // Função para limpar os estados
  const handleClear = () => {
    setMessage('');
    setEncryptedMessage('');
    setDecryptedMessage('');
    setEncryptionKey('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Página Com Criptografia AES (Simétrica)</h1>

      {/* Campo de Texto para Inserir a Mensagem */}
      <div style={{ margin: '10px 0' }}>
        <label htmlFor="message">Mensagem:</label>
        <br />
        <input 
          type="text" 
          id="message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />
      </div>

      {/* Campo de Texto para exibir a mensagem criptografada */}
      <div style={{ margin: '10px 0' }}>
        <label htmlFor="encrypted">Mensagem Criptografada:</label>
        <br />
        <input 
          type="text" 
          id="encrypted" 
          value={encryptedMessage} 
          readOnly 
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />
      </div>

      {/* Campo de Texto para exibir a mensagem descriptografada */}
      <div style={{ margin: '10px 0' }}>
        <label htmlFor="decrypted">Mensagem Descriptografada:</label>
        <br />
        <input 
          type="text" 
          id="decrypted" 
          value={decryptedMessage} 
          readOnly 
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />
      </div>

      {/* Botões: Enviar e Limpar */}
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={handleSend} 
          style={{ padding: '10px 20px', marginRight: '10px' }}
        >
          Enviar
        </button>
        <button 
          onClick={handleClear} 
          style={{ padding: '10px 20px' }}
        >
          Limpar
        </button>
      </div>

      {/* Container fixo no canto inferior direito exibindo a mensagem criptografada e a chave */}
      {encryptedMessage && encryptionKey && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 0 15px rgba(0,0,0,0.2)'
        }}>
          <h4>Info de Criptografia</h4>
          <p><strong>Chave:</strong> {encryptionKey}</p>
          <p><strong>Mensagem Criptografada:</strong> {encryptedMessage}</p>
        </div>
      )}
    </div>
  );
};

export default App;
