import * as React from 'react';
import styled from 'styled-components';

/** Components */
import GithubIcon from '../components/icons/github';
import LinkedInIcon from '../components/icons/linkedin';
import HomePageNewsletter from '../components/page/home/Newsletter';

const StyledFooter = styled.footer`
  text-align: center;
  padding: var(--spacing-20) var(--spacing-0);
  display: flex;
  justify-content: center;
`;

const StyledFooterDiv = styled.div`
  max-width: var(--maxWidth-3xl);
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Footer: React.FC = () => {
  return (
    <>
      <HomePageNewsletter />
      <StyledFooter>
        <StyledFooterDiv>
          <section className='flex gap-4'>
            <div className='copyright'>
              Copyright © {new Date().getFullYear()} by Walid Newaz
            </div>
          </section>
          <section className='social'>
            <ul>
              <li>
                <a
                  href='https://github.com/WalidNewaz'
                  target='_blank'
                  rel='noreferrer'
                >
                  <GithubIcon />
                </a>
              </li>
              <li>
                <a
                  href='https://www.linkedin.com/in/walid-newaz/'
                  target='_blank'
                  rel='noreferrer'
                >
                  <LinkedInIcon />
                </a>
              </li>
            </ul>
          </section>
        </StyledFooterDiv>
      </StyledFooter>
    </>
  );
};

export default Footer;
