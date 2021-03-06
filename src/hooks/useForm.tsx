import { useState } from "react";

export const useForm = (initialValues: { username?: string; email: string; password: string }) => {
  const [values, setValues] = useState(initialValues);

  return {
    ...values,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues({ ...values, [e.target.name]: e.target.value }),
  };
};
