let urlJob = new URL(window.location.href);

const closeForm = () => {
    let overplay = document.getElementsByClassName("overplay")[0]
    let form = document.getElementsByClassName("box-ungtuyen")[0]
    overplay.style.display = 'none'
    form.style.display = 'none'
}

const openForm = () => {
    let overplay = document.getElementsByClassName("overplay")[0]
    let form = document.getElementsByClassName("box-ungtuyen")[0]
    overplay.style.display = 'block'
    form.style.display = 'block'
}

const closeUngTuyen = () =>{
    closeForm();

    urlJob.searchParams.delete("form", "applyJob");
    window.location.href = urlJob.href;
}
const openUngTuyen = () =>{
    openForm();

    urlJob.searchParams.set("form", "applyJob");
    window.location.href = urlJob.href;
}

const upload = (e) =>{
    let file = document.getElementsByClassName("input_file")[0]
    if( file.files.length > 0){
        console.log(file.file)
    }
}

var buttonUngTuyen = document.querySelector("[button-ungtuyen]");
const tooltip = document.querySelector("[tooltip]");

if(buttonUngTuyen)
{
    const job = JSON.parse(buttonUngTuyen.getAttribute("button-ungtuyen"));

    const divCongTyId = document.querySelector("[congTyIdUser]");
    const divApplied = document.querySelector("[applied]");

     // nếu hết hạn thì không cho nộp cv
    const chkHetHan = job.hetHan;
    const chkTrangThai = job.trangThai;
    if(chkHetHan)
    {
        tooltip.title = "Hết hạn ứng tuyển";
        buttonUngTuyen.disabled = true;
    }
    else
    {
        if(chkTrangThai) // nếu chưa hết hạn -> trạng thái đang tuyển
        {
            if(divCongTyId) // xem thử người này tạo ra job đó không
            {
                const congTyIdUser = parseInt(divCongTyId.innerText);
                if(congTyIdUser && (congTyIdUser == job.congTyId))
                {
                    tooltip.title = "Bạn là người tạo ra công việc này";
                    buttonUngTuyen.disabled = true;
                }
                else // không phải người này tạo job
                {
                    if(divApplied) // chứng tỏ người này đã nộp đơn rồi
                    {
                        const loginBeforApply = document.querySelector("[loginBeforApply]");
                        console.log(loginBeforApply);
                        if(divApplied.textContent == 100)
                        {
                            tooltip.title = "Bạn cần đăng nhập trước khi ứng tuyển";
                            loginBeforApply.style.display = "block";
                            buttonUngTuyen.disabled = true;
                        }
                        else if(divApplied.textContent == 1)
                        {
                            tooltip.title = "Bạn đã nộp đơn rồi";
                            buttonUngTuyen.disabled = true;
                        }
                        else
                        {
                            buttonUngTuyen.disabled = false;
                        }
                        
                    }
                    else
                    {
                        buttonUngTuyen.disabled = false;
                    }
                }
            }
        }
        else
        {
            tooltip.title = "Việc dừng tuyển dụng";
            buttonUngTuyen.disabled = true;
        }
    }
}

if((url.search == "?form=applyJob") && (buttonUngTuyen.disabled == false))
{
    openForm();
}
else{
    closeForm();
}
