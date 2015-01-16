angular.module('safePassword', ['ui.bootstrap']);
angular.module('safePassword').controller('safePasswordCtrl', function ($scope) {
    $scope.userDataList = [
        {
            name : " ",
            value : " ",
            other : " ",
            showPassword: false
        }
    ];
    $scope.passwordStar = "****";
    $scope.more = function(){
        $scope.userDataList.push({
            name : " ",
            value : " ",
            other : " ",
            showPassword: false
        });
    }

    var JsonFormatter = {
        stringify: function (cipherParams) {
            // create json object with ciphertext
            var jsonObj = {
                ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
            };

            // optionally add iv and salt
            if (cipherParams.iv) {
                jsonObj.iv = cipherParams.iv.toString();
            }
            if (cipherParams.salt) {
                jsonObj.s = cipherParams.salt.toString();
            }

            // stringify json object
            return JSON.stringify(jsonObj);
        },

        parse: function (jsonStr) {
            // parse json string
            var jsonObj = JSON.parse(jsonStr);

            // extract ciphertext from json object, and create cipher params object
            var cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
            });

            // optionally extract iv and salt
            if (jsonObj.iv) {
                cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv)
            }
            if (jsonObj.s) {
                cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s)
            }

            return cipherParams;
        }
    };

    $scope.encrypt = function(){
        $scope.encrypted = CryptoJS.AES.encrypt($scope.plainText, "Secret Passphrase", { format: JsonFormatter });
    }


   /* alert(encrypted); // {"ct":"tZ4MsEnfbcDOwqau68aOrQ==","iv":"8a8c8fd8fe33743d3638737ea4a00698","s":"ba06373c8f57179c"}*/

    $scope.decrypt = function(){
        $scope.decrypted = CryptoJS.AES.decrypt($scope.encrypted, "Secret Passphrase", { format: JsonFormatter }).toString(CryptoJS.enc.Utf8);
    }

    /*alert(decrypted.toString(CryptoJS.enc.Utf8)); // Message*/

/*

    // create a file writer object
    function CreateFileWriter()
    {
        // request the file system object
        window.requestFileSystem( LocalFileSystem.PERSISTENT, 0, OnFileSystemSuccess,fail);
    }

    function OnFileSystemSuccess( pFileSystemObj )
    {
        console.log( pFileSystemObj.name );
        console.log( pFileSystemObj.root.name );

        pFileSystemObj.root.getFile( "file_name.txt", {create: true, exclusive: false}, OnFileGetSuccess, fail);
    }

    function OnFileGetSuccess( pFileEntryObj )
    {
        pFileEntryObj.createWriter( function(pWriterObj){
            gWriterObj  = pWriterObj;
        }, fail );
    }

    function fail(evt)
    {
        console.log(evt.target.error.code);
    }

*/



});