let trangchu = document.getElementsByClassName("item-trangchu")[0]
let tintuyen = document.getElementsByClassName("item-tintuyen")[0]
let page_trangchu = document.getElementsByClassName("body-trangchu")[0]
let page_tintuyen = document.getElementsByClassName("body-tintuyen")[0]
trangchu.addEventListener("click", ()=>{
    page_tintuyen.style.display = "none";
    page_trangchu.style.display = "block";
    trangchu.classList.add("active")
    tintuyen.classList.remove("active")
})
tintuyen.addEventListener("click", ()=>{
    page_tintuyen.style.display = "block";
    page_trangchu.style.display = "none";
    trangchu.classList.remove("active")
    tintuyen.classList.add("active")
})