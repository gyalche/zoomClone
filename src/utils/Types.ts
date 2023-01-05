export interface BreadCrumbsType {
  text: string;
  href?: string;
  onClick?: () => void;
}

export interface userType {
  email: string;
  name: string;
  uid: string;
  label: string;
}

export interface FieldErrorType {
  show: boolean;
  message: Array<string>;
}
export interface ToastType {
  id: string;
  title: string;
  color: 'success' | 'primary' | 'daner' | undefined;
}
