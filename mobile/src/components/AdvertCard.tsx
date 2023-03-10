import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Box, Center, HStack, Image, Text, VStack } from "native-base";

import AvatarImg from "@assets/avatar.png";
import ImageNotFound from "@assets/image-not-found.png";

import { UserPhoto } from "./UserPhoto";
import { api } from "@services/api";
import { Currency } from "@utils/FormatText";

type Props = TouchableOpacityProps & {
  data: any;
  userPhoto: string;
  active?: boolean;
};

export function AdvertCard({ data, userPhoto, active = true, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <VStack w={150} mb={6}>
        <Image
          bg="gray.700"
          h={100}
          w={150}
          resizeMode="cover"
          rounded="lg"
          source={
            data.product_images.length > 0
              ? {
                  uri: `${api.defaults.baseURL}/images/${data.product_images[0].path}`,
                }
              : ImageNotFound
          }
          alt="Imagem do produto"
        />

        <UserPhoto
          size={6}
          source={
            userPhoto
              ? { uri: `${api.defaults.baseURL}/images/${userPhoto}` }
              : AvatarImg
          }
          alt="Imagem do usuário"
          position="absolute"
          top={1}
          left={1}
        />

        <Center
          px={2}
          rounded="full"
          bg={data.is_new ? "blue.700" : "gray.600"}
          position="absolute"
          top={1}
          right={1}
        >
          <Text color="white" fontSize="sm">
            {data.is_new ? "NOVO" : "USADO"}
          </Text>
        </Center>

        <VStack ml={1} mt={1} opacity={!active ? 0.5 : 1}>
          <Text>{data.name}</Text>
          <HStack alignItems="flex-end">
            <Text fontSize="md" fontFamily={active ? "heading" : "body"} pb={1}>
              R${" "}
            </Text>
            <Text fontSize="xl" fontFamily={active ? "heading" : "body"}>
              {Currency(data.price)}
            </Text>
          </HStack>
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
