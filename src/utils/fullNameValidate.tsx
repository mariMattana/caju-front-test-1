export const validateFullName = (
  fullName: string,
): { valid: boolean; error: string } => {
  const trimmedName = fullName.trim();

  if (trimmedName.length < 2) {
    console.log('size error');
    return { valid: false, error: 'O nome deve ter pelo menos duas letras.' };
  }

  if (!/^[a-zA-ZÀ-ú]+(\s[a-zA-ZÀ-ú]+)+$/.test(trimmedName)) {
    console.log('numero ou falta espaco');
    return {
      valid: false,
      error: 'O nome deve ter pelo menos um espaço e começar com uma letra.',
    };
  }

  return { valid: true, error: '' };
};
