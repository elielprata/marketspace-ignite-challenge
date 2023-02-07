import { IInputProps, Input as NativeBaseInput } from "native-base";

type Props = IInputProps & {};

export function Input({ ...rest }: Props) {
  return (
    <NativeBaseInput
      px={4}
      pt={3}
      mt={4}
      rounded="lg"
      bg="gray.100"
      placeholderTextColor="gray.400"
      fontSize="md"
      color="gray.600"
      _focus={{
        bg: "gray.100",
        borderColor: "gray.500",
      }}
      {...rest}
    />
  );
}
