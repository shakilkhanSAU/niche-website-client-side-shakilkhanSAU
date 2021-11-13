import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useMyOrder = () => {
    const { user } = useAuth();
    const email = user.email;
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch(`https://warm-chamber-38340.herokuapp.com/myOrders/${email}`)
            .then(res => res.json())
            .then(data => {
                setOrders(data)
            })
    }, [email])
    return {
        orders,
        setOrders
    }
}
export default useMyOrder;