import { useEffect, useState } from 'react';

const useProducts = () => {
    const [services, setServices] = useState()
    const url = "http://localhost:5000/products"
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setServices(data)
                console.log(data)
            })
    }, []);
    return {
        services
    }
}
export default useProducts;