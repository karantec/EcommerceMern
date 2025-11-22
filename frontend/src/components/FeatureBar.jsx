import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTruck, FaCertificate, FaTags, FaUndo } from 'react-icons/fa';

const FeaturesBar = () => {
  const features = [
    {
      icon: <FaTruck />,
      title: 'Free Shipping',
      subtitle: 'Above ₹ Only'
    },
    {
      icon: <FaCertificate />,
      title: 'Certified Organic',
      subtitle: '100% Guarantee'
    },
    {
      icon: <FaTags />,
      title: 'Huge Savings',
      subtitle: 'At Lowest Price'
    },
    {
      icon: <FaUndo />,
      title: 'Easy Returns',
      subtitle: 'No Questions Asked'
    }
  ];

  return (
    <>
      <style>
        {`
          .features-bar {
            background-color: #1a1a1a;
            padding: 25px 0;
          }
          
          .features-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            flex-wrap: wrap;
          }
          
          .feature-card {
            background-color: #2d2d2d;
            border-radius: 8px;
            padding: 20px 30px;
            display: flex;
            align-items: center;
            gap: 15px;
            min-width: 220px;
            transition: all 0.3s ease;
          }
          
          .feature-card:hover {
            background-color: #363636;
            transform: translateY(-3px);
          }
          
          .feature-icon {
            width: 45px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.4rem;
            color: #7CB342;
          }
          
          .feature-content {
            display: flex;
            flex-direction: column;
          }
          
          .feature-title {
            color: #ffffff;
            font-size: 1rem;
            font-weight: 600;
            margin: 0;
            line-height: 1.3;
          }
          
          .feature-subtitle {
            color: #888888;
            font-size: 0.85rem;
            margin: 0;
            line-height: 1.3;
          }
          
          @media (max-width: 1199px) {
            .features-container {
              gap: 15px;
            }
            
            .feature-card {
              padding: 18px 25px;
              min-width: 200px;
            }
          }
          
          @media (max-width: 991px) {
            .features-container {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 15px;
              padding: 0 20px;
            }
            
            .feature-card {
              min-width: unset;
              justify-content: flex-start;
            }
          }
          
          @media (max-width: 575px) {
            .features-container {
              grid-template-columns: 1fr;
              gap: 12px;
            }
            
            .feature-card {
              padding: 15px 20px;
            }
          }
        `}
      </style>
      
      <section className="features-bar">
        <Container>
          <div className="features-container">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <div className="feature-content">
                  <h6 className="feature-title">{feature.title}</h6>
                  <p className="feature-subtitle">{feature.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default FeaturesBar;