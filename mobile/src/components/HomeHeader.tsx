import { useNavigation } from "@react-navigation/native";
import { Heading, HStack, Text, useTheme, VStack } from "native-base";
import { Plus } from "phosphor-react-native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { useAuth } from "@hooks/useAuth";

import AvatarImg from "@assets/avatar.png";

import { UserPhoto } from "./UserPhoto";
import { Button } from "./Button";
import { api } from "@services/api";

export function HomeHeader() {
  const { colors, sizes } = useTheme();

  const { user } = useAuth();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  return (
    <HStack mb={4}>
      <UserPhoto
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/images/${user.avatar}` }
            : AvatarImg
        }
        size={45}
        alt="Imagem do usuário"
        mr={2}
      />

      <VStack justifyContent="center" flex={1}>
        <Text fontSize="md">Boas vindas,</Text>
        <Heading fontFamily="heading" fontSize="md">
          {user.name}
        </Heading>
      </VStack>

      <Button
        title="Criar anúncio"
        variant="dark"
        onPress={() => navigation.navigate("createAdvert")}
      >
        <Plus color={colors.gray["200"]} size={sizes["4"]} weight="bold" />
      </Button>
    </HStack>
  );
}
