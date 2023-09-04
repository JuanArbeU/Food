import { useDispatch, useSelector } from "react-redux";
import style from "./Detail.module.css";
import { setDetails } from "../../redux/actions";
import { Link } from "react-router-dom";

export default function Detail() {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.detail);

  return (
    <>
      {details ? (
        <div className={style.fondo}>
          <div className={style.container}>
            <Link to="/home">
              <button onClick={() => dispatch(setDetails())}>Volver</button>
            </Link>
            <h1>{details.title ? details.title : details.nombre}</h1>
            <h2>
              Id: {details.id} | Health Score:{" "}
              {details.healthScore ? details.healthScore : details.score}
            </h2>
            <div className={style.info}>
              <img
                src={details.image ? details.image : details.imagen}
                alt={details.name}
              />
              <p className={style.p}>
                {details.summary ? details.summary : details.resumen}
              </p>
            </div>
            <br />
            <h2 className={style.dietas}>Dietas</h2>
            <br />
            <p>
            {details.creada
              ? details.Diets.filter((e) => <h3>{e.nombre}</h3>)
              : details.diets.filter((e) => <h3>{e}</h3>)}
            </p>
            <br />
            <p className={style.p}>
              {details.instructions
                ? details.instructions
                : details.instrucciones}
            </p>
            <br />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
