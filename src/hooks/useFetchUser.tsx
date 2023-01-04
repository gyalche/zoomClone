import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userRef } from '../utils/FirebaseConfig';
import { getDocs, query, where } from 'firebase/firestore';
import { userType } from '../utils/Types';

const useFetchUser = () => {
  const [users, setUsers] = useState<Array<userType>>([]);
  const uid = useSelector((state: any) => state.auth.userInfo?.uid);

  useEffect(() => {
    if (uid) {
      const getUsers = async () => {
        const fireStoreQuery = query(userRef, where('uid', '!=', uid));
        const data = await getDocs(fireStoreQuery);
        const firebaseUser: Array<userType> = [];

        data.forEach((user) => {
          const userData = user.data() as userType;
          firebaseUser.push({
            ...userData,
            label: userData.name,
          });
        });
        setUsers(firebaseUser);
      };
      getUsers();
    }
  }, [uid]);
  return [users];
};

export default useFetchUser;
