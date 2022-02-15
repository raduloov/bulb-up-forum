export interface ErrorTextProps {
  error: string;
}

const ErrorText: React.FC<ErrorTextProps> = props => {
  const { error } = props;

  if (error === '') {
    return null;
  }

  return <p className="text-red-500">{error}</p>;
};

export default ErrorText;
