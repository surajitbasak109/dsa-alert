import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const RedirectToDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/admin/dashboard');
  });
  return <></>;
};

export default RedirectToDashboard;
