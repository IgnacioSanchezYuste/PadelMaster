import ProductList from './ProductList';

const ApiZapas = () => (
  <ProductList
    endpoint="https://ignaciosanchezyuste.es/API_PADEL/zapatillas"
    dataKey="zapatillas"
    title="Zapatillas"
    emptyLabel="No se encontraron zapatillas"
  />
);

export default ApiZapas;
