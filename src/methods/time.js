const formatTimestampToDateString = timeString => {
  if (timeString === '-/-/-') return '-/-/-';

  const timestamp = Date.parse(timeString);
  const date = new Date(timestamp);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${day > 9 ? day : `0${day}`}/${month > 9 ? month : `0${month}`}/${year}`;
};

const formatTimestampToDateStringWithTime = timeString => {
  if (timeString === '-/-/-') return '-/-/-';

  const timestamp = Date.parse(timeString);
  const date = new Date(timestamp);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${year}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}
  ${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
};

export { formatTimestampToDateString, formatTimestampToDateStringWithTime };
