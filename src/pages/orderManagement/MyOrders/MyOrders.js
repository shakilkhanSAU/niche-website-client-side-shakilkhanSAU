import { Row, Col, Card } from 'react-bootstrap';
import useMyOrder from '../../../hooks/useMyOrder';
import './MyOrders.css'


const MyOrders = () => {
    const { orders, setOrders } = useMyOrder();
    const handleDelete = (id) => {
        const proceed = window.confirm('Are You Sure! Want to delete? ')
        if (proceed) {
            const url = `https://warm-chamber-38340.herokuapp.com/deleteProduct/${id}`;
            fetch(url, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        alert("Deleted Successfully!")
                        const remainingOrders = orders.filter(user => user._id !== id)
                        setOrders(remainingOrders)
                    }
                })
        }
    }
    return (
        <div className="container pb-5">
            <h2 className="fw-bold text-center pt-3 pb-2">My Orders</h2>
            <Row xs={1} md={3} className="g-5">
                {
                    orders.map(order =>
                        <Col>
                            <div className="service-card">
                                <Card.Img variant="top" src={order.img} />
                                <Card.Body>
                                    <div className="body-text pe-4">
                                        <h3 className="fw-bold">{order.title}</h3>
                                        <h4 className="fw-bold">${order.price}</h4>
                                        <p>{order.status}</p>
                                        <p>{order.description.slice(0, 90)}....</p>
                                        <button className="mb-2 me-2 btn-details" onClick={() => handleDelete(order._id)}>Delete</button>
                                    </div>
                                </Card.Body>
                            </div>
                        </Col>



                    )
                }
            </Row>
        </div>
    );
};

export default MyOrders;