// =========================================================
// TELEGRAM MINI APP - BAKSO JURAGAN V2
// PAYMENT + ALAMAT + GPS
// =========================================================

const tg = window.Telegram.WebApp;


// =========================================================
// API
// =========================================================

const API_URL =
    "https://responsibility-channels-lots-importantly.trycloudflare.com";


// =========================================================
// INIT
// =========================================================

console.log("================================");
console.log("🍜 BAKSO JURAGAN MINI APP V2");
console.log("================================");

console.log("Telegram WebApp:", tg);
console.log("Telegram version:", tg.version);
console.log("Platform:", tg.platform);

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
// CHECKOUT DATA
// =========================================================

let selectedPayment = null;

let gpsData = {

    latitude: null,
    longitude: null
};


// =========================================================
// TAMBAH
// =========================================================

function increase(product) {

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
// KURANG
// =========================================================

function decrease(product) {

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
// UPDATE CART
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

        cartItems.innerHTML =
            html;

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
        cart
    );

    console.log(
        "💰 TOTAL:",
        total
    );

}


// =========================================================
// HITUNG ORDER
// =========================================================

function buildOrderItems() {

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

        items: items,

        total: total

    };

}


// =========================================================
// LANJUT ORDER
// =========================================================

function checkout() {

    console.log(
        "🛒 LANJUT ORDER"
    );


    const orderData =
        buildOrderItems();


    if (
        orderData.items.length === 0
    ) {

        alert(
            "Silakan pilih menu terlebih dahulu."
        );

        return;

    }


    const menu =
        document.querySelector(
            ".cart"
        );


    const checkoutSection =
        document.getElementById(
            "checkout-section"
        );


    if (menu) {

        menu.style.display =
            "none";

    }


    if (checkoutSection) {

        checkoutSection.style.display =
            "block";

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    console.log(
        "📦 Checkout dimulai:",
        orderData
    );

}


// =========================================================
// PAYMENT
// =========================================================

function selectPayment(payment) {

    selectedPayment =
        payment;


    const cashButton =
        document.getElementById(
            "payment-cash"
        );

    const abaButton =
        document.getElementById(
            "payment-aba"
        );


    if (cashButton) {

        cashButton.style.border =
            "2px solid transparent";

    }


    if (abaButton) {

        abaButton.style.border =
            "2px solid transparent";

    }


    if (
        payment === "cash"
    ) {

        if (cashButton) {

            cashButton.style.border =
                "3px solid green";

        }

        console.log(
            "💵 PAYMENT: CASH"
        );

    }


    if (
        payment === "aba"
    ) {

        if (abaButton) {

            abaButton.style.border =
                "3px solid green";

        }

        console.log(
            "🏦 PAYMENT: ABA / QR"
        );

    }

}


// =========================================================
// GPS
// =========================================================

function getGPS() {

    console.log(
        "📍 Meminta lokasi GPS..."
    );


    const status =
        document.getElementById(
            "gps-status"
        );


    const button =
        document.getElementById(
            "gps-button"
        );


    if (!navigator.geolocation) {

        alert(
            "Browser/Telegram tidak mendukung GPS."
        );

        return;

    }


    if (status) {

        status.textContent =
            "📡 Mengambil lokasi...";

    }


    if (button) {

        button.disabled =
            true;

        button.textContent =
            "📡 MENGAMBIL LOKASI...";

    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            gpsData.latitude =
                position.coords.latitude;

            gpsData.longitude =
                position.coords.longitude;


            console.log(
                "✅ GPS LAT:",
                gpsData.latitude
            );

            console.log(
                "✅ GPS LNG:",
                gpsData.longitude
            );


            if (status) {

                status.innerHTML =
                    "✅ Lokasi berhasil dikirim<br>" +
                    gpsData.latitude.toFixed(6) +
                    ", " +
                    gpsData.longitude.toFixed(6);

            }


            if (button) {

                button.disabled =
                    false;

                button.textContent =
                    "📍 LOKASI SUDAH TERKIRIM";

            }

        },


        function(error) {

            console.error(
                "❌ GPS ERROR:",
                error
            );


            if (status) {

                status.textContent =
                    "❌ Gagal mengambil lokasi.";

            }


            if (button) {

                button.disabled =
                    false;

                button.textContent =
                    "📍 COBA LAGI";

            }


            alert(
                "Tidak bisa mengambil lokasi.\n\n" +
                "Pastikan izin lokasi Telegram sudah diberikan."
            );

        },


        {

            enableHighAccuracy:
                true,

            timeout:
                10000,

            maximumAge:
                0

        }

    );

}


// =========================================================
// KEMBALI KE MENU
// =========================================================

function backToMenu() {

    const menu =
        document.querySelector(
            ".cart"
        );


    const checkoutSection =
        document.getElementById(
            "checkout-section"
        );


    if (checkoutSection) {

        checkoutSection.style.display =
            "none";

    }


    if (menu) {

        menu.style.display =
            "block";

    }

}


// =========================================================
// KONFIRMASI ORDER
// =========================================================

async function confirmOrder() {

    console.log("");
    console.log(
        "================================"
    );

    console.log(
        "✅ KONFIRMASI ORDER"
    );

    console.log(
        "================================"
    );


    // -----------------------------------------------------
    // CHECK CART
    // -----------------------------------------------------

    const orderData =
        buildOrderItems();


    if (
        orderData.items.length === 0
    ) {

        alert(
            "Keranjang kosong."
        );

        return;

    }


    // -----------------------------------------------------
    // CHECK PAYMENT
    // -----------------------------------------------------

    if (!selectedPayment) {

        alert(
            "Silakan pilih metode pembayaran."
        );

        return;

    }


    // -----------------------------------------------------
    // ADDRESS
    // -----------------------------------------------------

    const addressElement =
        document.getElementById(
            "address"
        );


    const address =
        addressElement
            ? addressElement.value.trim()
            : "";


    if (!address) {

        alert(
            "Silakan isi alamat pengantaran."
        );

        if (addressElement) {

            addressElement.focus();

        }

        return;

    }


    // -----------------------------------------------------
    // GPS
    // -----------------------------------------------------

    if (
        !gpsData.latitude ||
        !gpsData.longitude
    ) {

        alert(
            "Silakan kirim lokasi GPS terlebih dahulu."
        );

        return;

    }


    // -----------------------------------------------------
    // TELEGRAM USER
    // -----------------------------------------------------

    const telegramUser =
        tg.initDataUnsafe?.user || null;


    console.log(
        "👤 USER:",
        telegramUser
    );


    // -----------------------------------------------------
    // BUILD ORDER
    // -----------------------------------------------------

    const order = {

        type:
            "bakso_order",

        items:
            orderData.items,

        total:
            orderData.total,

        telegram_user:
            telegramUser,

        payment:
            selectedPayment,

        address:
            address,

        gps: {

            latitude:
                gpsData.latitude,

            longitude:
                gpsData.longitude

        }

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
    // BUTTON
    // -----------------------------------------------------

    const button =
        document.getElementById(
            "confirm-order-button"
        );


    if (button) {

        button.disabled =
            true;

        button.textContent =
            "⏳ MENGIRIM ORDER...";

    }


    // -----------------------------------------------------
    // SEND API
    // -----------------------------------------------------

    try {

        console.log(
            "📡 POST:",
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


        const responseText =
            await response.text();


        console.log(
            "📡 SERVER RESPONSE:",
            responseText
        );


        if (!response.ok) {

            throw new Error(
                "Server error " +
                response.status +
                ": " +
                responseText
            );

        }


        let result;


        try {

            result =
                JSON.parse(
                    responseText
                );

        } catch (error) {

            throw new Error(
                "Server tidak mengirim JSON yang valid."
            );

        }


        console.log(
            "✅ RESPONSE:",
            result
        );


        // -------------------------------------------------
        // SUCCESS
        // -------------------------------------------------

        alert(
            "✅ ORDER BERHASIL!\n\n" +
            "Order ID: " +
            (
                result.order_id ||
                "BERHASIL"
            ) +
            "\n\n" +
            "Pesanan sedang diproses."
        );


        console.log(
            "✅ ORDER BERHASIL"
        );


        // -------------------------------------------------
        // CLOSE MINI APP
        // -------------------------------------------------

        setTimeout(
            function() {

                try {

                    tg.close();

                } catch (error) {

                    console.log(
                        "Telegram close tidak tersedia."
                    );

                }

            },
            500
        );


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
            "\n\nSilakan coba lagi."
        );


        if (button) {

            button.disabled =
                false;

            button.textContent =
                "✅ KONFIRMASI ORDER";

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
            "✅ DOM READY"
        );


        const checkoutButton =
            document.getElementById(
                "checkout-button"
            );


        if (checkoutButton) {

            checkoutButton.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();

                    checkout();

                }
            );

        }


        updateDisplay();

    }
);


// =========================================================
// GLOBAL
// =========================================================

window.increase =
    increase;

window.decrease =
    decrease;

window.checkout =
    checkout;

window.selectPayment =
    selectPayment;

window.getGPS =
    getGPS;

window.confirmOrder =
    confirmOrder;

window.backToMenu =
    backToMenu;