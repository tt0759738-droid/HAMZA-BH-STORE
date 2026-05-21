const buttons = document.querySelectorAll("button");

const cartCount = document.getElementById("cart-count");

const cartContent = document.querySelector(".cart-content");

const totalPrice = document.querySelector(".total span");

const cart = document.querySelector(".cart");

const cartIcon = document.querySelector(".fa-shopping-cart");

let count = 0;

let total = 0;

/* LOAD DATA */

window.addEventListener("DOMContentLoaded", loadCart);

/* OPEN CART */

cartIcon.addEventListener("click", () => {

    cart.classList.toggle("active");

});

/* ADD PRODUCTS */

buttons.forEach(button => {

    button.addEventListener("click", (e) => {

        if(button.classList.contains("checkout"))
        return;

        const productCard =
        e.target.parentElement;

        const title =
        productCard.querySelector("h3").textContent;

        const price =
        productCard.querySelector(".price").textContent;

        addProduct(title, price);

        saveCart();

    });

});

/* ADD PRODUCT FUNCTION */

function addProduct(title, price){

    count++;

    cartCount.textContent = count;

    total += parseInt(price);

    totalPrice.textContent = total;

    const cartBox =
    document.createElement("div");

    cartBox.classList.add("cart-box");

    cartBox.innerHTML = `

        <div class="cart-info">

            <h4>${title}</h4>

            <p>${price}</p>

        </div>

        <span class="remove">🗑️</span>

    `;

    cartContent.appendChild(cartBox);

    /* REMOVE */

    const removeBtn =
    cartBox.querySelector(".remove");

    removeBtn.addEventListener("click", () => {

        cartBox.remove();

        count--;

        cartCount.textContent = count;

        total -= parseInt(price);

        totalPrice.textContent = total;

        saveCart();

    });

}

/* SAVE CART */

function saveCart(){

    localStorage.setItem(
        "cartData",
        cartContent.innerHTML
    );

    localStorage.setItem(
        "cartCount",
        count
    );

    localStorage.setItem(
        "cartTotal",
        total
    );

}

/* LOAD CART */

function loadCart(){

    cartContent.innerHTML =
    localStorage.getItem("cartData") || "";

    count =
    localStorage.getItem("cartCount") || 0;

    total =
    localStorage.getItem("cartTotal") || 0;

    cartCount.textContent = count;

    totalPrice.textContent = total;

    /* REMOVE BUTTONS */

    const removeButtons =
    document.querySelectorAll(".remove");

    removeButtons.forEach(btn => {

        btn.addEventListener("click", () => {

            const cartBox =
            btn.parentElement;

            const price =
            cartBox.querySelector("p").textContent;

            cartBox.remove();

            count--;

            cartCount.textContent = count;

            total -= parseInt(price);

            totalPrice.textContent = total;

            saveCart();

        });

    });

}
/* FAVORITE */

const favorites =
document.querySelectorAll(".favorite");

favorites.forEach(fav => {

    fav.addEventListener("click", () => {

        fav.classList.toggle("active");

    });

});

/* SEARCH */

const search =
document.getElementById("search");

const products =
document.querySelectorAll(".product-card");

search.addEventListener("keyup", () => {

    const value =
    search.value.toLowerCase();

    products.forEach(product => {

        const name =
        product.querySelector("h3")
        .textContent
        .toLowerCase();

        if(name.includes(value)){

            product.style.display = "block";

        }else{

            product.style.display = "none";

        }

    });

});