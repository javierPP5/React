import styles from './Login.module.css'
import SignInForm from '../components/SignInForm'
import SignUpForm from '../components/SignUpForm'
function Login() {
    return (
        <main className={styles.main}>
            <h1>Login</h1>
            <SignInForm />
            <h1>Registro</h1>
            <SignUpForm />
        </main>
    )
}

export default Login