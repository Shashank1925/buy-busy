import style from './signin.module.css'
import { Link } from 'react-router-dom'
import { useCustomSignInHook } from './customSignInProvider';
import { useNavbarHook } from '../customProvider';
import { useNavigate } from 'react-router-dom';
export default function SignIn() {
    const { handleSignIn, email, password, setEmail, setPassword } = useCustomSignInHook();
    const { signIn, setSignIn } = useNavbarHook();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignIn();
        if (signIn) {
            setSignIn(!signIn);
        }
        // It is been used to navigate to home page after sign in
        navigate('/');
    }
    return (
        <div className={style.signIn}>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="Enter Email" required className={style.email} value={email} onChange={(e) => setEmail(e.target.value)}
                /><br />
                <input placeholder="Enter Password" required className={style.password} value={password} onChange={(e) => setPassword(e.target.value)} type='password'
                /><br />
                <button className={style.button} type="submit">SignIn</button>
            </form>
            <p>Don't have an account? <Link to="/signup" style={{ textDecoration: "none", fontSize: "Large" }}>Sign Up</Link></p>
        </div>
    )
}
export function SignUp() {
    const { handleSignUp, setEmail, setPassword } = useCustomSignInHook();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSignUp();
        // it is been used to navigate to sign in page after sign up
        navigate('/signin');
    };
    return (
        <div className={style.signIn}>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder='Enter Name' required className={style.name} onChange={(e) => setEmail(e.target.value)} type='text' /><br />
                <input placeholder="Enter Email" required className={style.email} onChange={(e) => setEmail(e.target.value)} type='email' /><br />
                <input placeholder="Enter Password" required className={style.password} onChange={(e) => setPassword(e.target.value)} type="password" /><br />
                <button className={style.button} type="submit">SignUp</button>
            </form>
            <p>Already have an account? <Link to="/signin" style={{ textDecoration: "none", fontSize: "Large" }}>Sign In</Link></p>
        </div >
    )
}