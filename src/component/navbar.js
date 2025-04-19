import styles from './navbar.module.css'
import { useNavbarHook } from '../pages/customProvider'
import { NavLink, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify';
export default function Navbar() {
    const { signIn, setSignIn } = useNavbarHook();
    return (
        <>
            <div className={styles.navbar}>
                <NavLink className={styles.buy} to="/">Busy Buy</NavLink>
                <div className={styles.navItems}>
                    <div className={styles.homeGroup}>
                        <NavLink className={styles.text} style={({ isActive }) => (isActive ? { color: "Red" } : undefined)} to="/">
                            <img src={require("../../src/images/home.png")} alt="home" className={styles.home} />
                            <span> Home</span>
                        </NavLink>
                    </div>
                    {signIn && <>
                        <div className={styles.orderGroup}>
                            <NavLink className={styles.text} style={({ isActive }) => (isActive ? { color: "Red" } : undefined)} to="cart/myOrders">
                                <img src={require("../../src/images/order.png")} alt="order" className={styles.order} />
                                <span>MyOrders</span>
                            </NavLink>
                        </div>
                        <div className={styles.cartGroup}>
                            <NavLink className={styles.text} style={({ isActive }) => (isActive ? { color: "Red" } : undefined)} to="cart">
                                <img src={require("../../src/images/cart.png")} alt="cart" className={styles.cart} />
                                <span>Cart</span>
                            </NavLink>
                        </div>
                    </>
                    }
                    <div className={styles.signInGroup}>
                        {signIn ? <NavLink style={({ isActive }) => (isActive ? { color: "Red" } : undefined)} to="signin" className={styles.text} onClick={() => {
                            setSignIn(!signIn);
                            toast.warn(`Your are Logged Out`);

                        }}
                        >
                            <img src={require("../../src/images/logout.png")} alt="home" className={styles.signIn} />
                            <span className={styles.span}>Logout</span>
                        </NavLink> :
                            <NavLink style={({ isActive }) => (isActive ? { color: "Red" } : undefined)} to="signin" className={styles.text}>
                                <img src={require("../../src/images/SignIn.png")} alt="home" className={styles.signIn} />
                                <span className={styles.span}>SignIn</span>
                            </NavLink>}
                    </div>
                </div>
            </div >
            <Outlet />
        </>
    )
}