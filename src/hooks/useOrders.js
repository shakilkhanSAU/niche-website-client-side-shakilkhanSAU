import { useEffect, useState } from "react"

const useOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const url = 'https://warm-chamber-38340.herokuapp.com/allOrders';
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