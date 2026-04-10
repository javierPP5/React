import styles from './sobre-nosotros.module.css'
import logo from '/logoBlanco.png'

function SobreNosotros() {
    return (
        <main className={styles.main}>
            <div className={styles.titulo}>
                <h4>  SOBRE NOSOTROS  </h4>
            </div>
            <div className={styles.sobreNosotrosArribaContainer}>

                <div className={styles.imagenContainer}>
                    <img src={logo} alt="logo" className={styles.imagen} />
                </div>
                <div className={styles.textoContainerArriba}>
                    <span>En Hierba Feliz, creemos que cada planta tiene el poder de transformar un espacio y conectar 
                        a las personas con la naturaleza. Nacimos de la pasión por el mundo vegetal y del deseo de crear 
                        un lugar donde cualquier persona—desde expertos hasta quienes empiezan su primera maceta—pueda 
                        encontrar inspiración, conocimiento y las plantas perfectas para su hogar o proyecto.</span>
                </div>
                <div className={styles.textoContainerAbajo}>
                    <span>Seleccionamos cuidadosamente cada una de nuestras especies, trabajando con viveros responsables y 
                        proveedores que comparten nuestro compromiso con la calidad y el respeto por el medio ambiente. 
                        Cada planta que llega a nuestra tienda pasa por un proceso de revisión para asegurar que esté sana, 
                        fuerte y lista para adaptarse a su nuevo hogar. Además, nos preocupamos por ofrecer variedades únicas y 
                        también aquellas clásicas que nunca fallan, siempre priorizando la sostenibilidad y la procedencia ética. 
                        Nuestro equipo, formado por amantes de la botánica, está disponible para brindarte asesoría personalizada, 
                        ayudarte a identificar las necesidades específicas de cada planta y orientarte para que elijas aquellas que se 
                        ajusten a tu espacio, tu estilo de vida y tu nivel de experiencia.</span>
                </div>
            </div>
        </main>
    )
}

export default SobreNosotros