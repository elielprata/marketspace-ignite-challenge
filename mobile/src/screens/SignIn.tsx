import { Center, Heading, Image, Text, VStack } from "native-base";

import LogoImg from "@assets/logo.png";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
  return (
    <VStack flex={1} px={10} pt={24} bg="gray.200">
      <Center>
        <Image source={LogoImg} alt="Logotipo" />

        <Heading
          fontSize={40}
          fontFamily="heading"
          fontWeight="bold"
          color="gray.700"
        >
          marketspace
        </Heading>
        <Text fontSize="md" color="gray.700">
          Seu espaço de compra e venda
        </Text>
      </Center>

      <Center mt={10}>
        <Text fontSize="lg" color="gray.500" mb={4}>
          Acesse sua conta
        </Text>

        <Input placeholder="E-mail" />

        <Input placeholder="Senha" />

        <Button title="Entrar" />
      </Center>

      <Center mt={24}>
        <Text color="gray.600" fontSize="md" mb={4} fontFamily="body">
          Ainda não tem acesso?
        </Text>
        <Button title="Criar conta" variant="light" />
      </Center>
    </VStack>
  );
}
