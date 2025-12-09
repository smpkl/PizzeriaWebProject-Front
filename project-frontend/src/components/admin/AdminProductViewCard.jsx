import React from 'react';
import {useCategories, useProducts} from '../../hooks/apiHooks';
import '../../admincss/admin.css';

const AdminProductViewCard = ({
  product,
  setShowModified,
  setModifyProduct,
  setDeleteAction,
  deleteAction,
}) => {

  const {deleteProduct} = useProducts();
  const {categories} = useCategories();
  const categoryName =
    categories.find((c) => c.id === product.category)?.name || '';

  const baseImageUrl = `${import.meta.env.VITE_API_BASE_URL}uploads/`;
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
    <div className="admin-card">
      <div>
        <div className="admin-grid-3-wide-gap">
          {/* Vasen sarake */}
          <div>
            <div className="admin-field">
              <span className="admin-product-view-card__label-title">
                Product name:
              </span>
              <div className="admin-product-view-card__text-box">
                {product.name}
              </div>
            </div>

            <div className="admin-field">
              <span className="admin-product-view-card__label-title">
                Price:
              </span>
              <div className="admin-product-view-card__text-box">
                {product.price} €
              </div>
            </div>

            <div className="admin-field">
              <span className="admin-product-view-card__label-title">
                TAGS:
              </span>
              <div className="admin-product-view-card__tags-row">
                {(product.tags || []).map((tag) => (
                  <div key={tag} className="admin-product-view-card__tag-box">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-field">
              <span className="admin-product-view-card__label-title">
                Category:
              </span>
              <div className="admin-product-view-card__text-box">
                {categoryName || '-'}
              </div>
            </div>
          </div>

          {/* Keski sarake */}
          <div>
            <div className="admin-field">
              <span className="admin-product-view-card__label-title">
                Ingredients:
              </span>
              <div className="admin-product-view-card__textarea-box">
                {product.ingredients || ''}
              </div>
            </div>
            <div className="admin-field">
              <span className="admin-product-view-card__label-title">
                Description:
              </span>
              <div className="admin-product-view-card__textarea-box">
                {product.description || ''}
              </div>
            </div>
          </div>

          {/* Oikea sarake */}
          <div>
            <span className="admin-product-view-card__label-title">Image:</span>
            <div className="admin-product-view-card__image-wrapper">
              <img src={imageSrc} alt={product.name} />
            </div>

            <div className="admin-product-view-card__buttons">
              <button
                type="button"
                className="admin-button"
                onClick={async (evt) => {
                  evt.preventDefault();
                  await doDelete();
                }}
              >
                Delete product
              </button>
              <button
                type="button"
                className="admin-button"
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
