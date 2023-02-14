import { HStack, Text, useTheme, VStack } from "native-base";
import {
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
} from "phosphor-react-native";

type Props = {
  paymentMethods: {
    key: string;
    name: string;
  }[];
};

export function PaymentMethods({ paymentMethods = [] }: Props) {
  const { colors, sizes } = useTheme();

  return (
    <VStack>
      {paymentMethods.map(({ key, name }) => (
        <HStack alignItems="center">
          {key === "boleto" && (
            <Barcode color={colors.gray[600]} size={sizes[6]} />
          )}

          {key === "pix" && <QrCode color={colors.gray[600]} size={sizes[6]} />}

          {key === "cash" && <Money color={colors.gray[600]} size={sizes[6]} />}

          {key === "card" && (
            <CreditCard color={colors.gray[600]} size={sizes[6]} />
          )}

          {key === "deposit" && (
            <Bank color={colors.gray[600]} size={sizes[6]} />
          )}
          <Text color="gray.600" ml={2}>
            {name}
          </Text>
        </HStack>
      ))}
    </VStack>
  );
}
