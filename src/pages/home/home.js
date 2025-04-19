import styles from './home.module.css'
import { useNavbarHook } from '../customProvider'
import bagImg from '../../images/bag.jpg'
const style = { transform: "scale(1.5)", margin: ".7rem" }
export default function Home() {
    const { price, setPrice, data, setSearchTerm, filteredProducts, handleCheckbox, handleAddingCart } = useNavbarHook();
    return (
        <div className={styles.home}>
            <div className={styles.header}>
                <h1>Filter</h1>
                <label htmlFor="price">Price: ₹ {price}</label>
                <br />
                <input type="range" min="0" max="1000" id="price" value={price} onChange={(e) =>
                    setPrice(e.target.value)
                } className={styles.range} />
                <h2>Category</h2>
                <div className={styles.checkbox}>
                    <input type="checkbox" id="men" style={style} name="men's clothing"
                        onChange={handleCheckbox}
                    />
                    <label htmlFor="men">Men's Clothing</label>
                </div>
                <div className={styles.checkbox}>
                    <input type="checkbox" id="women" style={style} name="women's clothing" onChange={handleCheckbox} />
                    <label htmlFor="women">Women's Clothing</label>
                </div>
                <div className={styles.checkbox}>
                    <input type="checkbox" id="jewellery" style={style} name="jewelery" onChange={handleCheckbox} />
                    <label htmlFor="jewellery">Jewellery</label>
                </div>
                <div className={styles.checkbox}>
                    <input type="checkbox" id="electronics" style={style} name="electronics" onChange={handleCheckbox} />
                    <label htmlFor="electronics">Electronics</label>
                </div>
            </div>
            <div className={styles.group}>
                <div className={styles.searchDiv}>
                    <input type="text" placeholder="Search By Name" className={styles.search} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className={styles.products}>
                    {filteredProducts?.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div className={styles.product} key={product.id}>
                                <img
                                    src={product.image || bagImg}
                                    alt=""
                                    style={{ width: "15rem", height: "20rem", margin: "1rem 2rem" }}
                                />
                                <span className={styles.span}>{product.title}</span>
                                <span className={styles.span}>₹ {product.price}</span>
                                <button className={styles.button} onClick={() => handleAddingCart(product.id)}>Add to Cart</button>
                            </div>
                        ))
                    ) :
                        data.map((product) => (
                            <div className={styles.product} key={product.id}>
                                <img src={product.image || bagImg} alt="" style={{ width: "15rem", height: "20rem", margin: "1rem 2rem" }} />
                                <span className={styles.span}>{product.title}</span>
                                <span className={styles.span}>₹ {product.price}</span>
                                <button className={styles.button} onClick={() => handleAddingCart(product.id)}>Add to Cart</button>
                            </div>))
                    }
                </div>
            </div>
        </div>

    )
}