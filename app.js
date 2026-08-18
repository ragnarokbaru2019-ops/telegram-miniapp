// =========================================================
// BAKSO JURAGAN - MINI APP
// =========================================================


// =========================================================
// TELEGRAM
// =========================================================

const tg =
    window.Telegram &&
    window.Telegram.WebApp
        ? window.Telegram.WebApp
        : null;


if (tg) {

    try {

        tg.ready();
        tg.expand();

    } catch (error) {

        console.error(
            "❌ TELEGRAM INIT ERROR:",
            error
        );

    }

}


// =========================================================
// API
// =========================================================

const ORDER_API_URL =
    "https://baksojuraganpoipet.id/order";


// =========================================================
// SERVER STATUS
// =========================================================

const SERVER_STATUS_URL =
    "https://baksojuraganpoipet.id/health";


// =========================================================
// PRODUCTS
// =========================================================

const products = {

    bakso_komplit_urat: {

        name:
            "Bakso Komplit Urat",

        description:
            "Bakso komplit + kuah",

        price:
            4,

        image:
            "images/bakso-komplit-urat.jpg",

        category:
            "bakso",

        requireMie:
            true

    },


    bakso_urat: {

        name:
            "Bakso Urat",

        description:
            "Bakso urat sapi yang lezat",

        price:
            4,

        image:
            "images/bakso-urat.jpg",

        category:
            "bakso"

    },


    bakso_telur: {

        name:
            "Bakso Telur",

        description:
            "Bakso dengan isian telur",

        price:
            4,

        image:
            "images/bakso-telur.jpg",

        category:
            "bakso"

    },


    mie_ayam: {

        name:
            "Mie Ayam",

        description:
            "Mie ayam gurih dan nikmat",

        price:
            3,

        image:
            "images/mie-ayam.jpg",

        category:
            "mie"

    }

};


// =========================================================
// CATEGORY
// =========================================================

let activeCategory =
    "all";


function selectCategory(category) {

    activeCategory =
        category;


    document
        .querySelectorAll(".category-chip")
        .forEach(button => {

            button.classList.remove(
                "active"
            );

        });


    const activeButton =
        document.querySelector(
            `.category-chip[onclick="selectCategory('${category}')"]`
        );


    if (activeButton) {

        activeButton.classList.add(
            "active"
        );

    }


    renderProducts();

    updateDisplay();

}


// =========================================================
// CART
// =========================================================

const cart = {};


Object.keys(products).forEach(
    product => {

        cart[product] =
            0;

    }
);


// =========================================================
// PILIHAN MIE
// =========================================================
//
// Contoh:
//
// cartMieChoice["bakso_komplit_urat"] = [
//     "Mie Kuning",
//     "Bihun"
// ]
//
// Setiap kali customer menekan +
// satu pilihan mie disimpan.
// =========================================================

const cartMieChoice = {};


// Produk yang sedang meminta pilihan mie
let mieChoiceProduct =
    null;


// =========================================================
// PAYMENT
// =========================================================

let payment =
    null;


// =========================================================
// GPS
// =========================================================

let gps =
    null;


// =========================================================
// RENDER PRODUCTS
// =========================================================

function renderProducts() {

    const productList =
        document.getElementById(
            "product-list"
        );


    if (!productList) {

        console.error(
            "❌ product-list tidak ditemukan"
        );

        return;

    }


    let html =
        "";


    Object.keys(products).forEach(
        product => {

            const data =
                products[product];


            // Filter kategori
            if (
                activeCategory !== "all" &&
                data.category !== activeCategory
            ) {

                return;

            }


            html += `

                <div class="product">

                    <div class="product-icon">

                        <img
                            src="${data.image}"
                            alt="${data.name}"
                        >

                    </div>


                    <div class="product-info">

                        <h3>
                            ${data.name}
                        </h3>

                        <p>
                            ${data.description}
                        </p>

                        <strong>
                            ฿${data.price}
                        </strong>

                    </div>


                    <div class="quantity">

                        <button
                            type="button"
                            onclick="decrease('${product}')"
                        >
                            −
                        </button>


                        <span
                            id="qty-${product}"
                        >
                            0
                        </span>


                        <button
                            type="button"
                            onclick="increase('${product}')"
                        >
                            +
                        </button>

                    </div>

                </div>

            `;

        }
    );


    productList.innerHTML =
        html;

}


// =========================================================
// OPEN MIE CHOICE
// =========================================================

function openMieChoice(product) {

    if (!products[product]) {

        return;

    }


    mieChoiceProduct =
        product;


    const modal =
        document.getElementById(
            "mie-choice-modal"
        );


    const title =
        document.getElementById(
            "mie-choice-title"
        );


    if (!modal) {

        console.error(
            "❌ mie-choice-modal tidak ditemukan"
        );

        return;

    }


    if (title) {

        title.textContent =
            products[product].name;

    }


    modal.classList.add(
        "show"
    );

}


// =========================================================
// CLOSE MIE CHOICE
// =========================================================

function closeMieChoice() {

    const modal =
        document.getElementById(
            "mie-choice-modal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }


    mieChoiceProduct =
        null;

}


// =========================================================
// SELECT MIE CHOICE
// =========================================================

function selectMieChoice(mie) {

    if (!mieChoiceProduct) {

        console.error(
            "❌ Produk belum dipilih"
        );

        return;

    }


    const product =
        mieChoiceProduct;


    if (!cartMieChoice[product]) {

        cartMieChoice[product] =
            [];

    }


    // Tambah quantity
    cart[product]++;


    // Simpan pilihan mie
    cartMieChoice[product].push(
        mie
    );


    console.log(
        "🍜 PILIHAN MIE:",
        mie
    );


    console.log(
        "📦 PRODUK:",
        product
    );


    console.log(
        "🔢 QTY:",
        cart[product]
    );


    console.log(
        "📋 SEMUA PILIHAN:",
        cartMieChoice[product]
    );


    closeMieChoice();

    updateDisplay();

}


// =========================================================
// INCREASE
// =========================================================

function increase(product) {

    if (!products[product]) {

        return;

    }


    // Produk yang membutuhkan pilihan mie
    if (
        products[product].requireMie
    ) {

        openMieChoice(
            product
        );

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


    if (
        cart[product] <= 0
    ) {

        return;

    }


    cart[product]--;


    // Hapus pilihan mie terakhir
    if (
        products[product].requireMie &&
        cartMieChoice[product] &&
        cartMieChoice[product].length > 0
    ) {

        cartMieChoice[product].pop();

    }


    updateDisplay();

}


// =========================================================
// UPDATE DISPLAY
// =========================================================

function updateDisplay() {

    let total =
        0;


    let html =
        "";


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


            if (
                quantity <= 0
            ) {

                return;

            }


            const subtotal =
                quantity *
                data.price;


            total +=
                subtotal;


            // =================================================
            // PRODUK DENGAN PILIHAN MIE
            // =================================================

            if (
                data.requireMie &&
                cartMieChoice[product] &&
                cartMieChoice[product].length > 0
            ) {

                cartMieChoice[product].forEach(
                    mie => {

                        html += `

                            <div
                                style="
                                    display:flex;
                                    justify-content:space-between;
                                    margin:8px 0;
                                    padding:8px 0;
                                    border-bottom:1px solid #eee;
                                "
                            >

                                <span>

                                    ${data.name}

                                    <br>

                                    <small>
                                        🍜 ${mie}
                                    </small>

                                </span>


                                <strong>
                                    ฿${data.price}
                                </strong>

                            </div>

                        `;

                    }
                );

            }

            else {

                // =================================================
                // PRODUK BIASA
                // =================================================

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
                            ฿${subtotal}
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

        if (!html) {

            cartItems.innerHTML =
                `
                <p class="empty">
                    Keranjang masih kosong
                </p>
                `;

        }

        else {

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
            "฿" + total;

    }

}


// =========================================================
// CHECKOUT
// =========================================================

function checkout() {

    let hasItems =
        false;


    Object.keys(cart).forEach(
        product => {

            if (
                cart[product] > 0
            ) {

                hasItems =
                    true;

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
            behavior:
                "smooth"
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

        top:
            0,

        behavior:
            "smooth"

    });

}


// =========================================================
// PAYMENT
// =========================================================
//
// Cash / ABA
//
// Tombol aktif akan diberi:
// class="selected"
//
// CSS nanti membuat tombol menjadi MERAH.
// =========================================================

function selectPayment(type) {

    payment =
        type;


    const cash =
        document.getElementById(
            "payment-cash"
        );


    const aba =
        document.getElementById(
            "payment-aba"
        );


    // Reset semua tombol
    if (cash) {

        cash.classList.remove(
            "selected"
        );

    }


    if (aba) {

        aba.classList.remove(
            "selected"
        );

    }


    // Aktifkan tombol pilihan
    if (
        type === "cash" &&
        cash
    ) {

        cash.classList.add(
            "selected"
        );

    }


    if (
        type === "aba" &&
        aba
    ) {

        aba.classList.add(
            "selected"
        );

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

        button.disabled =
            true;


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

                    }

                    else {

                        gpsFailed();

                    }

                }
            );


            return;

        }

        catch (error) {

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


            if (
                error.code === 1
            ) {

                message =
                    "❌ Izin lokasi ditolak.";

            }

            else if (
                error.code === 2
            ) {

                message =
                    "❌ Lokasi tidak tersedia.";

            }

            else if (
                error.code === 3
            ) {

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


    gps =
        null;


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
// BUILD ITEMS - GABUNG PRODUK + PILIHAN MIE
// =========================================================

function buildItems() {

    const grouped = {};

    Object.keys(cart).forEach(
        product => {

            const quantity =
                cart[product];

            if (quantity <= 0) {
                return;
            }

            const data =
                products[product];

            // =================================================
            // PRODUK DENGAN PILIHAN MIE
            // =================================================

            if (
                data.requireMie &&
                cartMieChoice[product] &&
                cartMieChoice[product].length
            ) {

                const mieList =
                    cartMieChoice[product];

                const key =
                    product;

                if (!grouped[key]) {

                    grouped[key] = {

                        product:
                            data.name,

                        quantity:
                            0,

                        price:
                            data.price,

                        subtotal:
                            0,

                        mie_choices: {}

                    };

                }

                mieList.forEach(
                    mie => {

                        if (
                            !grouped[key]
                                .mie_choices[mie]
                        ) {

                            grouped[key]
                                .mie_choices[mie] = 0;

                        }

                        grouped[key]
                            .mie_choices[mie]++;

                        grouped[key]
                            .quantity++;

                        grouped[key]
                            .subtotal +=
                                data.price;

                    }
                );

                return;
            }

            // =================================================
            // PRODUK BIASA
            // =================================================

            const key =
                product;

            if (!grouped[key]) {

                grouped[key] = {

                    product:
                        data.name,

                    quantity:
                        0,

                    price:
                        data.price,

                    subtotal:
                        0

                };

            }

            grouped[key].quantity +=
                quantity;

            grouped[key].subtotal +=
                quantity *
                data.price;

        }
    );

    return Object.values(
        grouped
    );

}


// =========================================================
// RESET CART
// =========================================================

function resetCart() {

    Object.keys(cart).forEach(
        product => {

            cart[product] =
                0;

        }
    );


    Object.keys(cartMieChoice).forEach(
        product => {

            cartMieChoice[product] =
                [];

        }
    );


    payment =
        null;


    gps =
        null;


    // Reset payment buttons
    const cash =
        document.getElementById(
            "payment-cash"
        );


    const aba =
        document.getElementById(
            "payment-aba"
        );


    if (cash) {

        cash.classList.remove(
            "selected"
        );

    }


    if (aba) {

        aba.classList.remove(
            "selected"
        );

    }


    // Reset GPS
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


    updateDisplay();

}


// =========================================================
// SHOW ORDER SUCCESS
// =========================================================

function showOrderSuccess(orderId) {

    const message =
        "✅ ORDER BERHASIL!\n\n" +
        "🧾 No Order: " +
        orderId +
        "\n\n" +
        "🔥 Bakso Juragan\n" +
        "Pesanan kamu sudah diterima.\n\n" +
        "Silakan tunggu konfirmasi dari admin.";


    // Telegram popup kalau tersedia
    if (
        tg &&
        typeof tg.showPopup ===
            "function"
    ) {

        try {

            tg.showPopup(

                {

                    title:
                        "Order Berhasil",

                    message:
                        message,

                    buttons:
                        [
                            {
                                type:
                                    "ok",

                                text:
                                    "OK"

                            }
                        ]

                },

                function() {

                    console.log(
                        "✅ Customer menekan OK"
                    );

                }

            );


            return;

        }

        catch (error) {

            console.warn(
                "⚠️ Telegram popup gagal:",
                error
            );

        }

    }


    // Fallback
    alert(
        message
    );

}


// =========================================================
// CONFIRM ORDER
// =========================================================

async function confirmOrder() {

    console.log(
        "================================"
    );


    console.log(
        "🛒 KONFIRMASI ORDER"
    );


    // =====================================================
    // BUILD ITEMS
    // =====================================================

    const items =
        buildItems();


    if (
        !items.length
    ) {

        alert(
            "Keranjang masih kosong."
        );

        return;

    }


    // =====================================================
    // VALIDASI PILIHAN MIE
    // =====================================================

    for (
        const product of Object.keys(cart)
    ) {

        if (
            cart[product] <= 0
        ) {

            continue;

        }


        if (
            products[product].requireMie
        ) {

            const choices =
                cartMieChoice[product] || [];


            if (
                choices.length !==
                cart[product]
            ) {

                alert(
                    "Silakan pilih mie untuk setiap Bakso Komplit Urat."
                );

                return;

            }

        }

    }


    // =====================================================
    // PAYMENT
    // =====================================================

    if (!payment) {

        alert(
            "Silakan pilih metode pembayaran."
        );

        return;

    }


    // =====================================================
    // ADDRESS
    // =====================================================

    const addressElement =
        document.getElementById(
            "address"
        );


    const address =
        addressElement
            ? addressElement.value.trim()
            : "";

    const noteElement =
    document.getElementById(
        "customer-note"
    );

const customerNote =
    noteElement
        ? noteElement.value.trim()
        : "";
    

    if (!address) {

        alert(
            "Silakan masukkan alamat pengantaran."
        );

        return;

    }


    // =====================================================
    // TOTAL
    // =====================================================

    const total =
        items.reduce(
            (
                sum,
                item
            ) => {

                return (
                    sum +
                    Number(
                        item.subtotal
                    )
                );

            },
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

            note:
        customerNote,
        
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


    // =====================================================
    // BUTTON
    // =====================================================

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
                        JSON.stringify(
                            data
                        )

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
                JSON.parse(
                    text
                );

        }

        catch (jsonError) {

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
        // HTTP ERROR
        // =================================================

        if (
            !response.ok
        ) {

            throw new Error(
                result.error ||
                "Server error"
            );

        }


        // =================================================
        // ORDER ERROR
        // =================================================

        if (
            !result.success
        ) {

            throw new Error(
                result.error ||
                "Order gagal dikirim"
            );

        }


        // =================================================
        // SUCCESS
        // =================================================

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
            "================================"
        );


        // =================================================
        // TAMPILKAN SUKSES
        // =================================================

        showOrderSuccess(
            result.order_id
        );


        // =================================================
        // RESET CART
        // =================================================

        resetCart();


        // =================================================
        // KEMBALI KE MENU
        // =================================================

        backToMenu();


    }

    catch (error) {

        console.error(
            "❌ ORDER ERROR:",
            error
        );


        alert(

            "❌ ORDER GAGAL\n\n" +
            error.message

        );

    }

    finally {

        if (button) {

            button.disabled =
                false;


            button.textContent =
                "✅ KONFIRMASI ORDER";

        }

    }

}


// =========================================================
// SERVER STATUS
// =========================================================

async function checkServerStatus() {

    const statusElement =
        document.getElementById(
            "online-text"
        );


    const indicator =
        document.getElementById(
            "online-indicator"
        );


    const statusWrapper =
        document.getElementById(
            "online-status"
        );


    if (
        !statusElement ||
        !indicator ||
        !statusWrapper
    ) {

        console.error(
            "❌ ELEMENT STATUS ONLINE TIDAK DITEMUKAN"
        );

        return;

    }


    try {

        const response =
            await fetch(

                SERVER_STATUS_URL +
                "?t=" +
                Date.now(),

                {

                    method:
                        "GET",

                    cache:
                        "no-store"

                }

            );


        if (
            !response.ok
        ) {

            throw new Error(
                "Server tidak merespon"
            );

        }


        const result =
            await response.json();


        console.log(
            "📡 HEALTH:",
            result
        );


        if (
            result.status ===
            "online"
        ) {

            statusElement.textContent =
                "ONLINE";


            statusWrapper.className =
                "online-status online";


            indicator.className =
                "online-dot";


            console.log(
                "🟢 SERVER ONLINE"
            );

        }

        else {

            throw new Error(
                "Server status bukan online"
            );

        }

    }

    catch (error) {

        statusElement.textContent =
            "OFFLINE";


        statusWrapper.className =
            "online-status offline";


        indicator.className =
            "online-dot";


        console.log(
            "🔴 SERVER OFFLINE",
            error
        );

    }

}


// =========================================================
// INIT
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "================================"
        );


        console.log(
            "🔥 BAKSO JURAGAN MINI APP"
        );


        console.log(
            "🚀 INITIALIZING..."
        );


        // =================================================
        // PRODUCTS
        // =================================================

        renderProducts();

        updateDisplay();


        // =================================================
        // CHECKOUT
        // =================================================

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


        // =================================================
        // GPS
        // =================================================

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


        // =================================================
        // CONFIRM ORDER
        // =================================================

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


        // =================================================
        // BACK
        // =================================================

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


        // =================================================
        // SERVER STATUS
        // =================================================

        checkServerStatus();


        setInterval(
            checkServerStatus,
            10000
        );


        console.log(
            "✅ BAKSO JURAGAN MINI APP READY"
        );


        console.log(
            "================================"
        );

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


window.selectCategory =
    selectCategory;


window.selectPayment =
    selectPayment;


window.getGPS =
    getGPS;


window.confirmOrder =
    confirmOrder;


window.backToMenu =
    backToMenu;


window.openMieChoice =
    openMieChoice;


window.closeMieChoice =
    closeMieChoice;


window.selectMieChoice =
    selectMieChoice;
