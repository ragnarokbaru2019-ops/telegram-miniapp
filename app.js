// =========================================================
// TELEGRAM
// =========================================================

const tg =
    window.Telegram &&
    window.Telegram.WebApp
        ? window.Telegram.WebApp
        : null;


// =========================================================
// API
// =========================================================

// MASUKKAN URL /order KAMU YANG SEKARANG
const ORDER_API_URL =
    "https://baksojuraganpoipet.id/order";

// =========================================================
// PRODUCTS
// =========================================================

const products = {

    bakso_urat: {
        name: "Bakso Urat",
        description: "Bakso urat sapi yang lezat",
        price: 4,
        image: "images/bakso-urat.jpg"
    },

    bakso_telur: {
        name: "Bakso Telur",
        description: "Bakso dengan isian telur",
        price: 4,
        image: "images/bakso-telur.jpg"
    },

    mie_ayam: {
        name: "Mie Ayam",
        description: "Mie ayam gurih dan nikmat",
        price: 3,
        image: "images/mie-ayam.jpg"
    }

};


// =========================================================
// CART
// =========================================================

const cart = {};

Object.keys(products).forEach(
    product => {
        cart[product] = 0;
    }
);


// =========================================================
// GPS
// =========================================================

let gps = null;


// =========================================================
// PAYMENT
// =========================================================

let payment = null;


// =========================================================
// INCREASE
// =========================================================

function increase(product) {

    if (!products[product]) {
        return;
    }

    cart[product]++;

    updateDisplay();

}


// =========================================================
// DECREASE
// =========================================================

function decrease(product) {

    if (!products[product]) {
        return;
    }

    if (cart[product] <= 0) {
        return;
    }

    cart[product]--;

    updateDisplay();

}


// =========================================================
// UPDATE DISPLAY
// =========================================================

function updateDisplay() {

    let total = 0;

    let html = "";

    Object.keys(products).forEach(
        product => {

            const quantity =
                cart[product];

            const data =
                products[product];

            const qtyElement =
                document.getElementById(
                    "qty-" + product
                );

            if (qtyElement) {

                qtyElement.textContent =
                    quantity;

            }

            if (quantity > 0) {

                const subtotal =
                    quantity * data.price;

                total += subtotal;

                html += `
                    <div
                        style="
                            display:flex;
                            justify-content:space-between;
                            margin:8px 0;
                        "
                    >
                        <span>
                            ${data.name}
                            x${quantity}
                        </span>

                        <strong>
                            $${subtotal}
                        </strong>
                    </div>
                `;

            }

        }
    );


    const cartItems =
        document.getElementById(
            "cart-items"
        );


    if (cartItems) {

        if (html === "") {

            cartItems.innerHTML =
                `<p class="empty">
                    Keranjang masih kosong
                </p>`;

        } else {

            cartItems.innerHTML =
                html;

        }

    }


    const totalElement =
        document.getElementById(
            "total"
        );


    if (totalElement) {

        totalElement.textContent =
            "$" + total;

    }

}


// =========================================================
// CHECKOUT
// =========================================================

function checkout() {

    let hasItems = false;

    Object.keys(cart).forEach(
        product => {

            if (cart[product] > 0) {

                hasItems = true;

            }

        }
    );


    if (!hasItems) {

        alert(
            "Keranjang masih kosong."
        );

        return;

    }


    const section =
        document.getElementById(
            "checkout-section"
        );


    if (section) {

        section.style.display =
            "block";

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// =========================================================
// BACK TO MENU
// =========================================================

function backToMenu() {

    const section =
        document.getElementById(
            "checkout-section"
        );


    if (section) {

        section.style.display =
            "none";

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =========================================================
// PAYMENT
// =========================================================

function selectPayment(type) {

    payment = type;


    const cash =
        document.getElementById(
            "payment-cash"
        );

    const aba =
        document.getElementById(
            "payment-aba"
        );


    if (cash) {

        cash.style.opacity =
            type === "cash"
                ? "1"
                : "0.6";

    }


    if (aba) {

        aba.style.opacity =
            type === "aba"
                ? "1"
                : "0.6";

    }


    console.log(
        "💵 PAYMENT:",
        payment
    );

}


// =========================================================
// GPS
// =========================================================

function getGPS() {

    const status =
        document.getElementById(
            "gps-status"
        );

    const button =
        document.getElementById(
            "gps-button"
        );


    if (!status) {

        console.error(
            "❌ gps-status tidak ditemukan"
        );

        return;

    }


    status.textContent =
        "📡 Mengambil lokasi...";


    if (button) {

        button.disabled = true;

        button.textContent =
            "📡 MENGAMBIL LOKASI...";

    }


    console.log(
        "📍 REQUEST GPS"
    );


    // =====================================================
    // TELEGRAM LOCATION
    // =====================================================

    if (
        tg &&
        typeof tg.requestLocation ===
            "function"
    ) {

        console.log(
            "📱 Menggunakan Telegram requestLocation()"
        );


        try {

            tg.requestLocation(
                function(location) {

                    console.log(
                        "📍 TELEGRAM LOCATION:",
                        location
                    );


                    if (
                        location &&
                        typeof location.latitude ===
                            "number" &&
                        typeof location.longitude ===
                            "number"
                    ) {

                        gps = {

                            latitude:
                                location.latitude,

                            longitude:
                                location.longitude,

                            accuracy:
                                location.horizontal_accuracy ||
                                null

                        };


                        status.textContent =
                            "✅ Lokasi berhasil diambil";


                        if (button) {

                            button.disabled =
                                false;

                            button.textContent =
                                "✅ LOKASI SUDAH DIAMBIL";

                        }


                        console.log(
                            "✅ GPS:",
                            gps
                        );

                    } else {

                        gpsFailed();

                    }

                }
            );


            return;

        } catch (error) {

            console.error(
                "❌ Telegram GPS ERROR:",
                error
            );

        }

    }


    // =====================================================
    // FALLBACK BROWSER GPS
    // =====================================================

    if (
        !navigator.geolocation
    ) {

        gpsFailed(
            "❌ GPS tidak tersedia."
        );

        return;

    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            gps = {

                latitude:
                    position.coords.latitude,

                longitude:
                    position.coords.longitude,

                accuracy:
                    position.coords.accuracy

            };


            console.log(
                "✅ BROWSER GPS:",
                gps
            );


            status.textContent =
                "✅ Lokasi berhasil diambil";


            if (button) {

                button.disabled =
                    false;

                button.textContent =
                    "✅ LOKASI SUDAH DIAMBIL";

            }

        },


        function(error) {

            console.error(
                "❌ GPS ERROR:",
                error
            );


            let message =
                "❌ Gagal mengambil lokasi.";


            if (error.code === 1) {

                message =
                    "❌ Izin lokasi ditolak.";

            }


            else if (error.code === 2) {

                message =
                    "❌ Lokasi tidak tersedia.";

            }


            else if (error.code === 3) {

                message =
                    "❌ Waktu mengambil lokasi habis.";

            }


            gpsFailed(
                message
            );

        },


        {

            enableHighAccuracy:
                true,

            timeout:
                15000,

            maximumAge:
                0

        }

    );

}


// =========================================================
// GPS FAILED
// =========================================================

function gpsFailed(
    message =
        "❌ Gagal mengambil lokasi."
) {

    const status =
        document.getElementById(
            "gps-status"
        );

    const button =
        document.getElementById(
            "gps-button"
        );


    gps = null;


    if (status) {

        status.textContent =
            message;

    }


    if (button) {

        button.disabled =
            false;

        button.textContent =
            "📍 GUNAKAN LOKASI SAYA";

    }

}


// =========================================================
// BUILD ITEMS
// =========================================================

function buildItems() {

    const items = [];


    Object.keys(cart).forEach(
        product => {

            const quantity =
                cart[product];


            if (quantity <= 0) {
                return;
            }


            const data =
                products[product];


            items.push({

                product:
                    data.name,

                quantity:
                    quantity,

                price:
                    data.price,

                subtotal:
                    quantity *
                    data.price

            });

        }
    );


    return items;

}


// =========================================================
// CONFIRM ORDER
// =========================================================

async function confirmOrder() {

    const items = buildItems();

    if (!items.length) {

        alert(
            "Keranjang masih kosong."
        );

        return;

    }


    if (!payment) {

        alert(
            "Silakan pilih metode pembayaran."
        );

        return;

    }


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
            "Silakan masukkan alamat pengantaran."
        );

        return;

    }


    const total =
        items.reduce(
            (
                sum,
                item
            ) =>
                sum +
                item.subtotal,
            0
        );


    // =====================================================
    // TELEGRAM USER
    // =====================================================

    const telegramUser =
        tg &&
        tg.initDataUnsafe &&
        tg.initDataUnsafe.user
            ? tg.initDataUnsafe.user
            : null;


    // =====================================================
    // DATA ORDER
    // =====================================================

    const data = {

        type:
            "bakso_order",

        items:
            items,

        total:
            total,

        telegram_user:
            telegramUser,

        payment:
            payment,

        address:
            address,

        gps:
            gps

    };


    console.log(
        "📦 DATA ORDER:"
    );

    console.log(
        JSON.stringify(
            data,
            null,
            2
        )
    );


    const button =
        document.getElementById(
            "confirm-order"
        );


    if (button) {

        button.disabled =
            true;

        button.textContent =
            "⏳ MENGIRIM ORDER...";

    }


    // =====================================================
    // SEND ORDER
    // =====================================================

    try {

        console.log(
            "📡 ORDER API:",
            ORDER_API_URL
        );


        const response =
            await fetch(
                ORDER_API_URL,
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(data)

                }
            );


        console.log(
            "📡 HTTP STATUS:",
            response.status
        );


        // =================================================
        // READ RESPONSE
        // =================================================

        const text =
            await response.text();


        console.log(
            "📦 RESPONSE SERVER:",
            text
        );


        let result;


        try {

            result =
                JSON.parse(text);

        } catch (jsonError) {

            console.error(
                "❌ RESPONSE BUKAN JSON:",
                text
            );

            throw new Error(
                "Server mengembalikan response bukan JSON"
            );

        }


        console.log(
            "📥 SERVER:",
            result
        );


        // =================================================
        // CHECK RESPONSE
        // =================================================

        if (!response.ok) {

            throw new Error(
                result.error ||
                "Server error"
            );

        }


        if (!result.success) {

            throw new Error(
                result.error ||
                "Order gagal dikirim"
            );

        }


        // =================================================
        // SUCCESS
        // =================================================

        console.log(
            "✅ ORDER BERHASIL:",
            result.order_id
        );


        alert(
            "✅ ORDER BERHASIL!\n\n" +
            "No Order: " +
            result.order_id
        );


        // =================================================
        // RESET CART
        // =================================================

        Object.keys(cart).forEach(
            product => {

                cart[product] = 0;

            }
        );


        payment = null;

        gps = null;


        updateDisplay();

        backToMenu();


        // =================================================
        // RESET GPS
        // =================================================

        const gpsStatus =
            document.getElementById(
                "gps-status"
            );


        if (gpsStatus) {

            gpsStatus.textContent =
                "Lokasi belum diambil";

        }


        const gpsButton =
            document.getElementById(
                "gps-button"
            );


        if (gpsButton) {

            gpsButton.disabled =
                false;

            gpsButton.textContent =
                "📍 GUNAKAN LOKASI SAYA";

        }


    } catch (error) {

        // =================================================
        // ERROR
        // =================================================

        console.error(
            "❌ ORDER ERROR:",
            error
        );


        alert(
            "❌ ORDER GAGAL\n\n" +
            error.message
        );


    } finally {

        // =================================================
        // ENABLE BUTTON
        // =================================================

        if (button) {

            button.disabled =
                false;

            button.textContent =
                "✅ KONFIRMASI ORDER";

        }

    }

}

// =========================================================
// INIT
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateDisplay();


        // Checkout

        const checkoutButton =
            document.getElementById(
                "checkout-button"
            );


        if (checkoutButton) {

            checkoutButton.addEventListener(
                "click",
                checkout
            );

        }


        // GPS

        const gpsButton =
            document.getElementById(
                "gps-button"
            );


        if (gpsButton) {

            gpsButton.addEventListener(
                "click",
                getGPS
            );

        }


        // Confirm

        const confirmButton =
            document.getElementById(
                "confirm-order"
            );


        if (confirmButton) {

            confirmButton.addEventListener(
                "click",
                confirmOrder
            );

        }


        // Back

        const backButton =
            document.getElementById(
                "back-button"
            );


        if (backButton) {

            backButton.addEventListener(
                "click",
                backToMenu
            );

        }


        console.log(
            "🔥 BAKSO JURAGAN MINI APP READY"
        );

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