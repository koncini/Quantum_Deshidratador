 
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

    for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function getUserName() {
    var userName;
    $.ajax({
        url : "/basic/Portal.mwsl",
        type : "GET",
        dataType: 'html',
        cache: false,
        async: false,
        success : function(data) {
            var userNameAjax = $(data).find('#login div').text().replace(' ','').replace('(','').replace(')','');
            if(userNameAjax == '') {
                userName = 'Everybody';
            }
            else userName = userNameAjax;
        },
        error: function(xhr) {
//            alert("An error occured: " + xhr.status + " " + xhr.statusText);
            userName = 'ERROR';
        }
     });
    return userName;
}
  
  