# Intalar router dom
## npm i react-router-dom

# LIBRERÍA REACT ROUTER DOM

## Documentación:

- https://reactrouter.com/home
- Modo declarativo: https://reactrouter.com/start/declarative/routing

## instalación de la libreria react-router-dom

- npm install react-router-dom

## Componentes:

- BrowserRouter => para especificar el ámbito de las rutas definidas en App, sobre mi arbol de componentes.
- Routes, Route => para definir las rutas en modo declarativo
- Outlet => Cuando definimos rutas anidadas, porque queremos que hereden partes de un template/bigLayout/rootLayout, pues es importante especificar en el template en que parte del mismo se inyectara cada una de las rutas anidadas, pues para eso especificamos outlet.
- Link, NavLink => para crear el nav del header con los links entre paginas, pues esos hipervinculos se definen con Link, o si quieres saber cual es el enlace activo para estilarlo pues con NavLink

## Hooks

- useNavigate => para cuando quieres desde un evento (por ejemplo onClick) redireccionar a otra vista pues usamos ese señor o hook.
- useParams => vale, este es super importante, este es cuando quieres pasar algún parámetro desde una página a otra, porque necesitas saber, por ejemplo, cuando el usuario pulsa en una card, y va a la vista de detalles de la misma, pues necesitas pasar en esa redirección de la vista catálogo a la vista detalles pues necesitas pasar por url el id de la card que ha pulsado para poder mostrar sus datos en la vista detalles.

## Rutas protegidas:

- Envolver la ruta con un PrivateRoute haciendo uso de children

# ICONOS REACT

## Lucide react

npm i lucide-react
https://lucide.dev/icons/

## React icons:

npm i react-icons
https://react-icons.github.io/react-icons/

## Iconify:

npm install @iconify/react
https://icon-sets.iconify.design/

# ESTILOS GLOBALES Y LOCALES CSS - MODULES CSS:

## Estilos globales:

- Un fichero de globales con los colores
- Un fichero de reusables con clases reusables

## Estilos locales:

- Un modulo CSS por cada componente JSX

# CHILDREN versus PROPS - REUSABILIDAD AL MÁXIMO

- Ejemplo de componentes button y card hechos con children y props.

# IMÁGENES DESDE PUBLIC versus DESDE SOURCE

SI van a cambiar mucho pues usas en assets para que se empaqueten en cada build, el import ya será relativo no absoluto

    ```React

    Imágenes en public: path absoluto
    <img src="/images/logo.png" alt="Logo" />


    Imágenes en assets: path relativo - requiere import
    import logo from './assets/logo.png'
    <img src={logo} alt="Logo" />
    ```

## CALLBACK - PASAO DE PARÁMETROS EN EVENTOS

# Diferencia entre llamar a una función desde un evento o poner una referencia a la misma

- desde un onClick tu solo puedes poner una referencia a la función por ejemplo handleOnClick, porque si le pones la llamada handleOnClick(), pues se ejecutaría en el momento, y solo queremos que se ejecute cuando se de el evento

  ```React
  onClick={handleClick}
  onClick={handleClick()}
  ```

## Teniendo en cuenta eso, pues modo de pasar parámetros correctamente a una función desde un evento

- entonces claro, si le quieres pasar un parámetro, como es una referencia y no una llamada, no puedes, para eso se usan los callback (funciones flecha), llamas esa función dentro de un callback, entonces ya es una llamada y no una referencia, ya le puedes pasar parámetros, pero esa llamada ocurre dentro un callback, esto hace que no se ejecute hasta que se de el evento.

  ```React
  onClick={() => {
              handleDetail(item.id);
              }}
  ```

# ARROW FUNCTIONS: RETURN IMPLÍCITO vs EXPLÍCITO

    ```React
    <NavLink
    to="/contacto"
    className={({ isActive }) => (isActive && styles.active)}

    > Contacto
    > </NavLink>
    ```

    ```React
    <NavLink
    to="/contacto"
    className={({ isActive }) => { return isActive && styles.active }}

    > Contacto
    > </NavLink>
    ```