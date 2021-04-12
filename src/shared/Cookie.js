const getCookie = (key) => {
  let value = ";" + document.cookie;
  let parts = value.split(`;${key}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};
const setCookie = (key, value, exp = 24) => {
  let date = new Date();
  date.setTime(date.getTime() + exp *60 * 60 * 1000);
  document.cookie = `${key}=${value};expires=${date.toUTCString()};path=/`;
};
const deleteCookie = (key) => {
  let date = new Date("2020-01-01").toUTCString();
  console.log("expired!", date);
  document.cookie = key + "=; expires=" + date;
};
export { getCookie, setCookie, deleteCookie };
