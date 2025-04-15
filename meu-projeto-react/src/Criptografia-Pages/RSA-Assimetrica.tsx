import React, { useState, useEffect } from 'react';
import { JSEncrypt } from 'jsencrypt'; // Certifique-se de ter instalado a biblioteca: npm install jsencrypt

interface RSAKeyPair {
  id: number;
  public_key: string;
  private_key: string;
  created_at: string;
}

const RSAAssimetricaPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [rsaKey, setRsaKey] = useState<RSAKeyPair | null>(null);

  const baseURL = 'http://localhost:3001'; // URL base do backend

  // Carregar a única chave RSA do backend
  useEffect(() => {
    const loadRSAKey = async () => {
      try {
        const response = await fetch(`${baseURL}/api/rsakeys`);
        if (response.ok) {
          const data: RSAKeyPair[] = await response.json();
          if (data.length > 0) {
            setRsaKey(data[0]); // Assume que há apenas uma chave no banco de dados
            console.log('Chave RSA carregada:', data[0]);
          } else {
            console.error('Nenhuma chave RSA encontrada no banco de dados.');
          }
        } else {
          console.error('Erro ao carregar a chave RSA.');
        }
      } catch (error) {
        console.error('Erro ao conectar ao backend:', error);
      }
    };

    loadRSAKey();
  }, []);

  // Função para criptografar e descriptografar a mensagem usando a chave carregada
  const handleSend = () => {
    if (!message || !rsaKey) {
      alert('Por favor, insira uma mensagem e aguarde o carregamento da chave.');
      return;
    }

    try {
      const encryptor = new JSEncrypt();
      encryptor.setPublicKey(rsaKey.public_key);

      // Criptografa a mensagem utilizando a chave pública
      const encrypted = encryptor.encrypt(message);
      if (!encrypted) {
        throw new Error('Erro ao criptografar a mensagem.');
      }
      setEncryptedMessage(encrypted);

      // Descriptografa a mensagem utilizando a chave privada
      encryptor.setPrivateKey(rsaKey.private_key);
      const decrypted = encryptor.decrypt(encrypted);
      if (!decrypted) {
        throw new Error('Erro ao descriptografar a mensagem.');
      }
      setDecryptedMessage(decrypted);
    } catch (error) {
      console.error('Erro durante a criptografia/descriptografia:', error);
      alert('Erro ao processar a mensagem. Verifique a chave carregada.');
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
      <h1>Página de Criptografia RSA (Assimétrica)</h1>

      {/* Exibe a chave carregada */}
      {rsaKey ? (
        <div style={{ marginBottom: '20px' }}>
          <p><strong>Chave Pública:</strong> {rsaKey.public_key}</p>
        </div>
      ) : (
        <p>Carregando chave RSA...</p>
      )}

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
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            background: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#0056b3')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#007BFF')}
        >
          Enviar
        </button>
        <button
          onClick={handleClear}
          style={{
            padding: '10px 20px',
            background: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#5a6268')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#6c757d')}
        >
          Limpar
        </button>
      </div>

      {/* Container fixo no canto inferior direito exibindo a mensagem criptografada */}
      {encryptedMessage && rsaKey && (
        <div
          style={{
            position: 'fixed',
            width: '600px',
            maxWidth: '90%',
            bottom: '20px',
            right: '20px',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 0 15px rgba(0,0,0,0.2)',
            overflowY: 'auto', // Adicionado para permitir rolagem
            maxHeight: '200px', // Limita a altura do container
          }}
        >
          <h4>Info de Criptografia</h4>
          <p>
            <strong>Mensagem Criptografada:</strong> {encryptedMessage}
          </p>
          <p>
            <strong>Mensagem Descriptografada:</strong> {decryptedMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default RSAAssimetricaPage;
