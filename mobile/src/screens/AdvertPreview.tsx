import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Center,
  HStack,
  ScrollView,
  Text,
  useTheme,
  useToast,
  VStack,
} from "native-base";
import { ArrowLeft, Tag } from "phosphor-react-native";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import { useAuth } from "@hooks/useAuth";

import { ProductDTO } from "@dtos/ProductDTO";
import { ProductImagesDTO } from "@dtos/ProductImagesDTO";

import AvatarImg from "@assets/avatar.png";

import { UserPhoto } from "@components/UserPhoto";
import { Button } from "@components/Button";
import { PaymentMethods } from "@components/PaymentMethods";
import { CarouselProducts } from "@components/CarouselProducts";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Currency } from "@utils/FormatText";

type RouteParamsProps = {
  productData: {
    name: string;
    description: string;
    is_new: string;
    price: number;
    accept_trade: boolean;
    payment_methods: string[];
  };
  images: ProductImagesDTO[];
};

type PaymentMethodProps = {
  key: string;
  name: string;
};

export function AdvertPreview() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodProps[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const { colors, sizes } = useTheme();

  const toast = useToast();
  const { user } = useAuth();
  const route = useRoute();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { productData, images } = route.params as RouteParamsProps;

  async function handleAddProduct() {
    try {
      setIsLoading(true);

      const product = await api.post("/products", productData);

      const uploadForm = new FormData();
      uploadForm.append("product_id", product.data?.id);

      images.forEach((image) => {
        uploadForm.append("images", image as any);
      });

      await api.post("/products/images", uploadForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigation.navigate("advertDetails", { productId: product.data?.id });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde.";

      toast.show({ title, placement: "top", bgColor: "red.500" });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    productData.payment_methods.map((item) => {
      let name: string;
      switch (item) {
        case "pix":
          name = "Pix";
          break;
        case "cash":
          name = "Dinheiro";
          break;
        case "card":
          name = "Cartão de crédito";
          break;
        case "deposit":
          name = "Transferência Bancária";
          break;
        case "boleto":
          name = "Boleto";
          break;
      }
      setPaymentMethods((prevState) => [
        ...prevState,
        { key: item, name: name },
      ]);
    });
  }, []);

  return (
    <VStack flex={1} bg="blue.400" pt={12}>
      <Center py={4}>
        <Text fontSize="md" fontFamily="heading" color="gray.100">
          Pré visualização do anúncio
        </Text>
        <Text fontSize="md" color="gray.100">
          É assim que seu produto vai aparecer!
        </Text>
      </Center>

      <ScrollView _contentContainerStyle={{ pb: 10 }} bg="gray.200">
        <CarouselProducts images={images} preview />

        <VStack px={6} mt={5} justifyContent="flex-start">
          <HStack alignItems="center" mb={6}>
            <UserPhoto
              size={6}
              source={
                user.avatar
                  ? { uri: `${api.defaults.baseURL}/images/${user.avatar}` }
                  : AvatarImg
              }
              mr={2}
              alt="Imagem do usuário"
            />
            <Text fontSize="sm" color="gray.700">
              {user.name}
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
              {productData.is_new ? "NOVO" : "USADO"}
            </Text>
          </HStack>

          <HStack justifyContent="space-between" mb={2}>
            <Text color="gray.700" fontFamily="heading" fontSize="lg">
              {productData.name}
            </Text>

            <Text fontSize="lg" fontFamily="heading" color="blue.400">
              <Text fontSize="sm">R$</Text> {Currency(productData.price)}
            </Text>
          </HStack>

          <Text fontSize="sm" mb={6}>
            {productData.description}
          </Text>

          <HStack mb={4}>
            <Text fontSize="sm" fontFamily="heading" mr={2}>
              Aceita troca?
            </Text>

            <Text fontSize="sm">
              {productData.accept_trade ? "Sim" : "Não"}
            </Text>
          </HStack>

          <Text fontSize="sm" fontFamily="heading" mb={2}>
            Meios de pagamento:
          </Text>

          <PaymentMethods paymentMethods={paymentMethods} />
        </VStack>
      </ScrollView>

      <HStack
        bg="gray.100"
        px={6}
        py={5}
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          title="Voltar e editar"
          variant="light"
          mr={3}
          flex={1}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color={colors.gray[600]} size={sizes[4]} />
        </Button>

        <Button
          title="Publicar"
          flex={1}
          onPress={handleAddProduct}
          isLoading={isLoading}
        >
          <Tag color={colors.gray[200]} size={sizes[4]} />
        </Button>
      </HStack>
    </VStack>
  );
}
