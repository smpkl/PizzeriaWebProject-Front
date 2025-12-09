import React, {useEffect, useState} from 'react';
import useForm from '../../hooks/formHooks';
import {useProducts, useTags, useCategories} from '../../hooks/apiHooks';
import '../../admincss/admin.css';

const NewProductCard = ({addProduct, setAddProduct, item, setShowModified}) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const imageUrl = baseUrl + 'uploads/';

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [originalTagIds, setOriginalTagIds] = useState([]);
  const {postProduct, postProductTag, putProduct} = useProducts();
  const {tags} = useTags();
  const {categories} = useCategories();

  const initValues = {
    name: item?.name ?? '',
    price: item?.price ?? '',
    category: item?.category ?? 0,
    ingredients: item?.ingredients ?? '',
    description: item?.description ?? '',
  };

  const validatePost = () => {
    const emptyFields = Object.entries(inputs)
      .filter(
        ([key, value]) => value === '' || value === null || value === undefined,
      )
      .map(([key]) => key);
    if (emptyFields.length > 0) return {successfull: false, emptyFields};
    else return {successfull: true, emptyFields};
  };

  const doPost = async (inputs, checkbox) => {
    const validation = validatePost();
    if (validation.successfull) {
      try {
        const product = await postProduct(inputs, checkbox, image);
        const producId = product.result.productId;
        await postProductTag(checkbox, producId);
        setAddProduct(!addProduct);
      } catch (error) {
        console.log(error);
      }
    } else {
      const missingFieldsToString = validation.emptyFields.join(', ');
      window.alert(`Please fill ${missingFieldsToString}`);
    }
  };

  const doPut = async (inputs, checkbox) => {
    try {
      await putProduct(item.id, inputs, checkbox, originalTagIds, image);
      setShowModified(false);
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
  } = useForm(setAddProduct ? doPost : doPut, initValues, []);

  useEffect(() => {
    if (!item?.tags || !tags.length) return;

    const normalizedItemTags = item.tags.map((t) => t.trim());

    const initialTagIds = tags
      .filter((tag) => normalizedItemTags.includes(tag.title))
      .map((tag) => tag.id);

    setCheckbox(initialTagIds);
    setOriginalTagIds(initialTagIds);
  }, [item, tags, setCheckbox]);

  return (
    <div className="admin-card admin-card--compact new-product-card">
      <form>
        <div className="admin-grid-3">
          {/* vasen sarake */}
          <div className="admin-column">
            <div className="admin-field">
              <label htmlFor="name">Product name: </label>
              <input
                className="admin-input"
                type="text"
                name="name"
                id="name"
                placeholder="enter name"
                value={inputs.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="admin-field">
              <label htmlFor="price">Price: </label>
              <input
                className="admin-input"
                type="number"
                name="price"
                id="price"
                step={0.01}
                value={inputs.price}
                placeholder="0.00"
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Tag-lista */}
            <div className="admin-field">
              <div className="new-product-card__tags-row">
                {tags.map((tag) => {
                  const isChecked = checkbox.includes(tag.id);

                  return (
                    <div
                      key={`tag-${tag.id}`}
                      className="new-product-card__tags-row-item"
                    >
                      <input
                        className="new-product-card__tags-checkbox"
                        type="checkbox"
                        name={tag.title}
                        id={tag.id}
                        value={tag.id}
                        checked={isChecked}
                        onChange={handleCheckBox}
                      />
                      <label
                        htmlFor={tag.id}
                        id={`tag-${tag.id}`}
                        className={`tag-label ${
                          isChecked
                            ? 'tag-label--checked'
                            : 'tag-label--unchecked'
                        }`}
                      >
                        {tag.title}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <label htmlFor="category">Category: </label>
            <select
              className="admin-select"
              name="category"
              id="category"
              onChange={handleInputChange}
              defaultValue={0}
              value={inputs.category}
            >
              <option value={0} disabled>
                choose category
              </option>
              {categories.map((category) => {
                return (
                  <option key={`category-${category.id}`} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* keskisarake */}
          <div className="admin-column">
            <div className="admin-field">
              <label htmlFor="ingredients">Ingredients: </label>
              <textarea
                className="admin-textarea"
                name="ingredients"
                id="ingredients"
                cols={20}
                rows={5}
                value={inputs.ingredients}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="admin-field">
              <label htmlFor="description">Description: </label>
              <textarea
                className="admin-textarea"
                name="description"
                id="description"
                cols={20}
                rows={5}
                value={inputs.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
          </div>

          {/* oikea sarake */}
          <div className="admin-column">
            <div className="admin-image-wrapper">
              {item?.filename && !preview && (
                <img
                  src={imageUrl + item?.filename}
                  alt="meals unique picture"
                />
              )}
              {preview && <img src={preview} alt="meals unique picture" />}
              {!preview && !item?.filename && (
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
            <div className="admin-buttons-row">
              <button
                className="admin-button"
                onClick={(evt) => {
                  evt.preventDefault();
                  handleSubmit(evt);
                }}
              >
                Save
              </button>
              <button
                className="admin-button"
                onClick={(evt) => {
                  evt.preventDefault();
                  if (setAddProduct) {
                    setAddProduct(!addProduct);
                  }
                  if (setShowModified) setShowModified(false);
                }}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewProductCard;
