import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Recipe.module.css';

export default function Recipe() {
  // Use useParams to get the recipe ID from the URL (for dynamic routing)
  const { id } = useParams();

  // Sample recipe data - in a real app, this would come from an API or props based on id
  const [recipe, setRecipe] = useState({
    id: id || 1,
    title: 'Classic Spaghetti Carbonara',
    author: 'Chef John',
    likes: 1234,
    image: '/dish2.jpg',
    ingredients: [
      '400g spaghetti',
      '150g pancetta, diced',
      '2 large eggs',
      '1 cup grated Parmesan cheese',
      '2 cloves garlic, minced',
      'Salt and black pepper to taste',
      'Fresh parsley, chopped (for garnish)',
    ],
    steps: [
      'Bring a large pot of salted water to a boil. Cook the spaghetti according to package instructions until al dente. Reserve 1 cup of pasta water and drain the rest.',
      'In a large skillet, cook the pancetta over medium heat until crispy. Add the minced garlic and cook for another minute.',
      'In a bowl, whisk together the eggs and grated Parmesan cheese.',
      'Add the cooked spaghetti to the skillet with the pancetta. Remove from heat and quickly toss to combine.',
      'Pour the egg and cheese mixture over the spaghetti, tossing continuously to create a creamy sauce. Add reserved pasta water as needed to reach desired consistency.',
      'Season with salt and black pepper to taste. Garnish with chopped parsley and serve immediately.',
    ],
  });

  const increaseLikes = () => {
    setRecipe((prev) => ({ ...prev, likes: prev.likes + 1 }));
  };

  return (
    <>
      <header className={styles.headerSettings}>
        <img src="/recipe-logo.jpg" alt="logo" className={styles.logoSettings} />
        <nav>
          <ul className={styles.listSettings}>
            <li className={styles.listItemSettings}><Link to="/">Home</Link></li>
            <li className={styles.listItemSettings}><Link to="/trending">Trending</Link></li>
            <li className={styles.listItemSettings}><Link to="/saved">Saved</Link></li>
            <li className={styles.listItemSettings}><Link to="/published">Published</Link></li>
          </ul>
        </nav>
        <div className="d-flex ms-auto dummy12">
          <input
            type="text"
            placeholder="Search"
            className={styles.searchBarSettings}
          />
          <img src="/search.svg" alt="search" className={styles.searchSettings} />
        </div>
        <img src="/profile_dp.jpg" alt="user" className={`${styles.headerUserSettings} ms-4 me-2`} />
      </header>

      <main className={styles.main}>
        <img src={recipe.image} alt={recipe.title} className={styles.recipeImage} />

        <section className={styles.recipeSection}>
          <h1>{recipe.title}</h1>
          <div className={styles.recipeMeta}>
            <p>Published by: <strong>{recipe.author}</strong></p>
            <p className={styles.likes}>
              ❤️ {recipe.likes} Likes{' '}
              <button onClick={increaseLikes} className="btn btn-sm btn-light border">
                Like
              </button>
            </p>
          </div>

          <div className={styles.ingredients}>
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.steps}>
            <h2>Step-by-Step Instructions</h2>
            <ol>
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </section>
      </main>
    </>
  );
}