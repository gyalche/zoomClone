import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { MeetingType } from '../utils/Types';
import { meetingRef } from '../utils/FirebaseConfig';
import { getDocs, query, where } from 'firebase/firestore';
import { useSelector } from 'react-redux';

const MyMeetings = () => {
  const [meetings, setMeetings] = useState<Array<MeetingType>>([]);
  const userinfo = useSelector((state: any) => state.auth?.userInfo);

  useEffect(() => {
    if (userinfo) {
      const getMyMeetings = async () => {
        const firseStoreQuery = query(
          meetingRef,
          where('createdBy', '==', userinfo?.uid)
        );
        const fetchMeetings = await getDocs(firseStoreQuery);
        if (fetchMeetings.docs.length) {
          const myMeetings: Array<MeetingType> = [];
          fetchMeetings.forEach((meeting) => {
            myMeetings.push({
              docId: meeting.id,
              ...(meeting.data() as MeetingType),
            });
          });

          setMeetings(myMeetings);
        }
      };
      console.log('Meeting lists', meetings);

      getMyMeetings();
    }
  }, [userinfo]);
  return (
    <div>
      <Header />;
    </div>
  );
};

export default MyMeetings;
