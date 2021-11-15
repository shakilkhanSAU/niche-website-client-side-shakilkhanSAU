import { useEffect, useState } from "react";

const useReviews = () => {
    const [reviews, setReviews] = useState();
    const url = "http://localhost:5000/reviews";
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setReviews(data)
            })
    }, [])
    return {
        reviews
    }
}

export default useReviews;