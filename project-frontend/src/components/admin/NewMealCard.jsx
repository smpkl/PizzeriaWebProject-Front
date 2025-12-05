import React, {useEffect, useState} from 'react';
import useForm from '../../hooks/formHooks';
import {useProducts} from '../../hooks/apiHooks';

const NewMealCard = ({addMeal, setAddMeal, modifyMeal, setShowModified}) => {
  const styles = {
    card: {
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
      border: '2px solid #000',
      borderRadius: '14px',
      padding: '24px 28px',
      maxWidth: '950px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    form: {
      width: '100%',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1.8fr',
      columnGap: '32px',
      rowGap: '16px',
    },
    field: {
      marginBottom: '16px',
    },
    productsList: {
      maxHeight: '260px',
      overflowY: 'auto',
      border: '1px solid #000',
      borderRadius: '10px',
      padding: '0.1rem 0.15rem',
    },
    productRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '4px 0',
      borderBottom: '1px solid #000',
    },
    productInfo: {
      display: 'flex',
      flexDirection: 'column',
    },
    buttonsRow: {
      marginTop: '20px',
      display: 'flex',
      gap: '0.5rem',
      justifyContent: 'flex-end',
    },
    button: {
      margin: '0.1rem',
      padding: '4px 10px',
      borderRadius: '6px',
      border: '2px solid #000',
    },
    selectedSummary: {
      marginTop: '12px',
      fontSize: '0.9rem',
    },
  };

  const {getProducts} = useProducts();
  //const {} = useMeals();

  const [allProducts, setAllProducts] = useState([]);
  const [originalProductIds, setOriginalProductIds] = useState([]);

  const initValues = {
    name: modifyMeal?.name ?? '',
    price: modifyMeal?.price ?? '',
  };

  const validateMeal = (inputs, selectedProductIds) => {
    const emptyFields = Object.entries(inputs)
      .filter(
        ([, value]) => value === '' || value === null || value === undefined,
      )
      .map(([key]) => key);

    if (selectedProductIds.length === 0) {
      emptyFields.push('products');
    }

    if (emptyFields.length > 0) {
      return {successfull: false, emptyFields};
    } else {
      return {successfull: true, emptyFields: []};
    }
  };

  const doPost = async (inputs, selectedProductIds) => {
    const validation = validateMeal(inputs, selectedProductIds);
    if (!validation.successfull) {
      const missing = validation.emptyFields.join(', ');
      window.alert(`Please fill/choose: ${missing}`);
      return;
    }

    try {
        //post asiat
    } catch (error) {
      console.log(error);
    }
  };

  const doPut = async (inputs, selectedProductIds) => {
    const validation = validateMeal(inputs, selectedProductIds);
    if (!validation.successfull) {
      const missing = validation.emptyFields.join(', ');
      window.alert(`Please fill/choose: ${missing}`);
      return;
    }

    try {
        console.log()
        //put asiat
    } catch (error) {
      console.log(error);
    }
  };

  const {
    handleSubmit,
    handleInputChange,
    handleCheckBox,
    setCheckbox,
    inputs,
    checkbox,
  } = useForm(setAddMeal ? doPost : doPut, initValues, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setAllProducts(products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);


  useEffect(() => {
    if (!modifyMeal?.products || !allProducts.length) return;

    const initialProductIds = modifyMeal.products.map((p) => p.id);
    setCheckbox(initialProductIds);
    setOriginalProductIds(initialProductIds);
  }, [modifyMeal, allProducts]);

  const selectedProducts = allProducts.filter((p) =>
    checkbox.includes(p.id),
  );
  const selectedTotalPrice = selectedProducts.reduce(
    (sum, p) => sum + Number(p.price),
    0,
  );

  return (
    <div style={styles.card}>
      <form
        style={styles.form}
        onSubmit={(evt) => {
          evt.preventDefault();
          handleSubmit(evt, checkbox); // välitetään myös productId:t
        }}
      >
        <div style={styles.grid}>
          {/* vasen sarake: mealin perusinfot */}
          <div>
            <div style={styles.field}>
              <label htmlFor="mealName">Meal name: </label>
              <input
                type="text"
                name="name"
                id="mealName"
                placeholder="enter meal name"
                value={inputs.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={styles.field}>
              <label htmlFor="mealPrice">Meal price: </label>
              <input
                type="number"
                name="price"
                id="mealPrice"
                step={0.01}
                placeholder="0.00"
                value={inputs.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div style={styles.selectedSummary}>
              {selectedProducts.length > 0 ? (
                <>
                  <div>
                    Selected products ({selectedProducts.length}) – sum of
                    product prices: {selectedTotalPrice.toFixed(2)} €
                  </div>
                  <div>
                    {selectedProducts
                      .map((p) => `${p.name} (${p.price}€)`)
                      .join(', ')}
                  </div>
                </>
              ) : (
                <span>No products selected yet</span>
              )}
            </div>
          </div>

          {/* oikea sarake: tuotteiden valinta */}
          <div>
            <div style={styles.field}>
              <label>Products in this meal:</label>
              <div style={styles.productsList}>
                {allProducts.map((product) => {
                  const isChecked = checkbox.includes(product.id);
                  return (
                    <div
                      key={`product-${product.id}`}
                      style={styles.productRow}
                    >
                      <div style={styles.productInfo}>
                        <span>
                          {product.name} – {product.price} €
                        </span>
                        <span style={{fontSize: '0.8rem', opacity: 0.8}}>
                          {product.description}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        name={`product-${product.id}`}
                        id={`product-${product.id}`}
                        value={product.id}
                        checked={isChecked}
                        onChange={handleCheckBox}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={styles.buttonsRow}>
              <button type="submit" style={styles.button}>
                Save
              </button>
              <button
                type="button"
                style={styles.button}
                onClick={() => {
                  if (setAddMeal) {
                    setAddMeal(!addMeal);
                  }
                  if (setShowModified) setShowModified(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewMealCard;
