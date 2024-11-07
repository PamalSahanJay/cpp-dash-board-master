import React from 'react';
import Alert from '@mui/material/Alert';
import { useAlertStore } from '../../models/alert';

const AppAlert = () => {
  const { alertMessage, alertSeverity, clearAlert } = useAlertStore((state) => ({
    alertMessage: state.alertMessage,
    alertSeverity: state.alertSeverity,
    clearAlert: state.clearAlert,
  }));

  if (!alertMessage) return null;

  return (
    <Alert variant="filled" severity={alertSeverity} onClose={clearAlert} >
      {alertMessage}
    </Alert>
  );
};

export default AppAlert;
