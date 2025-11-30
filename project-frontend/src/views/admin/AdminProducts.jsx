import React from 'react';
import ProductCard from '../../components/ProductCard';

const AdminProducts = () => {
  //Laitan jo 2 kieli optiota joka hallitaa tod näk shared contextilla
  const langEn = false;
  const langFin = true;
  return (
    <div>
      {langFin && (
        <div>
          <button>Lisää tuote</button>
          <label htmlFor="product">Etsi tuote: </label>
          <input
            type="text"
            id="product"
            name="product"
            placeholder="syötä nimi"
          />
        </div>
      )}
      {langEn && (
        <div>
          <button>Add product</button>
          <label htmlFor="product">Search for a product: </label>
          <input
            type="text"
            id="product"
            name="product"
            placeholder="syötä nimi"
          />
        </div>
      )}
      <ProductCard />
    </div>
  );
};

export default AdminProducts;
