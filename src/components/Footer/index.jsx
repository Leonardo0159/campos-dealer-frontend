import { FaLinkedin, FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-white text-black py-8 mt-auto">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
        
        </div>
        <div className="text-right flex flex-col gap-1">
          <p>Leonardo Santos Nascimento</p>
          <p>Email: leo.sn159@gmail.com</p>
          <p>Telefone: +55 (41) 99533-1273</p>
          <div className="flex justify-end space-x-4 rtl:space-x-reverse">
            <a href="https://www.linkedin.com/in/leonardo-santos-538789172/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
            <a href="https://github.com/Leonardo0159" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
