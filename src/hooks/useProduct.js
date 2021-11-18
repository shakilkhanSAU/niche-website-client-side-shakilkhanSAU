import { useEffect, useState } from 'react';

const useProducts = () => {
    const [products, setProducts] = useState()
    const url = "http://localhost:5000/products"
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