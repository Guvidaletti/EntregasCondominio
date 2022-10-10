export const getUniqueKey = () => {
  const atual = sessionStorage.getItem('chaveAtual')
    ? parseInt(sessionStorage.getItem('chaveAtual')!)
    : 1;
  sessionStorage.setItem('chaveAtual', String(atual + 1));
  return `_${atual}`;
};
