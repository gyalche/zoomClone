import React, { useState } from 'react';
import Header from '../components/Header';
import {
  EuiFlexGroup,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
} from '@elastic/eui';
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
import MeetingMaxiumUserField from '../components/MeetingMaxiumUserField';
const VideoConference = () => {
  useAuth();
  const { uid } = useSelector((state: any) => state.auth?.userInfo);
  console.log('This is a user Id', uid);
  const [users] = useFetchUser();
  console.log('users', users);
  const [meetingName, setMeetingName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Array<userType>>([]);
  const [startDate, setStartDate] = useState(moment());
  const [size, setSize] = useState(1);
  const [anyoneCanJoin, setAnyoneCanJoin] = useState(false);

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
        meetingType: anyoneCanJoin ? 'anyone-can-joing' : 'video conference',
        invitedUsers: anyoneCanJoin
          ? []
          : selectedUsers.map((user: userType) => user.uid),

        meetingDate: startDate.format('L'),
        maxUsers: anyoneCanJoin ? 100 : size,
        status: true,
      });
      createToast({
        title: anyoneCanJoin
          ? 'Anyone can join meeting created sucessfully'
          : 'Video conference created sucessfully',
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
          <EuiFormRow
            display="columnCompressedSwitch"
            label="Any one can joing">
            <EuiSwitch
              showLabel={false}
              label="Any one can joing"
              checked={anyoneCanJoin}
              onChange={(e) => setAnyoneCanJoin(e.target.checked)}
              compressed
            />
          </EuiFormRow>
          <MeetingNameField
            label="Meeting Name"
            placeholder="Meeting Name"
            value={meetingName}
            setMeetingName={setMeetingName}
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
          />
          {anyoneCanJoin ? (
            <MeetingMaxiumUserField value={size} setValue={setSize} />
          ) : (
            <MeetingUserField
              label="Invite Users"
              options={users}
              onChange={onUserChange}
              selectedOptions={selectedUsers}
              singleSelection={false}
              isClearable={false}
              placeholder="Select a user"
              isInvalid={showErrors.meetingUser.show}
              error={showErrors.meetingUser.message}
            />
          )}
          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiSpacer />

          <CreateMeetingButton createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
};

export default VideoConference;
