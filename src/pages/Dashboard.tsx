import { onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui';
import dashboard1 from '../assets/dashboard1.png';
import dashboard2 from '../assets/dashboard2.png';
import dashboard3 from '../assets/dashboard3.png';

const Dashboard = () => {
  //   const userInfo = useSelector((state: any) => state.auth.userInfo);
  //   console.log('user', userInfo);
  useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: 'flex',
          height: '100vh',
          flexDirection: 'column',
        }}>
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          style={{ margin: '5vh 10vh' }}>
          <EuiFlexItem>
            <EuiCard
              // layout="horizontal"
              icon={<EuiImage size="5rem" alt="icon" src={dashboard1} />}
              title={`Create Meeting`}
              description="Create a new meeting and invite people"
              onClick={() => navigate('/create')}
              paddingSize="xl"
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiCard
              // layout="horizontal"
              icon={<EuiImage size="100%" alt="icon" src={dashboard2} />}
              title={`My Meeting`}
              description="View your created meeting"
              onClick={() => navigate('/mymeetings')}
              paddingSize="xl"
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiCard
              // layout="horizontal"
              icon={<EuiImage size="5rem" alt="icon" src={dashboard3} />}
              title={`Meeting`}
              description="View the meetings that your are invited to "
              onClick={() => navigate('/create')}
              paddingSize="xl"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  );
};

export default Dashboard;
