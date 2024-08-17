
// Hàm DOM
function domID(id){
    return document.getElementById(id)
};
function getValue(id){
    return domID(id).value
}
//Hàm ẩn/ hiện modal
function buttonModal(...ids){
    ids.forEach(id =>{
        if (id) {
            id.onclick = function(e){
                e.preventDefault();
                toggleModal();
            }
        } else {
            console.error(`Element with ID ${id} not found.`);
        }
    });
}
//class product
function Product() {
    this.name = getValue('product-name');
    this.price = getValue('product-price');
    this.screen = getValue('product-screen');
    this.backCamera = getValue('product-backCamera');
    this.frontCamera = getValue('product-frontCamera');
    this.img = getValue('product-img');
    this.desc = getValue('product-desc');
    this.type = getValue('product-type')
};

//hàm hiển thị dữ liệu ra bảng
function renderStaff(staffs, objects) {
    objects.innerHTML = '';
    var contents = '';
    staffs.forEach((staff, index) => {
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
            <td>
                <button class="edit" data-index="${staff.id}">Edit</button>
                <button class="delete" data-index="${staff.id}">Delete</button>
            </td>
        </tr>`;
        contents+=content;
    });
    objects.innerHTML = contents;
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

function getMethod(method, button, id){
    button.addEventListener('submit', (e) => {
        e.preventDefault();
        method(new Product(), id)
    });
}
function fetchProduct(){
    getData().then(response => {
        renderStaff(response.data, domID('staffContent'))}).catch(error => console.error(`Error loading data`, error))
    }


//Hàm chức năng
function addProduct(product){
    getService('POST', url, 'add', product);
    toggleModal()
    };
   
function deleteProduct(id) {
    getService('DELETE', `${url}/${id}`, 'delett')
};

function updateProduct(product, id){
    getService('PUT',  `${url}/${id}`, 'updatt', product)
}
//Biến toàn cục

    var url = "https://66adc881b18f3614e3b5e0b7.mockapi.io/product";

    const toggleModal = () => {
        domID('product-modal').style.display = domID('product-modal').style.display === 'block' ? 'none' : 'block';
    };

//Xử lý chức năng khi load trang
document.addEventListener('DOMContentLoaded', () => {
    buttonModal(domID('add-product'), document.querySelector('.close'))
    fetchProduct();
    
    getMethod(addProduct, domID('product-form'));
    
    domID('staffContent').addEventListener('click', (e) => {
        if (e.target.classList.contains('edit')) {
            domID('product-form').addEventListener('submit', ()=>{
                var index = Number(e.target.getAttribute('data-index')),
                productUpdate = new Product();
                updateProduct(productUpdate, index)
            })
            toggleModal();
            
        } else if (e.target.classList.contains('delete')) {
            const index = e.target.getAttribute('data-index');
            deleteProduct(index);
        }
    });
    

    /* domID('filter-name')).addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
        renderFilteredProducts(filteredProducts);
    });

    const renderFilteredProducts = (filteredProducts) => {
        domID('staffContent').innerHTML = '';
        filteredProducts.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.screen}</td>
                <td>${product.backCamera}</td>
                <td>${product.frontCamera}</td>
                <td><img src="${product.img}" alt="${product.name}" width="50"></td>
                <td>${product.desc}</td>
                <td>${product.type}</td>
                <td>
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>
            `;
            domID('staffContent').appendChild(row);
        });
    }; */

    domID('sort-price').addEventListener('click', () => {
        products.sort((a, b) => a.price - b.price);
        renderProducts();
    });
    window.onclick = (event) => {
        if (event.target == domID('product-modal')) {
            toggleModal();
        }
    };
});