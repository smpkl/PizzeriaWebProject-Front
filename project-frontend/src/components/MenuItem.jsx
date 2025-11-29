// Pizzerian info sivu (esittely, kartta, lomake, yhteystiedot)
const MenuItem = ({item}) => {
  //console.log(item);
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
                ? `http://127.0.0.1:3000/api/v1/uploads/${item.filename}`
                : 'https://placehold.co/120x120/green/white?text=PRODUCT'
            }
            alt="A menu item image"
            style={{margin: 'auto'}}
          />
        </div>
        <div className="menu-item-info">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>{item.tags ?? 'No tags yet'}</p>
          <p>{item.price} €</p>
          <button>Add to order</button>
        </div>
      </div>
    </>
  );
};

export default MenuItem;
