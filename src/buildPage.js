function makeFile(textToWrite) {
    var textFileAsBlob = new Blob([textToWrite], {
            type: 'text/json'
        });

   return textFileAsBlob;
}

function postRequest(url, json, file) {
    var xhr, data;
    var boundary = '------------' + Date.now().toString();

    xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-type", "multipart/mixed; boundary=" + boundary);
    xhr.setRequestHeader("X-Csrf-Token", localStorage['XSRF.Token']);
    
    data = '--' + boundary + '\r\n';
    data += 'Content-Disposition: form-data; name="fileDescription"\r\n';
    data += 'Content-Type: application/json\r\n\r\n';
    data += json + '\r\n\r\n';
    data += '--' + boundary + '\r\n';
    data += 'Content-Disposition: form-data; name="fileData"; filename="userData.json"\r\n';
    data += 'Content-Type: text/plain\r\n\r\n';
    data += file + '\r\n\r\n';
    data += '--' + boundary + '--';
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log('Status: ' + xhr.status);
            console.log(xhr.response);
            console.log(xhr);
        }
    };

    xhr.send(data); 
}

function getRequest(url) {
    var xhr;

    xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log('Status: ' + xhr.status);
            console.log(xhr);
        }
    };

    xhr.send();
}

// Trying to get a file from user folder
//getRequest('/d2l/api/le/1.14/locker/myLocker/test%20file.html');

// Create folder
//var folder = ["Created with API"];
//postRequest('/d2l/api/le/1.14/locker/myLocker/', JSON.stringify(folder));

// Create file
var fileDescription = [{
        "Description": "userData",
        "IsPublic": true
    }];
var dataToSave = {
    "someData": "Here is some data"
}
postRequest('/d2l/api/le/1.14/locker/myLocker/', JSON.stringify(fileDescription), JSON.stringify(dataToSave));