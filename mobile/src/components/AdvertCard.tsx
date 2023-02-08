import { Center, Heading, Image, Text, VStack } from "native-base";

import ProductImg from "@assets/product2.png";
import AvatarImg from "@assets/avatar.png";

import { UserPhoto } from "./UserPhoto";

type Props = {
  condition: "new" | "used";
};

export function AdvertCard({ condition }: Props) {
  return (
    <VStack w={150} mb={6}>
      <Image
        h={100}
        w={150}
        resizeMode="cover"
        rounded="lg"
        source={ProductImg}
        alt="Imagem do produto"
      />

      <UserPhoto
        size={6}
        source={AvatarImg}
        alt="Imagem do usuário"
        position="absolute"
        top={1}
        left={1}
      />

      <Center
        px={2}
        rounded="full"
        bg={condition === "new" ? "blue.700" : "gray.600"}
        position="absolute"
        top={1}
        right={1}
      >
        <Text color="white" fontSize="sm">
          {condition === "new" ? "NOVO" : "USADO"}
        </Text>
      </Center>

      <VStack ml={1} mt={1}>
        <Text>Tênis vermelho</Text>
        <Heading fontSize="md" fontFamily="heading">
          R${" "}
          <Heading fontSize="xl" fontFamily="heading">
            59,90
          </Heading>
        </Heading>
      </VStack>
    </VStack>
  );
}
