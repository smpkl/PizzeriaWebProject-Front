import React, {useEffect, useState} from 'react';
import NewProductCard from '../../components/NewProductCard';
import {useProducts} from '../../hooks/apiHooks';
import AdminProductViewCard from '../../components/AdminProductViewCard';

const AdminProducts = () => {
  const [addProduct, setAddProduct] = useState(false);
  const [productList, setProductList] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [showModified, setShowModified] = useState(false);
  const [modifyProduct, setModifyProduct] = useState({});
  const [deleteAction, setDeleteAction] = useState(true);

  const [search, setSearch] = useState('');
  const {getProducts} = useProducts();

  const handleAddProduct = () => {
    setAddProduct(!addProduct);
  };

  const handleInput = (evt) => {
    setSearch(evt.target.value);
  };

  useEffect(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      setProductList(allProducts);
      return;
    }

    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(value),
    );
    setProductList(filtered);
  }, [search, allProducts]);

  //effect to get updated product list after modify, delete or adding a product

  useEffect(() => {
    const fetchProducts = async () => {
      setProductList(await getProducts());
      setAllProducts(productList);
    };
    fetchProducts();
  }, [addProduct, showModified, deleteAction]);

  return (
    <div>
      {!addProduct && (
        <div>
          <button onClick={handleAddProduct}>Add product</button>
          <label htmlFor="product">Search for a product: </label>
          <input
            type="text"
            id="product"
            name="product"
            placeholder=""
            onChange={handleInput}
          />
        </div>
      )}
      {addProduct && (
        <NewProductCard addProduct={addProduct} setAddProduct={setAddProduct} />
      )}
      {productList &&
        !addProduct &&
        !showModified &&
        productList.map((product) => (
          <AdminProductViewCard
            key={`product-${product.id}`}
            product={product}
            setModifyProduct={setModifyProduct}
            setShowModified={setShowModified}
            setDeleteAction={setDeleteAction}
            deleteAction={deleteAction}
          />
        ))}
      {showModified && (
        <NewProductCard
          item={modifyProduct}
          setShowModified={setShowModified}
        />
      )}
    </div>
  );
};

export default AdminProducts;
