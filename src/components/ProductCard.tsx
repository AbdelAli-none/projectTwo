import type { IProduct } from "../interfaces";
import { addCommaToPrice, txtSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  idx: number;
  setProductToEditIdx: (value: number) => void;
}

const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
  idx,
  setProductToEditIdx,
}: IProps) => {
  const { title, description, imageURL, price, category, colors } = product;

  const colorContainer = colors.map((color: string) => {
    return <CircleColor key={color} color={color} />;
  });

  // Hnadler
  const onEdit = () => {
    setProductToEdit(product);
    openEditModal();
    setProductToEditIdx(idx);
  };

  return (
    <div className="max-w-sm md-max-w-lg mx-auto md:mx-0 border border-indigo-200 rounded-md p-2 flex flex-col">
      <Image
        imageURL={imageURL}
        alt={title}
        className="rounded-md mb-2 w-full h-full"
      />
      <h3>{title}</h3>
      <p className="text-gray-400 my-3 text-base h-18">
        {txtSlicer(description)}
      </p>

      <div className="flex flex-wrap items-center my-3 gap-1">
        {colorContainer}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-indigo-500 font-bold">
          ${addCommaToPrice(price)}
        </span>
        <div className="category flex items-center">
          <span className="me-2">{category.name}</span>
          <Image
            imageURL={category.imageURL}
            alt={category.name}
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-5 space-x-2">
        <Button
          className="bg-indigo-600 hover:bg-indigo-700"
          width="w-full"
          onClick={onEdit}
        >
          EDIT
        </Button>
        <Button className="bg-red-600 hover:bg-red-700" width="w-full">
          DELETE
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
