export const formatCPF = (value: string) => {
  const cleaned = value.replace(/\D/g, '').slice(0, 11);

  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
  if (match) {
    return !match[2]
      ? match[1]
      : `${match[1]}.${match[2]}${match[3] ? `.${match[3]}` : ''}${
          match[4] ? `-${match[4]}` : ''
        }`;
  }

  return value;
};
