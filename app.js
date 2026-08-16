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

let cart = {

    bakso_urat: 0,
    bakso_telur: 0,
    mie_ayam: 0

};


// =========================================================
// TAMBAH PRODUK
// =========================================================

function increase(product) {

    console.log("➕ increase:", product);

    if (!products[product]) {
        console.error("❌ Produk tidak ditemukan:", product);
        return;
    }

    cart[product] = Number(cart[product]) + 1;

    console.log("CART:", cart);

    updateDisplay();
}


// =========================================================
// KURANG PRODUK
// =========================================================

function decrease(product) {

    console.log("➖ decrease:", product);

    if (!products[product]) {
        console.error("❌ Produk tidak ditemukan:", product);
        return;
    }

    if (cart[product] > 0) {
        cart[product]--;
    }

    console.log("CART:", cart);

    updateDisplay();
}


// =========================================================
// UPDATE DISPLAY
// =========================================================

function updateDisplay() {

    // -----------------------------
    // QTY
    // -----------------------------

    const qtyUrat =
        document.getElementById("qty-bakso_urat");

    const qtyTelur =
        document.getElementById("qty-bakso_telur");

    const qtyMie =
        document.getElementById("qty-mie_ayam");


    if (qtyUrat) {
        qtyUrat.textContent = cart.bakso_urat;
    }

    if (qtyTelur) {
        qtyTelur.textContent = cart.bakso_telur;
    }

    if (qtyMie) {
        qtyMie.textContent = cart.mie_ayam;
    }


    // -----------------------------
    // CART
    // -----------------------------

    let total = 0;

    let html = "";


    Object.keys(cart).forEach(function(key) {

        const quantity =
            Number(cart[key]);

        if (quantity <= 0) {
            return;
        }

        const product =
            products[key];

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

    });


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

        totalElement.textContent =
            "$" + total;

    }


    console.log(
        "🛒 CART UPDATE:",
        JSON.stringify(cart)
    );

    console.log(
        "💰 TOTAL:",
        total
    );

}


// =========================================================
// CHECKOUT
// =========================================================

function checkout() {

    console.log("");
    console.log("================================");
    console.log("🛒 LANJUT ORDER");
    console.log("================================");


    let items = [];

    let total = 0;


    // =====================================================
    // BACA CART
    // =====================================================

    Object.keys(cart).forEach(function(key) {

        const quantity =
            Number(cart[key]);

        console.log(
            "CHECK:",
            key,
            quantity
        );


        if (quantity <= 0) {
            return;
        }


        const product =
            products[key];


        const subtotal =
            quantity * product.price;


        items.push({

            product: product.name,

            quantity: quantity,

            price: product.price,

            subtotal: subtotal

        });


        total += subtotal;

    });


    console.log(
        "ITEMS:",
        items
    );

    console.log(
        "TOTAL:",
        total
    );


    // =====================================================
    // KERANJANG KOSONG
    // =====================================================

    if (items.length === 0) {

        console.error(
            "❌ KERANJANG KOSONG"
        );

        // Jangan pakai tg.showAlert
        // karena WebApp versi lama kamu tidak support.

        alert(
            "Silakan pilih menu terlebih dahulu."
        );

        return;

    }


    // =====================================================
    // DATA ORDER
    // =====================================================

    const order = {

        type: "bakso_order",

        items: items,

        total: total

    };


    console.log(
        "📦 DATA ORDER:"
    );

    console.log(
        JSON.stringify(order)
    );


    // =====================================================
    // SEND DATA KE BOT
    // =====================================================

    if (
        typeof tg.sendData !== "function"
    ) {

        console.error(
            "❌ tg.sendData tidak tersedia"
        );

        alert(
            "Mini App tidak dapat mengirim order ke Telegram."
        );

        return;

    }


    try {

        console.log(
            "📤 MENGIRIM ORDER KE BOT..."
        );


        tg.sendData(
            JSON.stringify(order)
        );


        console.log(
            "✅ ORDER TERKIRIM KE TELEGRAM"
        );


    } catch (error) {

        console.error(
            "❌ GAGAL SEND DATA:",
            error
        );

        alert(
            "Gagal mengirim order. Silakan coba lagi."
        );

    }

}


// =========================================================
// DOM READY
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "================================"
        );

        console.log(
            "🍜 BAKSO JURAGAN MINI APP"
        );

        console.log(
            "✅ DOM READY"
        );


        // =================================================
        // TOMBOL CHECKOUT
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
                function(event) {

                    event.preventDefault();

                    console.log(
                        "🛒 BUTTON LANJUT ORDER DIKLIK"
                    );

                    checkout();

                }
            );

        }


        // =================================================
        // UPDATE AWAL
        // =================================================

        updateDisplay();

    }
);


// =========================================================
// GLOBAL FUNCTION
// =========================================================
// Supaya onclick="" di HTML tetap bekerja
// =========================================================

window.increase =
    increase;

window.decrease =
    decrease;

window.checkout =
    checkout;