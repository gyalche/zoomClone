import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ToastType } from '../utils/Types';
import { setToasts } from '../app/slices/meetingSlice';

const useToast = () => {
  const toasts = useSelector((state: any) => state.meetings.toasts);
  const dispatch = useDispatch();
  const createToast = ({ title, type }: { title: string; type: any }) => {
    dispatch(
      setToasts(
        toasts.concat({ id: new Date().toISOString(), title, color: type })
      )
    );
  };

  return [createToast];
};

export default useToast;
