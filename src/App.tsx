import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { productList } from "./data";
import Button from "./components/ui/Button";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // Renders;
  const renderProductsList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <main className="container">
      <Button
        onClick={openModal}
        className="bg-indigo-600 hover:bg-indigo-800 z-20 relative"
      >
        Add
      </Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductsList}
      </div>
      <Modal isOpen={isOpen} close={closeModal} title="Add A New Product">
        <div className="flex items-center space-x-3">
          <Button className="bg-indigo-600 hover:bg-indigo-800">Sumbit</Button>
          <Button className="bg-gray-400 hover:bg-gray-800 w-full">
            Cancel
          </Button>
        </div>
      </Modal>
    </main>
  );
}

export default App;
