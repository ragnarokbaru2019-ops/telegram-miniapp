// =========================================================
// BAKSO JURAGAN - TELEGRAM MINI APP
// =========================================================

const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

console.log("=================================");
console.log("🍜 BAKSO JURAGAN MINI APP");
console.log("Telegram WebApp version:", tg.version);
console.log("Platform:", tg.platform);
console.log("=================================");


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
// TAMBAH
// =========================================================

function increase(product) {

    if (!Object.prototype.hasOwnProperty.call(cart, product)) {
        console.error("Produk tidak ditemukan:", product);
        return;
    }

    cart[product]++;

    console.log(
        "Tambah:",
        product,
        cart[product]
    );

    updateDisplay();
}


// =========================================================
// KURANG
// =========================================================

function decrease(product) {

    if (!Object.prototype.hasOwnProperty.call(cart, product)) {
        console.error("Produk tidak ditemukan:", product);
        return;
    }

    if (cart[product] > 0) {
        cart[product]--;
    }

    console.log(
        "Kurang:",
        product,
        cart[product]
    );

    updateDisplay();
}


// =========================================================
// UPDATE DISPLAY
// =========================================================

function updateDisplay() {

    const qtyUrat =
        document.getElementById("qty-bakso_urat");

    const qtyTelur =
        document.getElementById("qty-bakso_telur");

    const qtyMie =
        document.getElementById("qty-mie_ayam");


    if (qtyUrat) {
        qtyUrat.innerText = cart.bakso_urat;
    }

    if (qtyTelur) {
        qtyTelur.innerText = cart.bakso_telur;
    }

    if (qtyMie) {
        qtyMie.innerText = cart.mie_ayam;
    }


    // =====================================================
    // CART
    // =====================================================

    let total = 0;

    let html = "";


    for (const key in cart) {

        const quantity = cart[key];

        if (quantity <= 0) {
            continue;
        }

        const product = products[key];

        const subtotal =
            quantity * product.price;

        total += subtotal;


        html += `
            <div class="cart-row">

                <span>
                    ${product.name} × ${quantity}
                </span>

                <strong>
                    $${subtotal}
                </strong>

            </div>
        `;
    }


    if (!html) {

        html = `
            <p class="empty">
                Keranjang masih kosong
            </p>
        `;
    }


    const cartItems =
        document.getElementById("cart-items");

    if (cartItems) {
        cartItems.innerHTML = html;
    }


    const totalElement =
        document.getElementById("total");

    if (totalElement) {
        totalElement.innerText = "$" + total;
    }

}


// =========================================================
// BUAT DATA ORDER
// =========================================================

function buildOrder() {

    const items = [];

    let total = 0;


    for (const key in cart) {

        const quantity = cart[key];

        if (quantity <= 0) {
            continue;
        }

        const product = products[key];

        const subtotal =
            quantity * product.price;


        items.push({

            product: product.name,

            quantity: quantity,

            price: product.price,

            subtotal: subtotal

        });


        total += subtotal;
    }


    return {

        type: "bakso_order",

        items: items,

        total: total

    };

}


// =========================================================
// CHECKOUT
// =========================================================

function checkout() {

    console.log("=================================");
    console.log("🛒 LANJUT ORDER");

    const order = buildOrder();


    console.log(
        "ORDER:",
        order
    );


    // =====================================================
    // CEK KOSONG
    // =====================================================

    if (!order.items.length) {

        console.log(
            "❌ CART KOSONG"
        );

        if (typeof tg.showAlert === "function") {

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
    // JSON
    // =====================================================

    const jsonData =
        JSON.stringify(order);


    console.log(
        "📦 DATA YANG DIKIRIM:"
    );

    console.log(
        jsonData
    );


    // =====================================================
    // CEK SENDDATA
    // =====================================================

    if (
        typeof tg.sendData !== "function"
    ) {

        console.error(
            "❌ tg.sendData tidak tersedia"
        );

        if (typeof tg.showAlert === "function") {

            tg.showAlert(
                "Mini App tidak dapat mengirim data ke Telegram."
            );

        }

        return;
    }


    // =====================================================
    // KIRIM KE BOT
    // =====================================================

    console.log(
        "📤 Mengirim order ke Telegram..."
    );


    try {

        tg.sendData(
            jsonData
        );

        console.log(
            "✅ sendData BERHASIL DIPANGGIL"
        );


        /*
         * sendData memang akan mengirim data
         * ke bot dan Telegram dapat menutup Mini App.
         */

    } catch (error) {

        console.error(
            "❌ SEND DATA ERROR:",
            error
        );


        if (typeof tg.showAlert === "function") {

            tg.showAlert(
                "Gagal mengirim order: " +
                error.message
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
            "✅ DOM READY"
        );


        // =================================================
        // BUTTON LANJUT ORDER
        // =================================================

        const checkoutButton =
            document.getElementById(
                "checkout-button"
            );


        if (!checkoutButton) {

            console.error(
                "❌ checkout-button TIDAK DITEMUKAN"
            );

        } else {

            console.log(
                "✅ checkout-button ditemukan"
            );


            checkoutButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    console.log(
                        "🔥 BUTTON LANJUT ORDER DIKLIK"
                    );

                    checkout();

                }
            );

        }


        // =================================================
        // UPDATE
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