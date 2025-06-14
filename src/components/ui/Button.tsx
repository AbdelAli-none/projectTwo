import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}

const Button = ({ children, className, width = "w-full", ...rest }: IProps) => {
  return (
    <button
      className={`${className} ${width} text-white font-bold py-1.5 px-2 cursor-pointer rounded-lg z-10`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
