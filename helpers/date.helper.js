module.exports.getTime = (d) => {
    const date = new Date(d);
    let second = date.getUTCSeconds();
    second = second > 9 ? second : `0${second}`;
    let minute = date.getUTCMinutes();
    minute = minute > 9 ? minute : `0${minute}`;
    let hour = date.getUTCHours();
    hour = hour > 9 ? hour : `0${hour}`;
    let day = date.getUTCDate();
    day = day > 9 ? day : `0${day}`;
    let month = date.getUTCMonth() + 1; // Tháng bắt đầu từ 0
    month = month > 9 ? month : `0${month}`;
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
}
// module.exports.getTime = (d) => {
//     const date = new Date(d);
//     let second = date.getSeconds();
//     second = second > 9 ? second : `0${second}`;
//     let minute = date.getMinutes();
//     minute = minute > 9 ? minute : `0${minute}`;
//     let hour = date.getHours();
//     hour = hour > 9 ? hour : `0${hour}`;
//     let day = date.getDate();
//     day = day > 9 ? day : `0${day}`;
//     let month = date.getMonth() + 1;
//     month = month > 9 ? month : `0${month}`;
//     const year = date.getFullYear();
//     return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
// }

module.exports.getDate = (d) => {
    const date = new Date(d);
    let day = date.getUTCDate();
    day = day > 9 ? day : `0${day}`;
    let month = date.getUTCMonth() + 1; // Tháng bắt đầu từ 0
    month = month > 9 ? month : `0${month}`;
    const year = date.getUTCFullYear();
    return `${year}-${month}-${day}`;
}

module.exports.getDate2 = (d) => {
    const date = new Date(d);
    let day = date.getUTCDate();
    day = day > 9 ? day : `0${day}`;
    let month = date.getUTCMonth() + 1; // Tháng bắt đầu từ 0
    month = month > 9 ? month : `0${month}`;
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
}

