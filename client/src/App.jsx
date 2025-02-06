import React from "react";
import Navbar from "./Components/Navbar";
import Carousel from "./Components/Carousel";
import ImageCard from "./Components/ImageCard";
import AddCharity from "./Components/AddCharity";
import ViewCharity from "./Components/ViewCharity";
import DetailedSection from "./Components/DetailedSection";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Footer from "./Components/Footer";
import ForgetPassword from "./Components/ForgetPassword";
import '../src/Components/styles.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import CharityDonate from "./Components/CharityDonate";
import ProtectedRoute from "./Services/ProtectedRoute";


function Home() {
  return (
    <div className="App">
      <Navbar />
      <div style={{ marginTop: "102px" }}>
        <div className="carousel-container">
          <Carousel />
        </div>
        <br></br><br />
        <h4 style={{ fontSize: "70px", fontFamily: "Bokor, system-ui", textAlign: "center" }}> Advantages</h4>
        <br></br><br></br>
        <div className="image-card-container">
          <ImageCard
            imageSource="https://debtmerica.com/wp-content/uploads/2021/06/Picture1.png"
            text="It can be a fast way to raise finance with no upfront fees." />
          <br />
          <ImageCard
            imageSource="https://f.hubspotusercontent00.net/hubfs/53/virtual-marketing-campaign-pitches.jpg"
            text="Pitching a project or business through the online platform can be a valuable form of marketing and result in media attention" />
          <br />
          <ImageCard
            imageSource="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMvXgdWLENI9zvgmkI2uKn6xmZDgnSzu6peg&s"
            text="Creates an organic customer base" />
        </div>

      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addCharity" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddCharity />
          </ProtectedRoute>
        } />
        <Route path="/viewCharity" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ViewCharity />
          </ProtectedRoute>
        } />
        <Route path="/detailedSection" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DetailedSection />
          </ProtectedRoute>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/donateCharity" element={
          <ProtectedRoute allowedRoles={["donor"]}>
            <CharityDonate />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
