import {
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useCallback, useState } from "react";

export interface PasswordInputProps extends Omit<InputProps, "type"> {}

const PasswordInput = ({
  placeholder = "••••••••",
  ...inputProps
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  const handleToggle = useCallback(() => {
    let flag: boolean = false;
    setShow((prev) => {
      flag = !prev;
      return flag;
    });
    if (flag) {
      setTimeout(() => setShow(false), 3000);
    }
  }, []);

  return (
    <InputGroup>
      <Input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        {...inputProps}
      />
      <InputRightElement>
        <Tooltip label={show ? "hide password" : "show password"}>
          <IconButton
            onClick={handleToggle}
            size="sm"
            color="green"
            aria-label="toggle password"
            icon={
              show ? (
                <EyeSlashIcon className="h-4 w-4 text-gray-400" />
              ) : (
                <EyeIcon className="h-4 w-4 text-gray-400" />
              )
            }
          />
        </Tooltip>
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;
