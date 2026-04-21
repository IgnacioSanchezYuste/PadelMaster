import ProductList from './ProductList';

const ApiExample = () => (
  <ProductList
    endpoint="https://ignaciosanchezyuste.es/API_PADEL/palas"
    dataKey="palas"
    title="Palas"
    emptyLabel="No se encontraron palas"
  />
);

export default ApiExample;
