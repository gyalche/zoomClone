import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { MeetingType } from '../utils/Types';
import { meetingRef } from '../utils/FirebaseConfig';
import { getDocs, query, where } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';
import {
  EuiBadge,
  EuiBasicTable,
  EuiButtonIcon,
  EuiCopy,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from '@elastic/eui';
import moment from 'moment';
import { Link } from 'react-router-dom';
import EditFlyout from '../components/EditFlyout';

const Meeting = () => {
  useAuth();
  const [meetings, setMeetings] = useState<any>([]);
  const userinfo = useSelector((state: any) => state.auth?.userInfo);

  const getMyMeetings = async () => {
    const firseStoreQuery = query(
      meetingRef,
      where('createdBy', '==', userinfo?.uid)
    );
    const fetchMeetings = await getDocs(firseStoreQuery);
    if (fetchMeetings.docs.length) {
      const myMeetings: Array<MeetingType> = [];
      fetchMeetings.forEach((meeting) => {
        const data = meeting.data() as MeetingType;
        if (data.createdBy === userinfo?.uid) {
          myMeetings.push(data);
        } else if (data.meetingType === 'any-one-join') myMeetings.push(data);
        else {
          const index = data.invitedUsers.findIndex(
            (user) => user === userinfo.uid
          );
          if (index !== -1) {
            myMeetings.push(data);
          }
        }
      });

      setMeetings(myMeetings);
    }
  };
  useEffect(() => {
    console.log('Meeting lists', meetings);
    getMyMeetings();
  }, [userinfo]);

  const columns = [
    {
      field: 'meetingName',
      name: 'Meeting Name',
    },
    {
      field: 'meetingType',
      name: 'Meeting Type',
    },
    {
      field: 'meetingDate',
      name: 'Meeting Date',
    },
    {
      field: '',
      name: 'Status',
      render: (meeting: MeetingType) => {
        if (meeting.status) {
          if (meeting.meetingDate === moment().format('L')) {
            return (
              <EuiBadge style={{ color: 'success' }}>
                <Link to={`/join/${meeting.meetingId}`}>Join now</Link>
              </EuiBadge>
            );
          } else if (
            moment(meeting.meetingDate).isBefore(moment().format('L'))
          ) {
            return <EuiBadge color="default">Ended</EuiBadge>;
          } else {
            return <EuiBadge color="primary">upcoming</EuiBadge>;
          }
        } else {
          return <EuiBadge color="danger">Cancelled</EuiBadge>;
        }
      },
    },
    {
      field: '',
      name: 'Edit',
      render: (meeting: MeetingType) => {
        return (
          <EuiButtonIcon
            aria-label="meeting-edit"
            iconType="indexEdit"
            color="danger"
            display="base"
            isDisabled={
              !meeting.status ||
              moment(meeting.meetingDate).isBefore(moment().format('L'))
            }
          />
        );
      },
    },
    {
      field: 'meetingId',
      name: 'Copy Length',
    },
    {
      field: 'meetingId',
      name: 'Copy Link',
      render: (meetingId: string) => {
        return (
          <EuiCopy
            textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}>
            {(copy: any) => (
              <EuiButtonIcon
                iconType="copy"
                onClick={copy}
                display="base"
                aria-label="Meeting-copy"
              />
            )}
          </EuiCopy>
        );
      },
    },
  ];
  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <Header />;
      <EuiFlexGroup justifyContent="center" style={{ margin: '1rem' }}>
        <EuiFlexItem>
          <EuiPanel>
            <EuiBasicTable items={meetings} columns={columns} />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};

export default Meeting;
