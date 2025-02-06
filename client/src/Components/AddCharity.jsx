import React, { useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

const AddCharity = () => {

  const navigate = useNavigate();

  const [charityName, setCharityName] = useState('')
  const [objective, setObjective] = useState('')
  const [startDate, setStartDate] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    let result = await fetch('http://localhost:3000/addCharity', {
      method: 'post',
      body: JSON.stringify({
        charityName,
        objective,
        startDate
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if(result.ok)
    {
      result = await result.json();
      navigate("/viewCharity");
    }
  }


  return (
    <div>
      <Navbar />
      
      <form style={{ marginTop: "160px", width: "40%", marginLeft: "30%" }} onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>Add Charity</h1>
        <div className="mb-3">
          <label htmlFor="charityName" className="form-label">Name of Charity</label>
          <input type="text" className="form-control" id="charityName" value={charityName} onChange={(e) => setCharityName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="objective" className="form-label">Objective</label>
          <input type="text" className="form-control" id="objective" value={objective} onChange={(e) => setObjective(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Starting Date</label>
          <input type="date" className="form-control" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>

        <br />
        <button type="submit" className="btn btn-primary" style={{ marginLeft: "40%" }}>Add Charity</button>
      </form>
    </div>
  )
}

export default AddCharity
