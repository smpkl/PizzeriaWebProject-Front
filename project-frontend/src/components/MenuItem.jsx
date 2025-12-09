import {useOrderContext} from '../hooks/contextHooks';
import {useState} from 'react';
import ItemDialog from './ItemDialog';

const MenuItem = ({item}) => {
  const {handleProductAdd} = useOrderContext();
  const [showItemDialog, setShowItemDialog] = useState();

  const handleShowItemDetails = () => {
    setShowItemDialog(true);
  };

  return (
    <>
      <div className="menu-item-card" id={`product-${item.id}`}>
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
          <p style={{margin: '5px 0'}}>{item.description}</p>
          <p style={{margin: '5px 0'}}>
            {item.tags && item.tags.length > 0
              ? item.tags.map((t) => t).join(', ')
              : 'No tags yet'}
          </p>
          <p style={{margin: '5px 0'}}>{item.price} €</p>
          <div>
            <button
              onClick={() => handleShowItemDetails()}
              className="details-button"
            >
              See details
            </button>
            <button
              onClick={() => handleProductAdd(item)}
              className="add-button"
            >
              Add to order
            </button>
          </div>
        </div>
        {showItemDialog && (
          <ItemDialog
            item={item}
            meal={{id: ''}}
            onClose={() => setShowItemDialog(false)}
          />
        )}
      </div>
    </>
  );
};

export default MenuItem;
