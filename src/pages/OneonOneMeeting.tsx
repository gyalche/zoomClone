import React, { useState } from 'react';
import Header from '../components/Header';
import { EuiFlexGroup, EuiForm, EuiSpacer } from '@elastic/eui';
import MeetingNameField from '../components/FormComponents/MeetingNameField';
import MeetingUserField from '../components/FormComponents/MeetingUserField';
import useAuth from '../hooks/useAuth';
import useFetchUser from '../hooks/useFetchUser';
import moment from 'moment';
import MeetingDateField from '../components/MeetingDateField';
import CreateMeetingButton from '../components/CreateMeetingButton';
import { FieldErrorType, userType } from '../utils/Types';
import { addDoc } from 'firebase/firestore';
import { meetingRef } from '../utils/FirebaseConfig';
import { generateMeetingID } from '../utils/generateMeetingID';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import useToast from '../hooks/useToast';
const OneonOneMeeting = () => {
  useAuth();
  const { uid } = useSelector((state: any) => state.auth?.userInfo);
  console.log('This is a user Id', uid);
  const [users] = useFetchUser();
  console.log('users', users);
  const [meetingName, setMeetingName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Array<userType>>([]);
  const [startDate, setStartDate] = useState(moment());

  const navigate = useNavigate();
  const onUserChange = (selectedOptions: any) => {
    setSelectedUsers(selectedOptions);
  };
  const [createToast] = useToast();
  console.log('this is creat toasts', createToast);
  const [showErrors, setShowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
  }>({
    meetingName: { show: false, message: [] },
    meetingUser: { show: false, message: [] },
  });

  const validateForm = () => {
    let errors = false;
    const clonedShowErrors = { ...showErrors };
    if (!meetingName.length) {
      clonedShowErrors.meetingName.show = true;
      clonedShowErrors.meetingName.message = ['Please Enter Meeting Name'];
      errors = true;
    } else {
      clonedShowErrors.meetingName.show = false;
      clonedShowErrors.meetingName.message = [];
    }
    if (!selectedUsers.length) {
      clonedShowErrors.meetingUser.show = true;
      clonedShowErrors.meetingUser.message = ['Please select a User'];
    } else {
      clonedShowErrors.meetingUser.show = false;
      clonedShowErrors.meetingUser.message = [];
    }
    setShowErrors(clonedShowErrors);
    return errors;
  };
  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = generateMeetingID();
      await addDoc(meetingRef, {
        createdBy: uid,
        meetingId,
        meetingName,
        meetingType: '1-on-1',
        invitedUsers: [selectedUsers[0].uid],
        meetingDate: startDate.format('L'),
        maxUsers: 1,
        status: true,
      });
      createToast({
        title: 'One on One meeting create sucessfully',
        type: 'success',
      });
      navigate('/');
    }
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
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
          />
          <MeetingUserField
            label="Invite Users"
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUsers}
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            placeholder="Select a user"
            isInvalid={showErrors.meetingUser.show}
            error={showErrors.meetingUser.message}
          />
          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiSpacer />

          <CreateMeetingButton createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
};

export default OneonOneMeeting;
