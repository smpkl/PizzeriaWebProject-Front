import {useOrderContext} from '../hooks/contextHooks';

const ItemDialog = ({item, meal, onClose}) => {
  const {handleProductAdd, handleMealAdd} = useOrderContext();

  console.log(meal);
  return (
    <>
      <dialog
        open
        style={{
          margin: '0',
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
        <div style={{width: '90%', backgroundColor: 'white', padding: '2%'}}>
          <div style={{textAlign: 'right'}}>
            <button onClick={onClose}>X</button>
          </div>
          <div>
            {meal.id && <h2>{`Part of the "${meal.name}" meal`}</h2>}
            <h2>{item.name}</h2>
            <p>
              {item.tags && item.tags.length > 0
                ? item.tags.map((t) => t).join(', ')
                : 'No tags yet'}
            </p>
            <div>
              <img
                src={
                  item.filename
                    ? `http://127.0.0.1:3000/api/v1/uploads/${item.filename}`
                    : 'https://placehold.co/120x120/green/white?text=PRODUCT'
                }
                alt="A menu item image"
              />
            </div>
            <h3>DESCRIPTION:</h3>
            <p>{item.description}</p>
            <h3>INGREDIENTS:</h3>
            <p>{item.ingredients}</p>
            <h3>PRICE:</h3>
            <p>{item.price}€</p>
            {meal.id && (
              <button onClick={() => handleMealAdd(meal)}>
                Add meal to cart
              </button>
            )}
            <button onClick={() => handleProductAdd(item)}>
              Add product to cart
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ItemDialog;
