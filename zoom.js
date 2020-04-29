(function(){
    console.log('checkSystemRequirements');
    console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

    // it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
    // if (!china) ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.4/lib', '/av'); // CDN version default
    // else ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.7.4/lib', '/av'); // china cdn option 
    // ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/@zoomus/websdk/dist/lib', '/av'); // Local version default, Angular Project change to use cdn version
    ZoomMtg.setZoomJSLib('https://dmogdx0jrul3u.cloudfront.net/1.7.4/lib', '/av');
    ZoomMtg.preLoadWasm();

    ZoomMtg.prepareJssdk();
    
    var API_KEY = 'YOUR_API_KEY';

    /**
     * NEVER PUT YOUR ACTUAL API SECRET IN CLIENT SIDE CODE, THIS IS JUST FOR QUICK PROTOTYPING
     * The below generateSignature should be done server side as not to expose your api secret in public
     * You can find an eaxmple in here: https://marketplace.zoom.us/docs/sdk/native-sdks/web/essential/signature
     */
    var API_SECRET = '';

    (function(){
        var meetConfig = {
            apiKey: API_KEY,
            apiSecret: API_SECRET,
            meetingNumber: parseInt(document.getElementById('meeting_number').value),
            userName: document.getElementById('display_name').value,
            passWord: "<% $meeting_pw %>",
            leaveUrl: "https://zoom.us",
            role: 0
        };

        // see zoom-signature.pl for the Perl implementation
        // doc: https://marketplace.zoom.us/docs/sdk/native-sdks/web/essential/signature
        var signature = '<% $sig2 %>';

        ZoomMtg.init({
            leaveUrl: 'http://www.zoom.us',
            isSupportAV: true,
            disableInvite: true,
            screenShare: false,
            isSupportChat: true,
            success: function () {
                ZoomMtg.join(
                    {
                        meetingNumber: meetConfig.meetingNumber,
                        userName: meetConfig.userName,
                        signature: signature,
                        apiKey: meetConfig.apiKey,
                        userEmail: '<% $email %>',
                        passWord: meetConfig.passWord,
                        success: function(res){
                            $('#nav-tool').hide();
                            console.log('join meeting success');
                        },
                        error: function(res) {
                            console.log(res);
                        }
                    }
                );
            },
            error: function(res) {
                console.log(res);
            }
        });
    })();
})();
