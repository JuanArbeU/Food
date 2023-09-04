import { Link } from "react-router-dom";
import style from "./Nav.module.css";

export default function Nav({ limpiar, busca, setBusca, handleFilter }) {
  return (
    <div className={style.fondo}>
      <div className={style.container}>
        <Link to="/">
          <button className={style.button}>Lobby</button>
        </Link>
        <div className={style.search}>
          <input
            placeholder="Busca tu receta"
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button
            className={style.button}
            onClick={() => handleFilter("busca", busca)}
          >
            Buscar
          </button>
        </div>
        <div>
          <button className={style.button} onClick={limpiar}>
            Limpiar Filtros/Búsqueda
          </button>
        </div>
        <Link to="/home">
          <button className={style.button}>Home</button>
        </Link>
        <Link to="/add">
          <button className={style.button}>Crea tu receta</button>
        </Link>
      </div>
    </div>
  );
}
