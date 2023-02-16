import {
  Divider,
  HStack,
  IInputProps,
  Input,
  Pressable,
  useTheme,
} from "native-base";
import { MagnifyingGlass, Sliders } from "phosphor-react-native";

type Props = IInputProps & {
  openModalFilter: () => void;
  onSearch: () => void;
};

export function SearchInput({ onSearch, openModalFilter, ...rest }: Props) {
  const { colors, sizes } = useTheme();

  return (
    <HStack alignItems="center" bg="gray.100" rounded="lg" px={4} py={2}>
      <Input
        placeholder="Buscar anúncio"
        flexShrink={1}
        rounded="lg"
        bg="gray.100"
        placeholderTextColor="gray.400"
        borderWidth={0}
        fontSize="md"
        color="gray.600"
        _focus={{
          bg: "gray.100",
          borderColor: "gray.500",
        }}
        {...rest}
      />
      <Pressable onPress={onSearch}>
        <MagnifyingGlass color={colors.gray["600"]} size={sizes["5"]} />
      </Pressable>

      <Divider mx={3} h="1/2" orientation="vertical" bg="gray.400:alpha.50" />

      <Pressable onPress={openModalFilter}>
        <Sliders color={colors.gray["600"]} size={sizes["5"]} />
      </Pressable>
    </HStack>
  );
}
