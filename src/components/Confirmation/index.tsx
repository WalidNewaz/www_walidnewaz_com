import * as React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  padding-top: 4rem;
  padding-bottom: 4rem;
`;
const StyledMsgContainer = styled.div`
  display: flex;
  padding: 3rem;
  margin-bottom: 1rem;
  flex-direction: row;
  gap: 2.5rem;
  justify-content: center;
  align-items: flex-start;
  border-radius: 0.25rem;
  max-width: 42rem;
  background-color: #ecfdf5;
`;
const StyledTick = styled.svg`
  display: inline-block;
  overflow: visible;
  width: 1.5rem;
  width: 3rem;
  height: 1.5rem;
  height: 3rem;
  color: #10b981;
  fill: currentColor;
`;

/**
 * Email subscription confirmation
 * @returns
 */
const Confirmation: React.FC = () => (
  <StyledContainer className='container'>
    <StyledMsgContainer>
      <div style={{ display: 'flex' }}>
        <StyledTick
          name='check-circle'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='currentColor'
          style={{
            fontSize: 'inherit',
          }}
        >
          <path d='M16.016 10.133a.75.75 0 1 0-1.06-1.06l-4.359 4.358-1.623-1.622a.75.75 0 0 0-1.06 1.06l2.167 2.167a.75.75 0 0 0 1.168-.135l2.384-2.384 2.383-2.384z'></path>
          <path
            fillRule='evenodd'
            d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM3.75 12a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0z'
            clipRule='evenodd'
          ></path>
        </StyledTick>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2 style={{ marginTop: 4, marginBottom: 0 }}>
          Subscription confirmed!
        </h2>
        <p
          style={{
            fontSize: '1.25rem',
            lineHeight: '1.5rem',
            color: '#374151',
            marginBottom: 0,
          }}
        >
          Boom! You're officially confirmed and on the list. Expect some great
          emails headed your way very soon.
        </p>
      </div>
    </StyledMsgContainer>
  </StyledContainer>
);

export default Confirmation;
