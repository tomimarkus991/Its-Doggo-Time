interface Props {
  touched: boolean;
  error: string | undefined;
}

export const InputErrorText = ({ touched, error }: Props) => {
  return <>{touched && error && <p className="text-sm font-medium text-red-500">{error}</p>}</>;
};
