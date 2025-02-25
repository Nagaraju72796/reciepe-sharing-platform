import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Published.module.css";
import LHeader from "../components/LHeader";

export default function Published() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [publishedRecipes, setPublishedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    time: "",
    image: "",
    ingredients: [""],
    steps: [""],
    likes: 0,
    userId: Number(userId),
  });
  const [editRecipe, setEditRecipe] = useState(null);
  const [modalError, setModalError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/published?userId=${userId}`)
      .then((res) => {
        setPublishedRecipes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching published recipes:", err.response?.data || err.message);
        setError("Failed to load published recipes.");
        setLoading(false);
      });
  }, [userId]);

  const increaseLikes = (id) => {
    setPublishedRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === id ? { ...recipe, likes: recipe.likes + 1 } : recipe
      )
    );
  };

  const handleShowPublishModal = () => setShowPublishModal(true);
  const handleClosePublishModal = () => {
    setShowPublishModal(false);
    setNewRecipe({
      title: "",
      time: "",
      image: "",
      ingredients: [""],
      steps: [""],
      likes: 0,
      userId: Number(userId),
    });
    setModalError(null);
  };

  const handleShowEditModal = (recipe) => {
    setEditRecipe(recipe);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditRecipe(null);
    setModalError(null);
  };

  const handleChange = (e, isEdit = false) => {
    const setter = isEdit ? setEditRecipe : setNewRecipe;
    setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleIngredientChange = (index, value, isEdit = false) => {
    const setter = isEdit ? setEditRecipe : setNewRecipe;
    setter((prev) => {
      const updatedIngredients = [...prev.ingredients];
      updatedIngredients[index] = value;
      return { ...prev, ingredients: updatedIngredients };
    });
  };

  const addIngredient = (isEdit = false) => {
    const setter = isEdit ? setEditRecipe : setNewRecipe;
    setter((prev) => ({ ...prev, ingredients: [...prev.ingredients, ""] }));
  };

  const handleStepChange = (index, value, isEdit = false) => {
    const setter = isEdit ? setEditRecipe : setNewRecipe;
    setter((prev) => {
      const updatedSteps = [...prev.steps];
      updatedSteps[index] = value;
      return { ...prev, steps: updatedSteps };
    });
  };

  const addStep = (isEdit = false) => {
    const setter = isEdit ? setEditRecipe : setNewRecipe;
    setter((prev) => ({ ...prev, steps: [...prev.steps, ""] }));
  };

  const handlePublishSubmit = (e) => {
    e.preventDefault();
    if (!newRecipe.title || !newRecipe.time || !newRecipe.image) {
      setModalError("Please fill in all required fields (Title, Time, Image).");
      return;
    }
    axios
      .post("http://localhost:5000/api/published", newRecipe)
      .then((res) => {
        setPublishedRecipes((prev) => [...prev, res.data]);
        handleClosePublishModal();
      })
      .catch((err) => {
        console.error("Error publishing recipe:", err.response?.data || err.message);
        setModalError("Failed to publish recipe. Please try again.");
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editRecipe.title || !editRecipe.time || !editRecipe.image) {
      setModalError("Please fill in all required fields (Title, Time, Image).");
      return;
    }
    axios
      .put(`http://localhost:5000/api/published/${editRecipe.id}`, editRecipe)
      .then((res) => {
        setPublishedRecipes((prev) =>
          prev.map((r) => (r.id === editRecipe.id ? res.data : r))
        );
        handleCloseEditModal();
      })
      .catch((err) => {
        console.error("Error editing recipe:", err.response?.data || err.message);
        setModalError("Failed to edit recipe. Please try again.");
      });
  };

  return (
    <>
      <LHeader />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Published Recipes</h1>
          <button className={styles.publishButton} onClick={handleShowPublishModal}>
            Publish New Recipe
          </button>
        </div>
        {loading ? (
          <div className={styles.loading}>Loading your recipes...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : publishedRecipes.length === 0 ? (
          <div className={styles.empty}>
            <p>You haven’t published any recipes yet.</p>
          </div>
        ) : (
          <div className={styles.recipeGrid}>
            {publishedRecipes.map((recipe) => (
              <div key={recipe.id} className={styles.recipeCard}>
                <Link to={`/recipe/${recipe.id}`}>
                  <img src={recipe.image} alt={recipe.title} className={styles.cardImage} />
                </Link>
                <div className={styles.cardContent}>
                  <h3>{recipe.title}</h3>
                  <p className={styles.time}>⏳ {recipe.time}</p>
                  <div className={styles.cardFooter}>
                    <button
                      className={styles.likeButton}
                      onClick={() => increaseLikes(recipe.id)}
                    >
                      ❤️ {recipe.likes}
                    </button>
                    <button
                      className={styles.editButton}
                      onClick={() => handleShowEditModal(recipe)}
                    >
                      ✏️ Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Publish Modal */}
        {showPublishModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Publish New Recipe</h2>
              {modalError && <p className={styles.modalError}>{modalError}</p>}
              <form onSubmit={handlePublishSubmit} className={styles.modalForm}>
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={newRecipe.title}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
                <label>Cooking Time</label>
                <input
                  type="text"
                  name="time"
                  value={newRecipe.time}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
                <label>Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={newRecipe.image}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
                <label>Ingredients</label>
                {newRecipe.ingredients.map((ingredient, index) => (
                  <input
                    key={index}
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    placeholder={`Ingredient ${index + 1}`}
                    className={styles.input}
                  />
                ))}
                <button type="button" onClick={addIngredient} className={styles.addButton}>
                  Add Ingredient
                </button>
                <label>Steps</label>
                {newRecipe.steps.map((step, index) => (
                  <input
                    key={index}
                    type="text"
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    placeholder={`Step ${index + 1}`}
                    className={styles.input}
                  />
                ))}
                <button type="button" onClick={addStep} className={styles.addButton}>
                  Add Step
                </button>
                <div className={styles.modalFooter}>
                  <button type="button" onClick={handleClosePublishModal} className={styles.closeButton}>
                    Close
                  </button>
                  <button type="submit" className={styles.submitButton}>Publish</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && editRecipe && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Edit Recipe</h2>
              {modalError && <p className={styles.modalError}>{modalError}</p>}
              <form onSubmit={handleEditSubmit} className={styles.modalForm}>
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={editRecipe.title}
                  onChange={(e) => handleChange(e, true)}
                  required
                  className={styles.input}
                />
                <label>Cooking Time</label>
                <input
                  type="text"
                  name="time"
                  value={editRecipe.time}
                  onChange={(e) => handleChange(e, true)}
                  required
                  className={styles.input}
                />
                <label>Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={editRecipe.image}
                  onChange={(e) => handleChange(e, true)}
                  required
                  className={styles.input}
                />
                <label>Ingredients</label>
                {editRecipe.ingredients.map((ingredient, index) => (
                  <input
                    key={index}
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value, true)}
                    placeholder={`Ingredient ${index + 1}`}
                    className={styles.input}
                  />
                ))}
                <button type="button" onClick={() => addIngredient(true)} className={styles.addButton}>
                  Add Ingredient
                </button>
                <label>Steps</label>
                {editRecipe.steps.map((step, index) => (
                  <input
                    key={index}
                    type="text"
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value, true)}
                    placeholder={`Step ${index + 1}`}
                    className={styles.input}
                  />
                ))}
                <button type="button" onClick={() => addStep(true)} className={styles.addButton}>
                  Add Step
                </button>
                <div className={styles.modalFooter}>
                  <button type="button" onClick={handleCloseEditModal} className={styles.closeButton}>
                    Close
                  </button>
                  <button type="submit" className={styles.submitButton}>Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}