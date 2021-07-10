const DownloadStatus = Object.freeze({
  SEND_LOG: 'send-log',
  SEND_ERROR_LOG: 'send-error-log',
  FIRST_REQUEST_ERROR: 'first-request-error',
  FIRST_REQUEST_SUCCESS: 'first-request-success',
  FIRST_REQUEST_NO_HITS: 'first-request-no-hits',
});

export default DownloadStatus;
