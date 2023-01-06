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

export const getOneonOneMeetingBreadCrumbs = (
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
    href: '#',
    onClick: () => {
      navigate('/create');
    },
  },
  {
    text: 'Create One on One Meeting',
  },
];

export const getVideoConferenceBreadCrumbs = (
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
    href: '#',
    onClick: () => {
      navigate('/create');
    },
  },
  {
    text: 'Create Video conference',
  },
];

export const getMyMeetingsBreadcrumbs = (
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
    text: 'My Meetings',
  },
];
