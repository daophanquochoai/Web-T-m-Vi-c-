const hanChot = document.querySelector("input[type='date']");
let value = hanChot.getAttribute("value").slice(0,10);
hanChot.setAttribute("value", value);

const formEditJob = document.querySelector("[form-edit-job]");

// ------------------create new job -------------

//select option khu vuc
const wrapper = formEditJob.querySelector(".areas .wrapper");
const selectBtn = formEditJob.querySelector(".areas .select-btn");
const options = formEditJob.querySelector(".areas .options");
const searchInp = formEditJob.querySelector(".areas .wrapper .content input")

const divContent = formEditJob.querySelector(".areas .wrapper .content");

const areasAtt = divContent.getAttribute("areas");

let areas = JSON.parse(areasAtt);

let tenKhuVuc = divContent.getAttribute("areas-name");  // lấy danh sách ban đầu đã tạo

// console.log(areas)    

selectBtn.addEventListener("click", () => {
    wrapper.classList.toggle("active");
});

var selectedItems = [];
var selectedIds = [];

if(tenKhuVuc != "")
{
    selectedItems = tenKhuVuc.split(",");
    let btnText = document.querySelector(".btn-text");
    btnText.innerHTML = tenKhuVuc;
}

const updateArraySelect = (item) => {
    const tenKV = item.querySelector(".item-text").innerText;
    const maKV = parseInt(item.querySelector(".item-text").getAttribute("makv"));
    console.log(maKV)
    if (selectedItems.includes(tenKV)) {
        selectedItems = selectedItems.filter(item => item !== tenKV);
        selectedIds = selectedIds.filter(item => item !== maKV);
    } else {
        selectedItems.push(tenKV);
        selectedIds.push(maKV);
    }
}

const addArea = () => {
    let html = ``;
    areas.forEach(area => {
        // Kiểm tra xem mục đã được chọn trước đó không
        const isChecked = selectedItems.includes(area.tenKV);
        html += `
            <li class="item ${isChecked ? 'checked' : ''}">
                <span class="checkbox">
                    <i class="fa-solid fa-check check-icon"></i>
                </span>
                <span class="item-text" maKV="${area.maKV}">
                    ${area.tenKV}
                </span>
            </li>
        `;
    });
    options.innerHTML = html;

    // Lấy danh sách các mục mới
    const items = document.querySelectorAll(".options .item");

    // Gán sự kiện click cho mỗi mục
    items.forEach(item => {
        item.addEventListener("click", () => {
            item.classList.toggle("checked");

            // Cập nhật mảng các mục đã chọn
            updateArraySelect(item);

            // Cập nhật nút chọn
            updateSelectedText();
        });
    });
};

// Hàm cập nhật nút chọn
const updateSelectedText = () => {
    let btnText = document.querySelector(".btn-text");

    if (selectedItems.length > 0) {
        btnText.innerHTML = selectedItems.join(", ");
    } else {
        btnText.innerHTML = "---Khu vực---";
    }

    console.log(selectedItems)
};

// Gọi hàm addCountry để gán sự kiện click cho danh sách ban đầu
addArea();


// Hàm gán sự kiện click cho các mục
const assignClickEvent = () => {
    const items = document.querySelectorAll(".options .item");

    items.forEach(item => {
        item.addEventListener("click", () => {
            item.classList.toggle("checked");
            updateArraySelect(item);
            updateSelectedText();
        });
    });
};

// Sau khi search xong thì --> cập nhật checkbox + sự kiện click 
searchInp.addEventListener("keyup", () => {
    let arr = [];
    let searchValue = searchInp.value.toLowerCase();
    arr = areas.filter(area => {
        return area.tenKV.toLowerCase().startsWith(searchValue);
    }).map(area => `
                <li class="item">
                    <span class="checkbox">
                        <i class="fa-solid fa-check check-icon"></i>
                    </span>
                    <span class="item-text" maKV="${area.maKV}">
                        ${area.tenKV}
                    </span>
                </li>
            `).join("");

    options.innerHTML = arr;

    const items = document.querySelectorAll(".options .item");

    // Cập nhật trạng thái (checked hoặc không checked) cho mỗi mục
    items.forEach(item => {
        const tenKV = item.querySelector(".item-text").innerText;
        if (selectedItems.includes(tenKV)) {
            item.classList.add("checked");
        } else {
            item.classList.remove("checked");
        }
    });

    // Gọi lại hàm updateOptions để cập nhật trạng thái của các mục
    assignClickEvent();
});

// tags
const tagDiv =  formEditJob.querySelector(".tags");
const ul = formEditJob.querySelector(".tags .content > ul"); // ul first
const inputTag = ul.querySelector("input");
const countNumber = formEditJob.querySelector(".tags .details span");
const removeButton = formEditJob.querySelector(".tags .details button");
const ulSelect = formEditJob.querySelector(".tags .content .select ul");
const liSelect = formEditJob.querySelectorAll(".tags .content .select ul li");

let lengthMax = 10;
let tags = [];
let tagsId = [];

const specialities = JSON.parse(tagDiv.getAttribute("tags"));
const tenLinhVuc = tagDiv.getAttribute("tags-name");


const drawLiSelect = () => {
    // Trước khi vẽ ra giao diện thì xóa cái cũ đã
    liSelect.forEach(li => li.remove());

    specialities.slice().reverse().forEach(data => {
        let li = `<li maKV='${data.maLV}' onclick="addTagOfLi(this, '${data.tenLV}')">${data.tenLV}</li>`;
        ulSelect.insertAdjacentHTML("afterbegin", li);
    });
}

// onclick="addTagOfLi(this, '${data.tenKV}')

drawLiSelect();


const countTags = () => {
    countNumber.innerHTML = lengthMax - tags.length;
}

countTags();

const createTag = () => {
    // Xóa li trước khi vẽ ra giao diện để tránh lặp
    ul.querySelectorAll("li").forEach(li => li.remove());

    tags.slice().reverse().forEach(tag => {
        let liTag = `<li><span>${tag}</span> <i class="fa-solid fa-xmark" onclick="remove(this, '${tag}')"></i></li>`;
        ul.insertAdjacentHTML("afterbegin", liTag)
    })
    countTags()
}

// ------------vẽ tag ba đầu ra--------
if(tenLinhVuc != "")
{
    tags = tenLinhVuc.split(",");
    createTag();
}
//------------vẽ tag ba đầu ra--------

const remove = (e, tag) => {
    let index = tags.indexOf(tag);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)]; //// cập nhật mảng tags mới mà không có tag đã xóa
    e.parentElement.remove(); // cha cua e la i --> loai i khoi tags
    countTags()
}

const addTagOfLi = (e, tag) => {
    // const tagId = parseInt(e.getAttribute("maKV"));
    if (!tags.includes(tag)) 
    { 
        if (tags.length < 10) {
            tags.push(tag);
            createTag();
        }
    }
}

const addTag = (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        let tag = e.target.value.replace(/\s+/g, " ").toLowerCase();
        if (tag.length > 0 && !tags.includes(tag)) { // kiểm tra từ nhập vào
            if (tags.length < 10) {
                tag.split(",").forEach(tag => {
                    tags.push(tag);
                    createTag();
                });
            }
        }
        e.target.value = "";
    }
};

inputTag.addEventListener("keydown", addTag);

removeButton.addEventListener("click", () => {
    tags.length = 0;
    ul.querySelectorAll("li").forEach(li => li.remove());
})



//submit
formEditJob.addEventListener("submit", (e) => {
    e.preventDefault();
    const idsArea = formEditJob.querySelector("input[name='idsArea']");
    idsArea.value = JSON.stringify(selectedIds);
    const tagsName = formEditJob.querySelector("input[name='tagsName']");
    tagsName.value = JSON.stringify(tags);
    const textArea = formEditJob.querySelector("textarea[name='chiTietCV']");
    const decodedValue = decodeHtmlEntities(textArea.value);
    textArea.value = decodedValue;
    formEditJob.submit();
})

function decodeHtmlEntities(text) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
}