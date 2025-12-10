import {useState} from 'react';
import {useOrderContext} from '../hooks/contextHooks';
import ItemDialog from './ItemDialog';

const MealItem = ({item}) => {
  const [selectedProduct, setSelectedProduct] = useState();
  const {handleMealAdd} = useOrderContext();
  const products = item.products;

  const handleShowItemDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseItemDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="menu-item-card" id={`meal-${item.id}`}>
        <div className="menu-item-img-container">
          <img
            src={
              item.filename
                ? `${import.meta.env.VITE_API_BASE_URL}uploads/${item.filename}`
                : 'https://placehold.co/160x160/green/white?text=PRODUCT'
            }
            alt="A menu item image"
            style={{margin: 'auto', width: '150px'}}
          />
        </div>
        <div className="menu-item-info">
          <h3 style={{margin: '5px 0'}}>{item.name}</h3>
          <h4 style={{margin: '5px 0'}}>Products included in the meal:</h4>
          <p style={{margin: '5px 0'}}>Click product to see details</p>
          <ul className="meal-products-ul" style={{padding: '0'}}>
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
            style={{display: 'flex', width: '100%', justifyContent: 'center'}}
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
            style={{display: 'flex', justifyContent: 'center', width: '100%'}}
          >
            <button onClick={() => handleMealAdd(item)} className="add-button">
              Add to order
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

export default MealItem;
