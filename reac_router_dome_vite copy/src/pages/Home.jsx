
import DailyImage from "../components/DailyImages";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const imageCollection = [
  "/images/majestic-mountain-vista.png",
  "/images/ocean-sunset.png",
  "/images/forest-path.png",
  "/images/desert-dunes.png",
  "/images/vibrant-city-skyline.png",
  "/images/northern-lights.png",
  "/images/tropical-beach-paradise.png",
];

const catalogItems = [
  {
    id: 1,
    title: "Producto 1",
    description: "Un producto de alta calidad, ideal para uso diario.",
  },
  {
    id: 2,
    title: "Producto 2",
    description: "Diseño moderno y duradero, perfecto para cualquier ocasión.",
  },
  {
    id: 3,
    title: "Producto 3",
    description:
      "Ligero y funcional, pensado para ofrecer la máxima comodidad.",
  },
  {
    id: 4,
    title: "Producto 4",
    description: "Fabricado con materiales sostenibles y resistentes.",
  },
  {
    id: 5,
    title: "Producto 5",
    description: "Una opción práctica con un estilo elegante y minimalista.",
  },
  {
    id: 6,
    title: "Producto 6",
    description: "Combina eficiencia y estética en un solo diseño.",
  },
  {
    id: 7,
    title: "Producto 7",
    description: "Producto versátil, ideal para profesionales y entusiastas.",
  },
];

function Home() {
    const navigate = useNavigate();
    const handleDetails = (id) => {
        console.log(id)
        navigate(`/home/${id}`);
    }
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <DailyImage
          images={imageCollection}
          alt="Imagen diaria del paisaje"
          className={styles["hero-img"]}
          testDate="2025-10-29"
        />
      </section>
      <section className={styles.catalog}>
        {catalogItems.map((item) => (
          <div
            key={item.id} onClick={() => {handleDetails(item.id)}}
            className={styles.catalogItem}
           
          >
            {item.title}
          </div>
        ))}
      </section>
    </main>
  );
}

  export default Home;