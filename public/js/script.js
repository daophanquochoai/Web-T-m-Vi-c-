//------JOB---------

//form search
const formSearch = document.querySelector("[form-search]");
let area = "all";
let experience = "all";
let salary = "all";
let vitri = "";


// Bắt sự kiện change trong form search
if (formSearch) {
    const inputViTri = formSearch.querySelector("input[name='vitri']");
    inputViTri.addEventListener("change", (e) => {
        vitri = e.target.value;
    });

    const selectArea = formSearch.querySelector("[select-area]");
    selectArea.addEventListener("change", () => {
        area = selectArea.value;
    });

    const selectSalary = formSearch.querySelector("[select-salary]");
    selectSalary.addEventListener("change", () => {
        salary = selectSalary.value;
    });

    const selectExperience = formSearch.querySelector("[select-experiece");
    selectExperience.addEventListener("change", () => {
        experience = selectExperience.value;
    });
}
//form search

if (formSearch) {
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();

        let url = new URL(window.location.href);
        if(url.pathname != "/jobs")
        {
            url = new URL(`${url.origin}/jobs`);
        }

        // console.log(url)
        // console.log(url.href);
   
        const inputViTri = formSearch.querySelector("input[name='vitri']");
        const selectArea = formSearch.querySelector("[select-area]");
        const selectSalary = formSearch.querySelector("[select-salary]");
        const selectExperience = formSearch.querySelector("[select-experiece");

        vitri = inputViTri.value;
        area = selectArea.value;
        experience = selectExperience.value;
        salary = selectSalary.value;

        url.searchParams.set("vitri", vitri);
        url.searchParams.set("khuvuc", area);
        url.searchParams.set("kinhnghiem", experience);
        url.searchParams.set("luong", salary);

        // console.log(url);
        // console.log(url.href);

        window.location.href = url.href;
    });
}

const objectSearch = {
    khuvuc: "all",
    kinhnghiem: "all",
    luong: "all",
    vitri: ""
};
const url = new URL(window.location.href);
// console.log(url)

if (url.search.includes("vitri")) {
    objectSearch.vitri = url.searchParams.get("vitri");
    objectSearch.khuvuc = url.searchParams.get("khuvuc");
    objectSearch.kinhnghiem = url.searchParams.get("kinhnghiem");
    objectSearch.luong = url.searchParams.get("luong");

    const inputViTri = formSearch.querySelector("input[name='vitri']");
    const selectArea = formSearch.querySelector("[select-area]");
    const selectSalary = formSearch.querySelector("[select-salary]");
    const selectExperience = formSearch.querySelector("[select-experiece");

    inputViTri.value = objectSearch.vitri;

    const itemArea = selectArea.querySelector(`option[value="${objectSearch.khuvuc}"]`);
    itemArea.selected = true;

    const itemSalary = selectSalary.querySelector(`option[value="${objectSearch.luong}"]`);
    itemSalary.selected = true;

    const itemExperience = selectExperience.querySelector(`option[value="${objectSearch.kinhnghiem}"]`);
    itemExperience.selected = true;
}

//------END JOB-----

string = `1	An Giang
    2	Bà rịa - Vũng tàu
    3	Bắc Giang
    4	Bắc Kạn
    5	Bạc Liêu
    6	Bắc Ninh
    7	Bến Tre
    8	Bình Định
    9	Bình Dương
    10	Bình Phước
    11	Bình Thuận
    12	Cà Mau
    13	Cần Thơ
    14	Cao Bằng 
    15	Đà Nẵng
    16	Đắk Lắk
    17	Đắk Nông
    18	Điện Biên
    19	Đồng Nai
    20	Đồng Tháp
    21	Gia Lai
    22	Hà Giang
    23	Hà Nam
    24	Hà Nội 
    25	Hà Tĩnh
    26	Hải Dương
    27	Hải Phòng
    28	Hậu Giang
    29	Hòa Bình
    30	Hưng Yên
    31	Khánh Hòa
    32	Kiên Giang
    33	Kon Tum
    34	Lai Châu
    35	Lâm Đồng
    36	Lạng Sơn
    37	Lào Cai
    38	Long An
    39	Nam Định
    40	Nghệ An
    41	Ninh Bình
    42	Ninh Thuận
    43	Phú Thọ
    44	Phú Yên
    45	Quảng Bình
    46	Quảng Nam
    47	Quảng Ngãi
    48	Quảng Ninh
    49	Quảng Trị
    50	Sóc Trăng
    51	Sơn La
    52	Tây Ninh
    53	Thái Bình
    54	Thái Nguyên
    55	Thanh Hóa
    56	Thừa Thiên Huế
    57	Tiền Giang
    58	Thành phố Hồ Chí Minh
    59	Trà Vinh
    60	Tuyên Quang
    61	Vĩnh Long
    62	Vĩnh Phúc
    63	Yên Bái`
const array = string.split("\n")

const array2 = array.map(item => item.split("\t")[1]);

const array3 = array2.map(item => `(N'${item}')`);

// console.log(array3.join(", "));

// link----

if(url.pathname == `/jobs`)
{
    const linkJob = document.querySelector(".section-link .link-job.link");
    linkJob.classList.add("active");

}
else if(url.pathname == `/companys`)
{
    const linkCompany = document.querySelector(".section-link .link-cmp.link");
    linkCompany.classList.add("active");
}

// ------------form search company-----
const formSearchCompany = document.querySelector("[form-search-company]");
if(formSearchCompany)
{
    if(url.href.includes("tenCT") && url.href.includes("khuvuc"))
    {
        const inputName = formSearchCompany.querySelector("input[name='tenCT']");
        const selectKV = formSearchCompany.querySelector("select[name='khuvuc']");

        const tenCT = url.searchParams.get("tenCT");
        const khuVuc = url.searchParams.get("khuvuc");

        inputName.value = tenCT;

        const itemKV = selectKV.querySelector(`option[value="${khuVuc}"]`);
        itemKV.selected = true;
    }
}


// điều hướng trang info user
const myAccount = document.querySelector("[my-account]");

if(myAccount)
{
    myAccount.addEventListener("click", () => {
        window.location.href = `${window.location.origin}/my-account?view-info=user`;
    })
}

// điều hướng trang info user


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


// -----trang công việc --- filter status -----
const buttonStatus = document.querySelectorAll("[status]");
if(buttonStatus)
{
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            let url = new URL(window.location.href);

            const status = button.getAttribute("status");
            if(status)
            {
                url.searchParams.set("status", status);
            }
            else
            {
                url.searchParams.delete("status");
            }
            
            window.location.href = url.href;
        });
    });
}
// -----end trang công việc --- filter status -----


// -----trang công việc --- sort
const sort = document.querySelector("[sort]");
if(sort)
{
    const sortSelect = sort.querySelector("select[name='sort']");
    let url = new URL(window.location.href);
    sortSelect.addEventListener("change", () => {
        let [sortKey, sortValue] = sortSelect.value.split("-");
        console.log(sortKey);
        console.log(sortValue);
        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);

        window.location.href = url.href;
    });

    // trả lại giao diện
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if(sortKey && sortValue)
    {
        const option = sortSelect.querySelector(`option[value="${sortKey}-${sortValue}"]`);
        option.selected = true;
    }

    const clearButton = sort.querySelector("[sort-clear]");
    clearButton.addEventListener("click", () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");

        window.location.href = url.href;
    });
}
// -----trang công việc --- sort


// ---------thông báo -------------

const getTime = (d) => {
    const date = new Date(d);
    let second = date.getSeconds();
    second = second > 9 ? second : `0${second}`;
    let minute = date.getMinutes();
    minute = minute > 9 ? minute : `0${minute}`;
    let hour = date.getHours();
    hour = hour > 9 ? hour : `0${hour}`;
    let day = date.getDate();
    day = day > 9 ? day : `0${day}`;
    let month = date.getMonth() + 1;
    month = month > 9 ? month : `0${month}`;
    const year = date.getFullYear();
    return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
}

socket.on("SERVER_SEND_ANNOUNCE", data => {

    const currentDate = new Date();
    const time = getTime(currentDate);

    // console.log(data);
    const listNotice = document.querySelector(`[list-notice="${data.userId}"]`);
    if(listNotice)
    {
        const html = `
            <li class="notice-item not-seen" userId="${data.userId}" maCV="${data.maCV}"> 
                <a class="notice-link" href="/announce/${data.maCV}/${data.userId}"> 
                    <img src="${data.infoCT_CV.logo}" alt="${data.infoCT_CV.tenCT}">
                    <div class="notice-item_content">
                        <span class="notice-item_tenCT">${data.infoCT_CV.tenCT}</span>
                        <span class="notice-item_tenCV">${data.infoCT_CV.tenCV}</span>
                        <span class="notice-item_time">${time}</span>
                    </div>
                </a>
            </li>
        `;
        listNotice.insertAdjacentHTML("afterbegin", html);
    }


    // Bắt lại sự kiện sau khi vẽ mới
    const listNotice2 = document.querySelectorAll(".notice-item");
    if(listNotice2)
    {
        listNotice2.forEach(item => {
            item.addEventListener("click", () => {
                if(item.classList.contains("not-seen"))
                {
                    const userId = item.getAttribute("userId");
                    const maCV = item.getAttribute("maCV");

                    socket.emit("USER_CLICK_ANNOUNCE_NOTSEEN", {
                        userId: userId,
                        maCV: maCV,
                    });
                }
            })
        })
    }

})


const badge = document.querySelector(".badge");
if(badge)
{
    const value = badge.textContent;
    if(value == "0")
    {
        badge.style.opacity = '0';
    }
}

// SERVER_SEND_LENGTH_ANNOUNCE_NOTSEEN
socket.on("SERVER_SEND_LENGTH_ANNOUNCE_NOTSEEN", data => {
    const badgeSoLuong = document.querySelector(`[badge-soLuong="${data.userId}"]`);
    if(badgeSoLuong)
    {
        if(badgeSoLuong.textContent == "0")
        {
            badge.style.opacity = '1';
        }
        badgeSoLuong.innerHTML = data.soLuongChuaXem;
    }
})


// click thì chuyển từ chưa xem -> đã xem
const listNotice = document.querySelectorAll(".notice-item");
if(listNotice)
{
    listNotice.forEach(item => {
        item.addEventListener("click", () => {
            if(item.classList.contains("not-seen"))
            {
                const userId = item.getAttribute("userId");
                const maCV = item.getAttribute("maCV");

                socket.emit("USER_CLICK_ANNOUNCE_NOTSEEN", {
                    userId: userId,
                    maCV: maCV,
                });
            }
        })
    })
}


// ---------===========job==========-----------
const ungTuyenAnimation = document.querySelectorAll(".ungTuyenAnimation");
if(ungTuyenAnimation)
{
    ungTuyenAnimation.forEach(button => {
        button.addEventListener("click", () => {
            const applied = button.getAttribute("applied");
            const dateAndStatus = button.getAttribute("dateAndStatus");
            let path = button.getAttribute("path");
            
            if(applied == "0" && dateAndStatus == "active")
            {
                path = `${url.origin}${path}`;
                url.href = path;
                url.searchParams.set("form", "applyJob")
                window.location.href = url.href;
            }
            else
            {
                window.location.href = path;
            }
        })
    })
}
// ---------===========end job==========-----------

