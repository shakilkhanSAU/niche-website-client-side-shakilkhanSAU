import { useEffect, useState } from "react"

const useOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const url = 'http://localhost:5000/allOrders';
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setAllOrders(data))
    }, [])

    return {
        allOrders,
        setAllOrders
    }
}
export default useOrders;