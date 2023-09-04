const axios = require("axios");
require("dotenv").config();
const URL = "https://api.spoonacular.com/";
const { API_KEY } = process.env;
const { Recipe } = require('../db')

const getRecipeName = async (req, res) => {
  try {
    const name  = req.query.name

    const lowerCaseName = name.toLowerCase()

    const apiResponse = await axios(
      `${URL}/recipes/complexSearch?apiKey=${API_KEY}&number=100&query=${lowerCaseName}`
    );

    const dbResponse = await Recipe.findAll(lowerCaseName) // ??????????

    const combinedResults = [...apiResponse.data.results, ...dbResponse]

    if (combinedResults.length === 0)
      throw new Error(`No se encontró una receta con el nombre: ${name}`);

    return res.status(200).json(combinedResults);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error al obtener los datos de la receta" });
  }
};

module.exports = {
  getRecipeName,
};
