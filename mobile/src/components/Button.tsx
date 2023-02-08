import {
  Button as NativeBaseButton,
  HStack,
  IButtonProps,
  Text,
} from "native-base";
import { ReactNode } from "react";

type Props = IButtonProps & {
  title: string;
  variant?: "dark" | "light" | "main";
  children?: ReactNode;
};

export function Button({
  title,
  variant = "main",
  children: Icon,
  ...rest
}: Props) {
  return (
    <NativeBaseButton
      p={3}
      bg={
        variant === "dark"
          ? "gray.700"
          : variant === "light"
          ? "gray.300"
          : "blue.400"
      }
      rounded="lg"
      _pressed={{
        bg:
          variant === "dark"
            ? "gray.700"
            : variant === "light"
            ? "gray.300"
            : "blue.400",
        opacity: 0.5,
      }}
      {...rest}
    >
      <HStack alignItems="center">
        {Icon}
        <Text
          ml={Icon ? 2 : 0}
          fontSize="md"
          fontWeight="bold"
          color={variant === "light" ? "gray.600" : "gray.100"}
        >
          {title}
        </Text>
      </HStack>
    </NativeBaseButton>
  );
}
