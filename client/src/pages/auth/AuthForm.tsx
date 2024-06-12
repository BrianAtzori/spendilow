import { useState } from 'react';
import { useParams } from 'react-router-dom';
import SignUpComponent from '../../components/auth/SignUpComponent';
import LoginComponent from '../../components/auth/LoginComponent';
import MFAComponent from '../../components/auth/MFAComponent';
import MFAVerification from '../../components/auth/MFAVerification';

export default function AuthForm() {
  const { mode } = useParams();
  const [authMode] = useState(mode);

  return (
    <>
      {authMode === 'login' && <LoginComponent></LoginComponent>}

      {authMode === 'sign-up' && <SignUpComponent></SignUpComponent>}

      {authMode === 'mfa' && <MFAComponent></MFAComponent>}

      {authMode === 'mfa-verification' && <MFAVerification></MFAVerification>}
    </>
  );
}
