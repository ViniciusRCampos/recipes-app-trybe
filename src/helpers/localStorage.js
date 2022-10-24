function setLocalStorage(token) {
  localStorage.setItem('user', JSON.stringify(token));
}

function getLocalStorage() {
  localStorage.getItem('user');
}
export {
  setLocalStorage,
  getLocalStorage,
};
