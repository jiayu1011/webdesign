Request = {
  QueryString : function(oUname){
  var svalue = location.search.match(new RegExp("[\?\&]" + oUname + "=([^\&]*)(\&?)","i"));
  return svalue ? svalue[1] : svalue;
  }
  }
  alert(Request.QueryString("oUname"));