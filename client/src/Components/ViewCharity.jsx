import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'

const ViewCharity = () => {

  const [charities, setCharities] = useState([])

  useEffect(() => {

    const fetchCharities = async () => {
      const result = await fetch('http://localhost:3000/charities');
      const data = await result.json();
      setCharities(data);
    };

    fetchCharities();
  }, []);

  return (
    <div>
      <Navbar />

      <div style={{ marginTop: "150px", marginLeft: "20px", display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {
          charities.map((charity) => (
            <div key={charity._id} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <p className="card-text"><strong>Name:</strong> {charity.charityName} </p>
                <p className="card-text"><strong>Objective :</strong> {charity.objective}</p>
                <p className="card-text"><strong>Starting Date : </strong> {new Date(charity.startDate).toLocaleDateString()}</p>
                <p className="card-text"><strong>Funds raised : </strong> &#8377;{charity.totalFunds}</p>
                <a href="/detailedSection" className="btn btn-primary">View More</a>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ViewCharity