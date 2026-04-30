import { useEffect, useState } from "react";

function RecipeForm({ addRecipe, editRecipe }) {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [time, setTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const categoryOptions = [
    "Çorba",
    "Ana Yemek",
    "Tatlı",
    "Salata",
    "Kahvaltı",
    "İçecek",
    "Hamur İşi",
    "Makarna",
    "Pilav",
    "Et Yemeği",
    "Tavuk Yemeği",
    "Sebze Yemeği",
    "Balık",
    "Meze",
    "Atıştırmalık",
    "Diyet",
    "Vegan",
    "Vejetaryen",
    "Sos",
    "Diğer",
  ];

  useEffect(() => {
    if (editRecipe) {
      setName(editRecipe.name);
      setCategories(editRecipe.categories || []);
      setTime(editRecipe.time);
      setIngredients(editRecipe.ingredients);
      setSteps(editRecipe.steps);
    }
  }, [editRecipe]);

  const handleCategoryChange = (category) => {
    if (categories.includes(category)) {
      setCategories(categories.filter((item) => item !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      alert("Tarif adı boş olamaz.");
      return;
    }

    if (categories.length === 0) {
      alert("En az bir kategori seçmelisin.");
      return;
    }

    const newRecipe = {
      id: editRecipe ? editRecipe.id : Date.now(),
      name,
      categories,
      time,
      ingredients,
      steps,
      favorite: editRecipe ? editRecipe.favorite : false,
    };

    addRecipe(newRecipe);

    setName("");
    setCategories([]);
    setTime("");
    setIngredients("");
    setSteps("");
  };

  return (
    <div className="card shadow-sm border-0 p-4 mb-4">
      <h4 className="mb-3">
        {editRecipe ? "✏️ Tarifi Güncelle" : "➕ Yeni Tarif Ekle"}
      </h4>

      <form onSubmit={handleSubmit}>
        <div className="row align-items-start">
          <div className="col-md-6 mb-3">
            <label className="form-label">Tarif Adı</label>
            <input
              type="text"
              className="form-control"
              placeholder="Örn: Mercimek Çorbası"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Süre</label>
            <input
              type="number"
              className="form-control"
              placeholder="Dakika"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Seçilen Kategoriler</label>
            <div className="border rounded p-2 bg-light min-vh-25">
              {categories.length === 0 ? (
                <small className="text-muted">Henüz kategori seçilmedi.</small>
              ) : (
                categories.map((category, index) => (
                  <span key={index} className="badge bg-success me-1 mb-1">
                    {category}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Kategoriler</label>

          <div className="row">
            {categoryOptions.map((category, index) => (
              <div className="col-md-3 col-sm-6 mb-2" key={index}>
                <div
                  className={`d-flex justify-content-between align-items-center border rounded px-3 py-2 ${
                    categories.includes(category)
                      ? "bg-success text-white"
                      : "bg-white"
                  }`}
                >
                  <span>{category}</span>

                  <input
                    type="checkbox"
                    className="form-check-input ms-2"
                    checked={categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                </div>
              </div>
            ))}
          </div>

          <small className="text-muted">
            Bir tarif için birden fazla kategori seçebilirsin.
          </small>
        </div>

        <div className="mb-3">
          <label className="form-label">Malzemeler</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Örn: mercimek, soğan, havuç, tuz..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Yapılış</label>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Tarifin yapılış adımlarını yaz..."
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          ></textarea>
        </div>

        <button className="btn btn-success w-100 py-2">
          {editRecipe ? "Tarifi Güncelle" : "Tarif Ekle"}
        </button>
      </form>
    </div>
  );
}

export default RecipeForm;