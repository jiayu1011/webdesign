import axios from "axios"
const login = (e) => {
    e.preventDefault()
    let loginForm = document.getElementById('login_form')
    let data = new FormData(loginForm)
    let dataJson = {}
    data.forEach((item, key) => {
        dataJson[key] = item
    })
    console.log(dataJson)
    axios.post('http://localhost:3000/api/login', dataJson, {
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res => {
        console.log(res)
    })



}



const fnLogin = () => {
    
    async function executeUpsert (book) {
        try {
            const cloudDBZoneResult = await cloudDBZone.executeUpsert(book);
            console.log('upsert' + cloudDBZoneResult + 'record' );
        } catch (e) {
            console.log(e);
        }
    }
    var oUname = document.getElementById("uname")
    var oUpass = document.getElementById("upass")
    var oError = document.getElementById("error_box")
    var isError = true;
    
    if (oUname.value.length > 20 || oUname.value.length < 6) {
      oError.innerHTML = "用户名请输入6-20位字符";
      isError = false;
      return;
    }
    else if((oUname.value.charCodeAt(0)>=48) && (oUname.value.charCodeAt(0)<=57)){
      oError.innerHTML = "首字符必须为字母";
      return;
    }
    else for(var i=0;i<oUname.value.charCodeAt(i);i++){
      if((oUname.value.charCodeAt(i)<48)||(oUname.value.charCodeAt(i)>57) && (oUname.value.charCodeAt(i)<97)||(oUname.value.charCodeAt(i)>122))
      {
        oError.innerHTML = "必须为字母跟数字组成";
        return;
      }
    }
    
    if (oUpass.value.length > 20 || oUpass.value.length < 6) {
     oError.innerHTML = "密码请输入6-20位字符"
     isError = false;
     return;
    }
    var user=
    {
        username : oUname,
        password : oUpass
    }
   
    executeUpsert(user);
    
    window.alert("登录成功");
    window.location.href='../../webindex/webdesign.html';
}

(function (){
    document.getElementById('login_form').addEventListener('submit', login)

}())


