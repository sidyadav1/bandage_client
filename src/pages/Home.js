import { useContext, useEffect } from "react";
import ProductItem from "../components/ProductItem";
import homeCss from "./Home.module.css";
import { UserContext } from "../context/UserContext";

const Home = () => {
    // const offset = useRef(0);
    // const alreadyFetched = useRef(false);
    const { products } = useContext(UserContext);

    // const [products, setProducts] = useState([]);
    // const [isLoading, setIsloading] = useState(false);

    // useEffect(() => {
    //     const fetchProducts = () => {
    //         if (alreadyFetched.current) return;

    //         getProducts(offset)
    //             .then((result) => {
    //                 setProducts(result.data);
    //             })
    //             .finally(() => {
    //                 setTimeout(() => {
    //                     setIsloading(false);
    //                 }, 500);
    //             });

    //         alreadyFetched.current = true;
    //     };
    //     fetchProducts();
    // }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={homeCss.homePage}>
            <div className={homeCss.homeContainer}>
                <div className={homeCss.products}>
                    {products.map((product) => {
                        return (
                            <ProductItem product={product} key={product.id} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;
