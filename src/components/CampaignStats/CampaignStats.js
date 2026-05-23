import React from 'react';
import './CampaignStats.css';

const CampaignStats = ({ totalGoal, totalDonated, remaining }) => {
  const percentage = totalGoal > 0 ? (totalDonated / totalGoal) * 100 : 0;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>🎯 Total Goal</h3>
        <div className="stat-amount">${totalGoal.toLocaleString()}</div>
      </div>
      <div className="stat-card">
        <h3>❤️ Donated So Far</h3>
        <div className="stat-amount">${totalDonated.toLocaleString()}</div>
      </div>
      <div className="stat-card">
        <h3>⭐ Remaining</h3>
        <div className="stat-amount">${remaining.toLocaleString()}</div>
      </div>
      <div className="progress-section">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
        </div>
        <p className="progress-text">{percentage.toFixed(1)}% Funded</p>
      </div>
    </div>
  );
};

export default CampaignStats;