products = [
    {
        id: 1,
        name: "Denim Pent",
        price: 40,
        imgURL: "https://zenis-php.softboffin.com/assets/images/product_7.png"
    },
    {
        id: 2,
        name: "Denim Shirt",
        price: 20,
        imgURL: "https://zenis-php.softboffin.com/assets/images/product_6.png"
    },
    {
        id: 3,
        name: "Frock",
        price: 80,
        imgURL: "https://zenis-php.softboffin.com/assets/images/product_5.png"
    },
    {
        id: 4,
        name: "Shoe",
        price: 120,
        imgURL: "https://zenis-php.softboffin.com/assets/images/product_4.png"
    }
]

let productRow = document.getElementById("row-container");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartCount = document.getElementById("count");

function updateCount() {
    cartCount.innerHTML = cart.length;
}

function addToCart(productId){
    if(cart.some(pro => pro.id === productId)) {
        alert("Item Already In Cart");
        return;
    }

    const product = products.find((pro) => {
        return pro.id === productId;
    })

    product.quantity = 1;

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCount();
}

products.forEach((pro, idx) => {
    productRow.innerHTML += `
        <div class="col-3">
            <div class="card">
                <img src="${pro.imgURL}" class="card-img-top img-fluid" alt="cloth">
                <div class="card-body">
                    <h4 class="card-title">${pro.name}</h4>
                    <h5>$${pro.price}</h5>
                    <button class="btn btn-primary mt-2" onclick="addToCart(${pro.id})">Add To Cart</button>
                </div>
            </div>
        </div>
    `
});

window.addEventListener("DOMContentLoaded", function() {
    updateCount();
})