// alert function
function handleAlert(alertSelector) {
    const alert = document.querySelector(alertSelector);
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
}


//alert
handleAlert("[show-alert]");
//end alert

// ------------Trang công việc --------------
const buttonStatusJob = document.querySelectorAll("[status-job]");
if(buttonStatusJob)
{
    const formStatusJob = document.querySelector("[form-status-job]")
    buttonStatusJob.forEach(button => {
        let url = new URL(window.location.href);
        button.addEventListener("click", () => {
            const status = button.getAttribute("status-job");
            const hetHan = button.getAttribute("hetHan");

            if(!hetHan)  // nếu chưa hết hạn thì mới cho thay đổi trạng thái còn tuyển hay không
            {
                const maCV = button.getAttribute("maCV");
                const changeStatus = (status == "1" ? "0" : "1");
                
                const path = formStatusJob.getAttribute("path");
                const action = `${path}/${changeStatus}/${maCV}?_method=PATCH`;
                formStatusJob.action = action;
                formStatusJob.submit();
            }
            else
            {
                let alert = document.querySelector("[alert]");
                alert.classList.remove("d-none");
                handleAlert("[alert]");
            }
        })
    })
}

// ----đoạn code cho nút sửa ----
const handleEditButton = (button, tooltip, formEdit, slug) => {
    const value = parseInt(button.getAttribute("button-edit"));
    const hetHan = button.getAttribute("hetHan");

    if (hetHan) 
    { 
        button.disabled = true;
        tooltip.title = "Bạn không thể sửa thông tin vì công việc đã hết hạn";
    } 
    else 
    {
        if (value === 0) 
        { 
            button.disabled = true;
            tooltip.title = "Bạn không thể sửa thông tin vì đã có người nộp đơn";
        } 
        else 
        {
            button.disabled = false;
            button.addEventListener("click", () => {
                const path = formEdit.getAttribute("path");
                const action = `${path}/edit/${slug}`;
                formEdit.action = action;
                formEdit.submit();
            });
        }
    }
}

const buttonEditJob = document.querySelectorAll("[button-edit-job]");
if(buttonEditJob)
{
    const formEdit = document.querySelector("[form-edit]");
    buttonEditJob.forEach(button => {

        let tooltip = button.closest("[data-toggle='tooltip']");
        const value = parseInt(button.getAttribute("button-edit"));
        const hetHan = button.getAttribute("hetHan");
        const slug = button.getAttribute("slug");

        handleEditButton(button, tooltip, formEdit, slug);
    })
}

// --- xóa công việc ----
const buttonDeleteJob = document.querySelectorAll("[button-delete-job]");
if(buttonDeleteJob)
{
    const formDelete = document.querySelector("[form-delete]");
    buttonDeleteJob.forEach(button => {
        let tooltip = button.closest("[data-toggle='tooltip']");
        const value = parseInt(button.getAttribute("button-delete"));
        const slug = button.getAttribute("slug");

        if (value == 0) 
        { 
            button.disabled = true;
            tooltip.title = "Bạn không thể xóa công việc vì đã có người nộp đơn";
        } 
        else 
        {
            button.disabled = false;
            button.addEventListener("click", () => {
                const path = formDelete.getAttribute("path");
                const action = `${path}/delete/job/${slug}?_method=PATCH`;
                formDelete.action = action;
                Swal.fire({
                    title: 'Bạn có muốn xóa công việc này không?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Xóa',
                    cancelButtonText: 'Hủy',
                }).then((result) => {
                    if (result.isConfirmed) {
                        formDelete.submit();
                    }
                })
            });
        }
    });
}
// ------------Trang công việc --------------


// ---------------trang chi tiết CV  civi--------------
const closeX = document.querySelector(".box-close i");
if(closeX)
{
    console.log("x");
}

const closeModal = (e, modal) => {
    e.addEventListener("click", () => {
        modal.style.display = "none"; 
    })
}

const buttonActions = document.querySelectorAll("[button-action]");
if(buttonActions)
{
    buttonActions.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("modal_id");
            const modal = document.querySelector(`[modalId="${value}"]`);
            modal.style.display = "flex";

            closeX.addEventListener("click", () => {
                modal.style.display = "none";
            })

            const formAcctionCV = modal.querySelector("[form-action-cv]");
            formAcctionCV.addEventListener("submit", (e) => {
                e.preventDefault();

                const buttonSubmit = formAcctionCV.querySelector("[button-submit]");
                const type = buttonSubmit.getAttribute("button-submit"); // accept / reject
                const inputType = formAcctionCV.querySelector(`input[name="type"]`);
                inputType.value = type;
                const userId = buttonSubmit.getAttribute("userId");
                const maCV = buttonSubmit.getAttribute("maCV");
                const thongBao = formAcctionCV.querySelector("#thongBao");

                modal.style.display = "none";

                socket.emit("COMPANY_SEND_ANNOUNCE", {
                    userId: userId,
                    maCV: maCV,
                    type: type,
                    thongBao: thongBao.value
                });
            })
        })
    })
}



const thongBaoDiv = document.querySelector("[thongBao]");
if(thongBaoDiv)
{
    let thongBao = thongBaoDiv.getAttribute("thongBao");
    if(thongBao != "")
    {
        thongBao = JSON.parse(thongBao);
        
        const buttonActions = document.querySelectorAll("[button-action]");
        buttonActions.forEach(button => {
            button.disabled = true;
        });

        if(thongBao.ketQua == true)
        {
            let html = `

            <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </symbol>
                <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </symbol>
                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </symbol>
            </svg>


                <div class="alert alert-success d-flex align-items-center" role="alert" style=" margin-top:  10px;width: 300px; margin-bottom: 0px">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                    <div>
                        Bạn đã chọn CV này!
                    </div>
                </div>
            `
            thongBaoDiv.innerHTML = html;
        }
        else
        {
            let html = `

            <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </symbol>
                <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </symbol>
                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </symbol>
            </svg>


                <div class="alert alert-warning d-flex align-items-center" role="alert" style=" margin-top:  10px;width: 300px; margin-bottom: 0px">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                    <div>
                        Bạn đã từ chối CV này!
                    </div>
                </div>
            `
            thongBaoDiv.innerHTML = html;
        }

    }
}

socket.on("SERVER_RETURN_EXIST_USER", data => {
    const thongBaoDiv = document.querySelector(".thongBao");
    console.log(thongBaoDiv);
    if(thongBaoDiv)
    {
        const buttonActions = document.querySelectorAll("[button-action]");
        buttonActions.forEach(button => {
            button.disabled = true;
        });

        if(data.type == "accept")
        {
            let html = `

            <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </symbol>
                <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </symbol>
                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </symbol>
            </svg>


                <div class="alert alert-success d-flex align-items-center" role="alert" style=" margin-top:  10px;width: 300px; margin-bottom: 0px">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                    <div>
                        Bạn đã chọn CV này!
                    </div>
                </div>
            `
            thongBaoDiv.innerHTML = html;
        }
        else
        {
            let html = `

            <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </symbol>
                <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </symbol>
                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </symbol>
            </svg>


                <div class="alert alert-warning d-flex align-items-center" role="alert" style=" margin-top:  10px;width: 300px; margin-bottom: 0px">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                    <div>
                        Bạn đã từ chối CV này!
                    </div>
                </div>
            `
            thongBaoDiv.innerHTML = html;
        }
    }
})


// ---------------end trang chi tiết CV --------------

// ------Trang CV-----
const buttonDetailCVs = document.querySelectorAll("[button-detail-cv]");
if(buttonDetailCVs)
{
    buttonDetailCVs.forEach(button => {
        button.addEventListener("click", () => {
            const maCTCV = button.getAttribute("button-detail-cv");
            console.log(maCTCV);
            socket.emit("COMPANY_CLICK_CV_USER", {
                maCTCV: maCTCV,
            })
        })
    })
}

// khi nghe thấy thì load lại trang
socket.on("SERVER_RETURN_CV_SEEN", (data) => {
    const form = document.querySelector("[form-watch-cv]");
    console.log(data);
    const path = form.getAttribute("path");
    const action = `${path}/${data.maCTCV}`;
    location.reload();
    window.location.href = action;
})

const buttonDeleteCVs = document.querySelectorAll("[button-delete-cv]");
if(buttonDeleteCVs)
{
    buttonDeleteCVs.forEach(button => {
        const formDelete = document.querySelector("[form-delete-cv]")
        const tooltip = button.closest(`[data-toggle="tooltip"]`);
        const announceVal = button.getAttribute("announce");
        if(announceVal == "1")
        {
            button.disabled = true;
            tooltip.title = "Không thể xóa vì công việc đã được chọn/từ chối";
        }
        else
        {
            button.addEventListener("click", () => {
                const maCTCVC = button.getAttribute("button-delete-cv");
                const path = formDelete.getAttribute("path");
                const action = `${path}/${maCTCVC}?_method=PATCH`;
                formDelete.action = action;
                Swal.fire({
                    title: 'Bạn có muốn xóa CV này không?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Xóa',
                    cancelButtonText: 'Hủy',
                }).then((result) => {
                    if (result.isConfirmed) {
                        formDelete.submit();
                    }
                })
            });
        }
    })
}

// ------================end Trang CV====================-----

// ------Trang chi tiết công việc------------
const detailJobContainer = document.querySelector("[detail-job]");
if(detailJobContainer)
{   
    const formEdit = detailJobContainer.querySelector("[form-edit]");

    let tooltip = detailJobContainer.querySelector("[tooltip]");

    const buttonEdit = detailJobContainer.querySelector("[button-edit]");


    const slug = buttonEdit.getAttribute("slug");
    const value = parseInt(buttonEdit.getAttribute("button-edit"));
    const hetHan = buttonEdit.getAttribute("hetHan");

    handleEditButton(buttonEdit, tooltip, formEdit, slug);
}
// ------end Trang chi tiết công việc------------


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

// -----trang công việc --- search -----
const formSearch = document.querySelector("[formSearch]");
if(formSearch)
{
    formSearch.addEventListener("submit", e => {
        e.preventDefault();
        let url = new URL(window.location.href);
        const input = formSearch.querySelector("input[name='keyword']");
        const value = input.value;
        if(value)
        {
            url.searchParams.set("keyword", value);
        }
        else
        {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}
// -----end trang công việc --- search -----

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


// preview image upload COMPANY
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


// -------------sider active ----------
const liSiderElement = document.querySelectorAll(".sider .inner-menu ul li");
if(liSiderElement.length > 0)
{
    liSiderElement.forEach(li => {
        let url = new URL(window.location.href);
        const aElement = li.querySelector("a");
        const hrefA = aElement.getAttribute("href");
        if(url.href.includes(hrefA))
        {
            li.classList.add("active"); 
        }
        else
        {
            li.classList.remove("active");
        }
    })
}
// -------------sider active ----------