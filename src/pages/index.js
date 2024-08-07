import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import ListClientes from "@/components/ListClientes";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />
      <main className="flex-grow w-full max-w-screen-xl mx-auto p-4">
        <div className="w-full flex justify-center">
          <h1 className="text-3xl font-bold">Clientes</h1>
        </div>
        <ListClientes />
      </main>
      <Footer />
    </div>
  );
}
