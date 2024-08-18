class Product {
    constructor(id, name, price, img, description, type, screen, backCamera , frontCamera) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.screen = screen;
        this.backCamera = backCamera;
        this.frontCamera = frontCamera;
        this.img = img;
        this.description = description;
        this.type = type;
    }
  }
  
  
  const urlApi = "https://66bb27876a4ab5edd63760d8.mockapi.io/USER"; 
  let products = [];
  let cart = [];
  
  window.onload = function() {
      fetchProducts();
      loadCartFromLocalStorage();
  };
  
  function fetchProducts() {
      axios.get(urlApi)
          .then(response => {
              products = response.data.map(p => new Product(p.id, p.name, p.price, p.img, p.description, p.type , p.screen, p.backCamera, p.frontCamera ));
              renderProducts(products);
          })
          .catch(error => console.error("Error fetching products:", error));
  }
  
  function renderProducts(productList) {
    const container = document.getElementById("product-list");
    container.innerHTML = "";
    productList.forEach(product => {
        const productDiv = `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <div class="desBox">
                 <p>Screen: ${product.screen}</p>
                <p>Back Camera: ${product.backCamera}</p>
                <p>Front Camera: ${product.frontCamera}</p>
                </div>
                <button class="btn btn-primary" onclick="addToCart('${product.id}')">Add to Cart</button>
            </div>
        `;
        container.innerHTML += productDiv;
    });
}

  
  function filterProducts() {
      const filterValue = document.getElementById("filter").value;
      let filteredProducts = products;
      if (filterValue !== "All") {
          filteredProducts = products.filter(p => p.type === filterValue);
      }
      renderProducts(filteredProducts);
  }
  
  function addToCart(productId) {
      const product = products.find(p => p.id === productId);
      const cartItem = cart.find(item => item.id === productId);
  
      if (cartItem) {
          cartItem.quantity += 1;
      } else {
          cart.push({ ...product, quantity: 1 });
      }
      renderCart();
      saveCartToLocalStorage();
  }
  
  function updateProduct() {
    const id = document.getElementById("product-id").value;
    const product = getDataForm();

    axios({
        url: `${urlApi}/${id}`, 
        method: "PUT",
        data: product,
    })
    .then(function (res) {
        $("#myModal").modal("hide");
        fetchProducts();
    })
    .catch(function (err) {
        console.error("Error updating product:", err);
    });
}

  function editProduct(id) {
      axios({
          url: `${urlApi}/${id}`,
          method: "GET",
      }).then(function (res) {
          const product = res.data;
          $("#myModal").modal("show");
  
          document.getElementById("product-id").value = product.id;
          document.getElementById("TenSP").value = product.name;
          document.getElementById("GiaSP").value = product.price;
          document.getElementById("HinhSP").value = product.img;
          document.getElementById("MoTaSP").value = product.description;
          document.getElementById("BackCamSp").value = product.backCamera;
          document.getElementById("FrontCamSp").value = product.frontCamera;
          document.getElementById("Screen").value = product.screen;



      }).catch(function (err) {
          console.error("Error fetching product:", err);
      });
  }
  
  function getDataForm() {
      return {
          name: document.getElementById("TenSP").value,
          price: document.getElementById("GiaSP").value,
          img: document.getElementById("HinhSP").value,
          description: document.getElementById("MoTaSP").value,
          type: "unknown",
          screen: document.getElementById("Screen").value,
          backCamera: document.getElementById("BackCamSp").value,
          frontCamera: document.getElementById("FrontCamSp").value,

      };
  }

  function renderCart() {
    const cartContainer = document.getElementById("cart");
    cartContainer.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const itemDiv = `
            <div class = "imgSize">
                <img src="${item.img}" alt="${item.name}">
              

                <div class="nameSize"> 
                 <h4>${item.name}</h4> 
                 <p>Price: $${item.price}</p>
                 <p>Screen: ${item.screen}</p>
                <p>Back Camera: ${item.backCamera}</p>
                <p>Front Camera: ${item.frontCamera}</p>

                </div>

            
                <div class="buttonSize">
                <p>Quantity: ${item.quantity}</p>
                <button class="btn btn-success" onclick="updateQuantity('${item.id}', -1)">-</button>
                <button class="btn btn-success" onclick="updateQuantity('${item.id}', 1)">+</button>
                <button class="btn btn-danger" onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
                
            </div>
        `;
        cartContainer.innerHTML += itemDiv;
        total += item.price * item.quantity;
    });

    cartContainer.innerHTML += `
    <div class="total-container">
        <h3>Total: $${total}</h3>
        <button class="btn btn-warning" onclick="checkout()">Purchase</button>
    </div>
`;

}

  
  function updateQuantity(productId, delta) {
      const cartItem = cart.find(item => item.id === productId);
      if (cartItem) {
          cartItem.quantity += delta;
          if (cartItem.quantity <= 0) {
              removeFromCart(productId);
          } else {
              renderCart();
          }
      }
  }
  
  function removeFromCart(productId) {
      cart = cart.filter(item => item.id !== productId);
      renderCart();
      saveCartToLocalStorage();
  }
  
  function saveCartToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function loadCartFromLocalStorage() {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
          cart = JSON.parse(storedCart);
          renderCart();
      }
  }
  
  function checkout() {
      cart = [];
      saveCartToLocalStorage();
      renderCart();
  }
  
  function closeModal() {
      $("#myModal").modal("hide");
  }

