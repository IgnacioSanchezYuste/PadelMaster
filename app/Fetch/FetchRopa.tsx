import ProductList from './ProductList';

const Apiropa = () => (
  <ProductList
    endpoint="https://ignaciosanchezyuste.es/API_PADEL/ropa"
    dataKey="ropa"
    title="Ropa"
    emptyLabel="No se encontró ropa"
  />
);

export default Apiropa;
