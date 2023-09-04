const { Recipe, Diets } = require("../db");

const postRecipe = async (req, res) => {
  try {
    const { nombre, imagen, resumen, score, instrucciones, creada, dietas } =
      req.body;

    console.log(req.body);

    if (
      !nombre ||
      !imagen ||
      !resumen ||
      !score ||
      !instrucciones ||
      !creada ||
      !dietas
    ) {
      res.status(400).json({ message: "Faltan datos" });
    } else {
      const newRecipe = await Recipe.create({
        nombre: nombre,
        imagen: imagen,
        resumen: resumen,
        score: score,
        instrucciones: instrucciones,
        creada: creada,
      });

      console.log(dietas);

      const dietasID = await Diets.findAll({
        where: {
          id: dietas,
        },
      });

      console.log(dietasID);

      const associate = await newRecipe.setDiets(dietasID);

      return res.status(200).json(associate);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postRecipe,
};

/* {
    "nombre" : "pasta con atun",
    "imagen" : "imagen",
    "resumen" : "El plato preferido",
    "score" : 70,
    "instrucciones" : "Algo muy sencillo",
    "dietas" : "Primal"
  } */
