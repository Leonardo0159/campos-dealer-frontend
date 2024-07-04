import { useState, useEffect } from 'react';
import { FaX } from "react-icons/fa6";
import axios from 'axios';

export default function ModalVenda({ isOpen, onClose, onSave, venda }) {
  const [idCliente, setIdCliente] = useState(venda?.idCliente || '');
  const [idProduto, setIdProduto] = useState(venda?.idProduto || '');
  const [qtdVenda, setQtdVenda] = useState(venda?.qtdVenda || '');
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [idClienteError, setIdClienteError] = useState('');
  const [idProdutoError, setIdProdutoError] = useState('');
  const [qtdVendaError, setQtdVendaError] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Carregar clientes
      axios.get('http://3.17.182.174/api/clientes')
        .then(response => setClientes(response.data))
        .catch(error => console.error('Erro ao buscar clientes:', error));
      
      // Carregar produtos
      axios.get('http://3.17.182.174/api/produtos')
        .then(response => setProdutos(response.data))
        .catch(error => console.error('Erro ao buscar produtos:', error));
    }
  }, [isOpen]);

  const handleSave = () => {
    let hasError = false;

    if (!idCliente) {
      setIdClienteError('* Campo cliente é obrigatório');
      hasError = true;
    } else {
      setIdClienteError('');
    }

    if (!idProduto) {
      setIdProdutoError('* Campo produto é obrigatório');
      hasError = true;
    } else {
      setIdProdutoError('');
    }

    if (!qtdVenda || qtdVenda <= 0) {
      setQtdVendaError('* Quantidade deve ser maior que 0');
      hasError = true;
    } else {
      setQtdVendaError('');
    }

    if (hasError) {
      return;
    }

    const vendaData = { idCliente, idProduto, qtdVenda };
    onSave(vendaData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{venda ? 'Editar Venda' : 'Nova Venda'}</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <FaX size={20} />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cliente</label>
          <select
            value={idCliente}
            onChange={(e) => setIdCliente(e.target.value)}
            className={`w-full p-2 border rounded-lg ${idClienteError ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Selecione um cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
          {idClienteError && <p className="text-red-500 text-sm">{idClienteError}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Produto</label>
          <select
            value={idProduto}
            onChange={(e) => setIdProduto(e.target.value)}
            className={`w-full p-2 border rounded-lg ${idProdutoError ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Selecione um produto</option>
            {produtos.map(produto => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))}
          </select>
          {idProdutoError && <p className="text-red-500 text-sm">{idProdutoError}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Quantidade</label>
          <input
            type="number"
            value={qtdVenda}
            onChange={(e) => setQtdVenda(e.target.value)}
            className={`w-full p-2 border rounded-lg ${qtdVendaError ? 'border-red-500' : 'border-gray-300'}`}
          />
          {qtdVendaError && <p className="text-red-500 text-sm">{qtdVendaError}</p>}
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
