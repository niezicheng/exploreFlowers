/**
 * 日期格式化为 YYYY-MM-DD
 * @param {Date} date
 * @returns
 */
export const formatDate = (date) => {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  month = month > 10 ? month : `0${month}`;
  day = day > 10 ? day : `0${day}`;

  return `${year}-${month}-${day}`;
}
