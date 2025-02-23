import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Saved.module.css';

export default function Saved() {
  // Sample liked recipes data - in a real app, this could come from an API or user data
  const initialLikedRecipes = Array(10).fill({
    title: 'Chick Gravy',
    time: '45 mins',
    likes: 123,
    image: '/dish2.jpg',
  });

  const [likedRecipes, setLikedRecipes] = useState(initialLikedRecipes);

  const increaseLikes = (index) => {
    const updatedRecipes = [...likedRecipes];
    updatedRecipes[index].likes += 1;
    setLikedRecipes(updatedRecipes);
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

      <main className="p-3">
        <h1 className="mb-4">Saved Recipes</h1>
        <div className="container-fluid">
          <div className="row">
            {likedRecipes.map((recipe, index) => (
              <div className="col-md-2" key={index}>
                <div className="card shadow-sm border-0 rounded-3">
                  <img src={recipe.image} className="card-img-top rounded-top" alt={recipe.title} />
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title mb-1">{recipe.title}</h5>
                      <p className="card-text text-muted">⏳ {recipe.time}</p>
                    </div>
                    <div className="text-center">
                      <p className="mb-0 fw-bold text-danger">{recipe.likes}</p>
                      <button
                        className="btn btn-sm btn-light border"
                        onClick={() => increaseLikes(index)}
                      >
                        ❤️ Like
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}