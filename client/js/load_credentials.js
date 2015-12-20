const queryUser = getQueryVariable('user');
const queryPw = getQueryVariable('password');
const user = queryUser ? queryUser : localStorage.getItem('bm-user');
const pw = queryPw ? queryPw : localStorage.getItem('bm-pw');

var creds = {
  user: user,
  password: pw
};

localStorage.setItem('bm-user', user);
localStorage.setItem('bm-pw', pw);
