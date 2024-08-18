
function isValidInput(object, id){
    let isValid = true;
    const content = {
        id: 'Mã ID sản phẩm không được để trống.',
        name: 'Tên sản phẩm không được để trống.',
        price: 'Giá sản phẩm không được để trống.',
        screen: 'Loại màn hình không được để trống.',
        frontCamera: 'Màn hình trước không được để trống.',
        backCamera: 'Màn hình sau không được để trống.',
        img: 'URL hình ảnh không được để trống.',
        desc: 'Mô tả sản phẩm không được để trống.',
        type: 'Bạn phải chọn loại sản phẩm.'
    };

    selectAll(object).forEach((input, index) => {
        const key = Object.keys(content)[index];
        const errorMsg = content[key];
        const errorElement = selectId(id, index);

        if (input.value.trim() === '') {
            errorElement.style.display = 'block';
            errorElement.textContent = errorMsg;
            isValid = false;
        } else {
            errorElement.style.display = 'none';
            errorElement.textContent = '';
        }
    });

    return isValid;
}
function domID(id){
    return document.getElementById(id)
};
function selectAll(id){
    return document.querySelectorAll(id)
}
function selectId(id, index){
    return document.querySelectorAll(id)[index]
}

function getValue(id) {
    const element = domID(id);
    if (element) {
        return element.value;
    } else {
        console.error(`Element with ID ${id} not found.`);
        return ''; // Hoặc giá trị mặc định nào đó
    }
}

function Product(name, price, screen, backCamera, frontCamera, img, desc, type) {
    this.name = name 
    this.price = price 
    this.screen = screen 
    this.backCamera = backCamera 
    this.frontCamera = frontCamera 
    this.img =  img 
    this.desc =  desc 
    this.type =  type 
};
//hàm hiển thị dữ liệu ra bảng
function renderStaff(staffs, objects) {
    objects.innerHTML = '';
    var contents = '';
    staffs.forEach(staff => {
        var content = `
        <tr>
            <td>${staff.id}</td>    
            <td>${staff.name}</td> 
            <td>${staff.price}</td> 
            <td>${staff.screen}</td> 
            <td>${staff.backCamera}</td> 
            <td>${staff.frontCamera}</td>     
            <td class='phone__image'><img src='${staff.img}'></img></td> 
            <td>${staff.desc}</td>   
            <td>${staff.type}</td>   
            <td class='d-flex'>
                <button class="edit btn btn-success"   class="updateProduct" data-index="${staff.id}"
                    data-toggle="modal"
                    data-target="#myModal2"data-index="${staff.id}">Edit</button>
                <button class="delete btn btn-danger" data-index="${staff.id}">Delete</button>
            </td>
        </tr>`;
        contents+=content;
    });
    objects.innerHTML = contents;
}
function addStaff(staffs, object){
    staffs.forEach((staff, index) =>{
        staff[index] = object
    })
}
//Hàm xử lý trung gian
function getData(){
    return axios({
        url: url,
        method: 'GET',
    })
}
function getService(method, url, err, product){
    axios({
        url: url,
        method: method,
        data: product
    }).then(()=>{
        fetchProduct()
    }
    ).catch(error => console.error(`Error ${err}ing product`, error))
}

function getMethod(method, target, id) {
        var updateArray = [];
        selectAll(target).forEach(input => {
            updateArray.push(input.value);
        });
        method(new Product(...updateArray), id);
}
function fetchProduct() {
    getData().then(response => {
        products = response.data; // Cập nhật mảng gốc với dữ liệu từ API
        renderStaff(products, domID('tableDanhSach')); // Hiển thị tất cả sản phẩm
        $('#myModal').modal('hide');
        $('#myModal2').modal('hide');
    }).catch(error => console.error(`Error loading data`, error));
}


//Hàm chức năng
function addProduct(product){
    
    getService('POST', url, 'add', product)
    };
   
function deleteProduct(id) {
    getService('DELETE', `${url}/${id}`, 'delett')
};
function editProduct(id){
    axios({
        url: `${url}/${id}`,
        method: 'GET',
    }).then(response =>{
        var res = response.data;
        var productEdit = new Product(res.name, res.price, res.screen, res.backCamera, res.frontCamera, res.img, res.desc, res.type);
        Object.keys(productEdit).forEach((key, index) =>{
            document.querySelectorAll('.input-update')[index].value = productEdit[key]
        })
    })
}
function updateProduct(product, id){
    getService('PUT',  `${url}/${id}`, 'updatt', product)
    $('myModal').modal('hide')
}
//Biến toàn cục

    var url = "https://66adc881b18f3614e3b5e0b7.mockapi.io/product"

//Xử lý chức năng khi load trang


fetchProduct();
var products = [];
domID('product-form').addEventListener('click', (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    if (isValidInput('.input-sm', '.sp-thongbao')) {
        getMethod(addProduct, '.input-sm');
    }
});
    

    domID('tableDanhSach').addEventListener('click', (e) => {
        if (e.target.classList.contains('edit')) {
            var index = Number(e.target.getAttribute('data-index'));
            editProduct(index);
    
            // Xóa sự kiện click trước đó nếu có
            domID('updateProduct').replaceWith(domID('updateProduct').cloneNode(true));
    
            // Gắn sự kiện mới
            domID('updateProduct').onclick = function(){
                getMethod(updateProduct, '.input-update', index);
            }
           
    
        } else if (e.target.classList.contains('delete')) {
            const index = e.target.getAttribute('data-index');
            deleteProduct(index);
        }
    });
 


function createFilterObject(name, type, price){
    return {
        name: getValue(name),
        type: getValue(type),
        price: getValue(price),
    };
}
function findObject(products, filterAtribute) {
    return products.filter(product => 
        (filterAtribute.name === '' || product.name.toLowerCase().includes(filterAtribute.name.toLowerCase())) && // Lọc theo tên sản phẩm
        (filterAtribute.type === '--Loại sản phẩm--' || product.type === filterAtribute.type) && // Lọc theo loại sản phẩm
        (filterAtribute.price === '--Giá sản phẩm--' || findPrice(filterAtribute.price, product.price)) // Lọc theo giá
    );
}
function findPrice(searchPriceRange, productPrice){
    if (searchPriceRange && searchPriceRange !== '--Giá sản phẩm--') {
        switch (searchPriceRange) {
            case 'Dưới 1000$':
                return productPrice < 1000;
            case '1000$ - 2000$':
                return productPrice >= 1000 && productPrice <= 2000;
            case '2000$ - 5000$':
                return productPrice > 2000 && productPrice <= 5000;
            case '5000$ trở lên':
                return productPrice > 5000;
            default:
                return true;
        }
    }
    return true; // Nếu không chọn phạm vi giá, trả về tất cả sản phẩm
}
function sortPrice(products, sortOrder) {
    if (sortOrder === 'Giá trị tăng dần') {
        products.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'Giá trị giảm dần') {
        products.sort((a, b) => b.price - a.price);
    }
}
domID('findProduct').onclick = function(){
    var filterCriteria = createFilterObject('searchName', 'searchType', 'searchPriceRange');
    var filteredProducts = findObject(products, filterCriteria);
    sortPrice(filteredProducts, getValue('sortPrice'))
    renderStaff(filteredProducts, domID('tableDanhSach')); // Hiển thị sản phẩm đã lọc
    console.log(filterCriteria.name)
};