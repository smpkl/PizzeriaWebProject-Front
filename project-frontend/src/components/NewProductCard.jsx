import React, {useEffect, useState} from 'react';
import useForm from '../hooks/formHooks';
import {useProducts, useTags, useCategories} from '../hooks/apiHooks';

const NewProductCard = ({addProduct, setAddProduct, item, setShowModified}) => {
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
      gridTemplateColumns: '1.1fr 1.3fr 0.9fr',
      columnGap: '32px',
      rowGap: '16px',
    },
    field: {
      marginBottom: '16px',
    },
    textarea: {
      width: '100%',
      border: '2px solid #000',
      minHeight: '150px',
    },
    tagsRow: {
      display: 'grid',
      gridTemplateColumns: 'auto auto auto',
      marginTop: '6px',
      width: '100%',
    },
    tagsRowCheckbox: {
      display: 'none',
    },
    tagsRowLabel: {
      border: '2px solid #000',
      borderRadius: '15px',
      padding: '4px',
      margin: '2px',
      width: '20px',
      height: 'auto',
    },
    tagsRowLabelChecked: {
      backgroundColor: 'green',
    },
    tagsRowLabelUnChecked: {
      backgroundColor: 'red',
    },
    imageWrapper: {
      marginTop: '22px',
      width: '250px',
      height: '250px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    buttons: {
      paddingLeft: '50%',
      paddingTop: '30%',
    },
    button: {
      margin: '0.1rem',
      padding: '4px 10px',
      borderRadius: '6px',
      border: '2px solid #000',
      backgroundColor: '#e0e0e0',
      cursor: 'pointer',
    },
  };

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
      console.log(emptyFields)
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
      const missingFieldsToString = validation.emptyFields.join(', ')
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
    <div style={styles.card}>
      <form action="" style={styles.form}>
        <div style={styles.grid}>
          {/* vasemmalla olevat elementit */}
          <div>
            <div style={styles.field}>
              <label htmlFor="productsName">Product name: </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="enter name"
                value={inputs.name}
                onChange={(evt) => {
                  handleInputChange(evt);
                }}
                required
              />
            </div>
            <div style={styles.field}>
              <label htmlFor="price">Price: </label>
              <input
                type="number"
                name="price"
                id="price"
                step={0.01}
                value={inputs.price}
                placeholder="0.00"
                onChange={(evt) => {
                  handleInputChange(evt);
                }}
                required
              />
            </div>
            {/* Tag list comes from db directly, checkbox itself is invisible and change label to include image if wanted to */}
            <div style={styles.field}>
              <div style={styles.tagsRow}>
                {tags.map((tag) => {
                  const isChecked = checkbox.includes(tag.id);

                  return (
                    <div key={`tag-${tag.id}`}>
                      <input
                        style={styles.tagsRowCheckbox}
                        type="checkbox"
                        name={tag.title}
                        id={tag.id}
                        value={tag.id}
                        checked={isChecked}
                        onChange={(evt) => {
                          handleCheckBox(evt);
                        }}
                      />
                      <label
                        htmlFor={tag.id}
                        id={`tag-${tag.id}`}
                        style={{
                          ...styles.tagsRowLabel,
                          ...(isChecked
                            ? styles.tagsRowLabelChecked
                            : styles.tagsRowLabelUnChecked),
                        }}
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

          {/*keskikohta */}
          <div>
            <div style={styles.field}>
              <label htmlFor="ingredients">Ingredients: </label>
              <textarea
                name="ingredients"
                id="ingredients"
                cols={20}
                rows={5}
                style={styles.textarea}
                value={inputs.ingredients}
                onChange={(evt) => {
                  handleInputChange(evt);
                }}
                required
              ></textarea>
            </div>
            <div style={styles.field}>
              <label htmlFor="description">Description: </label>
              <textarea
                name="description"
                id="description"
                cols={20}
                rows={5}
                style={styles.textarea}
                value={inputs.description}
                onChange={(evt) => {
                  handleInputChange(evt);
                }}
                required
              ></textarea>
            </div>
          </div>

          {/* oikea sarake */}
          <div>
            <div style={styles.imageWrapper}>
              <img
                src={preview ?? 'https://placehold.co/100x100'}
                alt="meals unique picture"
              />
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
            <div style={styles.buttons}>
              <button
                style={styles.button}
                onClick={(evt) => {
                  evt.preventDefault();
                  handleSubmit(evt);
                }}
              >
                Save
              </button>
              <button
                style={styles.button}
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
