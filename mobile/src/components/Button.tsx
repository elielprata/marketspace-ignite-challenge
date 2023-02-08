import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
  variant?: "dark" | "light" | "main";
};

export function Button({ title, variant = "main", ...rest }: Props) {
  return (
    <NativeBaseButton
      p={3}
      w="full"
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
      <Text
        fontSize="md"
        fontWeight="bold"
        color={variant === "light" ? "gray.600" : "gray.100"}
      >
        {title}
      </Text>
    </NativeBaseButton>
  );
}
