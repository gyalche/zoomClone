import React, { useState, useEffect } from 'react';
import { FieldErrorType, MeetingType, userType } from '../utils/Types';
import useAuth from '../hooks/useAuth';
import useFetchUser from '../hooks/useFetchUser';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import useToast from '../hooks/useToast';
import { firebaseDB } from '../utils/FirebaseConfig';
import { doc } from 'firebase/firestore';
import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
  EuiTitle,
} from '@elastic/eui';
import MeetingNameField from './FormComponents/MeetingNameField';
import MeetingMaxiumUserField from './MeetingMaxiumUserField';
import MeetingDateField from './MeetingDateField';
import MeetingUserField from './FormComponents/MeetingUserField';
import CreateMeetingButton from './CreateMeetingButton';
const EditFlyout = ({
  closeFlyout,
  meetings,
}: {
  closeFlyout: any;
  meetings: MeetingType;
}) => {
  useAuth();
  const [users] = useFetchUser();
  const [meetingName, setMeetingName] = useState(meetings.meetingName);
  const [selectedUsers, setSelectedUsers] = useState<Array<userType>>([]);
  const [startDate, setStartDate] = useState(moment(meetings.meetingDate));
  const [size, setSize] = useState(1);
  const [anyoneCanJoin, setAnyoneCanJoin] = useState(false);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const [meetingType] = useState(meetings?.meetingType);
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

  useEffect(() => {
    if (users) {
      const foundUsers: Array<userType> = [];
      meetings.invitedUsers.forEach((user: string) => {
        const findUser = users.find(
          (tempUser: userType) => tempUser.uid === user
        );
        if (findUser) foundUsers.push(findUser);
      });
      setSelectedUsers(foundUsers);
    }
  }, [meetings, users]);

  const editMeeting = async () => {
    const editedMeeting = {
      ...meetings,
      meetingName,
      meetingType,
      invitedUsers: selectedUsers.map((user: userType) => user.uid),
      maxUsers: size,
      meetingDate: startDate.format('L'),
      status: !status,
    };
    delete editedMeeting.docId;
    const docRef = doc(firebaseDB, 'meetings', meetings.docId!);
    createToast({ title: 'Meeting updated sucessfully', type: 'success' });
    closeFlyout(true);
  };

  return (
    <EuiFlyout ownFocus onClose={() => closeFlyout()}>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2>{meetings.meetingName}</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiForm>
          <MeetingNameField
            label="Meeting Name"
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
            placeholder="Meeting Name"
            value={meetingName}
            setMeetingName={setMeetingName}
          />
          {meetingType === 'any-one-join' ? (
            <MeetingMaxiumUserField value={size} setValue={setSize} />
          ) : (
            <MeetingUserField
              label="Invite Users"
              isInvalid={showErrors.meetingUser.show}
              error={showErrors.meetingUser.message}
              options={users}
              onChange={onUserChange}
              selectedOptions={selectedUsers}
              singleSelection={
                meetingType === '1-on-1' ? { asPlainText: true } : false
              }
              isClearable={false}
              placeholder="Select a users"
            />
          )}
          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiFormRow display="columnCompressedSwitch" label="Cancel Meeting">
            <EuiSwitch
              showLabel={false}
              label="Cancel Meeting"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
          </EuiFormRow>
          <EuiSpacer />

          <CreateMeetingButton
            createMeeting={editMeeting}
            isEdit
            closeFlyout={closeFlyout}
          />
        </EuiForm>
      </EuiFlyoutBody>
    </EuiFlyout>
  );
};

export default EditFlyout;
