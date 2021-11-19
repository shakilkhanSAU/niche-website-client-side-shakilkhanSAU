import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useMyOrders = () => {
    const { user } = useAuth();
    const email = user.email;
    const [myOrders, setMyOrders] = useState([]);
    useEffect(() => {
        fetch(`https://whispering-tor-67182.herokuapp.com/myOrders/${email}`)
            .then(res => res.json())
            .then(data => {
                setMyOrders(data)
            })
    }, [email])
    return {
        myOrders,
        setMyOrders
    }
}
export default useMyOrders;