import React, { useContext } from 'react';
import AppContext from 'context/appContext';

const Alert = () => {
  const appContext = useContext(AppContext);
  const { alerts } = appContext;
  return (
    <div className="alert">
      {alerts.map(alert => (
        <div
          className={`alert__item alert__item--${alert.type}`}
          key={alert.id}
          type={alert.alertType}
        >
          {alert.msg}
        </div>
      ))}
    </div>
  );
};

export default Alert;
