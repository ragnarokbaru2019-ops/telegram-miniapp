// =========================================================
// TELEGRAM MINI APP - BAKSO JURAGAN
// =========================================================

const tg = window.Telegram.WebApp;

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

    if (!cart.hasOwnProperty(product)) {
        return;
    }

    cart[product]++;

    updateDisplay();

}


// =========================================================
// KURANG PRODUK
// =========================================================

function decrease(product) {

    if (!cart.hasOwnProperty(product)) {
        return;
    }

    if (cart[product] > 0) {
        cart[product]--;
    }

    updateDisplay();

}


// =========================================================
// UPDATE TAMPILAN
// =========================================================

function updateDisplay() {

    // Quantity Bakso Urat
    const qtyUrat =
        document.getElementById("qty-bakso_urat");

    if (qtyUrat) {
        qtyUrat.innerText = cart.bakso_urat;
    }


    // Quantity Bakso Telur
    const qtyTelur =
        document.getElementById("qty-bakso_telur");

    if (qtyTelur) {
        qtyTelur.innerText = cart.bakso_telur;
    }


    // Quantity Mie Ayam
    const qtyMie =
        document.getElementById("qty-mie_ayam");

    if (qtyMie) {
        qtyMie.innerText = cart.mie_ayam;
    }


    // =====================================================
    // CART
    // =====================================================

    let total = 0;

    let html = "";


    for (const key in cart) {

        if (cart[key] <= 0) {
            continue;
        }

        const product = products[key];

        const subtotal =
            cart[key] * product.price;

        total += subtotal;


        html += `
            <div class="cart-row">

                <span>
                    ${product.name} × ${cart[key]}
                </span>

                <strong>
                    $${subtotal}
                </strong>

            </div>
        `;

    }


    if (html === "") {

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
        totalElement.innerText =
            "$" + total;
    }

}


// =========================================================
// CHECKOUT
// =========================================================
//
// MINI APP HANYA MENGIRIM:
// - Produk
// - Quantity
// - Harga
// - Total
//
// PEMBAYARAN DAN LOKASI DIPROSES OLEH BOT
// =========================================================

function checkout() {

    console.log(
        "================================"
    );

    console.log(
        "🛒 LANJUT ORDER DIKLIK"
    );


    let items = [];

    let total = 0;


    // =====================================================
    // AMBIL ITEM
    // =====================================================

    for (const key in cart) {

        if (cart[key] <= 0) {
            continue;
        }


        const product = products[key];


        const quantity =
            cart[key];


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


    console.log(
        "ITEMS:",
        items
    );


    console.log(
        "TOTAL:",
        total
    );


    // =====================================================
    // CEK KERANJANG
    // =====================================================

    if (items.length === 0) {

        console.log(
            "❌ KERANJANG KOSONG"
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
    // DATA YANG DIKIRIM KE BOT
    // =====================================================

    const order = {

        type: "bakso_order",

        items: items,

        total: total

    };


    console.log(
        "DATA ORDER:"
    );


    console.log(
        JSON.stringify(order)
    );


    // =====================================================
    // KIRIM KE TELEGRAM BOT
    // =====================================================

    if (
        typeof tg.sendData === "function"
    ) {

        console.log(
            "📤 Mengirim data ke BOT..."
        );


        tg.sendData(
            JSON.stringify(order)
        );


        console.log(
            "✅ DATA ORDER TERKIRIM"
        );


    } else {

        console.error(
            "❌ Telegram WebApp sendData tidak tersedia"
        );


        if (typeof tg.showAlert === "function") {

            tg.showAlert(
                "Mini App Telegram tidak dapat mengirim data."
            );

        }

    }

}


// =========================================================
// SEMBUNYIKAN BAGIAN PEMBAYARAN / KONFIRMASI DI MINI APP
// =========================================================
//
// Pembayaran dan konfirmasi FINAL dilakukan BOT.
// Jadi kalau HTML lama masih memiliki tombol:
// - Cash
// - ABA / KHQR
// - KONFIRMASI ORDER
//
// kita sembunyikan supaya customer tidak bingung.
//
// =========================================================

function hideOldCheckoutButtons() {

    const elements =
        document.querySelectorAll(
            "button, .payment-section, .payment-buttons, .confirm-order"
        );


    elements.forEach(function (element) {

        const text =
            element.innerText
                ? element.innerText.trim().toUpperCase()
                : "";


        if (

            text.includes("KONFIRMASI ORDER") ||

            text.includes("CONFIRM ORDER") ||

            text === "💵 CASH" ||

            text === "CASH" ||

            text.includes("ABA / KHQR") ||

            text.includes("KHQR")

        ) {

            element.style.display = "none";

        }

    });

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
            "🍜 BAKSO JURAGAN MINI APP"
        );

        console.log(
            "✅ Mini App siap"
        );


        // =================================================
        // TOMBOL LANJUT ORDER
        // =================================================

        const checkoutButton =
            document.getElementById(
                "checkout-button"
            );


        if (!checkoutButton) {

            console.error(
                "❌ TOMBOL checkout-button TIDAK DITEMUKAN"
            );

        } else {

            checkoutButton.addEventListener(
                "click",
                function () {

                    console.log(
                        "🛒 TOMBOL LANJUT ORDER DIKLIK"
                    );


                    checkout();

                }
            );

        }


        // =================================================
        // UPDATE CART
        // =================================================

        updateDisplay();


        // =================================================
        // HILANGKAN TOMBOL LAMA
        // =================================================

        hideOldCheckoutButtons();

    }
);


// =========================================================
// GLOBAL FUNCTION
// =========================================================
//
// Dibutuhkan kalau HTML menggunakan:
// onclick="increase('bakso_urat')"
// onclick="decrease('bakso_urat')"
// =========================================================

window.increase =
    increase;

window.decrease =
    decrease;

window.checkout =
    checkout;