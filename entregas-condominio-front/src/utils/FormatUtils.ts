export const formatData = (input: string) => {
  const value = String(input)
    .replace(/\D/g, '') // Retira o que não é número
    .slice(0, 8) // Limita o tamanho
    .replace(/(\d{2})(\d{1,})/, '$1/$2') // Coloca a primeira barra
    .replace(/(\d{2}\/\d{2})(\d{1,2})/, '$1/$2') // Coloca a segunda barra
    .replace(/(\d{2}\/\d{2}\/)(\d{1,4}) /, '$1/$2'); // Coloca a terceira barra
  return value;
};
