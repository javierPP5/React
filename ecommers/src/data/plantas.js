const plantasData = [
    {
        id: "1",
        nombre: "Costilla de Adán",
        nombreCientifico: "Monstera deliciosa",
        tipo: "Planta de interior / Hoja perenne",
        filtro: ["Planta de interior", "Hoja perenne", "Planta de regadio"],
        precio: "14.99",
        foto: "/images/adan.png",
        descripcion: "Planta tropical de gran porte ideal para interiores luminosos. Sus hojas perforadas dan un aspecto exótico y requieren riego moderado y buena humedad ambiental."
    },
    {
        id: "2",
        nombre: "Aloe Vera",
        nombreCientifico: "Asphodelaceae",
        tipo: "Planta de exterior / Hoja perenne",
        filtro: ["Planta de exterior", "Planta de secano", "Hoja perenne"],
        precio: "7.99",
        foto: "/images/aloe.jpg",
        descripcion: "Suculenta muy resistente que necesita poca agua y disfruta del sol directo. Conocida por sus propiedades medicinales y fácil mantenimiento."
    },
    {
        id: "3",
        nombre: "Lavanda",
        nombreCientifico: "Lavandula",
        tipo: "Planta de exterior / Hoja perenne",
        filtro: ["Planta de exterior", "Planta de secano", "Hoja perenne"],
        precio: "8.49",
        foto: "/images/lavanda.jpg",
        descripcion: "Aromática muy valorada por su perfume. Tolera bien la sequía y prospera en climas cálidos con mucha exposición solar."
    },
    {
        id: "4",
        nombre: "Girasol",
        nombreCientifico: "Helianthus annuus",
        tipo: "Planta de exterior / Hoja caduca",
        filtro: ["Planta de exterior", "Planta de secano", "Hoja caduca"],
        precio: "6.99",
        foto: "/images/girasol.jpg",
        descripcion: "Planta anual muy llamativa que sigue la trayectoria del sol. Requiere mucha luz y riego moderado sin exceso."
    },
    {
        id: "5",
        nombre: "Hierbabuena",
        nombreCientifico: "Menta Spicata",
        tipo: "Planta de exterior / Hoja perenne",
        filtro: ["Planta de exterior", "Planta de regadio", "Hoja perenne"],
        precio: "5.49",
        foto: "/images/menta.jpg",
        descripcion: "Aromática de crecimiento rápido ideal para infusiones y cocina. Necesita riego frecuente y semisombra para mantener sus hojas frescas."
    },
    {
        id: "6",
        nombre: "Anturio",
        nombreCientifico: "Anthurium",
        tipo: "Planta de interior / Hoja perenne",
        filtro: ["Planta de interior", "Hoja perenne", "Planta de regadio"],
        precio: "16.99",
        foto: "/images/anturio.jpg",
        descripcion: "Planta de interior muy decorativa con flores cerosas. Requiere humedad constante, luz indirecta y riego moderado."
    },
    {
        id: "7",
        nombre: "Tulipan",
        nombreCientifico: "Tulipa",
        tipo: "Planta de exterior / Hoja perenne",
        filtro: ["Planta de exterior", "Hoja caduca", "Planta de regadio"],
        precio: "7.49",
        foto: "/images/tulipan.jpg",
        descripcion: "Flor muy apreciada en primavera. Necesita frío en invierno, riego regular y exposición solar moderada."
    },
    {
        id: "8",
        nombre: "Arce japonés",
        nombreCientifico: "Acerpalmatum",
        tipo: "Planta de exterior / Hoja perenne",
        filtro: ["Planta de exterior", "Hoja caduca", "Planta de regadio"],
        precio: "24.99",
        foto: "/images/acerpalmatun.jpg",
        descripcion: "Árbol ornamental de hojas rojizas que cambian en otoño. Prefiere semisombra, suelos húmedos y riego constante sin encharcar."
    },
    {
        id: "9",
        nombre: "Hibisco",
        nombreCientifico: "Hibiscus",
        tipo: "Planta de exterior / Hoja perenne",
        filtro: ["Planta de exterior", "Planta de regadio", "Hoja perenne"],
        precio: "12.49",
        foto: "/images/hibisco.jpg",
        descripcion: "Produce flores grandes y tropicales. Necesita sol directo, riego abundante y buen drenaje."
    },
    {
        id: "10",
        nombre: "Laurel indio",
        nombreCientifico: "Ficus benjamina",
        tipo: "Planta de exterior / Hoja perenne",
        filtro: ["Planta de exterior", "Hoja perenne", "Planta de regadio"],
        precio: "13.99",
        foto: "/images/ficus.jpg",
        descripcion: "Arbusto de hoja brillante muy usado como ornamental. Requiere riego constante y buena luz para desarrollarse."
    },
    {
        id: "11",
        nombre: "Pacaya",
        nombreCientifico: "Chamaedorea Elegans",
        tipo: "Planta de exterior / Hoja perenne",
        filtro: ["Planta de interior", "Hoja perenne", "Planta de regadio"],
        precio: "10.99",
        foto: "/images/chamaedorea.jpg",
        descripcion: "Pequeña palmera muy resistente usada en interiores y exteriores con sombra. Necesita humedad y riego frecuente."
    },
    {
        id: "12",
        nombre: "Cactus erizo",
        nombreCientifico: "Kroenleinia grusoni",
        tipo: "Planta de exterior / Hoja perenne",
        filtro: ["Planta de exterior", "Planta de secano", "Hoja perenne"],
        precio: "13.49",
        foto: "/images/cactus.jpg",
        descripcion: "Cactus esférico muy popular. Requiere pleno sol y riego muy ocasional, siendo ideal para climas secos."
    },
    {
        id: "13",
        nombre: "Rosa de Damasco",
        nombreCientifico: "Rosa damascena",
        tipo: "Planta de exterior / Hoja perenne",
        filtro: ["Planta de exterior", "Hoja caduca", "Planta de regadio"],
        precio: "11.99",
        foto: "/images/flor.webp",
        descripcion: "Rosal muy fragante con pétalos utilizados en aceites y perfumes. Necesita sol directo y riego regular."
    },
    {
        id: "14",
        nombre: "Orquídea mariposa",
        nombreCientifico: "Phalaenopsis amabilis",
        tipo: "Planta de exterior / Hoja perenne",
        filtro: ["Planta de interior", "Hoja perenne", "Planta de regadio"],
        precio: "19.99",
        foto: "/images/orquidia.webp",
        descripcion: "Orquídea elegante con flores duraderas. Requiere humedad alta, luz suave y riego espaciado sin encharcar."
    },
    {
        id: "15",
        nombre: "Lirio blanco",
        nombreCientifico: "Lilium candidum",
        tipo: "Planta de exterior / Hoja perenne",
        filtro: ["Planta de exterior", "Planta de regadio", "Hoja caduca"],
        precio: "9.49",
        foto: "/images/lirio.jpg",
        descripcion: "Flor blanca muy aromática que resalta en cualquier jardín. Necesita riego frecuente y buena iluminación."
    },
    {
        id: "16",
        nombre: "Jazmín árabe",
        nombreCientifico: "Jasminum sambac",
        tipo: "Planta de exterior / Hoja perenne",
        filtro: ["Planta de exterior", "Planta de regadio", "Hoja perenne"],
        precio: "11.49",
        foto: "/images/jazminArabe.jpg",
        descripcion: "Planta trepadora muy aromática ideal para pérgolas y muros. Requiere sol abundante y riego moderado."
    },
    {
        id: "17",
        nombre: "Bambú común",
        nombreCientifico: "Bambusa vulgaris",
        tipo: "Planta de exterior / Hoja perenne",
        filtro: ["Planta de exterior", "Planta de regadio", "Hoja perenne"],
        precio: "18.99",
        foto: "/images/bambu.jpg",
        descripcion: "Planta de crecimiento rápido usada para crear pantallas naturales. Prefiere riego constante y buena luz."
    },
    {
        id: "18",
        nombre: "Helecho de Boston",
        nombreCientifico: "Nephrolepis exaltata",
        tipo: "Planta de exterior / Hoja perenne",
        filtro: ["Planta de interior", "Hoja perenne", "Planta de regadio"],
        precio: "10.49",
        foto: "/images/boston.jpg",
        descripcion: "Helecho muy frondoso ideal para ambientes húmedos. Necesita riego regular y evita el sol directo."
    }
]

export default plantasData;
