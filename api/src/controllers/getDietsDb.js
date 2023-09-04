const axios = require("axios");
require("dotenv").config();
const URL = "https://api.spoonacular.com/";
const { API_KEY } = process.env;

const getDietsFromAPI = async () => {
  try {
    const response = await axios(
      `${URL}/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    );

    const dietasApi = response.data.results;

    const dietasUnicas = new Set();

    dietasApi.forEach((obj) => {
      obj.diets.forEach((dieta) => {
        dietasUnicas.add(dieta);
      });
    });
    return Array.from(dietasUnicas);
  } catch (error) {
    console.error("Error al obtener las dietas desde la API:", error);
  }
};

const { Diets } = require("../db");

const saveDiets = async () => {
  try {
    const dietsFromAPI = await getDietsFromAPI();

    if (dietsFromAPI.length === 0)
      return Error("No se encontraron géneros en la API.");

    await Promise.all(
      dietsFromAPI.map(async (dietName) => {
        const [diet, created] = await Diets.findOrCreate({
          where: { nombre: dietName },
        });

        if (created) {
          console.log(`Dieta "${diet.nombre}" creada en la base de datos.`);
        } else {
          console.log(`Dieta "${diet.nombre}" ya existe en la base de datos.`);
        }
      })
    );

    console.log("Dietas guardadas en la base de datos.");
  } catch (error) {
    console.error("Error al guardar las dietas en la base de datos:", error);
  }
};

const getDietsWithId = async () => {
  try {
    const diets = await Diets.findAll({ attributes: ["id", "nombre"] });
    const simplified = diets.map((diet) => {
      return {
        id: diet.dataValues.id,
        nombre: diet.dataValues.nombre,
      };
    });

    return simplified;
  } catch (error) {
    console.error("Error al obtener las dietas desde la base de datos:", error);
    throw error;
  }
};
getDietsWithId();

module.exports = {
  saveDiets,
  getDietsWithId,
};
