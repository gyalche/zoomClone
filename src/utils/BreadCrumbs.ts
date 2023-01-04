import { BreadCrumbsType } from './Types';
import { NavigateFunction } from 'react-router-dom';

export const getCreateMeetingBreadCrumbs = (
  navigate: NavigateFunction
): Array<BreadCrumbsType> => [
  {
    text: 'Dashboard',
    href: '#',
    onClick: () => {
      navigate('/');
    },
  },
  {
    text: 'Create Meeting',
  },
];
