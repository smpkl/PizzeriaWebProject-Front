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
        <div
          style={{
            width: '90%',
            backgroundColor: 'white',
            padding: '2%',
            border: '2px solid #0c2720ff',
          }}
        >
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
                : 'No tags yet'}
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
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  margin: '5px 1.5%',
                  border: '2px solid #710009',
                  backgroundColor: '#710009',
                  color: '#f5eee6',
                }}
              >
                Add meal to cart
              </button>
            )}
            <button
              onClick={() => handleProductAdd(item)}
              style={{
                padding: '10px',
                borderRadius: '10px',
                margin: '5px 1.5%',
                border: '2px solid #ecb640ff',
                backgroundColor: '#ecb640ff',
                color: '#0c2720ff',
                fontWeight: 'bold',
              }}
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
