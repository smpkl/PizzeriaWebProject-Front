import React from 'react';

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
      display: 'flex',
      gap: '10px',
      marginTop: '6px',
    },
    imageWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '24px',
    },
  };
  return (
    <div style={styles.card}>
      <form action="" style={styles.form}>
        <div style={styles.grid}>
          {/* vasemmalla olevat elementit */}
          <div>
            <div style={styles.field}>
              <label htmlFor="products-name">Product name: </label>
              <input
                type="text"
                name="products-name"
                id="products-name"
                placeholder="enter name"
              />
            </div>
            <div style={styles.field}>
              <label htmlFor="products-price">Price: </label>
              <input
                type="number"
                name="products-price"
                id="products-price"
                placeholder="0.00"
              />
            </div>
            {/*tähän koitan keksitä paremmat kuvat */}
            <div style={styles.field}>
              <div style={styles.tagsRow}>
                <input
                  type="checkbox"
                  name="placeholder-tag1"
                  id="placeholder-tag1"
                />
                <label htmlFor="placeholder-tag1">Placeholder tag</label>
                <input
                  type="checkbox"
                  name="placeholder-tag2"
                  id="placeholder-tag2"
                />
                <label htmlFor="placeholder-tag2">Placeholder tag</label>
                <input
                  type="checkbox"
                  name="placeholder-tag3"
                  id="placeholder-tag3"
                />
                <label htmlFor="placeholder-tag3">Placeholder tag</label>
              </div>
            </div>
            <label htmlFor="products-category">Categories: </label>
            <input
              type="text"
              name="products-category"
              id="products-category"
              placeholder="set category"
            />
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
              ></textarea>
            </div>
          </div>

          {/* oikea sarake */}
          <div>
            <div style={styles.imageWrapper}>
              <img
                src="https://placehold.co/100x100"
                alt="meals unique picture"
              />
            </div>
            <input id="product-image" type="file" placeholder="change image" />
          </div>
        </div>

        {/* alas ainakin kuvan perusteella mutta ehk parempi siirtää oikeen sarakkeen loppuun?*/}
        <div>
          <div style={styles.footer}>
            <button>Save</button>
            <button>Delete</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductCard;
