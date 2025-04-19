import { createContext, useContext, useEffect, useState } from "react";
import db from "../firebaseInit";
import { collection, onSnapshot, doc, setDoc, deleteDoc, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

const NavbarContext = createContext();
function useNavbarHook() {
    return useContext(NavbarContext);
}
function CustomProvider({ children }) {
    const [signIn, setSignIn] = useState(false);
    const [price, setPrice] = useState(0);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [orders, setOrders] = useState([]);
    // This method is for filter the search input

    const filteredProducts = data?.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (product.price <= price) &&
        // includes work on array so includes applied on selectedCategories not in product.category
        (selectedCategories.length === 0 || selectedCategories.includes(product.category))
    );

    const handleCheckbox = (e) => {
        const category = e.target.name;
        if (e.target.checked) {
            setSelectedCategories((prevState) => [...prevState, category]);
        } else {
            setSelectedCategories((prevState) => prevState.filter(item => item !== category));
        }
        toast.info("Filtered successfully!");

    };
    const handleAddingCart = async (id) => {
        const product = data?.find((prod) => prod.id === id);
        if (!product) return;
        const auth = getAuth();
        const userId = auth.currentUser?.uid;
        if (!userId) return alert("Please login to add items to cart");
        const alreadyExists = cart.some(item => item.id === id);
        if (alreadyExists) {
            setCart(prev => prev.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            ));
            const cartItemRef = doc(db, "cart", userId, "items", product.id);
            await setDoc(cartItemRef, { ...product, quantity: product.quantity + 1 });
            toast.success("Already added  successfully!");
        }
        else {
            setCart(prev => [...prev, { ...product, quantity: 1 }]);
            const cartItemRef = doc(db, "cart", userId, "items", product.id);
            await setDoc(cartItemRef, { ...product, quantity: 1 });
            toast.success("Added  successfully!");
        }

    }
    // This is for calculating the total price of the cart
    useEffect(() => {
        const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);
        setTotal(totalPrice);
    }, [cart]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
            // here id:doc.id is put after spread operators as right side in js dominate on left
            const productArray = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            console.log(productArray)
            setData(productArray);
        }, (error) => {
            console.error("Error fetching real-time products:", error);
        });
        return () => unsubscribe();
    }, []);


    useEffect(() => {
        const auth = getAuth();
        const userId = auth.currentUser?.uid;
        if (!userId) return;
        const userCartRef = collection(db, "cart", userId, "items");

        const unsubscribe = onSnapshot(userCartRef, (snapshot) => {
            const cartArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setCart(cartArray);
        }, (error) => {
            console.error("Error loading cart:", error);
        });

        return () => unsubscribe();
    }, []);
    // This method is for decreasing the quantity of product but not less than 1
    const handleDecrease = async (id) => {
        const product = cart.find((prod) => prod.id === id);
        if (!product) return;
        let quantity = Number(product.quantity)
        if (quantity <= 1) return;
        const auth = getAuth();
        const userId = auth.currentUser?.uid;
        if (!userId) return alert("Please login to add items to cart");
        const cartItemRef = doc(db, "cart", userId, "items", product.id);
        const updatedCart = cart.map((item) => {
            if (item.id === id) {
                if (quantity === 1) {
                    return { ...item, quantity: quantity };
                }
                return { ...item, quantity: quantity - 1 };
            }
            return item;
        });
        setCart(updatedCart);
        await setDoc(cartItemRef, { ...product, quantity: quantity - 1 });
    }
    // This is the method of increasing the quantity of product
    const handleIncrease = async (id) => {
        const product = cart.find((prod) => prod.id === id);
        if (!product) return;
        let quantity = Number(product.quantity)
        const auth = getAuth();
        const userId = auth.currentUser?.uid;
        if (!userId) return alert("Please login to add items to cart");
        const cartItemRef = doc(db, "cart", userId, "items", product.id);
        const updatedCart = cart.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: quantity + 1 };
            }
            return item;
        });
        setCart(updatedCart);
        await setDoc(cartItemRef, { ...product, quantity: quantity + 1 });
    };
    // This is the method for removing the product from the cart
    const handleRemove = async (id) => {
        const prodIndex = cart.findIndex((prod) => prod.id === id);
        if (prodIndex === -1) return;
        const updatedCart = [...cart];
        updatedCart.splice(prodIndex, 1);
        setCart(updatedCart);
        const auth = getAuth();
        const userId = auth.currentUser?.uid;
        if (!userId) return alert("Please login to add items to cart");
        const cartItemRef = doc(db, "cart", userId, "items", id);
        await deleteDoc(cartItemRef)
        toast.warn("Removed from Cart successfully!");

    };
    const handleOrders = async () => {
        const auth = getAuth();
        const userId = auth.currentUser?.uid;
        const orders = {
            items: cart,
            date: new Date(),
        };
        const ordersRef = collection(db, "orders", userId, "userOrders");
        await addDoc(ordersRef, orders);
        setOrders((prev) => [...prev, orders]);
        setCart([]);
        setTotal(0);
        toast.success("Ordered successfully!");
    }
    console.log(orders);
    useEffect(() => {
        const auth = getAuth();
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const unsub = onSnapshot(collection(db, "orders", userId, "userOrders"), (snapshot) => {
            const fetchedOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOrders(fetchedOrders);
        });
        return () => unsub();
    }, []);


    return (
        <NavbarContext.Provider value={{ signIn, setSignIn, price, setPrice, data, searchTerm, setSearchTerm, filteredProducts, handleCheckbox, handleAddingCart, cart, handleDecrease, handleIncrease, handleRemove, total, handleOrders, orders }}>
            {children}
        </NavbarContext.Provider>
    );
}
export { useNavbarHook, CustomProvider };
