import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CampaignStats from '../../components/CampaignStats/CampaignStats';
import DonorCarousel from '../../components/DonorCarousel/DonorCarousel';
import Contact from '../../components/Contact/Contact';
import DonationModal from '../../components/DonationModal/DonationModal';
import { getCampaign } from '../../services/api';
import './Home.css';

const Home = () => {
  const [campaignData, setCampaignData] = useState({
    totalGoal: 50000,
    totalDonated: 12500,
    remaining: 37500,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaignData();
  }, []);

  const fetchCampaignData = async () => {
    try {
      const response = await getCampaign();
      const { totalGoal, totalDonated } = response.data;
      setCampaignData({
        totalGoal,
        totalDonated,
        remaining: totalGoal - totalDonated,
      });
    } catch (error) {
      console.error('Error fetching campaign:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDonationSuccess = (donatedAmount) => {
    setCampaignData((prev) => {
      const newDonated = prev.totalDonated + donatedAmount;
      return {
        ...prev,
        totalDonated: newDonated,
        remaining: prev.totalGoal - newDonated,
      };
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div 
      className="home-page" 
      style={{ backgroundImage: "url('/img.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <Header />
      <main className="main-content">
        <div className="hero-section">
          <div className="hero-overlay">
            <div className="container">
              <h1 className="hero-title">Give a Child a Chance to Smile Again</h1>
              <p className="hero-subtitle">Your donation funds life-saving surgeries for children in need</p>
              <button className="help-now-btn" onClick={() => setIsModalOpen(true)}>
                Help Now ❤️
              </button>
            </div>
          </div>
        </div>
        
        <div className="container">
          <CampaignStats 
            totalGoal={campaignData.totalGoal}
            totalDonated={campaignData.totalDonated}
            remaining={campaignData.remaining}
          />
          <DonorCarousel />
          <Contact />
        </div>
      </main>
      <Footer />
      <DonationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDonationSuccess={handleDonationSuccess}
      />
    </div>
  );
};

export default Home;