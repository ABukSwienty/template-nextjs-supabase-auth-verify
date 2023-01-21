import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";

export interface InputWrapperProps extends Omit<FormControlProps, "isInvalid"> {
  children?: React.ReactNode;
  label?: string;
  helperText?: string;
  error?: string;
}

const InputWrapper = ({
  label,
  helperText,
  error,
  children,
  ...props
}: InputWrapperProps) => {
  return (
    <FormControl isInvalid={!!error} {...props}>
      {label && <FormLabel>{label}</FormLabel>}
      {children}
      {!error && helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputWrapper;
