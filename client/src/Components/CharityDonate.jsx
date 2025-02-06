import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'

const CharityDonate = () => {

  const [charityName, setCharityName] = useState('');
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const values = { charityName, donorName, amount };

    try {
      const response = await fetch('http://localhost:3000/donateCharity', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      // const data = await response.json();

      if (response.status === 200 || response.status === 201) {
        alert("Money donated successfully");
        navigate("/");
      }
      else if (response.status === 409) {
        alert("Money donated successfully");
        navigate("/login");
      }
      else {
        alert("Something went wrong. Please try again");
      }

    }
    catch (error) {
      console.err("Error:", error);
      alert("Failed to donate. Please try again.");
    }

  }


  return (
    <div>
      <Navbar />

      <form style={{ marginTop: "160px", width: "40%", marginLeft: "30%" }} onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>Donate to Charity</h1>
        <br />

        <div className="mb-3">
          <label htmlFor="charityName" className="form-label">Name of Charity</label>
          <input type="text" className="form-control" id="charityName" value={charityName} onChange={(e) => setCharityName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="donorName" className="form-label">Name of donor</label>
          <input type="text" className="form-control" id="donorName" value={donorName} onChange={(e) => setDonorName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="number" className="form-label">Amount</label>
          <input type="number" className="form-control" id="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>

        <br />
        <button type="submit" className="btn btn-success" style={{ marginLeft: "40%" }}>Donate Money</button>
      </form>

    </div>
  )
}

export default CharityDonate
