import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <>
      <div className={style.background}>
        <div className={style.card}>
          <p className={style.texto}>
            Si eres un chef experimentado o simplemente estás dando tus primeros
            pasos en el mundo de la cocina, nuestra web app de recetas es tu
            compañera perfecta. Únete a nosotros en esta emocionante aventura
            culinaria y déjate llevar por la magia de los sabores y la
            creatividad. ¡La cocina nunca ha sido tan emocionante! ¡Bienvenido y
            que disfrutes explorando, cocinando y compartiendo en nuestra
            comunidad de recetas en línea!
          </p>
          <Link to="/home">
            <button className={style.button}>Go!</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Landing;
