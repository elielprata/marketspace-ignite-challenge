import { Button, Heading, HStack, useTheme } from "native-base";
import { ArrowLeft, Plus } from "phosphor-react-native";

type Props = {
  goBack?: boolean;
};

export function Header({ goBack = true }: Props) {
  const { colors, sizes } = useTheme();

  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Button w={6} p={0} bg="transparent" _pressed={{ bg: "transparent" }}>
        {goBack && <ArrowLeft color={colors.gray[700]} size={sizes[6]} />}
      </Button>

      <Heading fontFamily="heading" color="gray.700" fontSize="xl">
        Meus anúncios
      </Heading>

      <Button w={6} p={0} bg="transparent" _pressed={{ bg: "transparent" }}>
        <Plus color={colors.gray[700]} size={sizes[6]} />
      </Button>
    </HStack>
  );
}
