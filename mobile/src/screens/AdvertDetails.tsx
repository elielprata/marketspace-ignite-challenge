import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  HStack,
  ScrollView,
  Text,
  useTheme,
  useToast,
  VStack,
} from "native-base";
import { Power, Trash, WhatsappLogo } from "phosphor-react-native";

import AvatarImg from "@assets/avatar.png";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { ProductDTO } from "@dtos/ProductDTO";

import { Header } from "@components/Header";
import { UserPhoto } from "@components/UserPhoto";
import { Button } from "@components/Button";
import { PaymentMethods } from "@components/PaymentMethods";
import { CarouselProducts } from "@components/CarouselProducts";
import { Loading } from "@components/Loading";
import { useAuth } from "@hooks/useAuth";
import { Linking } from "react-native";
import { Currency } from "@utils/FormatText";

type RouteParamsProps = {
  productId: string;
};

export function AdvertDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);
  const { colors, sizes } = useTheme();

  const toast = useToast();
  const route = useRoute();
  const { user } = useAuth();
  const { productId } = route.params as RouteParamsProps;

  async function fetchProduct() {
    try {
      setIsLoading(true);
      const response = await api.get(`/products/${productId}`);

      setProduct(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os produtos";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleOpenWhatsApp(tel: string) {
    await Linking.openURL(`whatsapp://send?phone=${tel}`);
  }

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return isLoading ? (
    <Loading />
  ) : (
    <VStack flex={1} bg="gray.200" pt={12}>
      <ScrollView _contentContainerStyle={{ pb: 50 }}>
        {product.user_id === user.id ? (
          <Header title="" px={6} mb={3} rightIcon="pencil" />
        ) : (
          <Header title="" px={6} mb={3} />
        )}

        <CarouselProducts images={product.product_images} />

        <VStack px={6} mt={5} justifyContent="flex-start">
          <HStack alignItems="center" mb={6}>
            <UserPhoto
              size={6}
              source={
                product.user?.avatar
                  ? {
                      uri: `${api.defaults.baseURL}/images/${product.user.avatar}`,
                    }
                  : AvatarImg
              }
              mr={2}
              alt="Imagem do usuário"
            />
            <Text fontSize="sm" color="gray.700">
              {product.user?.name}
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
              <Text fontSize="sm">R$</Text> {Currency(product.price)}
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

      {product.user_id === user.id ? (
        <VStack
          bg="gray.100"
          px={6}
          py={5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Button title="Desativar anúncio" variant="dark" w="full" mb={2}>
            <Power color={colors.gray[600]} size={sizes[4]} />
          </Button>

          <Button
            title="Excluir anúncio"
            variant="light"
            w="full"
            onPress={() => {}}
          >
            <Trash color={colors.gray[200]} size={sizes[4]} />
          </Button>
        </VStack>
      ) : (
        <HStack
          bg="gray.100"
          px={6}
          py={5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="lg" fontFamily="heading" color="blue.700">
            <Text fontSize="sm">R$</Text> {Currency(product.price)}
          </Text>

          <Button
            title="Entrar em contato"
            onPress={() => handleOpenWhatsApp(product.user.tel)}
          >
            <WhatsappLogo
              color={colors.gray[200]}
              size={sizes[3]}
              weight="fill"
            />
          </Button>
        </HStack>
      )}
    </VStack>
  );
}
