//它用于验证表单中的多个字段
function validate() {
    const errorElement = document.getElementById('error');
    const successElement = document.getElementById('success');
    errorElement.innerHTML = '';// 清空错误消息
    successElement.innerHTML = '';// 清空成功消息
    const rules = [
      { 'element': 'username', 'validationFunction': usernameValidation},
      { 'element': 'password', 'validationFunction': passwordValidation},
      { 'element': 'dob', 'validationFunction': dobValidation}, 
      { 'element': 'gender', 'validationFunction': genderValidation},  
      { 'element': 'country-select', 'validationFunction': countryValidation },
      { 'element': 'hobbies', 'validationFunction': hobbyValidation },
      { 'element': 'newsletter', 'validationFunction': newsletterValidation },

    ];

//添加一个累加错误显示的东西
    let hasErrors =false;//标记错误

    for (const rule of rules) {
      const errorString = rule.validationFunction();
      document.getElementById(rule.element).style = 'border: 1px black solid';
      if (errorString !== '') {
        hasErrors = true;//找到错误
        errorElement.innerHTML += errorString + '<br>'; // 累加错误消息
        document.getElementById(rule.element).style = 'border: 3px red solid';//标记

      }
    }

    if (!hasErrors) {
        successElement.innerHTML = 'The validation finished successfully';
    }
    
    return !hasErrors; // 返回验证是否通过

  }


    




  //这是有关用户名的检测
  function usernameValidation() {
    const username = document.getElementById('username');
    if (username.value.length === 0) {
      return 'Username is empty';
    }
    //用于检测用户名是否是空的
    for (const char of username.value) {
      if (char.toLowerCase().codePointAt() < 65 || char.toLowerCase().codePointAt() > 122) {
        return 'There is non-letter character in the username';
      }
    }
    //检测用户的输入用户名是否符号标准，上面用codepointat检测用户名的字母值范围，再此范围外的即被判定为不合规

    if (username.value.length < 4) {
      return 'The username is too short';
    }
    return '';
  }


 //密码长度检测
  function passwordValidation() {
    const password = document.getElementById('password');
    if (password.value.length < 4) {
      return 'Password is too short';
    }
    return '';
  }


  //年龄检测
  function dobValidation() {
    const dob = document.getElementById('dob');
    const dobAsDate = new Date(dob.value);
  
    if (dob.value.length === 0) {
      return 'Date of Birth cannot be empty';
    }

    const age = new Date().getFullYear() - dobAsDate.getFullYear();
    if (age < 18) {
      return "You are too young";
    }

    if (age > 130) {
      return "Your age is unreal";
    }

    return '';
  }
 

  //性别检测
  function genderValidation() {
    var maleChecked = document.querySelector('#male:checked');
    var femaleChecked = document.querySelector('#female:checked');

    if (!maleChecked && !femaleChecked) { 
      return 'Gender is not checked';
    }
    return '';
  }

  // 绑定表单提交事件
  document.querySelector('form').addEventListener('submit', function(event) {
    const isValid = validate();
    if (!isValid) {
      event.preventDefault(); // 阻止表单提交
    }
  });

  //验证国家选择
  function countryValidation() {
    const countrySelect = document.getElementById('country-select');
    if (countrySelect.value === '') {
      return 'Please select a country.';
    }
    return '';
  }



  //验证爱好选择
  function hobbyValidation() {
    const hobby = document.getElementById('hobbies');
    if (hobby.value.trim() === '') {
      return 'Please enter your hobbies';
    }
    return '';
  }

  //验证是否接收复选框
  function newsletterValidation(){
    if(!document.querySelector("#newsletter:checked")){
        return 'Please check the newsletter checkbox,if you want to receive news';
    }
    return '';
  }