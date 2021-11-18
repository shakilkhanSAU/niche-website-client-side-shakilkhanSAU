import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useMyOrders = () => {
    const { user } = useAuth();
    const email = user.email;
    const [myOrders, setMyOrders] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/myOrders/${email}`)
            .then(res => res.json())
            .then(data => {
                setMyOrders(data)
            })
    }, [])
    return {
        myOrders,
        setMyOrders
    }
}
export default useMyOrders;