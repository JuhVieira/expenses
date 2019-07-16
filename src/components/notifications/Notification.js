import { NotificationManager } from 'react-notifications';


const Notification = (
  type = 'info',
  title,
  message,
  timeout = 4000,
  callback = () => { }
) => {
  switch (type) {
    case 'info':
      NotificationManager.info(message, title);
      break;
    case 'success':
      NotificationManager.success(message, title);
      break;
    case 'warning':
      NotificationManager.warning(message, title, timeout);
      break;
    case 'error':
      NotificationManager.error(message, title, timeout, callback);
      break;
    default:
      NotificationManager.info(message, title);
      break
  }
};

export default Notification;