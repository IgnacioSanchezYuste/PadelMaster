import ProductList from './ProductList';

const ApiAccesorioss = () => (
  <ProductList
    endpoint="https://ignaciosanchezyuste.es/API_PADEL/accesorios"
    dataKey="accesorios"
    title="Accesorios"
    emptyLabel="No se encontraron accesorios"
  />
);

export default ApiAccesorioss;
