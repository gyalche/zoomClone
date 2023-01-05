import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiHeaderSectionItemButton,
  EuiBadge,
  EuiIcon,
  EuiAvatar,
  useEuiTheme,
  EuiText,
  EuiTextColor,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
} from '@elastic/eui';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/FirebaseConfig';
import {
  getCreateMeetingBreadCrumbs,
  getOneonOneMeetingBreadCrumbs,
} from '../utils/BreadCrumbs';
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state: any) => state.auth?.userInfo);
  const [breadCrumbs, setBreadCrumbs] = useState([{ text: 'Dashboard' }]);
  const [isResponsive, setIsResponsive] = useState(false);

  const logout = () => {
    signOut(firebaseAuth);
  };
  useEffect(() => {
    const { pathname } = location;
    if (pathname === '/create') {
      setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate));
    } else if (pathname === '/create1on1')
      setBreadCrumbs(getOneonOneMeetingBreadCrumbs(navigate));
  }, [location, navigate]);
  const sections: any = [
    {
      items: [
        <Link to="/">
          <EuiText>
            <h2 style={{ padding: '0 1vw' }}>
              <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    {
      items: [
        <>
          {user?.name ? (
            <EuiText>
              <h3>
                <EuiTextColor color="white">Hello,</EuiTextColor>
                <EuiTextColor color="#0b5cff">{user?.name}</EuiTextColor>
              </h3>
            </EuiText>
          ) : (
            <>
              <EuiTextColor color="white">undefined</EuiTextColor>
            </>
          )}
        </>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          direction="row"
          style={{ gap: '2vw' }}>
          {/* <EuiFlexItem grow={false} style={{ flexBasis: 'fit-content' }}>
            <EuiButtonIcon
              onClick={logout}
              iconType="sun"
              color="warning"
              display="fill"
              size="s"
              arial-label="logout-button"
            />

            <EuiButtonIcon
              onClick={logout}
              iconType="moon"
              color="ghost"
              display="fill"
              size="s"
              arial-label="logout-button"
            />
          </EuiFlexItem> */}

          <EuiFlexItem grow={false} style={{ flexBasis: 'fit-content' }}>
            <EuiButtonIcon
              onClick={logout}
              iconType="lock"
              display="fill"
              size="s"
              arial-label="logout-button"
            />
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];
  const responsiveSection: any = [
    {
      items: [
        <Link to="/">
          <EuiText>
            <h2 style={{ padding: '0 1vw' }}>
              <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
  ];

  useEffect(() => {
    if (window.innerWidth < 480) setIsResponsive(true);
  }, []);

  return (
    <>
      <EuiHeader
        style={{ minHeight: '8vh' }}
        theme="dark"
        sections={isResponsive ? responsiveSection : sections}
      />
      <EuiHeader
        style={{ minHeight: '8vh' }}
        sections={[{ breadcrumbs: breadCrumbs }]}
      />
    </>
  );
};

export default Header;
