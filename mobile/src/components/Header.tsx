import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Button, Heading, HStack, useTheme } from "native-base";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import { ArrowLeft, PencilSimpleLine, Plus } from "phosphor-react-native";

type Props = IHStackProps & {
  title: string;
  goBack?: boolean;
  navigateTo?: () => void;
  rightIcon?: "plus" | "pencil" | null;
};

export function Header({
  title,
  goBack = true,
  navigateTo = () => {},
  rightIcon = null,
  ...rest
}: Props) {
  const { colors, sizes } = useTheme();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleCreateEditAdvert() {
    if (rightIcon === "pencil") {
      navigateTo();
    } else if (rightIcon === "plus") {
      navigation.navigate("createAdvert");
    }
  }

  return (
    <HStack justifyContent="space-between" alignItems="center" {...rest}>
      <Button
        w={6}
        p={0}
        bg="transparent"
        _pressed={{ bg: "transparent" }}
        onPress={() => navigation.navigate("home")}
      >
        {goBack && <ArrowLeft color={colors.gray[700]} size={sizes[6]} />}
      </Button>

      <Heading fontFamily="heading" color="gray.700" fontSize="xl">
        {title}
      </Heading>

      <Button
        w={6}
        p={0}
        bg="transparent"
        rounded="full"
        _pressed={{ bg: "transparent", opacity: 0.3 }}
        onPress={handleCreateEditAdvert}
      >
        {rightIcon === "plus" && (
          <Plus color={colors.gray[700]} size={sizes[6]} />
        )}
        {rightIcon === "pencil" && (
          <PencilSimpleLine color={colors.gray[700]} size={sizes[6]} />
        )}
      </Button>
    </HStack>
  );
}
