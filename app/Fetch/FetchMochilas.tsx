import ProductList from './ProductList';

const ApiMochilas = () => (
  <ProductList
    endpoint="https://ignaciosanchezyuste.es/API_PADEL/mochilas_paleteros"
    dataKey="mochilas_paleteros"
    title="Mochilas y paleteros"
    emptyLabel="No se encontraron mochilas o paleteros"
  />
);

export default ApiMochilas;
