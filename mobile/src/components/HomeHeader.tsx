import { Heading, HStack, Text, useTheme, VStack } from "native-base";
import { Plus } from "phosphor-react-native";

import AvatarImg from "@assets/avatar.png";

import { UserPhoto } from "./UserPhoto";
import { Button } from "./Button";

export function HomeHeader() {
  const { colors, sizes } = useTheme();
  return (
    <HStack mb={4}>
      <UserPhoto source={AvatarImg} size={45} alt="Imagem do usuário" mr={2} />

      <VStack justifyContent="center" flex={1}>
        <Text fontSize="md">Boas vindas,</Text>
        <Heading fontFamily="heading" fontSize="md">
          João
        </Heading>
      </VStack>

      <Button title="Criar anúncio" variant="dark">
        <Plus color={colors.gray["200"]} size={sizes["4"]} weight="bold" />
      </Button>
    </HStack>
  );
}
