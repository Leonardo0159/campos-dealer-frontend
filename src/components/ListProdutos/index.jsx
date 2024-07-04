import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import ModalProduto from '../ModalProduto';

export default function ListProdutos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [isModalExcluirOpen, setIsModalExcluirOpen] = useState(false);
  const [isModalProdutoOpen, setIsModalProdutoOpen] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState(null);
  const [produtoToEdit, setProdutoToEdit] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('https://3.17.182.174/api/produtos');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  const fetchProdutosByName = async (name) => {
    try {
      const response = await axios.get(`https://3.17.182.174/api/produtos/nome/${name}`);
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('https://3.17.182.174/api/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value === '') {
      fetchProdutos();
    } else {
      fetchProdutosByName(value);
    }
  };

  const openModalExcluir = (produto) => {
    setProdutoToDelete(produto);
    setIsModalExcluirOpen(true);
  };

  const closeModalExcluir = () => {
    setIsModalExcluirOpen(false);
    setProdutoToDelete(null);
  };

  const deleteProduto = async () => {
    if (!produtoToDelete) return;

    try {
      await axios.delete(`https://3.17.182.174/api/produtos/${produtoToDelete.id}`);
      setProdutos(produtos.filter(produto => produto.id !== produtoToDelete.id));
      closeModalExcluir();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  const openModalProduto = (produto) => {
    setProdutoToEdit(produto);
    setIsModalProdutoOpen(true);
  };

  const closeModalProduto = () => {
    setIsModalProdutoOpen(false);
    setProdutoToEdit(null);
  };

  const saveProduto = async (produtoData) => {
    if (produtoToEdit) {
      try {
        await axios.put(`https://3.17.182.174/api/produtos/${produtoToEdit.id}`, produtoData);
        fetchProdutos();
      } catch (error) {
        console.error('Erro ao atualizar produto:', error);
      }
    } else {
      try {
        await axios.post('https://3.17.182.174/api/produtos', produtoData);
        fetchProdutos();
      } catch (error) {
        console.error('Erro ao adicionar produto:', error);
      }
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Pesquisar produto..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Nome</th>
              <th className="py-2 px-4 border-b text-left">Preço</th>
              <th className="py-2 px-4 border-b text-right">
                <button
                  className='bg-green-500 px-2 rounded text-white hover:cursor-pointer'
                  onClick={() => openModalProduto(null)}
                >
                  Novo Produto
                </button>
              </th>
              <th className="py-2 px-4 border-b text-right">Deletar</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(produto => (
              <tr key={produto.id}>
                <td className="py-2 px-4 border-b">{produto.id}</td>
                <td className="py-2 px-4 border-b">{produto.nome}</td>
                <td className="py-2 px-4 border-b">{"R$ "+produto.preco.toFixed(2)}</td>
                <th className="py-2 px-4 border-b text-right">
                  <button
                    className='bg-green-500 px-2 rounded text-white hover:cursor-pointer'
                    onClick={() => openModalProduto(produto)}
                  >
                    Selecionar
                  </button>
                </th>
                <th className="py-2 px-4 border-b text-right">
                  <button
                    className='bg-red-500 px-2 py-2 rounded text-white hover:cursor-pointer'
                    onClick={() => openModalExcluir(produto)}
                  >
                    <FaTrash />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalExcluirOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Tem certeza que deseja excluir?</h2>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={closeModalExcluir}
              >
                Não
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={deleteProduto}
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalProdutoOpen && (
        <ModalProduto
          isOpen={isModalProdutoOpen}
          onClose={closeModalProduto}
          onSave={saveProduto}
          produto={produtoToEdit}
        />
      )}
    </div>
  );
}
