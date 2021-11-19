import React from 'react';
import { Col, Row } from 'react-bootstrap';
import useOrders from '../../../hooks/useOrders';

const ManageAllOrders = () => {
    const { allOrders, setAllOrders } = useOrders();

    const handleUpdate = (id) => {
        const url = `https://whispering-tor-67182.herokuapp.com/updateOrder/${id}`;
        const findTour = allOrders.find(tour => tour._id === id);
        findTour.status = 'Approved'
        fetch(url, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(findTour)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    alert('Order Approved Successfull!')
                    //Find index of specific object using findIndex method.    
                    const objIndex = allOrders.findIndex((obj => obj._id === id));
                    allOrders[objIndex].status = 'Shipped'
                    //Update object's name property.
                    const updatedOrders = [...allOrders]
                    setAllOrders(updatedOrders)
                } else {
                    alert('Order already Approved!')
                }
            })

    }

    const handleDelete = (id) => {
        const url = `https://whispering-tor-67182.herokuapp.com/deleteProduct/${id}`;
        const proceed = window.confirm('Are You Sure! Want to delete? ')
        if (proceed) {
            fetch(url, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount) {
                        alert("Deleted Successfully!")
                        const remainingOrders = allOrders.filter(user => user._id !== id)
                        setAllOrders(remainingOrders)
                    }
                })
        }
    }
    return (
        <div className="container">
            <h2 className="fw-bold text-center pt-3 pb-2">Manage Orders</h2>
            <Col>
                {
                    allOrders.map(order => <Row className="order-row">
                        <div className="order-list">
                            <img className="order-image" src={order.img} alt="" />
                            <div className="description-area">
                                <h5 className="fw-bold">{order.name}</h5>
                                <h6 className="fw-bold text-danger">${order.price}</h6>
                                {
                                    <small className="status">Status: {order.status}</small>
                                }
                            </div>
                            <div className="manage-area">
                                <span onClick={() => handleUpdate(order._id)} className="text-success btn"><i class="fas fa-check-circle"></i></span>
                                <span onClick={() => handleDelete(order._id)} className="text-danger btn"><i class="fas fa-trash"></i></span>
                            </div>
                        </div>
                    </Row>)
                }
            </Col>

        </div >
    );
};

export default ManageAllOrders;