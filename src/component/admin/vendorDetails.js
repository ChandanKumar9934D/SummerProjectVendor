import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const VendorDetailsModal = ({ show, onHide, vendorDetails }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Vendor Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {vendorDetails ? (
          <>
             <img src={vendorDetails?.data?.image} alt={vendorDetails?.data?.Servicename} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
             <h4 className='mt-3'><strong>{vendorDetails?.data?.Vendorcategory}</strong></h4>
            <p><strong>Name:</strong> {vendorDetails?.data?.Vendorname}</p>
            <p><strong>Email:</strong> {vendorDetails?.data?.Vendoremail}</p>
            <p><strong>Contact:</strong> {vendorDetails?.data?.Vendorcontact}</p>
            {/* Add more vendor details as required */}
          </>
        ) : (
          <p>No details available</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VendorDetailsModal;
