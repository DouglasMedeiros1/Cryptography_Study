import React, { useState, useEffect, FormEvent } from 'react';

interface AESKey {
  id: number;
  key_value: string;
  created_at: string; // ou Date, conforme o que preferir converter
}

interface RSAKeyPair {
  id: number;
  public_key: string;
  private_key: string;
  created_at: string;
}

const GestorDeChaves: React.FC = () => {
  // Estados para armazenar as chaves carregadas do backend
  const [aesKeys, setAesKeys] = useState<AESKey[]>([]);
  const [rsaKeys, setRsaKeys] = useState<RSAKeyPair[]>([]);

  // Estados para os inputs de cadastro
  const [newAESKey, setNewAESKey] = useState('');
  const [newRSAPublicKey, setNewRSAPublicKey] = useState('');
  const [newRSAPrivateKey, setNewRSAPrivateKey] = useState('');

  // URL base do backend (ajuste se necessário)
  const baseURL = 'http://localhost:3001';

  // Carrega as chaves do backend na montagem do componente
  useEffect(() => {
    loadAESKeys();
    loadRSAKeys();
  }, []);

  // Função para carregar chaves AES
  const loadAESKeys = async () => {
    try {
      const response = await fetch(`${baseURL}/api/aeskeys`);
      if (response.ok) {
        const data = await response.json();
        setAesKeys(data);
      }
    } catch (error) {
      console.error("Erro ao carregar chaves AES:", error);
    }
  };

  // Função para carregar pares de chaves RSA
  const loadRSAKeys = async () => {
    try {
      const response = await fetch(`${baseURL}/api/rsakeys`);
      if (response.ok) {
        const data = await response.json();
        setRsaKeys(data);
      }
    } catch (error) {
      console.error("Erro ao carregar chaves RSA:", error);
    }
  };

  // Cadastro de chave AES
  const handleRegisterAES = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newAESKey.trim()) {
      alert('Informe um valor para a chave AES.');
      return;
    }
    try {
      const response = await fetch(`${baseURL}/api/aeskeys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key_value: newAESKey.trim() })
      });
      if (response.ok) {
        setNewAESKey('');
        loadAESKeys();
      } else {
        alert('Erro ao cadastrar chave AES.');
      }
    } catch (error) {
      console.error("Erro no cadastro da chave AES", error);
    }
  };

  // Cadastro do par de chaves RSA
  const handleRegisterRSA = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newRSAPublicKey.trim() || !newRSAPrivateKey.trim()) {
      alert('Informe os valores para ambas as chaves RSA.');
      return;
    }
    try {
      const response = await fetch(`${baseURL}/api/rsakeys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          public_key: newRSAPublicKey.trim(), 
          private_key: newRSAPrivateKey.trim() 
        })
      });
      if (response.ok) {
        setNewRSAPublicKey('');
        setNewRSAPrivateKey('');
        loadRSAKeys();
      } else {
        alert('Erro ao cadastrar o par de chaves RSA.');
      }
    } catch (error) {
      console.error("Erro no cadastro do par RSA", error);
    }
  };

  // Deletar chave AES
  const handleDeleteAES = async (id: number) => {
    try {
      const response = await fetch(`${baseURL}/api/aeskeys/${id}`, { method: 'DELETE' });
      if(response.ok) loadAESKeys();
      else alert('Erro ao deletar a chave AES.');
    } catch (error) {
      console.error("Erro ao deletar chave AES", error);
    }
  };

  // Deletar par de chaves RSA
  const handleDeleteRSA = async (id: number) => {
    try {
      const response = await fetch(`${baseURL}/api/rsakeys/${id}`, { method: 'DELETE' });
      if(response.ok) loadRSAKeys();
      else alert('Erro ao deletar o par de chaves RSA.');
    } catch (error) {
      console.error("Erro ao deletar par RSA", error);
    }
  };

  const preStyle: React.CSSProperties = {
    whiteSpace: 'pre-wrap',
    border: '1px solid #ccc',
    padding: '8px',
    overflowX: 'auto',
    fontFamily: 'monospace'
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Gestor de Chaves</h1>
      <p>
        Esta página demonstra a integração entre o backend e o frontend. 
        Você pode cadastrar e deletar uma chave AES (simétrica) e/ou um par de chaves RSA (assimétricas).
      </p>

      {/* Cadastro de chave AES */}
      <section style={{ marginBottom: '30px' }}>
        <h2>Cadastro de Chave AES (Simétrica)</h2>
        {aesKeys.length === 0 ? (
          <form onSubmit={handleRegisterAES}>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="aesKey">Chave AES:</label><br />
              <input
                type="text"
                id="aesKey"
                value={newAESKey}
                onChange={(e) => setNewAESKey(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <button type="submit" style={{ padding: '10px 20px' }}>
              Cadastrar Chave AES
            </button>
          </form>
        ) : (
          <p><strong>Chaves AES cadastradas:</strong></p>
        )}

        {aesKeys.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Chave</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Timestamp</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {aesKeys.map((key) => (
                <tr key={key.id}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{key.id}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    <pre style={preStyle}>{key.key_value}</pre>
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    {new Date(key.created_at).toLocaleString()}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    <button onClick={() => handleDeleteAES(key.id)} style={{ padding: '5px 10px' }}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Cadastro do par de chaves RSA */}
      <section style={{ marginBottom: '30px' }}>
        <h2>Cadastro de Par de Chaves RSA (Assimétricas)</h2>
        {rsaKeys.length === 0 ? (
          <form onSubmit={handleRegisterRSA}>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="rsaPublicKey">Chave Pública RSA:</label><br />
              <textarea
                id="rsaPublicKey"
                value={newRSAPublicKey}
                onChange={(e) => setNewRSAPublicKey(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px', height: '80px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="rsaPrivateKey">Chave Privada RSA:</label><br />
              <textarea
                id="rsaPrivateKey"
                value={newRSAPrivateKey}
                onChange={(e) => setNewRSAPrivateKey(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px', height: '80px' }}
              />
            </div>
            <button type="submit" style={{ padding: '10px 20px' }}>
              Cadastrar Par de Chaves RSA
            </button>
          </form>
        ) : (
          <p><strong>Pares de chaves RSA cadastrados:</strong></p>
        )}

        {rsaKeys.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Chave Pública</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Chave Privada</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Timestamp</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {rsaKeys.map((key) => (
                <tr key={key.id}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{key.id}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    <pre style={preStyle}>{key.public_key}</pre>
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    <pre style={preStyle}>{key.private_key}</pre>
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    {new Date(key.created_at).toLocaleString()}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    <button onClick={() => handleDeleteRSA(key.id)} style={{ padding: '5px 10px' }}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default GestorDeChaves;
