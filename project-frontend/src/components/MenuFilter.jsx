import {useState, useEffect} from 'react';

// Pizzerian info sivu (esittely, kartta, lomake, yhteystiedot)
const MenuFilter = ({
  products,
  meals,
  tags,
  categories,
  updateMenu,
  clearMenuFilters,
}) => {
  const [activeTags, setActiveTags] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  console.log(products);

  const toggleCategory = (categoryId) => {
    setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const toggleTag = (tagId) => {
    setActiveTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  useEffect(() => {
    let filteredProducts = [...products];
    let filteredMeals = [...meals];

    // Suodata kategoria
    if (activeCategory) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === activeCategory,
      );
      filteredMeals = filteredMeals.filter(
        (m) => m.category === activeCategory,
      );
    }

    // Suodata tagit (turvallisesti)
    if (activeTags.length > 0) {
      filteredProducts = filteredProducts.filter((p) =>
        activeTags.every((t) => (p.tags || []).includes(t)),
      );

      filteredMeals = filteredMeals.filter((m) =>
        activeTags.every((t) => (m.tags || []).includes(t)),
      );
    }

    updateMenu(filteredProducts, filteredMeals);
  }, [activeCategory, activeTags]);

  /*const toggleCategory = (categoryId) => {
    setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const toggleTag = (tagId) => {
    setActiveTags((tags) =>
      tags.includes(tagId)
        ? tags.filter((id) => id !== tagId)
        : [...tags, tagId],
    );
  };

  useEffect(() => {
    clearMenuFilters();
    let filteredProducts;
    let filteredMeals;
    if (activeCategory) {
      filteredProducts = products.filter((p) => p.category === activeCategory);
    }
    if (activeTags.length > 0) {
      filteredProducts = filteredProducts.filter((p) =>
        activeTags.forEach((t) => p.tags.includes(t)),
      );
    }
    if (activeTags.length > 0) {
      filteredMeals = meals.filter((p) =>
        activeTags.forEach((t) => p.tags.includes(t)),
      );
    }
    updateMenu(filteredProducts, filteredMeals);
  }, [activeCategory, activeTags]); */

  return (
    <>
      <div id="menu-filter-bar">
        <div id="menu-categories">
          {categories.map((category) => (
            <button
              key={category.id}
              id={`categ-${category.id}`}
              onClick={() => toggleCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div id="menu-tags">
          {tags.map((tag) => (
            <button
              key={tag.title}
              id={`tag-${tag.id}`}
              onClick={() => toggleTag(tag.id)}
            >
              {tag.title}
            </button>
          ))}
        </div>
        <div id="menu-search-bar">
          <input type="text"></input>
        </div>
      </div>
    </>
  );
};

export default MenuFilter;
