import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Cart', path: '/cart' },
    { name: 'Blog', path: '/blog' },
    { name: 'Shop', path: '/shop' },
    { name: 'Contact', path: '/contact' },
    { name: 'My account', path: '/profile' }
  ];

  return (
    <footer style={{ backgroundColor: '#0a1f2e', color: '#94a3b8', paddingTop: '3rem', paddingBottom: '1.5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', paddingBottom: '2rem' }}>
          
          {/* Logo and Description */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: 'linear-gradient(135deg, #fbbf24, #f97316)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  backgroundColor: '#fcd34d',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{ width: '24px', height: '24px', backgroundColor: 'white', borderRadius: '50%' }}></div>
                </div>
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#84cc16' }}>ECOLAND</span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.6', color: '#cbd5e1', marginBottom: '0' }}>
              Ecoland proudly announces its wide array of organic products for the health conscious people. It has on offer healthy food products used daily like: saffron, rajma-Jammu variety, turmeric, honey, cashewnuts, black pepper and shilajeet
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {quickLinks.map((link) => (
                <li key={link.name} style={{ marginBottom: '0.5rem' }}>
                  <button
                    onClick={() => navigate(link.path)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#cbd5e1',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      padding: '0.25rem 0',
                      textAlign: 'left',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#84cc16'}
                    onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>
              Get In Touch
            </h3>
            <div style={{ fontSize: '0.875rem', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: 'white' }}>Call:</strong>
                <a href="tel:8971620369" style={{ color: '#cbd5e1', textDecoration: 'none', marginLeft: '0.5rem' }}>
                  8971620369
                </a>
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: 'white' }}>Email:</strong>
                <a href="mailto:shop@ecoland.co.in" style={{ color: '#cbd5e1', textDecoration: 'none', marginLeft: '0.5rem' }}>
                  shop@ecoland.co.in
                </a>
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: 'white' }}>Address:</strong>
              </p>
              <p style={{ color: '#cbd5e1', marginBottom: '0.5rem' }}>
                Sy. no. 6, Main Road, Navage,
              </p>
              <p style={{ color: '#cbd5e1', marginBottom: '0.5rem' }}>
                Belagavi - 591120.
              </p>
              <p style={{ color: '#cbd5e1', marginBottom: 0 }}>
                State-Karnataka
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          borderTop: '1px solid #1e3a4c', 
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ fontSize: '0.875rem', margin: 0 }}>
            Copyright © {currentYear} | Ecoland. All rights reserved. Powered By{' '}
            <a 
              href="https://3iglobalinc.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#84cc16', textDecoration: 'none' }}
            >
              3i Global Inc.
            </a>
          </p>

          {/* Social Media Icons */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a 
              href="https://yelp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#cbd5e1', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = '#84cc16'}
              onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#cbd5e1', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = '#84cc16'}
              onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
              </svg>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#cbd5e1', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = '#84cc16'}
              onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#cbd5e1', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = '#84cc16'}
              onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="#0a1f2e" strokeWidth="2"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#0a1f2e" strokeWidth="2"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;