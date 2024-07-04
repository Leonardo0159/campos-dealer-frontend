import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import ModalVenda from '../ModalVenda'; // Certifique-se de importar o componente ModalVenda

export default function ListVendas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [vendas, setVendas] = useState([]);
  const [isModalExcluirOpen, setIsModalExcluirOpen] = useState(false);
  const [isModalVendaOpen, setIsModalVendaOpen] = useState(false);
  const [vendaToDelete, setVendaToDelete] = useState(null);
  const [vendaToEdit, setVendaToEdit] = useState(null);

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const response = await axios.get('http://3.17.182.174/api/vendas');
        setVendas(response.data);
      } catch (error) {
        console.error('Erro ao buscar vendas:', error);
      }
    };

    fetchVendas();
  }, []);

  const fetchVendasByName = async (name) => {
    try {
      const response = await axios.get(`http://3.17.182.174/api/vendas/buscar/${name}`);
      setVendas(response.data);
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
    }
  };

  const fetchVendas = async () => {
    try {
      const response = await axios.get('http://3.17.182.174/api/vendas');
      setVendas(response.data);
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
    }
  };

  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value === '') {
      fetchVendas();
    } else {
      fetchVendasByName(value);
    }
  };

  const openModalExcluir = (venda) => {
    setVendaToDelete(venda);
    setIsModalExcluirOpen(true);
  };

  const closeModalExcluir = () => {
    setIsModalExcluirOpen(false);
    setVendaToDelete(null);
  };

  const deleteVenda = async () => {
    if (!vendaToDelete) return;

    try {
      await axios.delete(`http://3.17.182.174/api/vendas/${vendaToDelete.idVenda}`);
      setVendas(vendas.filter(venda => venda.idVenda !== vendaToDelete.idVenda));
      closeModalExcluir();
    } catch (error) {
      console.error('Erro ao deletar venda:', error);
    }
  };

  const openModalVenda = (venda) => {
    setVendaToEdit(venda);
    setIsModalVendaOpen(true);
  };

  const closeModalVenda = () => {
    setIsModalVendaOpen(false);
    setVendaToEdit(null);
  };

  const saveVenda = async (vendaData) => {
    if (vendaToEdit) {
      try {
        await axios.put(`http://3.17.182.174/api/vendas/${vendaToEdit.idVenda}`, vendaData);
        fetchVendas();
      } catch (error) {
        console.error('Erro ao atualizar venda:', error);
      }
    } else {
      try {
        await axios.post('http://3.17.182.174/api/vendas', vendaData);
        fetchVendas();
      } catch (error) {
        console.error('Erro ao adicionar venda:', error);
      }
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Pesquisar Venda por Cliente ou Produto..."
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
              <th className="py-2 px-4 border-b text-left">Cliente</th>
              <th className="py-2 px-4 border-b text-left">Produto</th>
              <th className="py-2 px-4 border-b text-left">Quantidade</th>
              <th className="py-2 px-4 border-b text-left">Valor Unitário</th>
              <th className="py-2 px-4 border-b text-left">Valor Total</th>
              <th className="py-2 px-4 border-b text-left">Data</th>
              <th className="py-2 px-4 border-b text-right">
                <button
                  className='bg-green-500 px-2 rounded text-white hover:cursor-pointer'
                  onClick={() => openModalVenda(null)}
                >
                  Nova Venda
                </button>
              </th>
              <th className="py-2 px-4 border-b text-right">Deletar</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map(venda => (
              <tr key={venda.idVenda}>
                <td className="py-2 px-4 border-b">{venda.idVenda}</td>
                <td className="py-2 px-4 border-b">{venda.clienteNome}</td>
                <td className="py-2 px-4 border-b">{venda.produtoNome}</td>
                <td className="py-2 px-4 border-b">{venda.qtdVenda}</td>
                <td className="py-2 px-4 border-b">{venda.vlrUnitarioVenda.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{venda.vlrTotalVenda.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{new Date(venda.dthVenda).toLocaleDateString()}</td>
                <th className="py-2 px-4 border-b text-right">
                  <button
                    className='bg-green-500 px-2 rounded text-white hover:cursor-pointer'
                    onClick={() => openModalVenda(venda)}
                  >
                    Selecionar
                  </button>
                </th>
                <th className="py-2 px-4 border-b text-right">
                  <button
                    className='bg-red-500 px-2 py-2 rounded text-white hover:cursor-pointer'
                    onClick={() => openModalExcluir(venda)}
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
                onClick={deleteVenda}
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalVendaOpen && (
        <ModalVenda
          isOpen={isModalVendaOpen}
          onClose={closeModalVenda}
          onSave={saveVenda}
          venda={vendaToEdit}
        />
      )}
    </div>
  );
}
