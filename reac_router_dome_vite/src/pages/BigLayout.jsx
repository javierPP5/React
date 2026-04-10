import Footer from "../components/Footer"
import Header from "../components/Header"
import {Outlet} from "react-router-dom"
import style from "./bigLayout.module.css"

function BigLayout() {
    return (
        <div className={style.container}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default BigLayout;