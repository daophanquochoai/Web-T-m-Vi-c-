let dangky = document.getElementsByClassName("dangky")[0]
let form_left = document.getElementsByClassName("form-left")[0]
let form_right = document.getElementsByClassName("form-right")[0]
let dangnhap = document.getElementsByClassName("dangnhap")[0]
let quenmk = document.getElementsByClassName("quenmk")[0]
let box_overplay = document.getElementsByClassName("box-overplay")[0]

let res_dangky = document.getElementsByClassName("res-dangky")[0]
let res_qmk = document.getElementsByClassName("res-qmk")[0]
let res_dangnhap = document.getElementsByClassName("res-dangnhap")[0]

let box_left = document.getElementsByClassName("box-left")[0]
let box_right = document.getElementsByClassName("box-right")[0]

var url = new URL(window.location.href);

const dangky_click =  ()=>{
    dangnhap.style.display = "block"
    dangky.style.display = "none"
    quenmk.style.display = "none"
    form_left.style.display = "flex"
    form_right.style.display = "none"
    box_overplay.classList.remove("box-dangdangnhap-click")
    box_overplay.classList.add("box-dangky-click")
    res_dangnhap.style.display = "block"
    res_dangky.style.display = "none"
    res_qmk.style.display = "none"

    
}
const dangnhap_click = ()=>{
    dangnhap.style.display = "none"
    dangky.style.display = "block"
    quenmk.style.display = "block"
    form_right.style.display = "flex"
    form_left.style.display = "none"
    box_overplay.classList.add("box-dangdangnhap-click")
    box_overplay.classList.remove("box-dangky-click")
    res_dangnhap.style.display = "none"
    res_dangky.style.display = "block"
    res_qmk.style.display = "block"

    
}
const dangky_click_res =  ()=>{
    dangnhap.style.display = "block"
    dangky.style.display = "none"
    quenmk.style.display = "none"
    form_left.style.display = "flex"
    form_right.style.display = "none"
    box_overplay.classList.remove("box-dangdangnhap-click")
    box_overplay.classList.add("box-dangky-click")
    res_dangnhap.style.display = "block"
    res_dangky.style.display = "none"
    res_qmk.style.display = "none"
    // responsive 
    box_left.style.display = "block"
    box_right.style.display = "none"
}
const dangnhap_click_res = ()=>{
    dangnhap.style.display = "none"
    dangky.style.display = "block"
    quenmk.style.display = "block"
    form_right.style.display = "flex"
    form_left.style.display = "none"
    box_overplay.classList.add("box-dangdangnhap-click")
    box_overplay.classList.remove("box-dangky-click")
    res_dangnhap.style.display = "none"
    res_dangky.style.display = "block"
    res_qmk.style.display = "block"
    // responsive 
    box_right.style.display = "block"
    box_left.style.display = "none"
}
// su kien nhan dang ki
dangky.addEventListener("click",dangky_click)
dangky.addEventListener("click",() => {
    url.href = `${url.origin}/user`;
    url.searchParams.set("view", "register")
    window.location.href = url.href;
})

res_dangky.addEventListener("click",dangky_click_res)
//su kien nhan dang nhap
dangnhap.addEventListener("click", dangnhap_click)
dangnhap.addEventListener("click", () => {
    url.href = `${url.origin}/user`;
    url.searchParams.set("view", "login");
    window.location.href = url.href;
})
res_dangnhap.addEventListener("click", dangnhap_click_res)


if (url.href.includes("view")) {
    const content = url.searchParams.get("view");
    if (content == "login") {
        dangnhap_click();
    } else if (content == "register") {
        dangky_click();
    }
}



quenmk.addEventListener("click" , () => {
    url.href = `${url.origin}/user/password/forgot`;
    console.log(url);
    window.location.href = url.href;
})


// bắt sự kiện khi responsive 
const respon =  ()=>{
    var windowWidth = windowReference.innerWidth;
    if (windowWidth <= 800) {
        if(dangky.style.display == "none"){
            box_right.style.display = "none"
            res_dangnhap.style.display = "block"
            res_dangky.style.display = "none"
            res_qmk.style.display = "none"
        }
        else{
            box_left.style.display = "none"
            res_dangnhap.style.display = "none"
            res_dangky.style.display = "block"
            res_qmk.style.display = "block"
        }
    }
    if (windowWidth > 800) {
        if(dangky.style.display == "none"){
            box_right.style.display = "block"
        }
        else{
            box_left.style.display = "block"
        }
    }
}
let windowReference = window;
windowReference.addEventListener('resize',respon)
windowReference.addEventListener('load',respon)


//alert
const alert = document.querySelector("[show-alert]");
if(alert)
{
    let time = alert.getAttribute("data-time");
    time = parseInt(time);
    setTimeout(() => {
        alert.classList.add("alert-hidden");
    }, time);

    const closeAlert = alert.querySelector("[close-alert]");
    closeAlert.addEventListener("click", () => {
        alert.classList.add("alert-hidden");
    });
}
//end alert