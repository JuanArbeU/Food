const axios = require("axios");
require("dotenv").config();
const URL = "https://api.spoonacular.com/";
const { API_KEY } = process.env;
const { Recipe, Diets } = require("../db");

const getRecipes = async (req, res) => {
  try {
    const apiResponse = await axios(
      `${URL}/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    );

    const dbResponse = await Recipe.findAll({
      include: [
        {
          model: Diets, 
          attributes: ['nombre']
        },
      ],
    });

    const combinedResults = [...dbResponse, ...apiResponse.data.results];

    if (combinedResults.length === 0)
      throw new Error(`Hubo un error en la peticion`);

    return res.status(200).json(combinedResults);
  
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error al obtener los datos de la receta" });
  }
};

module.exports = {
  getRecipes,
};
