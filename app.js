// =========================================================
// TELEGRAM MINI APP - BAKSO JURAGAN V3
// =========================================================

const tg = window.Telegram.WebApp;


// =========================================================
// API SERVER
// =========================================================

const API_URL =
    "https://responsibility-channels-lots-importantly.trycloudflare.com";


// =========================================================
// TELEGRAM INIT
// =========================================================

console.log("================================");
console.log("🍜 BAKSO JURAGAN MINI APP V3");
console.log("================================");

console.log(
    "Telegram WebApp:",
    tg
);

console.log(
    "Telegram version:",
    tg.version
);

console.log(
    "Platform:",
    tg.platform
);

console.log(
    "initData tersedia:",
    !!tg.initData
);

console.log(
    "user:",
    tg.initDataUnsafe?.user || null
);

console.log(
    "API:",
    API_URL
);


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

    console.log(
        "➕ TAMBAH:",
        product
    );


    if (!products[product]) {

        console.error(
            "❌ Produk tidak ditemukan:",
            product
        );

        return;
    }


    cart[product] =
        Number(cart[product]) + 1;


    updateDisplay();

}


// =========================================================
// KURANG PRODUK
// =========================================================

function decrease(product) {

    console.log(
        "➖ KURANG:",
        product
    );


    if (!products[product]) {

        console.error(
            "❌ Produk tidak ditemukan:",
            product
        );

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

    // -----------------------------------------------------
    // QUANTITY
    // -----------------------------------------------------

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


    // -----------------------------------------------------
    // CART
    // -----------------------------------------------------

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


    // -----------------------------------------------------
    // EMPTY CART
    // -----------------------------------------------------

    if (!html) {

        html = `
            <p class="empty">
                Keranjang masih kosong
            </p>
        `;

    }


    // -----------------------------------------------------
    // CART HTML
    // -----------------------------------------------------

    const cartItems =
        document.getElementById(
            "cart-items"
        );


    if (cartItems) {

        cartItems.innerHTML =
            html;

    }


    // -----------------------------------------------------
    // TOTAL
    // -----------------------------------------------------

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
// BUAT DATA ORDER
// =========================================================

function buildOrder() {

    let items = [];

    let total = 0;


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


    return {

        items:
            items,

        total:
            total

    };

}


// =========================================================
// CHECKOUT
// =========================================================

async function checkout() {

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


    // -----------------------------------------------------
    // BUILD ORDER
    // -----------------------------------------------------

    const orderData =
        buildOrder();


    const items =
        orderData.items;


    const total =
        orderData.total;


    console.log(
        "ITEMS:",
        items
    );


    console.log(
        "TOTAL:",
        total
    );


    // -----------------------------------------------------
    // CEK KERANJANG
    // -----------------------------------------------------

    if (items.length === 0) {

        alert(
            "Silakan pilih menu terlebih dahulu."
        );

        return;

    }


    // -----------------------------------------------------
    // TELEGRAM USER
    // -----------------------------------------------------

    const telegramUser =
        tg.initDataUnsafe?.user || null;


    console.log(
        "👤 TELEGRAM USER:",
        telegramUser
    );


    // -----------------------------------------------------
    // DATA ORDER
    // -----------------------------------------------------

    const order = {

        type:
            "bakso_order",

        items:
            items,

        total:
            total,

        telegram_user:
            telegramUser,

        payment:
            null,

        address:
            null,

        gps:
            null

    };


    console.log(
        "📦 DATA ORDER:"
    );


    console.log(
        JSON.stringify(
            order
        )
    );


    // -----------------------------------------------------
    // VALIDASI API
    // -----------------------------------------------------

    if (
        !API_URL ||
        API_URL.includes(
            "GANTI"
        )
    ) {

        alert(
            "API server belum dikonfigurasi."
        );

        console.error(
            "❌ API_URL:",
            API_URL
        );

        return;

    }


    // -----------------------------------------------------
    // LOADING
    // -----------------------------------------------------

    const checkoutButton =
        document.getElementById(
            "checkout-button"
        );


    if (checkoutButton) {

        checkoutButton.disabled =
            true;

        checkoutButton.textContent =
            "⏳ MENGIRIM ORDER...";

    }


    // -----------------------------------------------------
    // SEND TO FLASK
    // -----------------------------------------------------

    try {

        console.log(
            "📤 MENGIRIM ORDER KE SERVER..."
        );


        console.log(
            "🌐 URL:",
            API_URL + "/order"
        );


        const response =
            await fetch(
                API_URL + "/order",
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            order
                        )

                }
            );


        console.log(
            "📡 HTTP STATUS:",
            response.status
        );


        // -------------------------------------------------
        // SERVER RESPONSE
        // -------------------------------------------------

        const result =
            await response.json();


        console.log(
            "📨 SERVER RESPONSE:",
            result
        );


        // -------------------------------------------------
        // SERVER ERROR
        // -------------------------------------------------

        if (!response.ok) {

            throw new Error(
                result.error ||
                "Server error " +
                response.status
            );

        }


        if (!result.success) {

            throw new Error(
                result.error ||
                "Order gagal diproses."
            );

        }


        // -------------------------------------------------
        // BERHASIL
        // -------------------------------------------------

        console.log(
            "================================"
        );

        console.log(
            "✅ ORDER BERHASIL"
        );

        console.log(
            "🧾 ORDER ID:",
            result.order_id
        );

        console.log(
            "🖨️ PRINT:",
            result.printed
        );

        console.log(
            "================================"
        );


        // -------------------------------------------------
        // SUCCESS MESSAGE
        // -------------------------------------------------

        alert(

            "✅ ORDER BERHASIL!\n\n" +

            "🧾 No Order: " +
            result.order_id +

            "\n💰 Total: $" +
            total +

            "\n\n" +

            "Pesanan sedang diproses."

        );


        // -------------------------------------------------
        // RESET CART
        // -------------------------------------------------

        cart = {

            bakso_urat: 0,
            bakso_telur: 0,
            mie_ayam: 0

        };


        updateDisplay();


    } catch (error) {

        console.error(
            "================================"
        );

        console.error(
            "❌ ORDER GAGAL"
        );

        console.error(
            error
        );

        console.error(
            "================================"
        );


        alert(

            "❌ ORDER GAGAL\n\n" +

            error.message +

            "\n\n" +

            "Silakan coba lagi."

        );

    } finally {

        // -------------------------------------------------
        // RESTORE BUTTON
        // -------------------------------------------------

        if (checkoutButton) {

            checkoutButton.disabled =
                false;

            checkoutButton.textContent =
                "🛒 LANJUT ORDER";

        }

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
            "✅ DOM READY"
        );

        console.log(
            "================================"
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


        // -------------------------------------------------
        // CHECKOUT BUTTON
        // -------------------------------------------------

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


        // -------------------------------------------------
        // INITIAL DISPLAY
        // -------------------------------------------------

        updateDisplay();

    }
);


// =========================================================
// GLOBAL FUNCTIONS
// =========================================================

window.increase =
    increase;


window.decrease =
    decrease;


window.checkout =
    checkout;


console.log(
    "🔥 BAKSO JURAGAN MINI APP V3 READY"
);