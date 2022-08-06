/* eslint-disable jsx-a11y/no-autofocus */
import { useField } from "formik";

import clsx from "clsx";
import { ReactNode } from "react";

import { InputErrorText } from "components";

const sizes = {
  sm: "py-2 text-md rounded-md",
  md: "py-2 text-lg font-semibold rounded-lg",
  lg: "py-3 text-xl font-semibold rounded-lg",
};

const variants = {
  // regular --> hover --> active --> dark
  default: `bg-white text-slate-700 border-2 border-gray-300 caret-gray-400 focus:outline-none focus:border-slate-500`,
  green: `bg-lime-500 text-[#f3f2f0] border-lime-600
  hover:text-white`,
  dark: `bg-gray-700 text-[#f3f2f0] border-gray-900
    hover:text-white`,
  blue: `bg-blue-700 text-[#f3f2f0] border-blue-900
    hover:text-white`,
};

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string | ReactNode;
  inputPrefix?: ReactNode;
  variant?: keyof typeof variants;
  inputSize?: keyof typeof sizes;
};

export const Input = ({
  label,
  name,
  className = "appearance-none px-4",
  inputSize = "md",
  inputPrefix,
  variant = "default",
  ...props
}: Props) => {
  const [field, { touched, error }] = useField(name);

  return (
    <>
      {label && (
        <div className="mb-2">
          <label htmlFor={props.id || name}>{label}</label>
        </div>
      )}
      {inputPrefix ? (
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-400 opacity-75 sm:text-sm">{inputPrefix}</span>
          </div>
          <input
            className={clsx(
              className,
              sizes[inputSize],
              variants[variant],
              error && "input-error",
              "pl-7"
            )}
            autoFocus={false}
            autoComplete="off"
            {...field}
            {...props}
          />
        </div>
      ) : (
        <input
          className={clsx(
            className,
            sizes[inputSize],
            variants[variant],
            error && "input-error",
            ""
          )}
          autoFocus={false}
          autoComplete="off"
          {...field}
          {...props}
        />
      )}
      <InputErrorText touched={touched} error={error} />
    </>
  );
};
