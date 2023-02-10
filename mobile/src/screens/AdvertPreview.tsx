import {
  Center,
  HStack,
  Image,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";
import {
  ArrowLeft,
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
  Tag,
  WhatsappLogo,
} from "phosphor-react-native";

import AvatarImg from "@assets/avatar.png";
import ProductImg from "@assets/product.png";

import { UserPhoto } from "@components/UserPhoto";
import { Button } from "@components/Button";

export function AdvertPreview() {
  const { colors, sizes } = useTheme();

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

      <ScrollView _contentContainerStyle={{ pb: 50 }} bg="gray.200">
        <Image source={ProductImg} alt="Imagem do produto" />

        <VStack px={6} mt={5} justifyContent="flex-start">
          <HStack alignItems="center" mb={6}>
            <UserPhoto
              size={6}
              source={AvatarImg}
              mr={2}
              alt="Imagem do usuário"
            />
            <Text fontSize="sm" color="gray.700">
              Maria Oliveira
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
              NOVO
            </Text>
          </HStack>

          <HStack justifyContent="space-between" mb={2}>
            <Text color="gray.700" fontFamily="heading" fontSize="lg">
              Bicicleta
            </Text>

            <Text fontSize="lg" fontFamily="heading" color="blue.400">
              <Text fontSize="sm">R$</Text> 120,00
            </Text>
          </HStack>

          <Text fontSize="sm" mb={6}>
            Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
            Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
            nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis
            in aliquam.
          </Text>

          <HStack mb={4}>
            <Text fontSize="sm" fontFamily="heading" mr={2}>
              Aceita troca?
            </Text>

            <Text fontSize="sm">Sim</Text>
          </HStack>

          <Text fontSize="sm" fontFamily="heading" mb={2}>
            Meios de pagamento:
          </Text>

          <VStack>
            <Barcode />
            <QrCode />
            <Money />
            <CreditCard />
            <Bank />
            <Text>Boleto</Text>
            <Text>Pix</Text>
            <Text>Dinheiro</Text>
            <Text>Cartão de Crédito</Text>
            <Text>Depósito Bancário</Text>
          </VStack>
        </VStack>
      </ScrollView>

      <HStack
        bg="gray.100"
        px={6}
        py={5}
        justifyContent="space-between"
        alignItems="center"
      >
        <Button title="Voltar e editar" variant="light" mr={3} flex={1}>
          <ArrowLeft color={colors.gray[600]} size={sizes[4]} />
        </Button>

        <Button title="Avançar" flex={1} onPress={() => {}}>
          <Tag color={colors.gray[200]} size={sizes[4]} />
        </Button>
      </HStack>
    </VStack>
  );
}
