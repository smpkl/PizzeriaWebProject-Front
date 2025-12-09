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
          border: '1px solid #710009',
          borderRadius: '4px',
        }}
      >
        <div
          className="menu-item-img-container"
          style={{display: 'flex', justifyItems: 'left', width: '40%'}}
        >
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
        <div
          className="menu-item-info"
          style={{
            textAlign: 'center',
            width: '60%',
            padding: '0 5%',
          }}
        >
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
              style={{
                padding: '8px',
                borderRadius: '10px',
                margin: '5px 1.5%',
                border: '2px solid #710009',
                color: '#710009',
              }}
            >
              See details
            </button>
            <button
              onClick={() => handleProductAdd(item)}
              style={{
                padding: '8px',
                borderRadius: '10px',
                margin: '5px 1.5%',
                border: '2px solid #710009',
                backgroundColor: '#710009',
                color: '#f5eee6',
              }}
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
