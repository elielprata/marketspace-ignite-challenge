function Currency(value: number) {
  const masked = value
    .toString()
    .replace(/(\d{2})$/g, ",$1")
    .replace(/(\d)(\d{3}),(\d{2})/g, "$1.$2,$3")
    .replace(/(\d{3}).(\d{3})/g, ".$1.$2");

  return masked;
}

export { Currency };
