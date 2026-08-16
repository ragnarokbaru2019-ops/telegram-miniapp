// =========================================================
// TELEGRAM MINI APP - BAKSO JURAGAN V5
// =========================================================


const tg = window.Telegram.WebApp;


// =========================================================
// TELEGRAM INIT
// =========================================================

tg.ready();

tg.expand();


// =========================================================
// PRODUK
// =========================================================

const products = {

    bakso_urat: {

        name: "Bakso Urat",

        price: 4

    },


    bakso_telur: {

        name: "Bakso Telur",

        price: 4

    },


    mie_ayam: {

        name: "Mie Ayam",

        price: 3

    }

};


// =========================================================
// CART
// =========================================================

const cart = {

    bakso_urat: 0,

    bakso_telur: 0,

    mie_ayam: 0

};


// =========================================================
// TAMBAH PRODUK
// =========================================================

function increase(product) {

    if (
        !Object.prototype.hasOwnProperty
            .call(cart, product)
    ) {

        return;

    }


    cart[product]++;

    updateDisplay();

}


// =========================================================
// KURANG PRODUK
// =========================================================

function decrease(product) {

    if (
        !Object.prototype.hasOwnProperty
            .call(cart, product)
    ) {

        return;

    }


    if (cart[product] > 0) {

        cart[product]--;

    }


    updateDisplay();

}


// =========================================================
// UPDATE DISPLAY
// =========================================================

function updateDisplay() {


    // =====================================================
    // QUANTITY
    // =====================================================

    const qtyUrat =
        document.getElementById(
            "qty-bakso_urat"
        );


    const qtyTelur =
        document.getElementById(
            "qty-bakso_telur"
        );


    const qtyMie =
        document.getElementById(
            "qty-mie_ayam"
        );


    if (qtyUrat) {

        qtyUrat.innerText =
            cart.bakso_urat;

    }


    if (qtyTelur) {

        qtyTelur.innerText =
            cart.bakso_telur;

    }


    if (qtyMie) {

        qtyMie.innerText =
            cart.mie_ayam;

    }


    // =====================================================
    // CART
    // =====================================================

    let html = "";

    let total = 0;


    for (const key in cart) {


        const quantity =
            cart[key];


        if (quantity <= 0) {

            continue;

        }


        const product =
            products[key];


        const subtotal =
            quantity *
            product.price;


        total += subtotal;


        html += `

            <div class="cart-row">

                <span>

                    ${product.name}
                    × ${quantity}

                </span>

                <strong>

                    $${subtotal}

                </strong>

            </div>

        `;

    }


    // =====================================================
    // CART KOSONG
    // =====================================================

    if (html === "") {

        html = `

            <p class="empty">

                Keranjang masih kosong

            </p>

        `;

    }


    const cartItems =
        document.getElementById(
            "cart-items"
        );


    if (cartItems) {

        cartItems.innerHTML =
            html;

    }


    // =====================================================
    // TOTAL
    // =====================================================

    const totalElement =
        document.getElementById(
            "total"
        );


    if (totalElement) {

        totalElement.innerText =
            "$" + total;

    }

}


// =========================================================
// CHECKOUT
// =========================================================

function checkout() {


    console.log(
        "================================"
    );


    console.log(
        "🛒 LANJUT ORDER"
    );


    let items = [];

    let total = 0;


    // =====================================================
    // BUAT ITEM
    // =====================================================

    for (const key in cart) {


        const quantity =
            cart[key];


        if (quantity <= 0) {

            continue;

        }


        const product =
            products[key];


        const subtotal =
            quantity *
            product.price;


        items.push({

            product:
                product.name,

            quantity:
                quantity,

            price:
                product.price,

            subtotal:
                subtotal

        });


        total += subtotal;

    }


    // =====================================================
    // CEK CART
    // =====================================================

    if (items.length === 0) {


        console.log(
            "❌ CART KOSONG"
        );


        if (
            typeof tg.showAlert ===
            "function"
        ) {

            tg.showAlert(
                "Silakan pilih menu terlebih dahulu."
            );

        } else {

            alert(
                "Silakan pilih menu terlebih dahulu."
            );

        }


        return;

    }


    // =====================================================
    // DATA ORDER
    // =====================================================

    const order = {

        type:
            "bakso_order",

        items:
            items,

        total:
            total

    };


    const orderJSON =
        JSON.stringify(order);


    console.log(
        "📦 DATA ORDER:"
    );


    console.log(
        orderJSON
    );


    console.log(
        "Telegram version:",
        tg.version
    );


    console.log(
        "Telegram platform:",
        tg.platform
    );


    console.log(
        "sendData:",
        typeof tg.sendData
    );


    // =====================================================
    // CEK SEND DATA
    // =====================================================

    if (
        typeof tg.sendData !==
        "function"
    ) {


        console.error(
            "❌ tg.sendData tidak tersedia"
        );


        if (
            typeof tg.showAlert ===
            "function"
        ) {

            tg.showAlert(
                "Mini App Telegram tidak dapat mengirim data."
            );

        }


        return;

    }


    // =====================================================
    // DISABLE BUTTON
    // =====================================================

    const checkoutButton =
        document.getElementById(
            "checkout-button"
        );


    if (checkoutButton) {

        checkoutButton.disabled =
            true;

        checkoutButton.innerText =
            "⏳ Mengirim order...";

    }


    // =====================================================
    // SEND DATA
    // =====================================================

    try {


        console.log(
            "📤 MENGIRIM DATA KE BOT..."
        );


        tg.sendData(
            orderJSON
        );


        console.log(
            "✅ tg.sendData() dipanggil"
        );


    } catch (error) {


        console.error(
            "❌ ERROR SEND DATA:",
            error
        );


        if (checkoutButton) {

            checkoutButton.disabled =
                false;

            checkoutButton.innerText =
                "🛒 LANJUT ORDER";

        }


        if (
            typeof tg.showAlert ===
            "function"
        ) {

            tg.showAlert(
                "Gagal mengirim order."
            );

        }

    }

}


// =========================================================
// DOM READY
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        console.log(
            "================================"
        );


        console.log(
            "🍜 BAKSO JURAGAN MINI APP V5"
        );


        console.log(
            "✅ Mini App siap"
        );


        // =================================================
        // CHECKOUT
        // =================================================

        const checkoutButton =
            document.getElementById(
                "checkout-button"
            );


        if (!checkoutButton) {


            console.error(
                "❌ checkout-button tidak ditemukan"
            );


        } else {


            checkoutButton.addEventListener(
                "click",
                checkout
            );


            console.log(
                "✅ Tombol LANJUT ORDER aktif"
            );

        }


        // =================================================
        // INITIAL DISPLAY
        // =================================================

        updateDisplay();

    }
);


// =========================================================
// GLOBAL FUNCTION
// =========================================================

window.increase =
    increase;


window.decrease =
    decrease;


window.checkout =
    checkout;