import {
  FormControl,
  HStack,
  IInputProps,
  Input as NativeBaseInput,
  useTheme,
} from "native-base";
import { Eye } from "phosphor-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

type Props = IInputProps & {
  errorMessage?: string | null;
  isPassword?: boolean;
};

export function Input({
  errorMessage,
  isPassword = false,
  isInvalid,
  ...rest
}: Props) {
  const [seePassword, setSeePassword] = useState(false);
  const invalid = !!errorMessage || isInvalid;

  const { colors, sizes } = useTheme();

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <HStack
        alignItems="center"
        rounded="lg"
        bg="gray.100"
        overflow="hidden"
        px={4}
      >
        <NativeBaseInput
          flexShrink={1}
          placeholderTextColor="gray.400"
          borderWidth={0}
          fontSize="md"
          color="gray.600"
          _focus={{
            bg: "gray.100",
            borderColor: "gray.500",
          }}
          secureTextEntry={!seePassword}
          {...rest}
        />

        {isPassword && (
          <TouchableOpacity onPress={() => setSeePassword(!seePassword)}>
            <Eye
              color={colors.gray[500]}
              size={sizes[5]}
              weight={seePassword ? "bold" : "regular"}
            />
          </TouchableOpacity>
        )}
      </HStack>
      <FormControl.ErrorMessage pl={3}>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
