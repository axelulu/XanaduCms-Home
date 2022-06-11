import File from 'fetch-blob/file.js'

export const zeroFill = (value: string | number, length = 2) => (value + '').padStart(length, '0')

export const formatDate = (dateString?: string | Date, format = 'YYYY-MM-DD') => {
    const date = new Date(dateString || '')

    const year = date.getFullYear()
    const month = zeroFill((date.getMonth() + 1))
    const d = zeroFill((date.getDate()))
    const hours = zeroFill(date.getHours())
    const minutes = zeroFill(date.getMinutes())
    const seconds = zeroFill(date.getSeconds())

    return format.replace(/YYYY/i, year + '')
        .replace(/MM/, month)
        .replace(/DD/i, d)
        .replace(/hh/i, hours)
        .replace(/mm/i, minutes)
        .replace(/ss/i, seconds)
}

// 图片转为base64格式
export const imageToBase64 = (img) => {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    var dataURL = canvas.toDataURL("image/jpeg" + ext);
    return dataURL;
};

export const base64ToFile = (urlData, fileName) => {
    let arr = urlData.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bytes = atob(arr[1]); // 解码base64
    let n = bytes.length
    let ia = new Uint8Array(n);
    while (n--) {
        ia[n] = bytes.charCodeAt(n);
    }
    return new File([ia], fileName, { type: mime });
}

export const fileToBase64 = (file) => {
    return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = <string | ArrayBuffer>"";
        reader.readAsDataURL(file);
        reader.onload = function () {
            imgResult = reader.result;
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.onloadend = function () {
            resolve(imgResult);
        };
    });
}