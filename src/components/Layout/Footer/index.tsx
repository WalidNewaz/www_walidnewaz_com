import * as React from 'react';
import styled from 'styled-components';

/** Components */
import GithubIcon from '../../atoms/icons/github';
import LinkedInIcon from '../../atoms/icons/linkedin';
import HomePageNewsletter from '../../page/home/Newsletter';

const StyledFooter = styled.footer`
  text-align: center;
  padding: var(--spacing-20) var(--spacing-0);
  display: flex;
  justify-content: center;
  font-family: var(--fontFamily-sans);
`;

const StyledFooterDiv = styled.div`
  max-width: var(--maxWidth-3xl);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledCopyRight = styled.div`
  color: var(--heading2);
`;

const Footer: React.FC = () => {
  return (
    <>
      <HomePageNewsletter />
      <StyledFooter>
        <StyledFooterDiv>
          
          <section className='social'>
            <ul className="gap-4">
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

          <section className='gap-4'>
            <StyledCopyRight className='copyright'>
              Copyright © 2023 - {new Date().getFullYear()}
            </StyledCopyRight>
          </section>
        </StyledFooterDiv>
      </StyledFooter>
    </>
  );
};

export default Footer;
