import React, {useEffect, useState} from 'react';
import NewProductCard from '../../components/NewProductCard';
import {useProducts} from '../../hooks/apiHooks';
import AdminProductViewCard from '../../components/AdminProductViewCard';

const AdminProducts = () => {
  const [addProduct, setAddProduct] = useState(false);
  const [productList, setProductList] = useState([]);
  const [showModified, setShowModified] = useState(false);
  const [modifyProduct, setModifyProduct] = useState({});
  const {getProducts} = useProducts();

  const handleAddProduct = () => {
    setAddProduct(!addProduct);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setProductList(await getProducts());
    };
    fetchProducts();
  }, );

  return (
    <div>
      {!addProduct && (
        <div>
          <button onClick={handleAddProduct}>Add product</button>
          <label htmlFor="product">Search for a product: </label>
          <input type="text" id="product" name="product" placeholder="" />
        </div>
      )}
      {addProduct && (
        <NewProductCard addProduct={addProduct} setAddProduct={setAddProduct}/>
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
          />
        ))}
      {showModified && <NewProductCard item={modifyProduct} setShowModified={setShowModified} />}
    </div>
  );
};

export default AdminProducts;
