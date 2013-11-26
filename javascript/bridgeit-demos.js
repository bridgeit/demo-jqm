window.echoHub = 'http://api.bridgeit.mobi/echo/';
window.pushHub = 'http://api.bridgeit.mobi/push/';
window.apiKey = '197EBF31-40CD-444F-826F-10158A0F3581';

bridgeit.launchFailed = function(){
    document.getElementById('appStoreLink').href = bridgeit.appStoreURL();
    var popup = document.getElementById('getBridgeItPopup');
    popup.style.opacity = 0.95;
    popup.style.display = 'block';
    var vwidth = document.body.clientWidth;
    //center popup with 30px padding of body
    //popup.style.marginLeft = '' + ((vwidth*0.4)/2)-30 + 'px';
}
bridgeit.notSupported = function(id, command){
    if( !bridgeit.isIOS() && !bridgeit.isAndroid() && !bridgeit.isWindowsPhone8()){
        alert('Would you like to try the full mobile experience with BridgeIt? Grab an iOS, Android, or Windows 8 Phone device and try it out!');
    }
    else{
        alert('Sorry, the command ' + command + ' for BridgeIt is not supported on this platform');
    }
}
function closeGetBridgeItPopup(){
    var popup = document.getElementById('getBridgeItPopup');
    popup.style.opacity = 0;
    popup.style.display = 'none';
    return true;
}
function ajaxGet(url,cb){
    var request;
    if( window.XMLHttpRequest){
        request = new XMLHttpRequest();
    }
    else if( window.ActiveXObject ){
        try{
            request = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e){
            try{
                request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e){}
        }
    }
    if( !request ){
        console.log("Unable to invoke XMLHttpRequest for " + url);
        return false;
    }
    request.onreadystatechange = function(){
        if (request.readyState === 4) {
            if (request.status === 200) {
                cb(request.responseText);
            } else {
                console.log("XMLHttpRequest for " + url +
                        " with status " + request.status);
            }
          }
    }
    request.open('GET', url);
    request.send();
}
function simpleTime()  {
    var now = new Date();
    return now.getHours() + ":" + 
    ("00" + now.getMinutes()).slice(-2) + ":" +
    ("00" + now.getSeconds()).slice(-2);
}
function hasClassList(){
    return "document" in self && (
                "classList" in document.createElement("_") &&
                "classList" in document.createElementNS("http://www.w3.org/2000/svg", "svg")
        );
}

//move pause and resume to ICEpush when ready
function pausePush()  {
   if (window.ice && ice.push)  {
       ice.push.connection.pauseConnection();
   }
}
function resumePush()  {
   if (window.ice && ice.push)  {
       ice.push.connection.resumeConnection();
   }
}
function setMinContentHeight(){
    var minContentHeight = $(window).height() - 80;
    $("div[data-role='content']").each(function(idx, elem){
        elem.style.minHeight = '' + minContentHeight + 'px';
    });
}
window.addEventListener('onorientationchange', setMinContentHeight, false);


document.addEventListener("webkitvisibilitychange", function () {
    if (document.webkitHidden)  {
        pausePush();
    } else {
        resumePush();
    }
});

document.addEventListener("visibilitychange", function () {
    if (document.hidden)  {
        pausePush();
    } else {
        resumePush();
    }
});
