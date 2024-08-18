

// Kiểm tra dữ liệu người dùng nhập vào
function isValidInput(number, number1, number2){
    return number< number1 || number > number2 ? false : true
}
function isValidAccount(string){
    var valid = string.match(/\d/g), // trả về mảng các chữ số trong chuỗi
    numberString = valid == null ? 0 : valid.length //trả về độ dài các chữ số trong chuỗi, trả về 0 nếu rỗng
    return isValidInput(numberString, 0, 6) && isValidInput(string.length, 1, 15) // tên tài khoản chỉ chứa 1-15 ký tự, và tối đa 6 ký tự số
}
function isValidName(name){
    var valid = /^[A-Za-zÀ-ỹ\s]+$/;
    return valid.test(name)
} 
function isValidEmail(email) {
    // Biểu thức chính quy phức tạp để kiểm tra định dạng email
    var valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return valid.test(email);
}
function isValidPassword(password) {
    // Kiểm tra ít nhất một ký tự số
    var hasNumber = /[0-9]/.test(password);
    // Kiểm tra ít nhất một ký tự in hoa
    var hasUpperCase = /[A-Z]/.test(password);
    // Kiểm tra ít nhất một ký tự đặc biệt
    var hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasNumber && hasUpperCase && hasSpecialCharacter && isValidInput(password.length, 6, 10);
}
function isValidDate(dateString) {
    // Kiểm tra định dạng dd/mm/yyyy
    var regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (!regex.test(dateString)) {
        return false;
    }

    // Tách ngày, tháng, năm từ chuỗi
    var parts = dateString.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    // Kiểm tra tính hợp lệ của ngày
    var date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
}
function validateInput(index, input, checkValue, checkObject) {
    switch (index) {
        case 0:
            checkValue.textContent = isValidAccount(input.value) ? '' : checkObject.checkAccount;
            break;
        case 1:
            checkValue.textContent = isValidName(input.value) ? '' : checkObject.checkName;
            break;
        case 2:
            checkValue.textContent = isValidEmail(input.value) ? '' : checkObject.checkEmail;
            break;
        case 3:
            checkValue.textContent = isValidPassword(input.value) ? '' : checkObject.checkPass;
            break;
        case 4:
            checkValue.textContent = isValidDate(input.value) ? '' : checkObject.checkDay;
            break;
        case 5:
            checkValue.textContent = isValidInput(Number(input.value), 1000000, 20000000) ? '' : checkObject.checkBasicsalary;
            break;
        case 6:
            checkValue.textContent = input.value !== 'Chọn chức vụ' ? '' : checkObject.checkDuty;
            break;
        case 7:
            checkValue.textContent = isValidInput(Number(input.value), 8, 200) ? '' : checkObject.checkHourwork;
            break;
    }
}
function checkInput(id1, id2){
    //Lấy giá trị người dùng nhập vào ô input
    var userInput = document.querySelectorAll(id1),//ô input người dùng nhập vào
        checkInput = document.querySelectorAll(id2),// ô hiển thị cảnh báo khi người dùng nhập không đúng yêu cầu
        checkValid = false,
        checkObject = {
        checkAccount: 'Tên tài khoản từ 1-15 ký tự, chỉ chứa tối đa 4-6 ký tự số',
        checkName: 'Chỉ chứa các ký tự chữ',
        checkEmail: 'Phải đúng định dạng, không được để trống',
        checkPass: 'Mật khẩu từ 6-10 ký tự, ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt',
        checkDay: 'Hãy chọn ngày bắt đầu làm việc',
        checkBasicsalary: 'Lương cơ bản từ 1 000 000 - 20 000 000 đồng',
        checkDuty: 'Chọn chức vụ của bạn',
        checkHourwork: 'Số giờ làm của bạn trong tháng (8-200 giờ)'
    },
        exist = false;
    userInput.forEach((input, index) => {
        var checkValue = checkInput[index];
          validateInput(index, input, checkValue, checkObject);
        input.addEventListener('input', function () {
            validateInput(index, input, checkValue, checkObject);
        });
    });
    collectStaff.collect.forEach(staff =>{
        if (staff.account == userInput[0].value){
            checkInput[0].innerHTML = 'Tài khoản đã có người sủ dụng';
            exist = true;
        }
        if (staff.email == userInput[2].value){
            checkInput[2].innerHTML = 'Email đã có người sử dụng';
            exist = true;
        }});
        checkValid = Array.from(checkInput).filter(checkValue => checkValue.innerHTML !== '').length == 0 && exist == false ? true : false
    return checkValid
}

/* Hàm chức năng */
function addStaff(id, index){
    return document.querySelectorAll(id)[index].value
}
function totalSalary(id, index, number){
    var duty = document.querySelectorAll(id)[index].value;
        basicCollect.push(number)
    switch(duty){
        case 'Nhân viên': return number*1;
        case 'Trưởng phòng': return number*2;
        case 'Sếp' : return number*3;
    }
}
function workTime(number){
    workHour.push(number);
    if (number>=192) return 'Nhân viên xuất sắc';
    else if (number>=176) return 'Nhân viên giỏi';
    else if (number>=160) return 'Nhân viên khá';
    else return 'Nhân viên trung bình';
}


// class Dữ liệu nhân viên
function StaffObject(account, name, email, workDay, duty, totalSalary, rating){
    this.account = account;
    this.name = name;
    this.email = email;
    this.workDay = workDay;
    this.duty = duty;
    this.totalSalary = totalSalary;
    this.rating = rating;
    this.deleteStaff = '<i class="fa-solid fa-delete-left"></i>';
}


StaffObject.prototype.updateInput = function(){
    for(var key in this){
        var input = document.createElement('input');
        input.value = key.innerHTML;
        input.name = key;
        input.classList.add('btn btn-success');
        this.appendChild(input) 
    }
}
//object điều kiện lọc
function Atribute(){
    this.name = document.querySelectorAll('input')[0].value,
    this.email = document.querySelectorAll('input')[1].value,
    this.duty = document.querySelectorAll('select')[0].value,
    this.rating = document.querySelectorAll('select')[1].value
}
//Class danh sách nhân viên
function listStaff(){
    this.collect = [];
}
listStaff.prototype.addList= function(object){
    this.collect.push(object)
}

listStaff.prototype.deleteStaff = function(index){
    this.collect.splice(index, 1)
}
listStaff.prototype.updateStaff = function(index, newObject){
    this.collect[index] = newObject
}
//Hàm trả về vị trí các object thỏa mãn điều kiện lọc
listStaff.prototype.findStaff = function(objects, targetObject) {//objects: mảng các đối tượng, targetObjects: đối tượng các điều kiện lọc
    var indexCollect = [],
        staffs = objects.filter((object) => {return (!targetObject.account) &&
            (targetObject.name === '' || object.name.includes(targetObject.name)) &&
            (targetObject.email === '' || object.email.includes(targetObject.email)) &&
            (!targetObject.workDay)&&
            (targetObject.duty === '--Chức vụ--' || object.duty === targetObject.duty) &&
            (!targetObject.totalSalary)&&
            (targetObject.rating === '--Xếp loại--' || object.rating === targetObject.rating);
    });
    
    staffs.forEach(staff =>{
        indexCollect.push(objects.indexOf(staff))
    }); return indexCollect
}
function staffList(object1, object2){
    mytr = document.createElement('tr');
    for(var key in object1){
        mytd = document.createElement('td');
        if (key === 'deleteStaff') {
            mytd.innerHTML = object1[key];
            mytd.style.cursor = 'pointer';
        } else if (key === 'updateInput') break;
        else {
            mytd.textContent = object1[key];
        }
        mytr.appendChild(mytd)
    };
    object2.appendChild(mytr);
}
function createCheckbox(form){
    var input = document.createElement('input');
    input.name = this;
    input.for = this.name;
    input.type = 'checkbox';
    form.innerHTML = '';
    form.appendChild(input)
}
function createInputText(form){
    var input = document.createElement('input');
    input.name = this;
    input.for = this.name;
    input.type = 'text';
    input.value = form.innerHTML;
    form.innerHTML = '';
    form.appendChild(input)
}
function createSelect(form){
    form.innerHTML =  '<select><option>Chọn chức vụ</option><option>Sếp</option><option>Trưởng phòng</option><option>Nhân viên</option></select>'
}
// Thêm nhân viên vào bảng danh sách nhân viên
var table = document.querySelector('#tableDanhSach'),
    objectTr = [],
    rows=[],
    staffObject={},
    findObject = {},
    filterIndex = [],
    userAction = [],
    exist = false,
    basicCollect = [],
    workHour = [],
    collectStaff = new listStaff();
document.querySelector('#btnThemNV').onclick = function(){
    document.querySelectorAll('.sp-thongbao').forEach(comment => {
        comment.style.display = 'block'
    })
    
    if(checkInput('.input-sm', '.sp-thongbao')){
        if (exist==false){
            staffObject = new StaffObject(
                addStaff('input', 2), addStaff('input',3), 
                addStaff('input',4), addStaff('input',6), 
                document.querySelector('#chucvu').value, 
                totalSalary('#chucvu', 0, Number(document.querySelectorAll('input')[7].value)),                                    
                workTime(Number(document.querySelectorAll('input')[8].value)));
            collectStaff.addList(staffObject);
            staffList(staffObject, table);
        }       
    }  
} 
//Tìm kiểm nhân viên theo xếp loại
document.querySelector('#btnTimNV').onclick = function() {
        filterIndex = collectStaff.findStaff(collectStaff.collect, new Atribute());
        rows=document.querySelectorAll('#tableDanhSach tr');
        rows.forEach((row, index) =>{
            row.style.display = filterIndex.includes(index) ? '' : 'none'
    })
}
document.querySelectorAll('#tableDanhSach tr .fa-delete-left').forEach((deleteButton, index) => {
    deleteButton.onclick = function(){
        document.querySelectorAll('#tableDanhSach tr')[index].style.display = 'none'; //Bỏ chọn nhân viên
    }
})
/* // Xóa nhân viên
var cancelContent = '<div class="d-flex"><button class="btn btn-success">Xóa</button><button class="btn btn-danger">Hủy thao tác</button></div>',
    updateContent =  '<div class="d-flex"><button class="btn btn-success">Chỉnh sửa</button><button class="btn btn-danger">Xóa</button></div>',
    selectContent = '<div class="d-flex justify-content-end"><button class="btn btn-success">Xóa</button><button class="btn btn-danger">Hủy</button></div>',
    clickButton = true;
    


document.querySelector('#btnDelete').onclick = function(){   
    var listLength = document.querySelectorAll('#tableDanhSach tr td:last-child').length;
    if (listLength !== 0){
    document.querySelectorAll('#tableDanhSach tr td:last-child').forEach((button) => {
        createCheckbox(button)                           
    }); 
    document.querySelector('#ulPhanTrang').innerHTML = selectContent;
    document.querySelector('.myTable thead th:last-child').innerHTML = "<label>Select All<input type='checkbox' id='select__all' class='form-control'></label>";
    document.querySelector('#select__all').addEventListener('change', function(){
        let user__select = document.querySelector('#select__all').checked;
        document.querySelectorAll('#tableDanhSach tr td:last-child input').forEach(input =>{
            input.checked = user__select == true ? true : false // Chọn tất cả nhân viên
        });
    });
    document.querySelector('#ulPhanTrang .btn-danger').onclick = function(){
        if(document.querySelectorAll('#tableDanhSach tr td:last-child').length !== 0){
            document.querySelectorAll('#tableDanhSach tr td:last-child').forEach(td => {
                td.innerHTML = ''
            });
            document.querySelector('.myTable thead th:last-child').innerHTML = '<em class="fa fa-cog"></em>';
            document.querySelector('#ulPhanTrang').innerHTML =''
        }
        
    }
    document.querySelector('#ulPhanTrang .btn-success').onclick = function(){
        var listObject = document.querySelectorAll('#tableDanhSach tr'),
            listcollect =  document.querySelectorAll('#tableDanhSach tr td:last-child input');
        for (var i=listObject.length-1; i>=0; i--){
            if (listcollect[i].checked){
                listObject[i].remove();
                collectStaff.deleteStaff(i, 1)
            }
        };
        if (collectStaff.collect.length == 0){
            document.querySelector('#ulPhanTrang').textContent = '';
            document.querySelector('.myTable thead th:last-child').innerHTML = '<em class="fa fa-cog"></em>'
        }
    }
}}

// Cập nhật nhân viên

document.querySelector('#btnCapNhat').onclick = function(){
    if(document.querySelector('#myModal2').classList.contains('show') == false){
        document.querySelectorAll('#tableList tr').forEach(tr =>{
            tr.remove()
        })
    } // Xóa danh sách nhân viên trong bảng cập nhật sau khi đóng
        collectStaff.collect.forEach((object, index) => {
            staffList(object, document.querySelector('#tableList'));
            document.querySelectorAll('#tableList :nth-child(6)')[index].innerHTML = basicCollect[index];
            document.querySelectorAll('#tableList :nth-child(7)')[index].innerHTML = workHour[index];
     });
        document.querySelectorAll('#tableList tr').forEach(tr =>{
            tr.childNodes.forEach((td, index) =>{
                index == 4 ? createSelect(td) : createInputText(td);
            })
           
        });
}

document.querySelector('#updateStaff').onclick = function(){
    collectStaff.collect=[];
    for (var index = document.querySelectorAll('#tableList select').length-1; index>=0; index-- ){
        var newStaff = new StaffObject(
            addStaff(`#tableList :nth-child(${index + 1}) td input`, 0),
            addStaff(`#tableList :nth-child(${index + 1}) td input`, 1),
            addStaff(`#tableList :nth-child(${index + 1}) td input`, 2),
            addStaff(`#tableList :nth-child(${index + 1}) td input`, 3),
            document.querySelectorAll('#tableList select')[index].value,
            totalSalary('#tableList select', index , Number(addStaff(`#tableList :nth-child(${index + 1}) td input`, 4))),
            workTime(Number(addStaff(`#tableList :nth-child(${index + 1}) td input`, 5)))
        );
        collectStaff.collect.push(newStaff);
        document.querySelectorAll('#tableDanhSach tr')[index].remove()
        staffList(newStaff, document.querySelector('#tableDanhSach'))
    };
}
  
    */



