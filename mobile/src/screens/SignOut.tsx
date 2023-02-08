import { ScrollView, TouchableOpacity } from "react-native";
import {
  Box,
  Center,
  Heading,
  Image,
  Pressable,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { PencilSimpleLine } from "phosphor-react-native";

import LogoImg from "@assets/logo.png";
import AvatarImg from "@assets/avatar.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";

export function SignOut() {
  const { colors, sizes } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pt={20} bg="gray.200">
        <Center>
          <Image source={LogoImg} alt="Logotipo" mb={3} w={16} h={10} />

          <Heading
            fontSize="lg"
            fontFamily="heading"
            fontWeight="bold"
            color="gray.700"
            mb={3}
          >
            Boas vindas!
          </Heading>

          <Text fontSize="sm" color="gray.700" textAlign="center">
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Text>
        </Center>

        <Center>
          <Box>
            <UserPhoto
              size={24}
              alt="Imagem do usuário"
              my={4}
              source={AvatarImg}
            />

            <Pressable
              w={10}
              h={10}
              position="absolute"
              bottom={4}
              right={-10}
              rounded="full"
              bg="blue.400"
              alignItems="center"
              justifyContent="center"
            >
              <PencilSimpleLine color={colors.gray["200"]} size={sizes["4"]} />
            </Pressable>
          </Box>

          <Input placeholder="Nome" />

          <Input placeholder="E-mail" />

          <Input placeholder="Telefone" />

          <Input placeholder="Senha" />

          <Input placeholder="Confirmar senha" />

          <Button title="Criar" variant="dark" mt={2} />
        </Center>

        <Center mt={12}>
          <Text color="gray.600" fontSize="md" mb={4} fontFamily="body">
            Já tem uma conta?
          </Text>
          <Button title="Ir para login" variant="light" />
        </Center>
      </VStack>
    </ScrollView>
  );
}
