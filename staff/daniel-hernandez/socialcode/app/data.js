const data = {};

data.findUser = (username) => {
  const userKey = `user_${username}`.toLowerCase();
  const userKeyString = JSON.stringify(userKey);

  if (localStorage.getItem(userKeyString)) {
    return JSON.parse(localStorage.getItem(userKeyString));
  }
};

data.insertUser = (userData) => {
  // generate user key
  const userKey = `user_${userData.username}`.toLowerCase();
  const userKeyString = JSON.stringify(userKey);

  localStorage.setItem(userKeyString, JSON.stringify(userData));
};
