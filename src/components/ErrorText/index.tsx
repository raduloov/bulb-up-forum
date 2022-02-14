export interface ErrorTextProps {
  error: string;
}

const ErrorText: React.FC<ErrorTextProps> = props => {
  const { error } = props;

  if (error === '') {
    return null;
  }

  return <small className="text-red-500">{error}</small>;
};

export default ErrorText;
