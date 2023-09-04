 const axios = require("axios");
require("dotenv").config(); // Cargo vbles de entorno
const URL = "https://api.spoonacular.com/";
const { API_KEY } = process.env;
const { Recipe, Diets } = require('../db')

const getRecipeId = async (req, res) => {
  try {
    const { id } = req.params;
    const { creada } = req.query;
    console.log(id, creada);
    if (!creada) {
      const response = await axios(
        `${URL}recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`
      );
      const datos = response.data;

      if (datos.id !== parseInt(id))
        throw new Error(`Faltan los datos de la receta con ID: ${id}`);

      return res.status(200).json(datos);
    } else {
      const dbReponse = await Recipe.findOne({
        where:{
          id
        }, include: [
          {
            model: Diets, 
            attributes: ['nombre']
          },
        ],
      });
      return res.status(200).json(dbReponse);
    }
    //Diferencias cuando es API y cuando es DB (if else si viene el query param)
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error al obtener los datos de la receta" });
  }
};

module.exports = {
  getRecipeId,
};
