import {useState} from 'react';
import ItemDialog from '../ItemDialog';

const AdminMealCard = ({item, setModifyMeal, setShowModified}) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const imageUrl = baseUrl + 'uploads/';
  const [selectedProduct, setSelectedProduct] = useState();
  const products = item.products;

  const handleShowItemDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseItemDetails = () => {
    setSelectedProduct(null);
  };

  //const handleModifyMeal = async();

  return (
    <>
      <div
        className="meal-item-card"
        id={`meal-${item.id}`}
        style={{
          display: 'flex',
          width: '90%',
          margin: '5px auto',
          padding: '2%',
          backgroundColor: 'lightgray',
        }}
      >
        <div
          className="meal-item-img-container"
          style={{display: 'flex', justifyItems: 'center'}}
        >
          <img
            src={
              item.filename
                ? `${imageUrl}${item.filename}`
                : 'https://placehold.co/120x120/green/white?text=PRODUCT'
            }
            alt="A menu item image"
            style={{margin: 'auto'}}
          />
        </div>
        <div className="menu-item-info">
          <h3>{item.name}</h3>
          <h4>Products included in the meal:</h4>
          <p>Click product to see details</p>
          <ul className="meal-products-ul">
            {products.map((product) => (
              <li
                key={`meal-product-${product.id}`}
                className="products-in-meal"
                onClick={() => handleShowItemDetails(product)}
              >
                {product.name}
              </li>
            ))}
          </ul>
          <div
            style={{display: 'flex', justifyContent: 'right', width: '100%'}}
          >
            {item.oldPrice && (
              <p
                style={{
                  textDecorationLine: 'line-through',
                  color: 'darkred',
                  marginRight: '10px',
                }}
              >
                {item.oldPrice}€
              </p>
            )}
            <p>{item.price}€</p>
          </div>
          <div
            style={{display: 'flex', justifyContent: 'right', width: '100%'}}
          >
            <button
              onClick={(evt) => {
                evt.preventDefault;
                setModifyMeal(item);
                setShowModified(true);
              }}
            >
              Modify
            </button>
          </div>
        </div>
        {selectedProduct && (
          <ItemDialog
            item={selectedProduct}
            meal={item}
            onClose={handleCloseItemDetails}
          />
        )}
      </div>
    </>
  );
};

export default AdminMealCard;
