import ProductList from './ProductList';

const ApiPelotas = () => (
  <ProductList
    endpoint="https://ignaciosanchezyuste.es/API_PADEL/pelotas"
    dataKey="pelotas"
    title="Pelotas"
    emptyLabel="No se encontraron pelotas"
  />
);

export default ApiPelotas;
