// =========================================================
// TELEGRAM MINI APP - BAKSO JURAGAN
// =========================================================

const tg = window.Telegram.WebApp;

console.log("================================");
console.log("🍜 BAKSO JURAGAN MINI APP");
console.log("================================");

console.log("Telegram WebApp:", tg);
console.log("Telegram version:", tg.version);
console.log("Platform:", tg.platform);
console.log("initData tersedia:", !!tg.initData);
console.log("user:", tg.initDataUnsafe?.user || null);

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
// TAMBAH
// =========================================================

function increase(product) {

    console.log("➕ increase:", product);

    if (!products[product]) {
        console.error("❌ Produk tidak ditemukan:", product);
        return;
    }

    cart[product] =
        Number(cart[product]) + 1;

    console.log(
        "CART:",
        cart
    );

    updateDisplay();
}


// =========================================================
// KURANG
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

    console.log(
        "CART:",
        cart
    );

    updateDisplay();
}


// =========================================================
// UPDATE DISPLAY
// =========================================================

function updateDisplay() {

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
        qtyUrat.textContent =
            cart.bakso_urat;
    }

    if (qtyTelur) {
        qtyTelur.textContent =
            cart.bakso_telur;
    }

    if (qtyMie) {
        qtyMie.textContent =
            cart.mie_ayam;
    }


    let total = 0;

    let html = "";


    Object.keys(cart).forEach(
        function(key) {

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

        }
    );


    if (!html) {

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
        cartItems.innerHTML = html;
    }


    const totalElement =
        document.getElementById(
            "total"
        );

    if (totalElement) {

        totalElement.textContent =
            "$" + total;

    }


    console.log(
        "🛒 CART:",
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
    console.log(
        "================================"
    );

    console.log(
        "🛒 LANJUT ORDER"
    );

    console.log(
        "================================"
    );


    let items = [];

    let total = 0;


    Object.keys(cart).forEach(
        function(key) {

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
    );


    console.log(
        "ITEMS:",
        items
    );

    console.log(
        "TOTAL:",
        total
    );


    if (items.length === 0) {

        alert(
            "Silakan pilih menu terlebih dahulu."
        );

        return;

    }


    const order = {

        type:
            "bakso_order",

        items:
            items,

        total:
            total

    };


    console.log(
        "📦 DATA ORDER:"
    );

    console.log(
        JSON.stringify(order)
    );


    // =====================================================
    // CEK TELEGRAM
    // =====================================================

    if (!window.Telegram) {

        console.error(
            "❌ window.Telegram TIDAK ADA"
        );

        alert(
            "Mini App tidak dibuka dari Telegram."
        );

        return;

    }


    if (!window.Telegram.WebApp) {

        console.error(
            "❌ Telegram.WebApp TIDAK ADA"
        );

        alert(
            "Telegram WebApp tidak tersedia."
        );

        return;

    }


    if (!tg.sendData) {

        console.error(
            "❌ tg.sendData TIDAK TERSEDIA"
        );

        alert(
            "Fitur kirim order tidak tersedia di Mini App ini."
        );

        return;

    }


    console.log(
        "📱 Telegram version:",
        tg.version
    );

    console.log(
        "📱 Platform:",
        tg.platform
    );

    console.log(
        "📱 initData:",
        tg.initData
    );

    console.log(
        "📱 user:",
        tg.initDataUnsafe?.user || null
    );


    // =====================================================
    // KIRIM KE BOT
    // =====================================================

    try {

        const jsonOrder =
            JSON.stringify(order);


        console.log(
            "📤 MENGIRIM tg.sendData()..."
        );


        tg.sendData(
            jsonOrder
        );


        console.log(
            "✅ tg.sendData() DIPANGGIL"
        );


        // Tutup Mini App setelah data dikirim
        setTimeout(
            function() {

                try {

                    tg.close();

                } catch (error) {

                    console.log(
                        "ℹ️ tg.close() tidak tersedia"
                    );

                }

            },
            500
        );


    } catch (error) {

        console.error(
            "❌ ERROR tg.sendData():",
            error
        );

        alert(
            "Gagal mengirim order:\n" +
            error.message
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
            "✅ DOM READY"
        );


        const checkoutButton =
            document.getElementById(
                "checkout-button"
            );


        if (!checkoutButton) {

            console.error(
                "❌ checkout-button TIDAK DITEMUKAN"
            );

            return;

        }


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