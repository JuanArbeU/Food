import style from "./Form.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Form() {
  const [nombre, setNombre] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [nombreEmptyError, setNombreEmptyError] = useState(false);

  const nombreRegex = /^.{1,50}$/;

  const [imagen, setImagen] = useState("");
  const [imagenError, setImagenError] = useState("");
  const [imagenEmptyError, setImagenEmptyError] = useState(false);

  const imagenRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

  const [resumen, setResumen] = useState("");
  const [resumenError, setResumenError] = useState(false);

  const [score, setScore] = useState(0);

  const [instrucciones, setInstrucciones] = useState("");
  const [instruccionesError, setInstruccionesError] = useState(false);

  const [selectedDiets, setSelectedDiets] = useState([]);

  const [recetaCreada, setRecetaCreada] = useState(false);

  const [volverVisible, setVolverVisible] = useState(false);

  const diets = useSelector((state) => state.diets);

  const handleNombreChange = (event) => {
    const value = event.target.value;
    setNombre(value);
    if (!nombreRegex.test(value)) {
      setNombreError("El nombre no puede exceder los 50 caracteres.");
    } else {
      setNombreError("");
    }
  };

  const handleNombreBlur = () => {
    if (nombre.trim() === "") {
      setNombreEmptyError(true);
    } else {
      setNombreEmptyError(false);
    }
  };

  const handleImagenChange = (event) => {
    const value = event.target.value;
    setImagen(value);
    if (!imagenRegex.test(value)) {
      setImagenError("Ingresa una URL válida para la imagen");
    } else {
      setImagenError("");
    }
  };

  const handleImagenBlur = () => {
    if (imagen.trim() === "") {
      setImagenEmptyError(true);
    } else {
      setImagenEmptyError(false);
    }
  };

  const handleResumenChange = (event) => {
    const value = event.target.value;
    setResumen(value);
  };

  const handleResumenBlur = () => {
    if (resumen.trim() === "") {
      setResumenError(true);
    } else {
      setResumenError(false);
    }
  };

  const handleHealthChange = (event) => {
    setScore(event.target.value);
  };

  const handlePasoChange = (event) => {
    const value = event.target.value;
    setInstrucciones(value);
  };

  const handlePasoBlur = () => {
    if (instrucciones.trim() === "") {
      setInstruccionesError(true);
    } else {
      setInstruccionesError(false);
    }
  };

  const postRecipe = (recipe) => {
    axios
      .post(`https://food-production-3cb5.up.railway.app/recipes`, JSON.stringify(recipe), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => console.log(res))
      .catch((error) => alert(error.response.data.message));
  };

  const handleCrearRecetaClick = async () => {
    setNombre("");
    setImagen("");
    setResumen("");
    setScore(0);
    setInstrucciones("");
    setSelectedDiets([]);

    if (
      nombre.trim() === "" ||
      imagen.trim() === "" ||
      resumen.trim() === "" ||
      instrucciones.trim() === "" ||
      !score
    ) {
      alert("Debes rellenar los campos obligatorios");
    } else {
      const selectedDietIds = selectedDiets
        .filter((diet) => diet.selected)
        .map((diet) => diet.id);

      if (selectedDietIds.length === 0) {
        alert("Debes seleccionar al menos una dieta");
        return;
      }

      const recipe = {
        nombre,
        imagen,
        resumen,
        instrucciones,
        score: Number(score),
        dietas: selectedDietIds,
        creada: true,
      };

      try {
        await postRecipe(recipe);
        setRecetaCreada(true);
        setVolverVisible(true);
      } catch (error) {
        console.error("Error al enviar la receta:", error);
      }
    }
  };

  useEffect(() => {
    const fetchDiets = async () => {
      try {
        setSelectedDiets(diets.map((item) => ({ ...item, selected: false })));
      } catch (error) {
        console.error("Error al obtener simplifiedDiets:", error);
      }
    };
    fetchDiets();
  }, [diets]);

  const handleDietCheckboxChange = (index) => {
    const updatedDiets = [...selectedDiets];
    updatedDiets[index].selected = !updatedDiets[index].selected;
    setSelectedDiets(updatedDiets);
  };

  return (
    <div className={style.container}>
      <h1>Crea tu receta!</h1>
      <br />
      <h3>Nombre</h3>
      <input
        placeholder="Copia aquí el nombre de tu receta"
        type="text"
        name="nombre"
        value={nombre}
        onChange={handleNombreChange}
        onBlur={handleNombreBlur}
      />
      {nombreError && <p>{nombreError}</p>}
      {nombreEmptyError && (
        <p style={{ color: "red" }}>Ingresa el nombre de tu receta</p>
      )}
      <br />
      <label for="image">
        <h3>Imagen</h3>
      </label>
      <input
        placeholder="Inserta aqui la URL de la imagen"
        type="text"
        name="image"
        value={imagen}
        onChange={handleImagenChange}
        onBlur={handleImagenBlur}
      />
      {imagenError && <p>{imagenError}</p>}
      {imagenEmptyError && (
        <p style={{ color: "red" }}>Ingresa una URL para la imagen</p>
      )}
      <br />
      <label for="resumen">
        <h3>Resumen</h3>
      </label>
      <textarea
        placeholder="Copia un resumen de tu receta"
        id="resumen"
        name="resumen"
        rows="2"
        cols="66"
        value={resumen}
        onChange={handleResumenChange}
        onBlur={handleResumenBlur}
      ></textarea>
      {resumenError && (
        <p style={{ color: "red" }}>Ingresa un resumen de tu receta</p>
      )}
      <br />
      <h3>Health Score {score}</h3>
      <input
        name="barra"
        type="range"
        min="0"
        max="100"
        step="1"
        value={score}
        onChange={handleHealthChange}
      />
      <br />
      <label for="instrucciones">
        <h3>Paso a paso</h3>
      </label>
      <textarea
        placeholder="Copia el paso a paso de tu receta"
        id="instrucciones"
        name="instrucciones"
        rows="2"
        cols="66"
        value={instrucciones}
        onChange={handlePasoChange}
        onBlur={handlePasoBlur}
      ></textarea>
      {instruccionesError && (
        <p style={{ color: "red" }}>Ingresa el paso a paso de tu receta</p>
      )}
      <br />
      <br />
      <div>
        <h3>Selecciona las dietas:</h3>
        {selectedDiets.map((diet, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={diet.selected}
              onChange={() => handleDietCheckboxChange(index)}
            />
            {diet.nombre}
          </label>
        ))}
      </div>
      <br />
      <br />
      <div className={style.prev}>
        <button onClick={handleCrearRecetaClick}>Crear Receta</button>
        {nombre && imagen && resumen && instrucciones && recetaCreada && (
          <p>Receta creada!</p>
        )}
      </div>
      <br />
      {volverVisible && (
        <Link to="/home">
          <button>Volver</button>
        </Link>
      )}
    </div>
  );
}
