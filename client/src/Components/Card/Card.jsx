import { Link } from "react-router-dom";
import style from "./Card.module.css";
import { useDispatch } from "react-redux";
import { getDetails } from "../../redux/actions";

function Card({ id, name, image, index, diets, score, creada }) {
    const dispatch = useDispatch()

  const handleDetail = () => {
    dispatch(getDetails({id, creada}))
  }

  return (
    <div className={style.card}>
      <div className={style.image}>
        <img src={image} alt={name} />
      </div>
      <div className={style.details}>
        <div className={style.center}>
          <Link
            className={style.Link}
            to={`/detail/${id}`} onClick={handleDetail}
          >
            <h1>{name}</h1>
          </Link>
          <p>
            {diets?.map((e, i) => (i ? ` | ${e.nombre ? e.nombre : e}` : e.nombre ? e.nombre : e))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
