import { useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import type { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";

function App() {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  // States
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productToEdit, setProductToEdit] = useState(defaultProductObj);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  console.log(productToEdit);

  // Handler
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setProduct({
      ...product,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const onCancel = () => {
    setProduct(defaultProductObj);
    closeModal();
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { title, description, imageURL, price } = product;

    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    // check if any property has a value of "" && check if all properties have a value of ""
    const isError = !Object.values(errors).every((error) => error === "");
    if (isError) {
      setErrors(errors);
      return;
    }

    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);

    setProduct(defaultProductObj);
    setTempColors([]);
    closeModal();
  };

  // Renders;
  const renderProductsList = products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
    />
  ));

  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-[2px] text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));

  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
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
        <form className="space-y-3" onSubmit={submitHandler}>
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          {renderFormInputList}
          <div className="flex flex-wrap items-center my-3 gap-1 [&>*:not(:last-child)]:me-1">
            {renderProductColors}
          </div>
          <div className="flex flex-wrap items-center my-3 gap-1 [&>*:not(:last-child)]:me-1">
            {tempColors.map((color, idx) => (
              <span
                key={idx}
                className="p-1 font-bold text-white text-xs rounded-lg"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-600 hover:bg-indigo-800">
              Sumbit
            </Button>
            <Button
              className="bg-gray-400 hover:bg-gray-500 w-full"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App;
