import {useState, useEffect} from 'react';

const MenuFilter = ({products, meals, tags, categories, updateMenu}) => {
  const [input, setInput] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const toggleTag = (tagTitle) => {
    setActiveTags((prev) =>
      prev.includes(tagTitle)
        ? prev.filter((title) => title !== tagTitle)
        : [...prev, tagTitle],
    );
  };

  const handleInputChange = (text) => {
    setInput(text);
  };

  // Filteröi menun sisältö:
  useEffect(() => {
    let filteredProducts = [...products];
    let filteredMeals = [...meals];

    // Jos jokin kategoria on valittuna:
    if (activeCategory) {
      if (activeCategory === 'meals') {
        filteredMeals = meals;
        filteredProducts = [];
      } else {
        filteredProducts = filteredProducts.filter(
          (p) => p.category === activeCategory,
        );
        filteredMeals = filteredMeals.filter(
          // Mealseillä ei kyllä taida olla kategoria kenttää?
          (m) => m.category === activeCategory,
        );
      }
    }

    // Jos tageja on valittuna:
    if (activeTags.length > 0) {
      filteredProducts = filteredProducts.filter((p) =>
        activeTags.every((t) => (p.tags || []).includes(t)),
      );

      filteredMeals = filteredMeals.filter(
        (
          m, // Mealseillä ei kyllä ole tageja?
        ) => activeTags.every((t) => (m.tags || []).includes(t)),
      );
    }

    // Jos jotain on syötetty hakukenttään:
    if (input.trim() !== '') {
      const key = input.toLowerCase();

      filteredProducts = filteredProducts.filter((p) =>
        p.name.toLowerCase().includes(key),
      );

      filteredMeals = filteredMeals.filter((m) =>
        m.name.toLowerCase().includes(key),
      );
    }

    updateMenu(filteredProducts, filteredMeals);
  }, [activeCategory, activeTags, input]);

  return (
    <>
      <div
        id="menu-filter-bar"
        style={{padding: '5px 0', borderTop: '3px solid #f5eee6'}}
      >
        <div id="menu-categories" style={{width: '100%'}}>
          {categories.map((category) => (
            <button
              key={category.id}
              id={`categ-${category.id}`}
              onClick={() => toggleCategory(category.id)}
              className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
            >
              {category.name}
            </button>
          ))}
          <button
            key="ateriat-category"
            id="ateriat-category"
            onClick={() => toggleCategory('meals')}
            className={`filter-btn ${activeCategory === 'meals' ? 'active' : ''}`}
          >
            Meals
          </button>
        </div>
        <div id="menu-tags">
          {tags.map((tag) => (
            <button
              key={tag.title}
              id={`tag-${tag.id}`}
              onClick={() => toggleTag(tag.title)}
              className={`tag-btn ${activeTags.includes(tag.title) ? 'active' : ''}`}
            >
              {tag.title}
            </button>
          ))}
        </div>
        <div id="menu-search-bar">
          <input
            type="text"
            name="item-name"
            id="search-by-name"
            onChange={(e) => handleInputChange(e.target.value)}
            autoComplete="item-name"
            placeholder="Search by name"
            value={input}
            style={{
              width: '80%',
              backgroundColor: '#f5eee6',
              padding: '5px',
              border: '1px solid #f5eee6',
              marginTop: '5px',
            }}
          ></input>
        </div>
      </div>
    </>
  );
};

export default MenuFilter;
