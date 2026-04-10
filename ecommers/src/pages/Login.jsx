import styles from "./Login.module.css"
import SignInForm from '../components/SignInForm'

function Login() {
    return (
        <main className={styles.main}>
            <SignInForm />
        </main>
    )
}

export default Login