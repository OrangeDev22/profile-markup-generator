import React, { ForwardRefRenderFunction, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  ref: string;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, ...otherProps },
  ref
) => {
  return (
    <div className="relative">
      <input
        className="w-full rounded-lg border py-2 px-3 text-md bg-neutral-600 placeholder-gray-600 border-gray-700 outline- hover:bg-neutral-500 placeholder-neutral-300 outline-green-500"
        {...otherProps}
        name={name}
        ref={ref}
      />
    </div>
  );
};

const FormInput = React.forwardRef(Input);

export default FormInput;
