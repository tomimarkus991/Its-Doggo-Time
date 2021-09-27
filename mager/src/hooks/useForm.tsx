import { useState } from 'react';

const useForm = (initialValues: {
  password: string;
  username?: string;
  email?: string;
}) => {
  const [values, setValues] = useState(initialValues);

  return {
    ...values,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues({ ...values, [e.target.name]: e.target.value }),
  };
};

export default useForm;
