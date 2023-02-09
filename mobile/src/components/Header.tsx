import { Button, Heading, HStack, useTheme } from "native-base";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import { ArrowLeft, PencilSimpleLine, Plus } from "phosphor-react-native";

type Props = IHStackProps & {
  title: string;
  goBack?: boolean;
  rightIcon?: "plus" | "pencil" | null;
};

export function Header({
  title,
  goBack = true,
  rightIcon = null,
  ...rest
}: Props) {
  const { colors, sizes } = useTheme();

  return (
    <HStack justifyContent="space-between" alignItems="center" {...rest}>
      <Button w={6} p={0} bg="transparent" _pressed={{ bg: "transparent" }}>
        {goBack && <ArrowLeft color={colors.gray[700]} size={sizes[6]} />}
      </Button>

      <Heading fontFamily="heading" color="gray.700" fontSize="xl">
        {title}
      </Heading>

      <Button
        w={6}
        p={0}
        bg="transparent"
        rounded="full"
        _pressed={{ bg: "transparent", opacity: 0.3 }}
      >
        {rightIcon === "plus" && (
          <Plus color={colors.gray[700]} size={sizes[6]} />
        )}
        {rightIcon === "pencil" && (
          <PencilSimpleLine color={colors.gray[700]} size={sizes[6]} />
        )}
      </Button>
    </HStack>
  );
}
