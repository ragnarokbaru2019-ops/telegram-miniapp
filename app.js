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
        image: "images/bakso-urat.jpg",
        category: "bakso"
    },

    bakso_telur: {
        name: "Bakso Telur",
        description: "Bakso dengan isian telur",
        price: 4,
        image: "images/bakso-telur.jpg",
        category: "bakso"
    },

    komplit_urat: {
        name: "Komplit Urat",
        description: "Bakso komplit + kuah",
        price: 4,
        image: "images/bakso-urat.jpg",
        category: "bakso",
        mieChoice: true
    },

    mie_ayam: {
        name: "Mie Ayam",
        description: "Mie ayam gurih dan nikmat",
        price: 3,
        image: "images/mie-ayam.jpg",
        category: "mie"
    }

};


// =========================================================
// CATEGORY
// =========================================================

let activeCategory = "all";


function selectCategory(category) {

    activeCategory = category;

    document
        .querySelectorAll(".category-chip")
        .forEach(button => {

            button.classList.remove("active");

        });


    const activeButton =
        document.querySelector(
            `.category-chip[onclick="selectCategory('${category}')"]`
        );


    if (activeButton) {

        activeButton.classList.add("active");

    }


    renderProducts();

    updateDisplay();

}


// =========================================================
// RENDER PRODUCTS
// =========================================================

function renderProducts() {

    const productList =
        document.getElementById("product-list");

    if (!productList) {
        return;
    }


    let html = "";


    Object.keys(products).forEach(product => {

        const data = products[product];


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


                    <span id="qty-${product}">
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

    });


    productList.innerHTML = html;

}


// =========================================================
// CART
// =========================================================

const cart = {};

const cartChoices = {};


Object.keys(products).forEach(product => {

    cart[product] = 0;

    cartChoices[product] = [];

});


// =========================================================
// PILIHAN MIE
// =========================================================

let selectedChoiceProduct = null;


function openMieChoice(product) {

    if (!products[product]) {
        return;
    }


    selectedChoiceProduct = product;


    const modal =
        document.getElementById(
            "mie-choice-modal"
        );


    const title =
        document.getElementById(
            "mie-choice-title"
        );


    if (!modal) {
        return;
    }


    if (title) {

        title.textContent =
            "PILIH MIE";

    }


    modal.classList.add("show");


    // Lock scroll belakang
    document.body.classList.add(
        "modal-open"
    );

}


// =========================================================
// TUTUP PILIHAN MIE
// =========================================================

function closeMieChoice() {

    const modal =
        document.getElementById(
            "mie-choice-modal"
        );


    if (modal) {

        modal.classList.remove("show");

    }


    document.body.classList.remove(
        "modal-open"
    );


    selectedChoiceProduct = null;

}


// =========================================================
// PILIH MIE
// =========================================================

function selectMieChoice(choice) {

    if (!selectedChoiceProduct) {
        return;
    }

    const product =
        selectedChoiceProduct;

    // Tambah quantity
    cart[product]++;

    // Simpan pilihan mie
    if (!cartChoices[product]) {

        cartChoices[product] = [];

    }

    cartChoices[product].push(choice);

    console.log(
        "🍜 PILIHAN MIE:",
        products[product].name,
        choice
    );

    console.log(
        "🛒 CART:",
        cart[product]
    );

    console.log(
        "🍜 CHOICES:",
        cartChoices[product]
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
    if (products[product].mieChoice) {

        openMieChoice(product);

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


    // Hapus pilihan mie terakhir
    if (
        products[product].mieChoice &&
        cartChoices[product].length > 0
    ) {

        cartChoices[product].pop();

    }


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
                    <div class="cart-product">

                        <div class="cart-product-main">

                            <span>
                                ${data.name}
                                x${quantity}
                            </span>

                            <strong>
                                ฿${subtotal}
                            </strong>

                        </div>
                `;


                // =================================================
                // PILIHAN MIE
                // =================================================

                if (
                    data.mieChoice &&
                    cartChoices[product] &&
                    cartChoices[product].length > 0
                ) {

                    html += `
                        <div class="cart-choices">
                    `;


                    cartChoices[product].forEach(
                        (choice, index) => {

                            html += `
                                <div class="cart-choice">
                                    🍜 ${choice}
                                </div>
                            `;

                        }
                    );


                    html += `
                        </div>
                    `;

                }


                html += `
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
                `
                <p class="empty">
                    Keranjang masih kosong
                </p>
                `;

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
            "฿" + total;

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

let payment = null;


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

        cash.classList.toggle(
            "selected",
            type === "cash"
        );

    }


    if (aba) {

        aba.classList.toggle(
            "selected",
            type === "aba"
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

let gps = null;


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

    if (!navigator.geolocation) {

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


            gpsFailed(message);

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


            const item = {

                product:
                    data.name,

                quantity:
                    quantity,

                price:
                    data.price,

                subtotal:
                    quantity *
                    data.price

            };


            // =================================================
            // TAMBAHKAN PILIHAN MIE
            // =================================================

            if (data.mieChoice) {

                item.choices =
                    [...cartChoices[product]];

            }


            items.push(item);

        }
    );


    return items;

}


// =========================================================
// RESET CART
// =========================================================

function resetCart() {

    Object.keys(cart).forEach(
        product => {

            cart[product] = 0;

        }
    );


    Object.keys(cartChoices).forEach(
        product => {

            cartChoices[product] = [];

        }
    );


    payment = null;

    gps = null;


    // Reset payment UI
    document
        .querySelectorAll(".payment-option")
        .forEach(button => {

            button.classList.remove(
                "selected"
            );

        });


    // Reset address
    const address =
        document.getElementById(
            "address"
        );


    if (address) {

        address.value = "";

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
// CONFIRM ORDER
// =========================================================

async function confirmOrder() {

    const items =
        buildItems();


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


        console.log(
            "✅ ORDER BERHASIL:",
            result.order_id
        );


        alert(
            "✅ ORDER BERHASIL!\n\n" +
            "No Order: " +
            result.order_id
        );


        // Reset semua
        resetCart();

        backToMenu();


    } catch (error) {

        console.error(
            "❌ ORDER ERROR:",
            error
        );


        alert(
            "❌ ORDER GAGAL\n\n" +
            error.message
        );


    } finally {

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

const SERVER_STATUS_URL =
    "https://baksojuraganpoipet.id/";


let serverOnline = false;


// =========================================================
// CHECK SERVER STATUS
// =========================================================

async function checkServerStatus() {

    const statusContainer =
        document.getElementById(
            "online-status"
        );


    const indicator =
        document.getElementById(
            "online-indicator"
        );


    const text =
        document.getElementById(
            "online-text"
        );


    if (
        !statusContainer ||
        !indicator ||
        !text
    ) {

        console.error(
            "❌ ELEMENT ONLINE STATUS TIDAK DITEMUKAN"
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


        if (!response.ok) {

            throw new Error(
                "Server tidak merespon"
            );

        }


        const result =
            await response.json();


        if (
            result.status !== "online"
        ) {

            throw new Error(
                "Server offline"
            );

        }


        serverOnline = true;


        statusContainer.className =
            "online-status online";


        text.textContent =
            "ONLINE";


        console.log(
            "🟢 SERVER ONLINE"
        );


    } catch (error) {

        serverOnline = false;


        statusContainer.className =
            "online-status offline";


        text.textContent =
            "OFFLINE";


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
    function () {

        renderProducts();

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


        // Server status
        checkServerStatus();


        setInterval(
            checkServerStatus,
            10000
        );


        // Klik luar modal = tutup
        const modal =
            document.getElementById(
                "mie-choice-modal"
            );


        if (modal) {

            modal.addEventListener(
                "click",
                function(event) {

                    if (
                        event.target === modal
                    ) {

                        closeMieChoice();

                    }

                }
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