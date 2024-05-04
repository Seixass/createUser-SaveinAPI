import { useState } from 'react';

function CreateUser() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [resultado, setResultado] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const dataform = {
      nome: nome,
      email: email,
      senha: senha,
      cep: cep,
      rua: rua,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      estado: estado
    };

    fetch('https://ranekapi.origamid.dev/json/api/usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataform)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Erro ao criar usuário');
      })
      .then(data => {
        console.log('Usuário criado com sucesso:', data);
        setResultado(data);
      })
      .catch(error => {
        if (error.response && error.response.status === 403) {
          console.error('Erro 403: Acesso proibido');
        } else {
          console.error('Erro:', error);
        }
      });

  };

  return (
    <div>
      <h2>Criar Novo Usuário</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Senha:
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </label>
        <br />
        <label>
          CEP:
          <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} />
        </label>
        <br />
        <label>
          Rua:
          <input type="text" value={rua} onChange={(e) => setRua(e.target.value)} />
        </label>
        <br />
        <label>
          Número:
          <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} />
        </label>
        <br />
        <label>
          Bairro:
          <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} />
        </label>
        <br />
        <label>
          Cidade:
          <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
        </label>
        <br />
        <label>
          Estado:
          <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />
        </label>
        <br />
        <button type="submit">Criar Usuário</button>
      </form>
      {resultado && <p>Usuário criado com sucesso: {JSON.stringify(resultado)}</p>}
    </div>
  );
}

export default CreateUser;