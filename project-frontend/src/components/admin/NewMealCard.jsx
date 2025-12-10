import React, {useEffect, useState} from 'react';
import useForm from '../../hooks/formHooks';
import {useDailyMeal, useMeals, useProducts} from '../../hooks/apiHooks';
import '../../admincss/admin.css';

const NewMealCard = ({addMeal, setAddMeal, modifyMeal, setShowModified}) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const imageUrl = baseUrl + 'uploads/';

  const {getProducts} = useProducts();
  const {postMeal, putMeal, syncMealProducts} = useMeals();
  const {setAMealDailyMeal} = useDailyMeal();

  const [allProducts, setAllProducts] = useState([]);
  const [originalProductIds, setOriginalProductIds] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const initValues = {
    name: modifyMeal?.name ?? '',
    price: modifyMeal?.price ?? '',
    day_selector: modifyMeal?.dailyDay ?? '',
  };

  const validateMeal = (inputs, selectedProductIds) => {
    const emptyFields = Object.entries(inputs)
      .filter(
        ([key, value]) => value === '' || value === null || value === undefined,
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
      window.alert(`Please fill: ${missing}`);
      return;
    }
    let successPost;
    try {
      const mealId = await postMeal(inputs, image);
      if (!mealId) return;

      successPost = await syncMealProducts(mealId, selectedProductIds, []);
      if (successPost) {
        if (inputs.day_selector) {
          setAMealDailyMeal(inputs.day_selector, mealId);
        }

        if (setAddMeal) {
          setAddMeal(!addMeal);
        }
      }
      if (!successPost) {
        window.alert('Service might be down, please try again later');
      }
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
      let successPut, successProductSync;
      successPut = await putMeal(modifyMeal.id, inputs, image);
      if (successPut) {
        successProductSync = await syncMealProducts(
          modifyMeal.id,
          selectedProductIds,
          originalProductIds,
        );
      }
      if (successPut && successProductSync) {
        setAMealDailyMeal(inputs.day_selector, modifyMeal.id);
        if (setShowModified) setShowModified(false);
      } else {
        window.alert('Service might be down, please try again later');
      }
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

  //checkbox is used to store meals productId
  useEffect(() => {
    if (!modifyMeal?.products || !allProducts.length) return;

    const initialProductIds = modifyMeal.products.map((p) => p.id);
    setCheckbox(initialProductIds);
    setOriginalProductIds(initialProductIds);
  }, [modifyMeal, allProducts]);

  const selectedProducts = allProducts.filter((p) => checkbox.includes(p.id));
  const selectedTotalPrice = selectedProducts.reduce(
    (sum, p) => sum + Number(p.price),
    0,
  );

  return (
    <div className="admin-card new-meal-card">
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          handleSubmit(evt, checkbox);
        }}
      >
        <div className="admin-grid-2">
          {/* vasen sarake: mealin perusinfot ja kuva */}
          <div>
            <div className="admin-field">
              <label htmlFor="mealName">Meal name: </label>
              <input
                className="admin-input"
                type="text"
                name="name"
                id="mealName"
                placeholder="enter meal name"
                value={inputs.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="admin-field">
              <label htmlFor="mealPrice">Meal price: </label>
              <input
                className="admin-input"
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

            <div className="new-meal-card__selected-summary">
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

            <div className="admin-image-wrapper">
              {modifyMeal?.filename && !preview && (
                <img
                  src={imageUrl + modifyMeal?.filename}
                  alt="meals unique picture"
                />
              )}
              {preview && <img src={preview} alt="meals unique picture" />}
              {!preview && !modifyMeal?.filename && (
                <img
                  src={'https://placehold.co/100x100'}
                  alt="meals unique picture"
                />
              )}
            </div>
            <input
              id="productImage"
              type="file"
              placeholder="change image"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>

          {/* oikea sarake: tuotteiden valinta */}
          <div>
            <div className="admin-field">
              <label>Products in this meal:</label>
              <div className="new-meal-card__products-list">
                {allProducts.map((product) => {
                  const isChecked = checkbox.includes(product.id);
                  return (
                    <div
                      key={`product-${product.id}`}
                      className="new-meal-card__product-row"
                    >
                      <div className="new-meal-card__product-info">
                        <label htmlFor={`product-${product.id}`}>
                        <span>
                          {product.name} - {product.price} €
                        </span>
                        <span className="new-meal-card__product-description">
                          {product.description}
                        </span>
                        </label>
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

            <select
              className="new-meal-card__day-select"
              name="day_selector"
              id="day_selector"
              value={inputs.day_selector ?? ''}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                select which days meal
              </option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>

            <div className="admin-buttons-row">
              <button type="submit" className="admin-button">
                Save
              </button>
              <button
                type="button"
                className="admin-button"
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
