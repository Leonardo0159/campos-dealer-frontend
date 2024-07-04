import { useState } from 'react';
import { FaX } from "react-icons/fa6";

export default function ModalCliente({ isOpen, onClose, onSave, cliente }) {
  const [nome, setNome] = useState(cliente?.nome || '');
  const [cidade, setCidade] = useState(cliente?.cidade || '');
  const [nomeError, setNomeError] = useState('');
  const [cidadeError, setCidadeError] = useState('');

  const handleSave = () => {
    let hasError = false;

    if (!nome.trim()) {
      setNomeError('* Campo nome é obrigatório');
      hasError = true;
    } else {
      setNomeError('');
    }

    if (!cidade.trim()) {
      setCidadeError('* Campo cidade é obrigatório');
      hasError = true;
    } else {
      setCidadeError('');
    }

    if (hasError) {
      return;
    }

    const clienteData = { nome, cidade };
    onSave(clienteData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{cliente ? 'Editar Cliente' : 'Novo Cliente'}</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <FaX size={20} />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={`w-full p-2 border rounded-lg ${nomeError ? 'border-red-500' : 'border-gray-300'}`}
          />
          {nomeError && <p className="text-red-500 text-sm">{nomeError}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cidade</label>
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className={`w-full p-2 border rounded-lg ${cidadeError ? 'border-red-500' : 'border-gray-300'}`}
          />
          {cidadeError && <p className="text-red-500 text-sm">{cidadeError}</p>}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={handleSave}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
