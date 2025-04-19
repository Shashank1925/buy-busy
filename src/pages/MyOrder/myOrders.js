import { useNavbarHook } from "../customProvider";
import styles from "./myorder.module.css";
export default function MyOrders() {
    const { orders } = useNavbarHook();
    return (
        <>
            {orders.length > 0 ? (
                orders.map((order) => {
                    const orderTotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
                    return (
                        <div key={order.id} className={styles.order}>
                            <h1>Your Orders</h1>
                            <h2>Ordered On: {new Date(order.date).toLocaleString()}</h2>
                            <table border="1">
                                <thead>
                                    <tr className={styles.tableHeader}>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody className={styles.tableBody}>
                                    {order.items.map((item) => (
                                        <tr key={item?.id}>
                                            <td>{item?.title}</td>
                                            <td>{item?.price}</td>
                                            <td>{item?.quantity}</td>
                                            <td>{item?.price * item?.quantity}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={3}><strong>Order Total</strong></td>
                                        <td><strong>{orderTotal.toFixed(2)}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                        </div>
                    );
                })
            ) : (
                <p>No orders found</p>
            )}
        </>
    );
}
