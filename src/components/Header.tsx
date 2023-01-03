import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
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
} from '@elastic/eui';
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state: any) => state.auth?.userInfo);
  const [breadCrumbs, setBreadCrumbs] = useState([{ text: 'Dashboard' }]);
  const [isResponsive, setIsResponsive] = useState(false);
  const sections = [];
  const responsiveSection = [];

  return (
    <>
      <EuiHeader
        style={{ minHeight: '8vh' }}
        theme="dark"
        sections={isResponsive ? responsiveSection : section}
      />
      <EuiHeader
        style={{ minHeight: '8vh' }}
        sections={[{ breadcrumbs: breadCrumbs }]}
      />
    </>
  );
};

export default Header;
