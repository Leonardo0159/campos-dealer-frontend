import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import ModalCliente from '../ModalCliente';

export default function ListClientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [clientes, setClientes] = useState([]);
  const [isModalExcluirOpen, setIsModalExcluirOpen] = useState(false);
  const [isModalClienteOpen, setIsModalClienteOpen] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState(null);
  const [clienteToEdit, setClienteToEdit] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://3.17.182.174/api/clientes');
        console.log(response)
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const fetchClientesByName = async (name) => {
    try {
      const response = await axios.get(`http://3.17.182.174/api/clientes/nome/${name}`);
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://3.17.182.174/api/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value === '') {
      fetchClientes();
    } else {
      fetchClientesByName(value);
    }
  };

  const openModalExcluir = (cliente) => {
    setClienteToDelete(cliente);
    setIsModalExcluirOpen(true);
  };

  const closeModalExcluir = () => {
    setIsModalExcluirOpen(false);
    setClienteToDelete(null);
  };

  const deleteCliente = async () => {
    if (!clienteToDelete) return;

    try {
      await axios.delete(`http://3.17.182.174/api/clientes/${clienteToDelete.id}`);
      setClientes(clientes.filter(cliente => cliente.id !== clienteToDelete.id));
      closeModalExcluir();
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    }
  };

  const openModalCliente = (cliente) => {
    setClienteToEdit(cliente);
    setIsModalClienteOpen(true);
  };

  const closeModalCliente = () => {
    setIsModalClienteOpen(false);
    setClienteToEdit(null);
  };

  const saveCliente = async (clienteData) => {
    if (clienteToEdit) {
      try {
        await axios.put(`http://3.17.182.174/api/clientes/${clienteToEdit.id}`, clienteData);
        fetchClientes();
      } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
      }
    } else {
      try {
        await axios.post('http://3.17.182.174/api/clientes', clienteData);
        fetchClientes();
      } catch (error) {
        console.error('Erro ao adicionar cliente:', error);
      }
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Pesquisar cliente..."
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
              <th className="py-2 px-4 border-b text-left">Cidade</th>
              <th className="py-2 px-4 border-b text-right">
                <button
                  className='bg-green-500 px-2 rounded text-white hover:cursor-pointer'
                  onClick={() => openModalCliente(null)}
                >
                  Novo Cliente
                </button>
              </th>
              <th className="py-2 px-4 border-b text-right">Deletar</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.id}>
                <td className="py-2 px-4 border-b">{cliente.id}</td>
                <td className="py-2 px-4 border-b">{cliente.nome}</td>
                <td className="py-2 px-4 border-b">{cliente.cidade}</td>
                <th className="py-2 px-4 border-b text-right">
                  <button
                    className='bg-green-500 px-2 rounded text-white hover:cursor-pointer'
                    onClick={() => openModalCliente(cliente)}
                  >
                    Selecionar
                  </button>
                </th>
                <th className="py-2 px-4 border-b text-right">
                  <button
                    className='bg-red-500 px-2 py-2 rounded text-white hover:cursor-pointer'
                    onClick={() => openModalExcluir(cliente)}
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
                onClick={deleteCliente}
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalClienteOpen && (
        <ModalCliente
          isOpen={isModalClienteOpen}
          onClose={closeModalCliente}
          onSave={saveCliente}
          cliente={clienteToEdit}
        />
      )}
    </div>
  );
}
