import React from "react";

const HeroSection = () => {
  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: "url('assets/img/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        textAlign: "center",
        padding: "100px 0",
      }}
    >
      <div className="container">
        <h1>Welcome to SST App</h1>
        <p>Your ultimate destination for education</p>
      </div>
    </section>
  );
};

export default HeroSection;
