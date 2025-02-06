import React, { useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import "./styles.css"

const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const values = { email, password, confirmPassword, role };
    // console.log(values);

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (response.status === 200 || response.status === 201) {
        alert(data.message);
        navigate("/login");
      }
      else if (response.status === 409) {
        alert(data.message);
        navigate("/login");
      }
      else {
        alert("Something went wrong. Please try again");
      }

    }
    catch (error) {
      console.err("Error:", error);
      alert("Failed to register. Please try again.");
    }
  }


  return (
    <div>
      <Navbar />
      <section className="p-3 p-md-4 p-xl-5" style={{ marginTop: "50px" }}>
        <div className="container">
          <div className="card border-light-subtle shadow-sm">
            <div className="row g-0">
              <div className="col-12 col-md-6">
                <img className="img-fluid rounded-start w-100 h-100 object-fit-cover" src="https://media.istockphoto.com/id/1463013729/photo/online-registration-form-for-modish-form-filling.jpg?s=612x612&w=0&k=20&c=Fnx06haU4IHYLcRpy9Po_TBknvBqVjicGuUWkGu8e6Y=" alt='' />
              </div>
              <div className="col-12 col-md-6">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-5">
                        <h3>Register</h3>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={submitHandler}>
                    <div className="row gy-3 gy-md-4 overflow-hidden">
                      <div className="col-12">
                        <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                        <input type="email" className="form-control" name="email" id="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                      <div className="col-12">
                        <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
                        <input type="password" className="form-control" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                      </div>
                      <div className="col-12">
                        <label htmlFor="confirm-password" className="form-label">Confirm Password <span className="text-danger">*</span></label>
                        <input type="password" className="form-control" name="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                      </div>
                      <div className="col-12">
                        <label htmlFor="role" className="form-label">Role <span className="text-danger">*</span></label>
                        <select name="role" id="role" className='form-control' value={role} onChange={(e) => setRole(e.target.value)} >
                          <option defaultValue={'-- Select an option --'}>-- Select an option --</option>
                          <option value="donor">Donor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <br />
                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn bsb-btn-xl btn-primary" type="submit">Register</button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-12">
                      <hr className="mb-4 border-secondary-subtle" />
                      <div className="d-flex gap-md-4 flex-row flex-md-row align-items-center justify-content-center">
                        <a href="/login" className="link-secondary text-decoration-none" id="login-link">Already a member</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Register
