

window.addEventListener('load', function () {
    inputs.forEach(function (input) {
        input.setAttribute('readonly', true);
    });
    selects.forEach(function (select) {
        select.setAttribute('disabled', true);
    });

    inputsTD.forEach(function (input) {
        input.setAttribute('readonly', true);
    });
    textareasTD.forEach(function (select) {
        select.setAttribute('disabled', true);
    });
});
var inputs = document.querySelectorAll('.item input');
var selects = document.querySelectorAll('.item select');
var inputsTD = document.querySelectorAll('.item-account input');
var textareasTD = document.querySelectorAll('.item-account textarea');
var buttonSua = document.querySelector(".section-CT-body .body-trangchu .container-item .item_button button.sua");
var buttonXacNhan = document.querySelector(".section-CT-body .body-trangchu .container-item .item_button button.xac_nhan");
// sua hay khong sua
buttonSua.addEventListener("click", function () {
    buttonSua.style.display = "none";
    buttonXacNhan.style.display = "block";
    inputs.forEach(function (input) {
        input.removeAttribute('readonly'); 
    });
    selects.forEach(function(select) {
        select.removeAttribute('disabled');
    });
});

buttonXacNhan.addEventListener("click", function () {
    buttonSua.style.display = "block";
    buttonXacNhan.style.display = "none";
    inputs.forEach(function (input) {
        input.setAttribute('readonly', true);
    });
    // selects.forEach(function(select) {
    //     select.setAttribute('disabled', true);
    // });
});


const formInfoCompany = document.querySelector("[form-info-company]");



if(formInfoCompany)
{
    formInfoCompany.addEventListener("submit", (event) => {
        event.preventDefault();
    
        // thay đổi trạng thái của các phần tử textarea trước khi submit nếu không sẽ không lấy được khi post
        textareasTD.forEach(function (textarea) {
            textarea.removeAttribute('disabled');
        });
    
        formInfoCompany.submit();
    });
}

const createCompanySpan = document.querySelector(".section-CT-body .body-tintuyen .box-item-not-account span")
const formCreateCompany = document.querySelector("[form-create-company]");

if(createCompanySpan)
{
    createCompanySpan.addEventListener("click", () => {
        formCreateCompany.classList.remove("d-none");
        formCreateCompany.classList.add("d-block");
        createCompanySpan.classList.add("d-none");

        textareasTD.forEach(function (textarea) {
            textarea.removeAttribute('disabled');
        });
    
        inputsTD.forEach(function (input) {
            input.removeAttribute('readonly'); // co nay roi ma
        });
    })
}



// chuyen trang
let trangchu = document.getElementsByClassName("item-trangchu")[0]
let tintuyen = document.getElementsByClassName("item-tintuyen")[0]
let page_trangchu = document.getElementsByClassName("body-trangchu")[0]
let page_tintuyen = document.getElementsByClassName("body-tintuyen")[0]



const trangChuClick = () => {
    page_tintuyen.style.display = "none";
    page_trangchu.style.display = "block";
    trangchu.classList.add("active")
    tintuyen.classList.remove("active")
};

const tinTuyenClick = () => {
    page_tintuyen.style.display = "block";
    page_trangchu.style.display = "none";
    trangchu.classList.remove("active")
    tintuyen.classList.add("active")
}

var url = new URL(window.location.href);

trangchu.addEventListener("click", () => {
    trangChuClick();
    url.searchParams.set("view-info", "user")
    window.location.href = url.href;
})


tintuyen.addEventListener("click", () => {
    tinTuyenClick();
    url.searchParams.set("view-info", "company")
    window.location.href = url.href;
})

if (url.href.includes("view-info")) {
    const content = url.searchParams.get("view-info");
    if (content == "user") {
        trangChuClick();
    } else if (content == "company") {
        tinTuyenClick();
    }
}


// const divImage = document.querySelector(".section-CT-body .body-tintuyen .box-item-account .item-account .anhcongty");
// const inputImage = document.querySelector(".section-CT-body .body-tintuyen .box-item-account .item-account.box_anh_dai_dien input")

// console.log(divImage)
// console.log(inputImage)

// inputImage.addEventListener('change', function() {
//     const file = this.files[0]; // Lấy tệp được chọn
//     if (file) {
//         const reader = new FileReader(); // Tạo một FileReader để đọc tệp
//         reader.onload = function() {
//             // Khi tệp được đọc thành công, hiển thị hình ảnh trong div
//             divImage.innerHTML = '<img style="width:100%;height:100%;" src="' + reader.result + '" alt="Preview">';
//             divImage.style.display = 'block'; // Hiển thị div
//         }
//         reader.readAsDataURL(file); // Đọc tệp dưới dạng URL dữ liệu
//     }
// });
// 
// divImage.addEventListener("click", ()=>{
//     inputImage.click();
// })


//preview image upload COMPANY
const imagePreview = document.querySelector("[image-preview]");

const imagePreviewFunction = () => {
    const imagePreviewInput = imagePreview.querySelector("[image-preview-input]");
    const imagePreViewSee = imagePreview.querySelector("[image-preview-see]");

    imagePreviewInput.click();

    imagePreviewInput.addEventListener("change", () => {
        const [file] = imagePreviewInput.files;
        if (file) {
            imagePreViewSee.src = URL.createObjectURL(file);
        }
    });
}

const iconChangeImgCompany = document.querySelector(".icon-img-company");
if (iconChangeImgCompany) {
    iconChangeImgCompany.addEventListener("click", () => {
        imagePreviewFunction();
    });
}

//preview image upload


//preview image upload USER
const imagePreviewUser = document.querySelector("[image-preview-avatar-user]");
const formUserUpdateAvatar = document.querySelector("[form-user-update-avatar]");

// console.log(formUserUpdateAvatar)


const imagePreviewUserFunction = () => {
    const imagePreviewInput = imagePreviewUser.querySelector("[image-preview-input]");
    const imagePreViewSee = imagePreviewUser.querySelector("[image-preview-see]");

    // console.log(imagePreviewInput)
    // console.log(imagePreViewSee)

    imagePreviewInput.click();

    imagePreviewInput.addEventListener("change", () => {
        const [file] = imagePreviewInput.files;
        if (file) {
            Swal.fire({
                title: 'Bạn có muốn cập nhật ảnh đại diện?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Cập nhật',
                cancelButtonText: 'Hủy',
              }).then((result) => {
                if (result.isConfirmed) {
                    imagePreViewSee.src = URL.createObjectURL(file);
                    formUserUpdateAvatar.submit();
                }
              })
        }
    });
}

const iconChangeImgUser = document.querySelector(".icon-change-img-user");
if (iconChangeImgUser) {
    iconChangeImgUser.addEventListener("click", () => {
        imagePreviewUserFunction();
    });
}
//preview image upload USER

// preview image upload logo company when create
const imagePreviewCreateCompany = document.querySelector("[image-preview-create-company]");

const imagePreviewCreateCompanyFunction = () => {
    const imagePreviewInput = imagePreviewCreateCompany.querySelector("[image-preview-input]");
    const imagePreViewSee = imagePreviewCreateCompany.querySelector("[image-preview-see]");

    imagePreviewInput.click();

    imagePreviewInput.addEventListener("change", () => {
        const [file] = imagePreviewInput.files;
        if (file) {
            imagePreViewSee.src = URL.createObjectURL(file);
        }
    });
}


const iconCreateImgCompany = document.querySelector(".icon-create-img-company");
if (iconCreateImgCompany) {
    iconCreateImgCompany.addEventListener("click", () => {
        imagePreviewCreateCompanyFunction();
    });
}

// preview image upload logo company when create

// preview image upload logo company when update

const iconUpdateImgCompany = document.querySelector(".icon-change-img-company");
if (iconUpdateImgCompany) {
    iconUpdateImgCompany.addEventListener("click", () => {
        imagePreviewCreateCompanyFunction();
    });
}

// preview image upload logo company when create




var buttonSuaTD = document.querySelector(".section-CT-body .body-tintuyen .box-item-account .item-account-button button.account-sua");
var buttonXacNhanTD = document.querySelector(".section-CT-body .body-tintuyen .box-item-account .item-account-button button.account-xac_nhan");
// sua hay khong sua
if(buttonSuaTD)
{
    buttonSuaTD.addEventListener("click", function () {
        buttonSuaTD.style.display = "none";
        buttonXacNhanTD.style.display = "block";
        inputsTD.forEach(function (input) {
            input.removeAttribute('readonly');
        });
        textareasTD.forEach(function (select) {
            select.removeAttribute('disabled');
        });
    });
}

if(buttonXacNhanTD)
{
    buttonXacNhanTD.addEventListener("click", function () {
        buttonSuaTD.style.display = "block";
        buttonXacNhanTD.style.display = "none";
        inputsTD.forEach(function (input) {
            input.setAttribute('readonly', true);
        });
        textareasTD.forEach(function (select) {
            select.setAttribute('disabled', true);
        });
    });
}


// ----------------------------form user----------------
const formUser = document.querySelector("[form-user]");
const errorDisplay = document.querySelector("#errorDisplay");
const inputName = formUser.querySelector("input[name='name']");
const inputEmail = formUser.querySelector("input[name='email']");

inputName.addEventListener("change", (e) => {
    console.log(e.target.value);
});

// formUser.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if(inputName.value.trim() === "") {
//         errorDisplay.style.display = "inline-block";
//         errorDisplay.textContent = "Tên không được để trống!";
//     }
//     else if(inputEmail.value.trim() === "")
//     {
//         errorDisplay.style.display = "inline-block";
//         errorDisplay.textContent = "Email không được để trống!";
//     } 
//     else if(!inputEmail.value.trim().match(emailRegex))
//     {
//         errorDisplay.style.display = "inline-block";
//         errorDisplay.textContent = "Email không đúng định dạng!";
//     } 
//     else {
//         // Nếu input không trống, submit form
//         formUser.submit();
//     }

// })

//alert
const alert = document.querySelector("[show-alert]");
if (alert) {
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