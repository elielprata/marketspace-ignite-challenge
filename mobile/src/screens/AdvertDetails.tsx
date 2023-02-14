import { HStack, Image, ScrollView, Text, useTheme, VStack } from "native-base";
import {
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
  WhatsappLogo,
} from "phosphor-react-native";

import AvatarImg from "@assets/avatar.png";
import ProductImg from "@assets/product.png";

import { Header } from "@components/Header";
import { UserPhoto } from "@components/UserPhoto";
import { Button } from "@components/Button";
import { api } from "@services/api";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { PaymentMethods } from "@components/PaymentMethods";

type RouteParamsProps = {
  productId: string;
};

export function AdvertDetails() {
  const [product, setProduct] = useState();
  const { colors, sizes } = useTheme();

  const route = useRoute();
  const { productId } = route.params as RouteParamsProps;

  async function fetchProduct() {
    const response = await api.get(`/products/${productId}`);

    setProduct(response.data);
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <VStack flex={1} bg="gray.200" pt={12}>
      <ScrollView _contentContainerStyle={{ pb: 50 }}>
        <Header title="" px={6} mb={3} />

        <Image source={ProductImg} alt="Imagem do produto" />

        <VStack px={6} mt={5} justifyContent="flex-start">
          <HStack alignItems="center" mb={6}>
            <UserPhoto
              size={6}
              source={
                product.user.avatar
                  ? {
                      uri: `${api.defaults.baseURL}/images/${product.user.avatar}`,
                    }
                  : AvatarImg
              }
              mr={2}
              alt="Imagem do usuário"
            />
            <Text fontSize="sm" color="gray.700">
              {product.user.name}
            </Text>
          </HStack>

          <HStack mb={2}>
            <Text
              bg="gray.300"
              px={2}
              rounded="full"
              color="gray.600"
              fontSize="xs"
            >
              {product.is_new ? "NOVO" : "USADO"}
            </Text>
          </HStack>

          <HStack justifyContent="space-between" mb={2}>
            <Text color="gray.700" fontFamily="heading" fontSize="lg">
              {product.name}
            </Text>

            <Text fontSize="lg" fontFamily="heading" color="blue.400">
              <Text fontSize="sm">R$</Text> {product.price}
            </Text>
          </HStack>

          <Text fontSize="sm" mb={6}>
            {product.description}
          </Text>

          <HStack mb={4}>
            <Text fontSize="sm" fontFamily="heading" mr={2}>
              Aceita troca?
            </Text>

            <Text fontSize="sm">{product.accept_trade ? "SIM" : "NÃO"}</Text>
          </HStack>

          <Text fontSize="sm" fontFamily="heading" mb={2}>
            Meios de pagamento:
          </Text>

          <PaymentMethods paymentMethods={product.payment_methods} />
        </VStack>
      </ScrollView>

      <HStack
        bg="gray.100"
        px={6}
        py={5}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="lg" fontFamily="heading" color="blue.700">
          <Text fontSize="sm">R$</Text> {product.price}
        </Text>

        <Button title="Entrar em contato" onPress={() => {}}>
          <WhatsappLogo
            color={colors.gray[200]}
            size={sizes[3]}
            weight="fill"
          />
        </Button>
      </HStack>
    </VStack>
  );
}
