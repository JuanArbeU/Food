const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const { getRecipes } = require('../controllers/getRecipes')
const { getRecipeId } = require('../controllers/getRecipeId');
const { getRecipeName } = require('../controllers/getRecipeName');
const { postRecipe } = require('../controllers/postRecipe');
const { saveDiets, getDietsWithId } = require('../controllers/getDietsDb');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', getRecipes)
router.get('/recipes/name', getRecipeName);
router.get('/recipes/:id', getRecipeId);
router.post('/recipes', postRecipe);
router.get('/diets', async (req, res) => {
    try {
      await saveDiets();
      const simplifiedDiets = await getDietsWithId();
      return res.status(200).json(simplifiedDiets);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener las dietas." });
    }
  })


module.exports = router;
