import { useEffect, useState } from 'react';

const useProduct = () => {
    const [tours, setTours] = useState([])
    const url = "https://warm-chamber-38340.herokuapp.com/services"
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setTours(data)
            })
    }, []);
    return {
        tours
    }
}
export default useProduct;