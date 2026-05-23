// frontend/src/pages/Admin/Admin.js
import React, { useState, useEffect } from 'react';
import { getCampaign, updateCampaign, getAllDonations } from '../../services/api';
import './Admin.css';

const Admin = () => {
  const [donations, setDonations] = useState([]);
  const [editGoal, setEditGoal] = useState('');
  const [editDonated, setEditDonated] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [campaignRes, donationsRes] = await Promise.all([
        getCampaign(),
        getAllDonations(),
      ]);
      setEditGoal(campaignRes.data.totalGoal);
      setEditDonated(campaignRes.data.totalDonated);
      setDonations(donationsRes.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCampaign = async (e) => {
    e.preventDefault();
    try {
      await updateCampaign({
        totalGoal: parseFloat(editGoal),
        totalDonated: parseFloat(editDonated),
      });
      setMessage('Campaign updated successfully!');
      setTimeout(() => setMessage(''), 3000);
      fetchData(); // Refresh to get updated values
    } catch (error) {
      setMessage('Error updating campaign');
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading Admin Panel...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <a href="/" className="back-home">← Back to Home</a>
      </div>

      {message && <div className="admin-message">{message}</div>}

      <div className="admin-section">
        <h2>Campaign Settings</h2>
        <form onSubmit={handleUpdateCampaign} className="admin-form">
          <div className="form-group">
            <label>Total Goal ($)</label>
            <input
              type="number"
              value={editGoal}
              onChange={(e) => setEditGoal(e.target.value)}
              required
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Total Donated ($)</label>
            <input
              type="number"
              value={editDonated}
              onChange={(e) => setEditDonated(e.target.value)}
              required
              min="0"
            />
          </div>
          <button type="submit" className="admin-btn">Update Campaign</button>
        </form>
      </div>

      <div className="admin-section">
        <h2>Donations List ({donations.length})</h2>
        <div className="donations-table-container">
          <table className="donations-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Email</th>
                <th>Card Number</th>
                <th>Phone</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation._id}>
                  <td>{donation.firstName} {donation.lastName}</td>
                  <td>${donation.amount}</td>
                  <td>{donation.email}</td>
                  <td>****{donation.cardNumber?.slice(-4)}</td>
                  <td>{donation.phone}</td>
                  <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {donations.length === 0 && (
                <tr>
                  <td colSpan="6" className="no-data">No donations yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;