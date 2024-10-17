import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 
import { addDoc, collection, Timestamp } from 'firebase/firestore'; // Firestore functions
import { db } from '../../Firebase';
import { Modal, Button ,Form} from 'react-bootstrap';

const ReviewModal = ({ show, handleClose, bookingId, vendorId, serviceName }) => {
    const [starArray, setStarArray] = useState([false, false, false, false, false]);
    const [ratings, setRatings] = useState('');
    const [reviews, setReviews] = useState('');
    const userId = sessionStorage.getItem("userId");

    const handleForm = async (e) => {
        e.preventDefault();
        
        if (!userId) {
            toast.error("Please Login!!");
            return;
        }
        
        let data = {
            user: userId,
            bookingId: bookingId,
            serviceName: serviceName,
            vendorId: vendorId,
            ratings: ratings,
            reviews: reviews,
            created: Timestamp.now(),
            status: "False"
        };

        try {
            await addDoc(collection(db, "Reviews"), data);
            toast.success("Review added successfully!!");
            handleClose();
        } catch (error) {
            toast.error("Error adding review.");
        } finally {
            setReviews("");
            setRatings([false, false, false, false, false]);
        }
    };

    const noteRating = (count) => {
        let arr = [];
        for (let i = 0; i < 5; i++) {
            if (i < count) arr.push(true);
            else arr.push(false);
        }
        setStarArray(arr);
        setRatings(count);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                              
                                <form onSubmit={handleForm}>
                                <Form.Group controlId="formReview">
                                   <Form.Label>Rating</Form.Label>
                                       
                                     
                                        {starArray.map((data, i) => (
                                            <span key={i}>
                                                {data ? 
                                                    <i className="bi bi-star-fill text-warning" onClick={() => noteRating(i + 1)}></i>
                                                    :
                                                    <i className="bi bi-star" onClick={() => noteRating(i + 1)}></i>
                                                }
                                            </span>
                                        ))}
                                   
                                </Form.Group>
                                  
                                 <Form.Group controlId="formRating">
                                  <Form.Label>Review</Form.Label>
                                
                                        <input
                                            className='form-control w-75'
                                            type="text"
                                            value={reviews}
                                            onChange={(e) => setReviews(e.target.value)}
                                            placeholder="Enter Review"
                                            required
                                        />
                             
                                  </Form.Group>
                                   
                                  <Modal.Footer>
                                  <Button variant="secondary" onClick={handleClose}>
                                    Close
                                    </Button>
                                    <Button variant="primary" type='submit'>
                                    Submit Review
                                    </Button>
                                    </Modal.Footer>
             
                                </form>
            </Modal.Body>
        {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type='submit'>
          Submit Review
        </Button>
      </Modal.Footer> */}
        </Modal>
    );
};

export default ReviewModal;

