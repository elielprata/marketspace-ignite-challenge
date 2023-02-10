import { Checkbox, ICheckboxProps } from "native-base";

type Props = ICheckboxProps & {
  title: string;
};

export function CheckBox({ title, ...rest }: Props) {
  return (
    <Checkbox
      borderColor="gray.400"
      _checked={{
        bg: "blue.400",
        borderColor: "blue.400",
        _pressed: { bg: "blue.700", borderColor: "blue.700" },
      }}
      _pressed={{ bg: "blue.400", borderColor: "blue.400" }}
      {...rest}
    >
      {title}
    </Checkbox>
  );
}
