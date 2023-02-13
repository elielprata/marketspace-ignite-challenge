import { HStack, Text, useTheme, VStack } from "native-base";
import {
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
} from "phosphor-react-native";

type Props = {
  paymentMethods: string[];
};

export function PaymentMethods({ paymentMethods = [] }: Props) {
  const { colors, sizes } = useTheme();
  console.log(paymentMethods.includes("cash"));

  return (
    <VStack>
      {paymentMethods.includes("boleto") && (
        <HStack alignItems="center">
          <Barcode color={colors.gray[600]} size={sizes[6]} />
          <Text color="gray.600" ml={2}>
            Boleto
          </Text>
        </HStack>
      )}

      {paymentMethods.includes("pix") && (
        <HStack>
          <QrCode color={colors.gray[600]} size={sizes[6]} />
          <Text color="gray.600" ml={2}>
            Pix
          </Text>
        </HStack>
      )}

      {paymentMethods.includes("cash") && (
        <HStack>
          <Money color={colors.gray[600]} size={sizes[6]} />
          <Text color="gray.600" ml={2}>
            Dinheiro
          </Text>
        </HStack>
      )}

      {paymentMethods.includes("card") && (
        <HStack>
          <CreditCard color={colors.gray[600]} size={sizes[6]} />
          <Text color="gray.600" ml={2}>
            Cartão de Crédito
          </Text>
        </HStack>
      )}

      {paymentMethods.includes("card") && (
        <HStack>
          <Bank color={colors.gray[600]} size={sizes[6]} />
          <Text color="gray.600" ml={2}>
            Depósito Bancário
          </Text>
        </HStack>
      )}
    </VStack>
  );
}
