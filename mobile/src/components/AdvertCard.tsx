import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Box, Center, Image, Text, VStack } from "native-base";

import ProductImg from "@assets/product2.png";
import AvatarImg from "@assets/avatar.png";

import { UserPhoto } from "./UserPhoto";

type Props = TouchableOpacityProps & {
  condition: "new" | "used";
  active?: boolean;
};

export function AdvertCard({ condition, active = true, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <VStack w={150} mb={6}>
        <Image
          bg="gray.700"
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

        <VStack ml={1} mt={1} opacity={!active ? 0.5 : 1}>
          <Text>Tênis vermelho</Text>
          <Text
            fontSize="md"
            fontFamily="body"
            fontWeight={active ? "bold" : "normal"}
          >
            R${" "}
            <Text
              fontSize="xl"
              fontFamily="body"
              fontWeight={active ? "bold" : "normal"}
            >
              59,90
            </Text>
          </Text>
        </VStack>

        {!active && (
          <Box w={150} h={100} position="absolute" bg="gray.700:alpha.50">
            <Text
              color="gray.100"
              fontSize="sm"
              position="absolute"
              bottom={2}
              left={2}
            >
              ANÚNCIO DESATIVADO
            </Text>
          </Box>
        )}
      </VStack>
    </TouchableOpacity>
  );
}
