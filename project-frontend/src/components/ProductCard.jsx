import React, {useState} from 'react';
import useForm from '../hooks/formHooks';
import {useProducts, useTags, useCategories} from '../hooks/apiHooks';

const ProductCard = () => {
  const styles = {
    card: {
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
    },
    tagsRowCheckbox: {
      display: 'none',
    },
    tagsRowLabel: {
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
    },
  };

  const [checkboxChecked, setCheckboxChecked] = useState([]);

  const handleCheckBoxColor = (event) => {
    const {value, checked} = event.target;
    const id = Number(value);

    setCheckboxChecked((prev) => {
      if (checked) {
        if (prev.includes(id)) return prev;
        return [...prev, id];
      } else {
        return prev.filter((tagId) => tagId !== id);
      }
    });
  };

  //joko näin tai yhtenäinen formhook
  /*
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [description, setDescription] = useState('');
  */
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const {postProduct, postProductTag} = useProducts();
  const {tags} = useTags();
  const {categories} = useCategories();

  const initValues = {
    name: '',
    price: 0,
    category: 0,
    ingredients: '',
    description: '',
  };

  const initValuesCheckbox = [];

  const doPost = async (inputs, checkbox, image) => {
    try {
      const product = await postProduct(inputs, checkbox, image);
      const producId = product.result.productId
      await postProductTag(checkbox, producId)
    } catch (error) {
      console.log(error);
    }
  };

  const {handleSubmit, handleInputChange, handleCheckBox, inputs, checkbox} =
    useForm(doPost, initValues, initValuesCheckbox);

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
                  const isChecked = checkboxChecked.includes(tag.id);

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
                          handleCheckBoxColor(evt);
                        }}
                        required
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
              required
            >
              <option value={0} disabled>choose category</option>
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
                onClick={(evt) => handleSubmit(evt)}
              >
                Save
              </button>
              <button style={styles.button}>Delete</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductCard;
