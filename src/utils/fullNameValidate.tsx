export const validateFullName = (
  fullName: string,
): { valid: boolean; error: string } => {
  const trimmedName = fullName.trim();

  if (trimmedName.length < 2) {
    return { valid: false, error: 'O nome deve ter pelo menos duas letras.' };
  }

  if (!/^[a-zA-ZÀ-ú]+(\s[a-zA-ZÀ-ú]+)+$/.test(trimmedName)) {
    return {
      valid: false,
      error: 'O nome deve ter pelo menos um espaço e começar com uma letra.',
    };
  }

  return { valid: true, error: '' };
};
