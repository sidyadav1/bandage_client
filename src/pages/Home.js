import { useEffect, useRef, useState } from "react";
import { getProducts } from "../APIs/products";
import ProductItem from "../components/ProductItem";
import Loader from "../components/Loader";
import homeCss from "./Home.module.css";

const Home = () => {
    const offset = useRef(0);
    const alreadyFetched = useRef(false);

    const [products, setProducts] = useState([]);
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        const fetchProducts = () => {
            if (alreadyFetched.current) return;

            getProducts(offset)
                .then((result) => {
                    setProducts(result.data);
                })
                .finally(() => {
                    setTimeout(() => {
                        setIsloading(false);
                    }, 500);
                });

            alreadyFetched.current = true;
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={homeCss.homePage}>
            <div className={homeCss.homeContainer}>
                <div className={homeCss.products}>
                    {isLoading ? (
                        <div className={homeCss.loader}>
                            <Loader />
                        </div>
                    ) : (
                        products.map((product) => {
                            return (
                                <ProductItem
                                    product={product}
                                    key={product.id}
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
