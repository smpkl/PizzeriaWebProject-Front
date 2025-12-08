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
      <div
        className="menu-item-card"
        id={`product-${item.id}`}
        style={{
          display: 'flex',
          width: '90%',
          margin: '5px auto',
          padding: '2%',
          backgroundColor: 'lightgray',
        }}
      >
        <div
          className="menu-item-img-container"
          style={{display: 'flex', justifyItems: 'center'}}
        >
          <img
            src={
              item.filename
                ? `${import.meta.env.VITE_API_BASE_URL}uploads/${item.filename}`
                : 'https://placehold.co/120x120/green/white?text=PRODUCT'
            }
            alt="A menu item image"
            style={{margin: 'auto'}}
          />
        </div>
        <div className="menu-item-info">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>
            {item.tags && item.tags.length > 0
              ? item.tags.map((t) => t).join(', ')
              : 'No tags yet'}
          </p>
          <p>{item.price} €</p>
          <div>
            <button onClick={() => handleProductAdd(item)}>Add to order</button>
            <button onClick={() => handleShowItemDetails()}>See details</button>
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
