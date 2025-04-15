import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js'; // Certifique-se de ter instalado a biblioteca: npm install crypto-js

const App: React.FC = () => {
  // Estados para armazenar a mensagem, chave, mensagem criptografada e descriptografada
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');

  // Carregar a chave AES do backend
  useEffect(() => {
    const fetchAESKey = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/aeskeys'); // Ajuste a URL conforme necessário
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setEncryptionKey(data[0].key_value); // Supondo que o backend retorna um array de chaves e usamos a primeira
          } else {
            console.error('Nenhuma chave AES encontrada no backend.');
          }
        } else {
          console.error('Erro ao carregar a chave AES.');
        }
      } catch (error) {
        console.error('Erro ao conectar ao backend:', error);
      }
    };

    fetchAESKey();
  }, []);

  // Função para criptografar e descriptografar a mensagem usando a chave carregada
  const handleSend = () => {
    if (!message || !encryptionKey) {
      alert('Por favor, insira uma mensagem e aguarde o carregamento da chave.');
      return;
    }

    try {
      // Criptografa a mensagem utilizando AES e a chave carregada
      const encrypted = CryptoJS.AES.encrypt(message, encryptionKey).toString();
      setEncryptedMessage(encrypted);

      // Descriptografa a mensagem usando a mesma chave carregada
      const decrypted = CryptoJS.AES.decrypt(encrypted, encryptionKey);
      const originalText = decrypted.toString(CryptoJS.enc.Utf8);
      setDecryptedMessage(originalText);
    } catch (error) {
      console.error('Erro durante a criptografia/descriptografia:', error);
      alert('Erro ao processar a mensagem.');
    }
  };

  // Função para limpar os estados
  const handleClear = () => {
    setMessage('');
    setEncryptedMessage('');
    setDecryptedMessage('');
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
