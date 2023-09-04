import Card from "../Card/Card";
import style from "./Cards.module.css";
import { useSelector } from "react-redux";

export default function Cards() {
  const toShow = useSelector((state) => state.toShow);
  const page = useSelector((state) => state.page);

  return (
    <div className={style.container}>
      {toShow.length ? (
        toShow &&
        toShow
          .slice(
            page <= 1 ? 0 : (page - 1) * 9 - 1,
            page <= 1 ? 9 : page * 9 - 1
          )
          .map((recipe, index) => {
            return (
              <Card
                key={index}
                id={recipe.id}
                name={recipe.creada ? recipe.nombre : recipe.title}
                image={recipe.creada ? recipe.imagen : recipe.image}
                diets={recipe.creada ? recipe.Diets : recipe.diets}
                score={recipe.creada ? recipe.score: recipe.healthScore}
                creada={recipe.creada}
              />
            );
          })
      ) : (
        <div>
          <p>No data</p>
        </div>
      )}
    </div>
  );
}
