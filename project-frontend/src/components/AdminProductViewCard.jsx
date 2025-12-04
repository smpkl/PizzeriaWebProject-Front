import React from 'react';
import {useCategories, useProducts} from '../hooks/apiHooks';

const AdminProductViewCard = ({product, setShowModified, setModifyProduct, setDeleteAction, deleteAction}) => {
  const styles = {
    card: {
      border: '2px solid #000',
      borderRadius: '14px',
      padding: '24px 28px',
      maxWidth: '950px',
      margin: '0.5rem auto',
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
    field: {marginBottom: '16px'},
    labelTitle: {
      fontWeight: '700',
      display: 'block',
      marginBottom: '4px',
    },
    textBox: {
      border: '2px solid #000',
      padding: '6px 10px',
      minHeight: '32px',
      display: 'flex',
      alignItems: 'center',
    },
    textareaBox: {
      border: '2px solid #000',
      padding: '6px 10px',
      minHeight: '150px',
      whiteSpace: 'pre-wrap',
    },
    tagsRow: {
      display: 'flex',
      gap: '10px',
      marginTop: '6px',
    },
    tagBox: {
      minWidth: '52px',
      padding: '8px 12px',
      border: '2px solid #000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageWrapper: {
      marginTop: '22px',
      width: '250px',
      height: '250px',
      border: '2px solid #000',
      backgroundColor: '#e0e0e0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    img: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'cover',
    },
    visibleRow: {
      marginTop: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    visibleBox: {
      width: '36px',
      height: '36px',
      border: '2px solid #000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      userSelect: 'none',
    },
    buttons: {
      marginTop: '40px',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
    },
    button: {
      padding: '6px 16px',
      borderRadius: '6px',
      border: '2px solid #000',
      backgroundColor: '#e0e0e0',
      cursor: 'pointer',
    },
  };

  const {deleteProduct} = useProducts();
  const {categories} = useCategories();
  const categoryName =
    categories.find((c) => c.id === product.category)?.name || '';

  const baseImageUrl = 'http://127.0.0.1:3000/api/v1/uploads/';
  const imageSrc = product.filename
    ? baseImageUrl + product.filename
    : 'https://placehold.co/250x250';

  const doDelete = async () => {
    try {
      await deleteProduct(product.id);
      setDeleteAction((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.form}>
        <div style={styles.grid}>
          {/* Vasen sarake */}
          <div>
            <div style={styles.field}>
              <span style={styles.labelTitle}>Product name:</span>
              <div style={styles.textBox}>{product.name}</div>
            </div>

            <div style={styles.field}>
              <span style={styles.labelTitle}>Price:</span>
              <div style={styles.textBox}>{product.price} €</div>
            </div>

            <div style={styles.field}>
              <span style={styles.labelTitle}>TAGS:</span>
              <div style={styles.tagsRow}>
                {(product.tags || []).map((tag) => (
                  <div key={tag} style={styles.tagBox}>
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.field}>
              <span style={styles.labelTitle}>Category:</span>
              <div style={styles.textBox}>{categoryName || '-'}</div>
            </div>
          </div>

          {/* Keski sarake*/}
          <div>
            <div style={styles.field}>
              <span style={styles.labelTitle}>Ingredients:</span>
              <div style={styles.textareaBox}>{product.ingredients || ''}</div>
            </div>
            <div style={styles.field}>
              <span style={styles.labelTitle}>Description:</span>
              <div style={styles.textareaBox}>{product.description || ''}</div>
            </div>
          </div>

          {/* Oikea sarake*/}
          <div>
            <span style={styles.labelTitle}>Image:</span>
            <div style={styles.imageWrapper}>
              <img src={imageSrc} alt={product.name} style={styles.img} />
            </div>

            <div style={styles.buttons}>
              <button
                type="button"
                style={styles.button}
                onClick={async (evt) => {
                  evt.preventDefault();
                  await doDelete();
                }}
              >
                Delete product
              </button>
              <button
                type="button"
                style={styles.button}
                onClick={(evt) => {
                  evt.preventDefault();
                  setModifyProduct(product);
                  setShowModified(true);
                }}
              >
                Modify
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductViewCard;
