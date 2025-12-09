import {useOrderContext} from '../hooks/contextHooks';

const ItemDialog = ({item, meal, onClose}) => {
  const {handleProductAdd, handleMealAdd} = useOrderContext();

  return (
    <>
      <dialog
        open
        style={{
          margin: '0',
          padding: '0',
          position: 'fixed',
          inset: '0',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(172, 164, 153, 0.5)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div className="item-dialog-div">
          <div style={{textAlign: 'right'}}>
            <button
              onClick={onClose}
              style={{
                backgroundColor: '#710009',
                color: '#F5EEE6',
                border: '1px solid #710009',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
              }}
            >
              X
            </button>
          </div>
          <div>
            {meal.id && (
              <h2
                style={{fontSize: '20px', color: '#0c2720ff'}}
              >{`Part of the "${meal.name}" meal`}</h2>
            )}
            <h2 style={{margin: '5px'}}>{item.name}</h2>
            <p style={{margin: '5px'}}>
              {item.tags && item.tags.length > 0
                ? item.tags.map((t) => t).join(', ')
                : ''}
            </p>
            <div>
              <img
                src={
                  item.filename
                    ? `${import.meta.env.VITE_API_BASE_URL}uploads/${item.filename}`
                    : 'https://placehold.co/150x150/green/white?text=PRODUCT'
                }
                alt="A menu item image"
                style={{width: '150px'}}
              />
            </div>
            <h3 style={{margin: '5px'}}>DESCRIPTION:</h3>
            <p style={{margin: '5px'}}>{item.description}</p>
            <h3 style={{margin: '5px'}}>INGREDIENTS:</h3>
            <p style={{margin: '5px'}}>{item.ingredients}</p>
            <h3 style={{margin: '5px'}}>PRICE:</h3>
            <p style={{margin: '5px 0 10px 0'}}>{item.price}€</p>
            {meal.id && (
              <button
                onClick={() => handleMealAdd(meal)}
                className="add-button"
              >
                Add meal to cart
              </button>
            )}
            <button
              onClick={() => handleProductAdd(item)}
              className="add-button"
            >
              Add product to cart
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ItemDialog;
