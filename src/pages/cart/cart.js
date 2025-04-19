import styles from "./cart.module.css";
import { useNavbarHook } from '../customProvider'
import positive from "../../images/positive.png";
import negative from "../../images/negative.png";
import { NavLink } from "react-router-dom";
export default function Cart() {
    const { handleDecrease, handleIncrease, handleRemove, cart, total, handleOrders } = useNavbarHook()
    return (

        <div className={styles.Cart}>
            <div className={styles.fixed}>
                <h2 className={styles.heading}>Total Price:{total}</h2>
                <NavLink to="myOrders" style={{ textDecoration: "none" }}>
                    <button className={styles.button} onClick={handleOrders}>Purchase</button>
                </NavLink>
            </div>
            <div className={styles.products}>
                {cart ? (cart.length > 0) ? (
                    cart.map((prod) => (
                        < div className={styles.product} key={prod.id} >
                            <img
                                src={prod.image}
                                alt={prod.title}
                                style={{ width: "15rem", height: "18rem", margin: "1rem 2rem" }}
                            />
                            <span className={styles.span}>{prod.title}</span>
                            <div className={styles.quantity}>
                                <span className={styles.span}>₹ {prod.price}</span>
                                <img src={negative} alt="-" className={styles.negative} onClick={() => { handleDecrease(prod.id) }} />
                                <p>{prod.quantity}</p>
                                <img src={positive} alt="+" className={styles.positive} onClick={() => { handleIncrease(prod.id) }} />
                            </div>
                            <button className={styles.button} onClick={() => { handleRemove(prod.id) }}>Remove From Cart</button>
                        </div>))) : <p className={styles.empty}>No product in cart</p> : null}
            </div>
        </div >

    )
}