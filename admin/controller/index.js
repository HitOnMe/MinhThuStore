
function domID(id){
    return document.getElementById(id)
};
function getValue(id){
    return domID(id).value
}
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
function getService(){
    return  axios({
        url: url,
        method: 'GET',
    })
}
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

function getMethod(method, button, id){
    button.addEventListener('submit', (e) => {
        e.preventDefault();
        method(new Product(), id)
    });
}
function fetchProduct(){
    getService().then(response => {
       /*  let dataValues = Object.values(response.data);
        dataValues = dataValues.filter(object => object.id != id);
        sortList(dataValues)
        response.data =  */
        renderStaff(response.data, domID('staffContent'))}).catch('err')
    }
function addProduct(product){
    axios({
        url: url,
        method: 'POST',
        data: product,
    }).then(() => {
        fetchProduct()}).catch(error => console.error('Error adding product', error));
    };
   
function deleteProduct(id) {
    axios({
        url: `${url}/${id}`,
        method: 'DELETE',
    }).then(()=> {
        fetchProduct()
    }).catch(error => console.error('Error deleting product', error))
};

function updateProduct(product, id){
    axios({
        url:  `${url}/${id}`,
        method: 'PUT',
        data: product,
    }).then(()=> {
        fetchProduct()
    }).catch(error =>{
        console.error('Error updating product', error)
    })
}
    const productModal = domID('product-modal');
    const productForm = domID('product-form');
    const productList = domID('staffContent');
    const filterNameInput = domID('filter-name');
    const sortPriceButton = domID('sort-price');
    const addProductButton = domID('add-product');
    const addNew = domID('addProduct');
    const closeModalButton = document.querySelector('.close');
    var url = "https://66adc881b18f3614e3b5e0b7.mockapi.io/product";

    const toggleModal = () => {
        productModal.style.display = productModal.style.display === 'block' ? 'none' : 'block';
    };

    const clearForm = () => {
        productForm.reset();
        isEditing = false;
        editIndex = null;
        domID('modal-title').textContent = 'Add Product';
    };

    

document.addEventListener('DOMContentLoaded', () => {
    buttonModal(addProductButton, closeModalButton)
    fetchProduct();
    
    getMethod(addProduct, productForm);
    
    productList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit')) {
            productForm.addEventListener('submit', ()=>{
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
    

    /* filterNameInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
        renderFilteredProducts(filteredProducts);
    });

    const renderFilteredProducts = (filteredProducts) => {
        productList.innerHTML = '';
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
            productList.appendChild(row);
        });
    }; */

    sortPriceButton.addEventListener('click', () => {
        products.sort((a, b) => a.price - b.price);
        renderProducts();
    });
    window.onclick = (event) => {
        if (event.target == productModal) {
            toggleModal();
        }
    };
});