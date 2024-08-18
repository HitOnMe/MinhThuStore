
//Biến toàn cục

var url = "https://66adc881b18f3614e3b5e0b7.mockapi.io/product"

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
 
domID('findProduct').onclick = function(){
    var filterCriteria = createFilterObject('searchName', 'searchType', 'searchPriceRange');
    var filteredProducts = findObject(products, filterCriteria);
    sortPrice(filteredProducts, getValue('sortPrice'))
    renderStaff(filteredProducts, domID('tableDanhSach')); // Hiển thị sản phẩm đã lọc
    console.log(filterCriteria.name)
};