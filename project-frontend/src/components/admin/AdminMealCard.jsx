import {useState} from 'react';
import ItemDialog from '../ItemDialog';
import {useMeals} from '../../hooks/apiHooks';
import '../../admincss/admin.css';

const AdminMealCard = ({
  item,
  setModifyMeal,
  setShowModified,
  deleteAction,
  setDeleteAction,
}) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const imageUrl = baseUrl + 'uploads/';
  const [selectedProduct, setSelectedProduct] = useState();
  const products = item.products;
  const {deleteMeal} = useMeals();

  const handleShowItemDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseItemDetails = () => {
    setSelectedProduct(null);
  };

  const handleDelete = async (evt) => {
    evt.preventDefault();

    const ok = await deleteMeal(item.id);

    if (ok && setDeleteAction) {
      setDeleteAction(!deleteAction);
    }
  };

  return (
    <>
      <div className="meal-item-card" id={`meal-${item.id}`}>
        <div className="meal-item-img-container">
          <img
            src={
              item.filename
                ? `${imageUrl}${item.filename}`
                : 'https://placehold.co/120x120/green/white?text=PRODUCT'
            }
            alt="A menu item image"
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

          <div className="meal-item-price-row">
            {item.oldPrice && (
              <p className="meal-item-old-price">{item.oldPrice}€</p>
            )}
            <p className="meal-item-price">{item.price}€</p>
          </div>

          <div className="meal-item-buttons-row">
            <button
              onClick={(evt) => {
                evt.preventDefault();
                setModifyMeal(item);
                setShowModified(true);
              }}
            >
              Modify
            </button>
            <button
              onClick={(evt) => {
                handleDelete(evt);
              }}
            >
              Delete
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
