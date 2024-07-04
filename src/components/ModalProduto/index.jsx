import { useState } from 'react';
import { FaX } from "react-icons/fa6";

export default function ModalProduto({ isOpen, onClose, onSave, produto }) {
  const [nome, setNome] = useState(produto?.nome || '');
  const [preco, setPreco] = useState(produto?.preco || '');
  const [nomeError, setNomeError] = useState('');
  const [precoError, setPrecoError] = useState('');

  const handleSave = () => {
    let hasError = false;

    if (!nome.trim()) {
      setNomeError('* Campo nome é obrigatório');
      hasError = true;
    } else {
      setNomeError('');
    }

    if (!preco || preco <= 0) {
      setPrecoError('* Campo preço é obrigatório e deve ser maior que zero');
      hasError = true;
    } else {
      setPrecoError('');
    }

    if (hasError) {
      return;
    }

    const produtoData = { nome, preco };
    onSave(produtoData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{produto ? 'Editar Produto' : 'Novo Produto'}</h2>
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
          <label className="block text-gray-700">Preço</label>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className={`w-full p-2 border rounded-lg ${precoError ? 'border-red-500' : 'border-gray-300'}`}
          />
          {precoError && <p className="text-red-500 text-sm">{precoError}</p>}
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
