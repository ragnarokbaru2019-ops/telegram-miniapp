// =========================================================
// BAKSO JURAGAN - MINI APP V2
// =========================================================

const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

console.log("================================");
console.log("🍜 BAKSO JURAGAN MINI APP V2");
console.log("================================");


// =========================================================
// API
// =========================================================

const API_URL =
    "https://responsibility-channels-lots-importantly.trycloudflare.com";


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
// GPS
// =========================================================

let gps = null;


// =========================================================
// TAMBAH
// =========================================================

function increase(product) {

    if (!products[product]) {
        return;
    }

    cart[product]++;

    updateDisplay();

}


// =========================================================
// KURANG
// =========================================================

function decrease(product) {

    if (!products[product]) {
        return;
    }

    if (cart[product] > 0) {

        cart[product]--;

    }

    updateDisplay();

}


// =========================================================
// UPDATE MENU
// =========================================================

function updateDisplay() {

    document.getElementById(
        "qty-bakso_urat"
    ).textContent = cart.bakso_urat;


    document.getElementById(
        "qty-bakso_telur"
    ).textContent = cart.bakso_telur;


    document.getElementById(
        "qty-mie_ayam"
    ).textContent = cart.mie_ayam;


    let total = 0;

    let html = "";


    Object.keys(cart).forEach(
        key => {

            const qty =
                Number(cart[key]);

            if (qty <= 0) {
                return;
            }


            const product =
                products[key];


            const subtotal =
                qty * product.price;


            total += subtotal;


            html += `
                <div class="cart-row">

                    <span>
                        ${product.name} × ${qty}
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


    document.getElementById(
        "cart-items"
    ).innerHTML = html;


    document.getElementById(
        "total"
    ).textContent = "$" + total;

}


// =========================================================
// GET CART DATA
// =========================================================

function getOrderItems() {

    const items = [];

    let total = 0;


    Object.keys(cart).forEach(
        key => {

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
        items,
        total
    };

}


// =========================================================
// BUKA CHECKOUT
// =========================================================

function checkout() {

    const order =
        getOrderItems();


    if (order.items.length === 0) {

        alert(
            "Silakan pilih menu terlebih dahulu."
        );

        return;

    }


    document.querySelector(
        ".container"
    ).style.display = "none";


    document.getElementById(
        "checkout-page"
    ).style.display = "block";


    renderCheckout(
        order
    );

}


// =========================================================
// RENDER CHECKOUT
// =========================================================

function renderCheckout(order) {

    let html = "";


    order.items.forEach(
        item => {

            html += `

                <div class="cart-row">

                    <span>
                        ${item.product}
                        × ${item.quantity}
                    </span>

                    <strong>
                        $${item.subtotal}
                    </strong>

                </div>

            `;

        }
    );


    document.getElementById(
        "checkout-items"
    ).innerHTML = html;


    document.getElementById(
        "checkout-total"
    ).textContent =
        "$" + order.total;

}


// =========================================================
// KEMBALI KE MENU
// =========================================================

function backToMenu() {

    document.getElementById(
        "checkout-page"
    ).style.display = "none";


    document.querySelector(
        ".container"
    ).style.display = "block";

}


// =========================================================
// GPS
// =========================================================

function getGPS() {

    const status =
        document.getElementById("gps-status");

    const button =
        document.getElementById("gps-button");

    if (!status) {
        console.error("GPS status element tidak ditemukan");
        return;
    }

    if (button) {
        button.disabled = true;
        button.textContent = "📡 MENGAMBIL LOKASI...";
    }

    status.textContent =
        "📡 Mengambil lokasi...";

    console.log("📍 REQUEST GPS");

    // =====================================================
    // TELEGRAM LOCATION
    // =====================================================

    const tg =
        window.Telegram &&
        window.Telegram.WebApp
            ? window.Telegram.WebApp
            : null;

    if (
        tg &&
        typeof tg.requestLocation === "function"
    ) {

        console.log(
            "📱 Menggunakan Telegram requestLocation()"
        );

        try {

            tg.requestLocation(function(location) {

                console.log(
                    "📍 TELEGRAM LOCATION:",
                    location
                );

                if (
                    location &&
                    typeof location.latitude === "number" &&
                    typeof location.longitude === "number"
                ) {

                    gps = {

                        latitude:
                            location.latitude,

                        longitude:
                            location.longitude,

                        accuracy:
                            location.horizontal_accuracy || null

                    };

                    status.textContent =
                        "✅ Lokasi berhasil diambil";

                    if (button) {

                        button.disabled = false;

                        button.textContent =
                            "✅ LOKASI SUDAH DIAMBIL";

                    }

                    console.log(
                        "✅ GPS:",
                        gps
                    );

                } else {

                    status.textContent =
                        "❌ Lokasi tidak tersedia";

                    if (button) {

                        button.disabled = false;

                        button.textContent =
                            "📍 GUNAKAN LOKASI SAYA";

                    }

                }

            });

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

    console.log(
        "🌐 Menggunakan browser Geolocation"
    );

    if (!navigator.geolocation) {

        status.textContent =
            "❌ GPS tidak tersedia di perangkat ini.";

        if (button) {

            button.disabled = false;

            button.textContent =
                "📍 GUNAKAN LOKASI SAYA";

        }

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

                button.disabled = false;

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
                    "❌ Izin lokasi ditolak. Silakan izinkan akses lokasi.";

            } else if (error.code === 2) {

                message =
                    "❌ Lokasi tidak tersedia.";

            } else if (error.code === 3) {

                message =
                    "❌ Waktu mengambil lokasi habis.";

            }

            status.textContent =
                message;

            if (button) {

                button.disabled = false;

                button.textContent =
                    "📍 GUNAKAN LOKASI SAYA";

            }

        },

        {

            enableHighAccuracy: true,

            timeout: 15000,

            maximumAge: 0

        }

    );

}

// =========================================================
// TELEGRAM USER
// =========================================================

function getTelegramUser() {

    const user =
        tg.initDataUnsafe?.user;


    if (!user) {

        console.warn(
            "⚠️ Telegram user tidak tersedia"
        );

        return null;

    }


    return {

        id:
            user.id,

        first_name:
            user.first_name || "",

        last_name:
            user.last_name || "",

        username:
            user.username || "",

        language_code:
            user.language_code || "",

        allows_write_to_pm:
            user.allows_write_to_pm || false,

        photo_url:
            user.photo_url || ""

    };

}


// =========================================================
// PAYMENT
// =========================================================

function getPayment() {

    const selected =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    if (!selected) {
        return null;
    }


    return selected.value;

}


// =========================================================
// CONFIRM ORDER
// =========================================================

async function confirmOrder() {

    console.log("");
    console.log(
        "================================"
    );

    console.log(
        "📦 KONFIRMASI ORDER"
    );

    console.log(
        "================================"
    );


    const order =
        getOrderItems();


    if (order.items.length === 0) {

        alert(
            "Keranjang kosong."
        );

        return;

    }


    const address =
        document.getElementById(
            "address"
        ).value.trim();


    if (!address) {

        alert(
            "Silakan masukkan alamat pengantaran."
        );

        return;

    }


    const payment =
        getPayment();


    if (!payment) {

        alert(
            "Silakan pilih metode pembayaran."
        );

        return;

    }


    const telegramUser =
        getTelegramUser();


    if (!telegramUser) {

        alert(
            "Data Telegram tidak tersedia."
        );

        return;

    }


    const data = {

        type:
            "bakso_order",

        items:
            order.items,

        total:
            order.total,

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


    button.disabled = true;

    button.textContent =
        "⏳ MENGIRIM ORDER...";


    try {

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
                        JSON.stringify(data)

                }
            );


        console.log(
            "HTTP STATUS:",
            response.status
        );


        const result =
            await response.json();


        console.log(
            "SERVER RESPONSE:",
            result
        );


        if (!response.ok || !result.success) {

            throw new Error(
                result.error ||
                "Order gagal."
            );

        }


        console.log(
            "✅ ORDER BERHASIL:",
            result.order_id
        );


        // =================================================
        // SUKSES
        // =================================================

        document.getElementById(
            "checkout-page"
        ).innerHTML = `

            <div
                style="
                    text-align:center;
                    padding:40px 20px;
                "
            >

                <div
                    style="
                        font-size:70px;
                        margin-bottom:20px;
                    "
                >
                    ✅
                </div>

                <h2>
                    Order Berhasil!
                </h2>

                <p>
                    Nomor Order
                </p>

                <h2>
                    ${result.order_id}
                </h2>

                <p>
                    Pesanan kamu sudah diterima
                    dan sedang diproses.
                </p>

                <button
                    type="button"
                    class="checkout"
                    onclick="closeMiniApp()"
                >
                    👍 SELESAI
                </button>

            </div>

        `;


    } catch (error) {

        console.error(
            "❌ ORDER GAGAL:",
            error
        );


        alert(
            "Order gagal:\n\n" +
            error.message
        );


        button.disabled = false;

        button.textContent =
            "✅ KONFIRMASI ORDER";

    }

}


// =========================================================
// CLOSE MINI APP
// =========================================================

function closeMiniApp() {

    try {

        tg.close();

    } catch (error) {

        console.log(
            "Telegram close tidak tersedia"
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


        if (checkoutButton) {

            checkoutButton.addEventListener(
                "click",
                checkout
            );

        }


        const backButton =
            document.getElementById(
                "back-menu"
            );


        if (backButton) {

            backButton.addEventListener(
                "click",
                backToMenu
            );

        }


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

window.confirmOrder =
    confirmOrder;

window.getGPS =
    getGPS;

window.closeMiniApp =
    closeMiniApp;