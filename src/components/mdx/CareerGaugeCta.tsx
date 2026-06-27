import React, { useState } from 'react';

export const CareerGaugeCta = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ margin: '32px 0', padding: '24px 32px', backgroundColor: 'var(--surface4, #eef6ff)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', border: '1px solid rgba(164, 194, 214, 0.15)' }}>
      <div style={{ flex: 1, minWidth: '280px' }}>
        <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '20px', color: '#002855', margin: '0 0 4px 0', letterSpacing: '-0.01em' }}>
          Evaluate a real opportunity with CareerGauge
        </h3>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: '14px', color: '#3a637f', margin: 0, lineHeight: 1.5 }}>
          Run a surgical diagnostic brief on your standing against target JDs before you hit apply.
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <a 
          href="https://www.careergauge.ai/start?utm_source=walidnewaz_blog&utm_medium=referral&utm_campaign=thesis_article" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: isHovered ? 'var(--accent-hover, #0059c1)' : 'var(--accent, #0070f3)', 
            color: 'white', 
            fontFamily: "'Montserrat', sans-serif", 
            fontWeight: 700, 
            fontSize: '15px', 
            textDecoration: 'none', 
            padding: '12px 24px', 
            borderRadius: '6px', 
            transition: 'background-color 0.2s ease, transform 0.2s ease', 
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            transform: isHovered ? 'translateY(-1px)' : 'translateY(0)'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span style={{ margin: 0 }}>Analyze Your Fit</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
            <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 3.33334L12.6667 8L8 12.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  );
};