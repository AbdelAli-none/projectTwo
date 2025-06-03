import type { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const CircleColor = ({ color, ...rest }: IProps) => {
  return (
    <span
      className={`w-5 h-5 rounded-full cursor-pointer block z-10`}
      style={{ backgroundColor: color }}
      {...rest}
    />
  );
};

export default CircleColor;
