const DownloadState = Object.freeze({
  SEND_LOG: 'send-log',
  SEND_ERROR_LOG: 'send-error-log',
  FIRST_REQUEST_ERROR: 'first-request-error',
  FIRST_REQUEST_SUCCESS: 'first-request-success',
});

export default DownloadState;
