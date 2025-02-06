import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DetailedSection = () => {
  const [charities, setCharities] = useState([]);
  const [selectedCharity, setSelectedCharity] = useState(null);

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const result = await fetch('http://localhost:3000/charities');
        const data = await result.json();
        setCharities(data);
      } catch (error) {
        console.error("Error fetching charities:", error);
      }
    };
    fetchCharities();
  }, []);

  // Prepare pie chart data
  const chartData = {
    labels: charities.map(charity => charity.charityName),
    datasets: [
      {
        label: 'Total Donations',
        data: charities.map(charity => charity.totalFunds),
        backgroundColor: [
          'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)',
          'rgb(75, 192, 192)', 'rgb(153, 102, 255)', 'rgb(255, 159, 64)'
        ],
        hoverOffset: 3
      }
    ]
  };

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center", marginTop: "100px" }}>Charity Details</h1>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "30px" }}>
        {charities.map((charity) => (
          <div
            key={charity._id}
            onClick={() => setSelectedCharity(charity)}
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              margin: "10px",
              width: "250px",
              textAlign: "center",
              backgroundColor: selectedCharity?._id === charity._id ? "#f0f0f0" : "white",
            }}
          >
            <h3>{charity.charityName}</h3>
            <p><strong>Funds Raised:</strong> ₹{charity.totalFunds}</p>
          </div>
        ))}
      </div>

      {/* Display selected charity details */}
      {selectedCharity && (
        <div style={{ marginTop: "50px", textAlign: "center", fontSize: "18px" }}>
          <h2>Details of {selectedCharity.charityName}</h2>
          <p><strong>Objective:</strong> {selectedCharity.objective}</p>
          <p><strong>Starting Date:</strong> {new Date(selectedCharity.startDate).toLocaleDateString()}</p>
          <p><strong>Funds Raised:</strong> ₹{selectedCharity.totalFunds}</p>
        </div>
      )}

      {/* Pie Chart for all charities */}
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>Total Donations Overview</h2>
      <div style={{ width: "30%", margin: "auto", height: "500px" }}>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default DetailedSection;
