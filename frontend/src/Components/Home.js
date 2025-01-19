import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* <header className="home-header"> */}
        <h1>WELCOME TO OUR PAGE</h1>
        <p>Explore the best features and amazing content tailored for you!</p>
      {/* </header> */}

      <section className="home-features">
        <div className="feature-card">
          <h2>Feature 1</h2>
          <p>Discover the latest innovations we offer to enhance your experience.</p>
        </div>
        <div className="feature-card">
          <h2>Feature 2</h2>
          <p>Join our community and enjoy exclusive benefits.</p>
        </div>
        <div className="feature-card">
          <h2>Feature 3</h2>
          <p>Learn more about our vision and commitment to quality.</p>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2025 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
