let cartCount = document.getElementById("count");
let cartContainer = document.getElementById("cartContainer");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCount() {
    cartCount.innerHTML = cart.length;
}

function updateQuantity(idx, qty) {
    cart[idx].quantity += qty;

    if (cart[idx].quantity <= 0) {
        deleteProduct(idx);
    } else {
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }
}

function deleteProduct(proIdx) {
    cart.splice(proIdx, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCount();
    displayCart();
}

function clearCart() {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCount();
    displayCart();
}

function displayCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        document.getElementById("main-sec").classList.add("d-none");
        return;
    }

    cart.forEach((pro, idx) => {

        let subTotal = pro.price * pro.quantity;
        total += subTotal;

        cartContainer.innerHTML += `
            <div class="row align-items-center">
                <div class="col-2">
                    <div class="text-center">
                        <button class="btn btn-danger" onclick="deleteProduct(${idx})"><i class="ri-delete-bin-line"></i></button>
                    </div>
                </div>
                <div class="col-2">
                    <div class="text-center">
                        <img src="${pro.imgURL}" alt="cloths" class="img-fluid">
                    </div>
                </div>
                <div class="col-2">
                    <div class="text-center">
                        <h4>${pro.name}</h4>
                    </div>
                </div>
                <div class="col-2">
                    <div class="d-flex justify-content-center align-items-center">
                        <button class="btn btn-primary" onclick="updateQuantity(${idx}, -1)"><i class="ri-subtract-line"></i></button>
                        <h5 class="mx-3">${pro.quantity}</h5>
                        <button class="btn btn-primary" onclick="updateQuantity(${idx}, 1)"><i class="ri-add-line"></i></button>
                    </div>
                </div>
                <div class="col-2">
                    <div class="text-center">
                        <h4>$${pro.price}</h4>
                    </div>
                </div>
                <div class="col-2">
                    <div class="text-center">
                        <h4 class="text-success">$${subTotal}</h4>
                    </div>
                </div>
            </div>
        `
    })
    document.getElementById("total").innerHTML = `$${total}`;
}

window.addEventListener("DOMContentLoaded", function () {
    updateCount();
    displayCart();
})

document.getElementById("clearCart").addEventListener("click", function() {
    clearCart();
})

document.getElementById("checkOut").addEventListener("click", function() {
    alert("Order Sucessfull");
    clearCart();
})

document.getElementById("sortPrice").addEventListener("change", function () {

    if (this.value == 1) {
        cart.sort((a, b) => b.price - a.price);
    }

    if (this.value == 2) {
        cart.sort((a, b) => a.price - b.price);
    }

    displayCart();
});