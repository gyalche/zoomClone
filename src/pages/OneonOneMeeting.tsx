import React, { useState } from 'react';
import Header from '../components/Header';
import { EuiFlexGroup, EuiForm } from '@elastic/eui';
import MeetingNameField from '../components/FormComponents/MeetingNameField';
import MeetingUserField from '../components/FormComponents/MeetingUserField';
import useAuth from '../hooks/useAuth';
import useFetchUser from '../hooks/useFetchUser';

const OneonOneMeeting = () => {
  useAuth();
  const [users] = useFetchUser();
  console.log('users', users);
  const [meetingName, setMeetingName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const onUserChange = (selectedOptions: any) => {
    setSelectedUsers(selectedOptions);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <Header />
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiForm>
          <MeetingNameField
            label="Meeting Name"
            placeholder="Meeting Name"
            value={meetingName}
            setMeetingName={setMeetingName}
          />
          <MeetingUserField
            label="Invite Users"
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUsers}
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            placeholder="Select a user"
          />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
};

export default OneonOneMeeting;
