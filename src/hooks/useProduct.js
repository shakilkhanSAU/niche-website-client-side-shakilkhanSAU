import { useEffect, useState } from 'react';

const useProducts = () => {
    const [products, setProducts] = useState()
    const url = "https://whispering-tor-67182.herokuapp.com/products"
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }, []);
    return {
        products
    }
}
export default useProducts;