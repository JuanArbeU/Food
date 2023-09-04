import style from "./Home.module.css";
import Nav from "../../Components/Nav/Nav";
import Cards from "../../Components/Cards/Cards";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  getDiets,
  getPages,
  setPage,
  filterOptions,
} from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const pages = useSelector((state) => state.pages);
  const recipes = useSelector((state) => state.recipes);
  const diets = useSelector((state) => state.diets);
  const toShow = useSelector((state) => state.toShow);

  const [busca, setBusca] = useState("");
  const [origin, setOrigin] = useState("Todos");
  const [order, setOrder] = useState("Ninguno");
  const [dieta, setDieta] = useState("Todas");
  const [score, setScore] = useState("Ninguno");
  const [inputpage, setInputpage] = useState('')

  const inputpageRegex = /^[1-9]\d*$/;

  useEffect(() => {

    const pageNumber = parseInt(inputpage, 10);

  if (!isNaN(pageNumber) && pageNumber > 0) {
    dispatch(setPage(pageNumber));
  }                   
    recipes.length === 0 && dispatch(getRecipes());
    diets.length === 0 && dispatch(getDiets());
    dispatch(getPages());
  }, [dispatch, toShow, diets.length, recipes.length, inputpage, pages]);

  const limpiar = () => {
    dispatch(filterOptions(recipes));
    setOrigin("Todos");
    setOrder("Ninguno");
    setDieta("Todas");
    setScore("Ninguno");
    dispatch(setPage(1));
    setInputpage('')
    setBusca("");
  };

  const ordenar = (type, filterOption) => {
    if (type === "score") {
      if (filterOption === "Ascendente") {
        dispatch(
          filterOptions(
            toShow.slice().sort((a, b) => {
              const rankA = a.healthScore ? a.healthScore : a.score;
              const rankD = b.healthScore ? b.healthScore : b.score;
              return rankA - rankD;
            })
          )
        );
      } else if (filterOption === "Descendente") {
        dispatch(
          filterOptions(
            toShow.slice().sort((a, b) => {
              const rankA = a.healthScore ? a.healthScore : a.score;
              const rankD = b.healthScore ? b.healthScore : b.score;
              return rankD - rankA;
            })
          )
        );
      } else if (filterOption === "Ninguno") {
        dispatch(filterOptions(recipes));
      }
    } else {
      dispatch(
        filterOptions(
          toShow.slice().sort((a, b) => {
            const nombreA = a.title
              ? a.title.toLowerCase()
              : a.nombre.toLowerCase();
            const nombreB = b.title
              ? b.title.toLowerCase()
              : b.nombre.toLowerCase();

            if (nombreA < nombreB) {
              return filterOption === "Ascendente" ? -1 : 1;
              // a debe ir antes que b
            }
            if (nombreA > nombreB) {
              return filterOption === "Ascendente" ? 1 : -1; // b debe ir antes que a
            }

            return 0; // a y b son iguales
          })
        )
      );
    }
  };

  const handleFilter = (type, filterOption) => {
    switch (type) {
      case "origin":
        setOrigin(filterOption);
        setOrder("Ninguno");
        setScore("Ninguno");
        dispatch(setPage(1));
        setBusca("");
        if (dieta === "Todas") {
          filterOption === "Todos"
            ? dispatch(filterOptions(recipes))
            : dispatch(
                filterOptions(
                  recipes.filter((e) =>
                    filterOption === "API" ? e.creada === undefined : e.creada
                  )
                )
              );
        } else {
          filterOption === "Todos"
            ? dispatch(
                filterOptions(
                  recipes.filter((e) =>
                    e.creada
                      ? e.Diets.some((e) => e.nombre === dieta)
                      : e.diets.includes(dieta)
                  )
                )
              )
            : dispatch(
                filterOptions(
                  recipes.filter((e) =>
                    filterOption === "API"
                      ? e.creada === undefined && e.diets.includes(dieta)
                      : e.creada && e.Diets.some((dieta) => dieta.nombre)
                  )
                )
              );
        }
        break;

      case "dieta":
        setDieta(filterOption);
        setOrder("Ninguno");
        setScore("Ninguno");
        dispatch(setPage(1));
        setBusca("");
        if (origin === "Todos") {
          filterOption === "Todas"
            ? dispatch(filterOptions(recipes))
            : dispatch(
                filterOptions(
                  recipes.filter((e) =>
                    e.creada
                      ? e.Diets.some((e) => e.nombre === filterOption)
                      : e.diets.includes(filterOption)
                  )
                )
              );
        } else {
          filterOption === "Todas"
            ? origin === "API"
              ? dispatch(
                  filterOptions(recipes.filter((e) => e.creada === undefined))
                )
              : dispatch(filterOptions(recipes.filter((e) => e.creada)))
            : dispatch(
                filterOptions(
                  origin === "API"
                    ? recipes.filter(
                        (e) =>
                          e.creada === undefined &&
                          e.diets.includes(filterOption)
                      )
                    : recipes.filter(
                        (e) =>
                          e.creada &&
                          e.Diets.some((e) => e.nombre === filterOption)
                      )
                )
              );
        }
        break;

      case "order":
        setOrder(filterOption);
        setScore("Ninguno");
        ordenar("order", filterOption);
        dispatch(setPage(1));
        break;

      case "score":
        setScore(filterOption);
        setOrder("Ninguno");
        ordenar("score", filterOption);
        dispatch(setPage(1));
        break;

      case "busca":
        setOrigin("Todos");
        setOrder("Ninguno");
        setDieta("Todas");
        setScore("Ninguno");
        dispatch(setPage(1));
        setInputpage('')
        dispatch(
          filterOptions(
            recipes.filter((e) =>
              e.creada
                ? e.nombre.toLowerCase().includes(busca.toLowerCase())
                : e.title.toLowerCase().includes(busca.toLowerCase())
            )
          )
        );
        break;

      default:
        break;
    }
  };

  const handlePage = (page) => {
    const numeroPag = parseInt(page, 10);
    if(numeroPag >= 1 && numeroPag <= 10){
      dispatch(setPage(numeroPag))
    }
    dispatch(setPage(page));
    setInputpage('')
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className={style.fondo}>
        <Nav
          limpiar={limpiar}
          busca={busca}
          setBusca={setBusca}
          handleFilter={handleFilter}
        />
        <div className={style.container}>
          <div className={style.filtros}>
            <p>Origen</p>
            <select
              onChange={(event) => handleFilter("origin", event.target.value)}
              defaultValue="Todos"
              value={origin}
            >
              <option value="Todos">Todos</option>
              <option value="API">API</option>
              <option value="DataBase">DataBase</option>
            </select>
          </div>
          <div className={style.filtros}>
            <p>Nombre</p>
            <select
              onChange={(event) => handleFilter("order", event.target.value)}
              defaultValue="Ninguno"
              value={order}
            >
              <option value="Ninguno" disabled>
                Ninguno
              </option>
              <option value="Ascendente">Ascendente</option>
              <option value="Descendente">Descendente</option>
            </select>
          </div>
          <div className={style.filtros}>
            <p>Dietas</p>
            <select
              onChange={(event) => handleFilter("dieta", event.target.value)}
              defaultValue="Todas"
              value={dieta}
            >
              <option value="Todas">Todas</option>
              {diets.length &&
                diets?.map((diet, index) => (
                  <option key={index} value={diet.nombre}>
                    {diet.nombre}
                  </option>
                ))}
            </select>
          </div>
          <div className={style.filtros}>
            <p>Health Score</p>
            <select
              onChange={(event) => handleFilter("score", event.target.value)}
              defaultValue="Ninguno"
              value={score}
            >
              <option value="Ninguno">Ninguno</option>
              <option value="Ascendente">Ascendente</option>
              <option value="Descendente">Descendente</option>
            </select>
          </div>
        </div>
        <div>
          <Cards />
        </div>
        <br />
        <div className={style.txt}>
          Página: {page} de {pages}
        </div>
        <div className={style.pages}>
          <button
            className={style.button}
            onClick={() => page > 1 && handlePage(page - 1)}
            disabled={page === 1}
          >
            &lt;
          </button>
          <input
            className={style.input}
            type="number"
            value={inputpage}
            onChange={(e)=>{
              setInputpage(e.target.value)
            }}
            placeholder="pág"
          />
          <button
            className={style.button}
            onClick={() => page < pages && handlePage(parseInt(page) + 1)}
            disabled={page === pages}
          >
            &gt;
          </button>
        </div>
        <br />
      </div>
    </>
  );
};

export default Home;
