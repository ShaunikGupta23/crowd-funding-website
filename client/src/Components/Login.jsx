import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const values = { email, password, role };
    // console.log(values);

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      console.log(response);


      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        navigate("/");
      }
      else {
        console.log(data.message);

        alert(data.message || "Login failed!")
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
                <img className="img-fluid rounded-start w-100 h-100 object-fit-cover" src="https://cdni.iconscout.com/illustration/free/thumb/free-man-working-on-laptop-illustration-download-in-svg-png-gif-file-formats--using-male-people-illustrations-4243574.png?f=webp" alt='' />
              </div>
              <div className="col-12 col-md-6">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-5">
                        <h3>Sign In</h3>
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
                        <label htmlFor="role" className="form-label">Role <span className="text-danger">*</span></label>
                        <select name="role" id="role" className='form-control' value={role} onChange={(e) => setRole(e.target.value)}>
                          <option defaultValue={'-- Select an option --'}>-- Select an option --</option>

                          <option value="donor">Donor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn bsb-btn-xl btn-success" type="submit">Log in</button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-12">
                      <hr className="mb-4 border-secondary-subtle" />
                      <div className="d-flex gap-md-4 flex-row flex-md-row justify-content-md-start">
                        <a href="/register" className="link-secondary text-decoration-none">Create new account</a>
                        <a href="/forgetPassword" className="link-secondary text-decoration-none" style={{ paddingLeft: "250px" }}>Forgot password</a>
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

export default Login
