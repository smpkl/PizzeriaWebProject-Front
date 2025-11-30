const MealItem = ({item}) => {
  const products = item.products;
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
                ? `http://127.0.0.1:3000/api/v1/uploads/${item.filename}`
                : 'https://placehold.co/120x120/green/white?text=PRODUCT'
            }
            alt="A menu item image"
            style={{margin: 'auto'}}
          />
        </div>
        <div className="menu-item-info">
          <h3>{item.name}</h3>
          <h4>Products included in the meal:</h4>
          <ul className="meal-products-ul">
            {products.map((product) => (
              <li>
                <a href={`#product-${product.id}`} style={{width: '100%'}}>
                  {product.name}
                </a>
              </li>
            ))}
          </ul>
          <p>{item.price} €</p>
          <button>Add to order</button>
        </div>
      </div>
    </>
  );
};

export default MealItem;
