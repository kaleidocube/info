/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import styled from 'styled-components'
import { AutoColumn } from '../Column'
import Title from '../Title'
import { BasicLink } from '../Link'
import { useMedia } from 'react-use'
import { transparentize } from 'polished'
import { TYPE } from '../../Theme'
import { withRouter } from 'react-router-dom'
import { TrendingUp, List, PieChart, Disc } from 'react-feather'
import { useSessionStart } from '../../contexts/Application'
import { useDarkModeManager } from '../../contexts/LocalStorage'
import Toggle from '../Toggle'

const Wrapper = styled.div`
  height: ${({ isMobile }) => (isMobile ? 'initial' : '100vh')};
  background-color: ${({ theme }) => transparentize(0.4, theme.bg1)};
  color: ${({ theme }) => theme.text1};
  padding: 0.5rem 0.5rem 0.5rem 0.75rem;
  position: sticky;
  top: 0px;
  z-index: 9999;
  box-sizing: border-box;
  /* background-color: #1b1c22; */
  background: linear-gradient(193.68deg, #1b1c22 0.68%, #000000 100.48%);
  color: ${({ theme }) => theme.bg2};

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    position: relative;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;
  }
`

const Option = styled.div`
  font-weight: 500;
  font-size: 14px;
  opacity: ${({ activeText }) => (activeText ? 1 : 0.6)};
  color: ${({ theme }) => theme.white};
  display: flex;
  :hover {
    opacity: 1;
  }
`

const DesktopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`

const MobileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderText = styled.div`
  margin-right: 0.75rem;
  font-size: 0.825rem;
  font-weight: 500;
  display: inline-box;
  display: -webkit-inline-box;
  opacity: 0.8;
  :hover {
    opacity: 1;
  }
  a {
    color: ${({ theme }) => theme.white};
  }
`

const Polling = styled.div`
  position: fixed;
  display: flex;
  left: 0;
  bottom: 0;
  padding: 1rem;
  color: white;
  opacity: 0.4;
  transition: opacity 0.25s ease;
  :hover {
    opacity: 1;
  }
`
const PollingDot = styled.div`
  width: 8px;
  height: 8px;
  min-height: 8px;
  min-width: 8px;
  margin-right: 0.5rem;
  margin-top: 3px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.green1};
`

function SideNav({ history }) {
  const below1080 = useMedia('(max-width: 1080px)')

  const below1180 = useMedia('(max-width: 1180px)')

  const seconds = useSessionStart()

  const [isDark, toggleDarkMode] = useDarkModeManager()

  return (
    <Wrapper isMobile={below1080}>
      {!below1080 ? (
        <DesktopWrapper>
          <AutoColumn gap="1rem" style={{ marginLeft: '.75rem', marginTop: '1.5rem' }}>
            <Title />
            {!below1080 && (
              <AutoColumn gap="1.25rem" style={{ marginTop: '1rem' }}>
                <BasicLink to="/home">
                  <Option activeText={history.location.pathname === '/home' ?? undefined}>
                    <TrendingUp size={20} style={{ marginRight: '.75rem' }} />
                    Overview
                  </Option>
                </BasicLink>
                <BasicLink to="/tokens">
                  <Option
                    activeText={
                      (history.location.pathname.split('/')[1] === 'tokens' ||
                        history.location.pathname.split('/')[1] === 'token') ??
                      undefined
                    }
                  >
                    <Disc size={20} style={{ marginRight: '.75rem' }} />
                    Tokens
                  </Option>
                </BasicLink>
                <BasicLink to="/pairs">
                  <Option
                    activeText={
                      (history.location.pathname.split('/')[1] === 'pairs' ||
                        history.location.pathname.split('/')[1] === 'pair') ??
                      undefined
                    }
                  >
                    <PieChart size={20} style={{ marginRight: '.75rem' }} />
                    Pairs
                  </Option>
                </BasicLink>

                <BasicLink to="/accounts">
                  <Option
                    activeText={
                      (history.location.pathname.split('/')[1] === 'accounts' ||
                        history.location.pathname.split('/')[1] === 'account') ??
                      undefined
                    }
                  >
                    <List size={20} style={{ marginRight: '.75rem' }} />
                    Accounts
                  </Option>
                </BasicLink>
              </AutoColumn>
            )}
          </AutoColumn>
          <AutoColumn gap="0.5rem" style={{ marginLeft: '.75rem', marginBottom: '4rem' }}>
            <div
              style={{
                display: 'flex',
                gap: '4px',
              }}
            >
              <HeaderText>
                <a href="https://twitter.com/kaleidocube_xyz" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 20.9978H20.894C19.1813 20.9978 17.4684 20.9985 15.7553 20.9998C15.6718 20.9998 15.6217 20.9766 15.5747 20.9094C14.5927 19.5066 13.6095 18.1048 12.625 16.7038C12.0062 15.822 11.3869 14.9405 10.7673 14.0592C10.7553 14.0439 10.7425 14.0292 10.729 14.0152L10.1987 14.6171C8.81654 16.1882 7.43449 17.7593 6.0525 19.3305C5.58612 19.8608 5.12075 20.3918 4.6564 20.9233C4.63658 20.9488 4.61063 20.9691 4.58085 20.9824C4.55107 20.9957 4.51839 21.0016 4.48571 20.9996C3.99919 20.996 3.51267 20.9978 3 20.9978L10.0266 13.0072L3.00405 3.00931C3.0446 3.00634 3.07237 3.00238 3.10034 3.00238C4.82343 3.00238 6.54652 3.00159 8.26961 3C8.34746 3 8.38313 3.03409 8.42064 3.0878C8.9723 3.87461 9.52436 4.66077 10.0768 5.44626C10.9846 6.73846 11.8924 8.03072 12.8003 9.32305C12.8666 9.41759 12.9337 9.51193 13.0069 9.61558C13.1456 9.45881 13.2779 9.31017 13.4093 9.16093L17.7788 4.19172C18.1089 3.81634 18.4377 3.44018 18.7703 3.06699C18.8018 3.03152 18.8458 3.009 18.8936 3.00396C19.3766 2.9996 19.8597 3.00119 20.343 3.00139C20.3586 3.00139 20.3744 3.00377 20.4087 3.00654L13.7119 10.6218L21 20.9978ZM5.16319 4.1719C5.18346 4.20202 5.19278 4.21808 5.20373 4.23334C6.09325 5.47784 6.98284 6.72207 7.87249 7.96605C9.45044 10.1739 11.0282 12.3817 12.6057 14.5894C13.849 16.3291 15.0917 18.069 16.3337 19.8093C16.3742 19.8662 16.416 19.883 16.4825 19.883C17.2258 19.8813 17.9691 19.8813 18.7123 19.883H18.822C18.7922 19.8388 18.7762 19.814 18.7592 19.7899C17.6973 18.3049 16.6356 16.8198 15.5739 15.3346C14.503 13.835 13.4324 12.3355 12.3621 10.836C11.2928 9.3397 10.2235 7.8437 9.15406 6.34802C8.65309 5.64775 8.15163 4.94748 7.64971 4.24721C7.62619 4.21451 7.58078 4.17527 7.54531 4.17507C6.75816 4.17091 5.97101 4.1719 5.16319 4.1719Z"
                      fill="#fff"
                    />
                  </svg>
                </a>
              </HeaderText>
              <HeaderText>
                <a href="https://t.me/kaleidocube_xyz" target="_blank">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.3909 18.3934C10.7816 18.3934 10.9509 18.211 11.1724 18.0026C11.511 17.677 15.8614 13.4439 15.8614 13.4439L13.1913 12.7926L10.7165 14.3556L10.3909 18.2631V18.3934Z"
                      fill="#fff"
                    />
                    <path
                      d="M10.6524 14.4083L16.9565 19.0583C17.6729 19.449 18.1939 19.2536 18.3762 18.394L20.9422 6.30673C21.2027 5.25171 20.5384 4.7828 19.848 5.09541L4.79109 10.9046C3.76211 11.3214 3.77514 11.8945 4.60874 12.142L8.47718 13.3533L17.4254 7.71344C17.8422 7.45294 18.2329 7.59622 17.9203 7.88277L10.6524 14.4083Z"
                      fill="#fff"
                    />
                  </svg>
                </a>
              </HeaderText>
              <HeaderText>
                <a href="mailto:contact@kaleidocube.xyz">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 5C3.45228 5 3 5.45228 3 6V18C3 18.5477 3.45228 19 4 19H20C20.5477 19 21 18.5477 21 18V6C21 5.45228 20.5477 5 20 5H4ZM1 6C1 4.34772 2.34772 3 4 3H20C21.6523 3 23 4.34772 23 6V18C23 19.6523 21.6523 21 20 21H4C2.34772 21 1 19.6523 1 18V6Z"
                      fill="#fff"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.18073 5.4265C1.49745 4.97405 2.12098 4.86402 2.57343 5.18073L12 11.7793L21.4265 5.18073C21.879 4.86402 22.5025 4.97405 22.8192 5.4265C23.1359 5.87895 23.0259 6.50248 22.5734 6.8192L12.5734 13.8192C12.2291 14.0602 11.7708 14.0602 11.4265 13.8192L1.4265 6.8192C0.974052 6.50248 0.864017 5.87895 1.18073 5.4265Z"
                      fill="#fff"
                    />
                  </svg>
                </a>
              </HeaderText>
            </div>

            <Toggle isActive={isDark} toggle={toggleDarkMode} />
          </AutoColumn>
          {!below1180 && (
            <Polling style={{ marginLeft: '.5rem' }}>
              <PollingDot />
              <a href="/" style={{ color: 'white' }}>
                <TYPE.small color={'white'}>
                  Updated {!!seconds ? seconds + 's' : '-'} ago <br />
                </TYPE.small>
              </a>
            </Polling>
          )}
        </DesktopWrapper>
      ) : (
        <MobileWrapper>
          <Title />
        </MobileWrapper>
      )}
    </Wrapper>
  )
}

export default withRouter(SideNav)
