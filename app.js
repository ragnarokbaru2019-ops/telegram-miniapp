// =========================================================
// BAKSO JURAGAN - MINI APP
// PER ITEM REQUEST / CATATAN
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

    }

    catch (error) {

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


const SERVER_STATUS_URL =
    "https://baksojuraganpoipet.id/health";


// =========================================================
// PRODUCTS
// =========================================================

const products = {

    bakso_komplit_urat: {

        name: "Bakso Komplit Urat",

        description: "Bakso komplit + kuah",

        price: 4,

        image:
            "images/bakso-komplit-urat.jpg",

        category: "bakso",

        requireMie: true

    },


    bakso_urat: {

        name: "Bakso Urat",

        description:
            "Bakso urat sapi yang lezat",

        price: 4,

        image:
            "images/bakso-urat.jpg",

        category: "bakso",

        requireMie: false

    },


    bakso_telur: {

        name: "Bakso Telur",

        description:
            "Bakso dengan isian telur",

        price: 4,

        image:
            "images/bakso-telur.jpg",

        category: "bakso",

        requireMie: false

    },


    mie_ayam: {

        name: "Mie Ayam",

        description:
            "Mie ayam gurih dan nikmat",

        price: 3,

        image:
            "images/mie-ayam.jpg",

        category: "mie",

        requireMie: false

    }

};


// =========================================================
// CATEGORY
// =========================================================

let activeCategory = "all";


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
//
// SETIAP PORSI = 1 ITEM
//
// Contoh:
//
// Bakso Urat
// note: Kuah sedikit
//
// Bakso Urat
// note: Tanpa daun bawang
//
// Keduanya berdiri sendiri.
// =========================================================

const cartItems = [];


// =========================================================
// ITEM YANG SEDANG DIPROSES
// =========================================================

let pendingProduct = null;

let pendingMie = null;


// =========================================================
// RENDER PRODUCTS
// =========================================================

function renderProducts() {

    const container =
        document.getElementById(
            "product-list"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    Object.keys(products).forEach(
        productId => {

            const product =
                products[productId];


            if (
                activeCategory !== "all" &&
                product.category !== activeCategory
            ) {

                return;

            }


            const quantity =
                getProductQuantity(
                    productId
                );


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "product";


            card.innerHTML = `

                <div class="product-icon">

                    <img
                        src="${escapeHTML(
                            product.image
                        )}"
                        alt="${escapeHTML(
                            product.name
                        )}"
                        onerror="
                            this.style.display='none';
                        "
                    >

                </div>


                <div class="product-info">

                    <h3>
                        ${escapeHTML(
                            product.name
                        )}
                    </h3>


                    <p>
                        ${escapeHTML(
                            product.description
                        )}
                    </p>


                    <strong>
                        ฿${product.price}
                    </strong>

                </div>


                <div class="quantity">

                    <button
                        type="button"
                        onclick="decrease('${productId}')"
                    >
                        −
                    </button>


                    <span id="qty-${productId}">
                        ${quantity}
                    </span>


                    <button
                        type="button"
                        onclick="increase('${productId}')"
                    >
                        +
                    </button>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );

}


// =========================================================
// GET PRODUCT QUANTITY
// =========================================================

function getProductQuantity(
    product
) {

    return cartItems.filter(
        item =>
            item.product === product
    ).length;

}


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeHTML(text) {

    if (
        text === null ||
        text === undefined
    ) {

        return "";

    }


    return String(text)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


// =========================================================
// INCREASE
// =========================================================
//
// FINAL FLOW:
//
// Produk butuh mie:
//
// +
// ↓
// PILIH MIE
// ↓
// CATATAN
// ↓
// CART
//
// Produk biasa:
//
// +
// ↓
// CATATAN
// ↓
// CART
// =========================================================

function increase(product) {

    if (!products[product]) {

        return;

    }


    pendingProduct =
        product;


    pendingMie =
        null;


    // =====================================================
    // PRODUK YANG BUTUH MIE
    // =====================================================

    if (
        products[product].requireMie
    ) {

        openMieChoice(
            product
        );

        return;

    }


    // =====================================================
    // PRODUK BIASA
    // =====================================================

    openItemNote(
        product
    );

}


// =========================================================
// DECREASE
// =========================================================
//
// Hapus item TERAKHIR dari produk tersebut.
// =========================================================

function decrease(product) {

    if (!products[product]) {

        return;

    }


    for (
        let i =
            cartItems.length - 1;

        i >= 0;

        i--
    ) {

        if (
            cartItems[i].product ===
            product
        ) {

            cartItems.splice(
                i,
                1
            );

            console.log(
                "🗑️ ITEM DIHAPUS:",
                cartItems
            );

            break;

        }

    }


    updateDisplay();

}


// =========================================================
// MIE CHOICE
// =========================================================

function openMieChoice(
    product
) {

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


    pendingProduct =
        product;


    pendingMie =
        null;


    if (title) {

        title.textContent =
            products[product].name;

    }


    modal.classList.add(
        "show"
    );

}


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


    pendingProduct =
        null;


    pendingMie =
        null;

}


// =========================================================
// SELECT MIE
// =========================================================

function selectMieChoice(mie) {

    if (!pendingProduct) {

        console.error(
            "❌ Tidak ada produk yang sedang diproses"
        );

        return;

    }


    // Simpan dulu sebelum modal ditutup
    const product =
        pendingProduct;


    pendingMie =
        mie;


    console.log(
        "🍜 MIE DIPILIH:",
        mie
    );


    // Tutup modal mie
    const modal =
        document.getElementById(
            "mie-choice-modal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }


    // Jangan reset pendingProduct di sini.
    // Produk masih dibutuhkan oleh modal catatan.


    // Lanjut ke catatan item
    openItemNote(
        product
    );

}

// =========================================================
// ITEM NOTE MODAL
// =========================================================

function openItemNote(
    product
) {

    const modal =
        document.getElementById(
            "item-note-modal"
        );


    const productName =
        document.getElementById(
            "item-note-product"
        );


    const input =
        document.getElementById(
            "item-note-input"
        );


    if (!modal) {

        console.error(
            "❌ item-note-modal tidak ditemukan"
        );

        return;

    }


    pendingProduct =
        product;


    if (productName) {

        productName.textContent =
            products[product].name;

    }


    if (input) {

        input.value = "";

    }


    modal.classList.add(
        "show"
    );


    setTimeout(
        function() {

            if (input) {

                input.focus();

            }

        },
        100
    );

}


// =========================================================
// =========================================================
// CLOSE ITEM NOTE
// =========================================================
//
// closeItemNote(false)
// = benar-benar membatalkan proses
//
// Tombol ❌ TIDAK JANGAN memakai fungsi ini.
// Tombol TIDAK menggunakan addItemWithoutNote().
// =========================================================

function closeItemNote(
    cancel = true
) {

    const modal =
        document.getElementById(
            "item-note-modal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }


    if (cancel) {

        pendingProduct =
            null;

        pendingMie =
            null;

    }

}


// =========================================================
// ADD ITEM WITHOUT NOTE
// =========================================================
//
// Dipakai ketika customer memilih:
// ❌ TIDAK
//
// Artinya:
// "Tidak ada request"
// BUKAN:
// "Batalkan produk"
// =========================================================

function addItemWithoutNote() {

    if (!pendingProduct) {

        console.error(
            "❌ Tidak ada produk yang sedang diproses"
        );

        return;

    }


    const item = {

        product:
            pendingProduct,

        note:
            "",

        mie:
            pendingMie || null

    };


    cartItems.push(
        item
    );


    console.log(
        "🛒 ITEM DITAMBAHKAN TANPA CATATAN:",
        item
    );


    closeItemNote(
        true
    );


    pendingProduct =
        null;


    pendingMie =
        null;


    updateDisplay();

}


// =========================================================
// SAVE ITEM NOTE
// =========================================================
//
// Dipakai ketika customer memilih:
// ✅ YA
//
// Catatan boleh diisi.
// =========================================================

function saveItemNote() {

    if (!pendingProduct) {

        console.error(
            "❌ Tidak ada produk yang sedang diproses"
        );

        return;

    }


    const input =
        document.getElementById(
            "item-note-input"
        );


    const note =
        input
            ? input.value.trim()
            : "";


    const item = {

        product:
            pendingProduct,

        note:
            note,

        mie:
            pendingMie || null

    };


    cartItems.push(
        item
    );


    console.log(
        "🛒 ITEM DITAMBAHKAN:",
        item
    );


    closeItemNote(
        true
    );


    pendingProduct =
        null;

    pendingMie =
        null;


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


    // =====================================================
    // UPDATE QTY
    // =====================================================

    Object.keys(products).forEach(
        product => {

            const qtyElement =
                document.getElementById(
                    "qty-" + product
                );


            if (qtyElement) {

                qtyElement.textContent =
                    getProductQuantity(
                        product
                    );

            }

        }
    );


    // =====================================================
    // CART
    // =====================================================

    cartItems.forEach(
        function(item, index) {

            const data =
                products[
                    item.product
                ];


            if (!data) {

                return;

            }


            total +=
                Number(
                    data.price
                );


            html += `

                <div
                    style="
                        margin:8px 0;
                        padding:10px 0;
                        border-bottom:1px solid #eee;
                    "
                >

                    <div
                        style="
                            display:flex;
                            justify-content:space-between;
                            align-items:flex-start;
                            gap:10px;
                        "
                    >

                        <div>

                            <div
                                style="
                                    font-weight:700;
                                "
                            >
                                ${escapeHTML(
                                    data.name
                                )}
                            </div>


                            ${
                                item.mie
                                    ? `
                                        <div
                                            style="
                                                font-size:13px;
                                                margin-top:4px;
                                            "
                                        >
                                            🍜 ${escapeHTML(
                                                item.mie
                                            )}
                                        </div>
                                    `
                                    : ""
                            }


                            ${
                                item.note
                                    ? `
                                        <div
                                            style="
                                                font-size:13px;
                                                color:#777;
                                                margin-top:5px;
                                            "
                                        >
                                            📝 ${escapeHTML(
                                                item.note
                                            )}
                                        </div>
                                    `
                                    : ""
                            }

                        </div>


                        <strong>
                            ฿${data.price}
                        </strong>

                    </div>

                </div>

            `;

        }
    );


    const cartItemsElement =
        document.getElementById(
            "cart-items"
        );


    if (cartItemsElement) {

        cartItemsElement.innerHTML =
            html ||

            `
                <p class="empty">
                    Keranjang masih kosong
                </p>
            `;

    }


    // =====================================================
    // TOTAL
    // =====================================================

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

    if (!cartItems.length) {

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

        top: 0,

        behavior:
            "smooth"

    });

}


// =========================================================
// PAYMENT
// =========================================================

let payment = null;


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


    if (
        tg &&
        typeof tg.requestLocation ===
            "function"
    ) {

        try {

            tg.requestLocation(
                function(location) {

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
                "❌ TELEGRAM GPS ERROR:",
                error
            );

        }

    }


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
// BUILD ITEMS
// =========================================================
//
// CATATAN SEKARANG 100% PER ITEM.
//
// TIDAK ADA CUSTOMER NOTE GLOBAL.
// =========================================================

function buildItems() {

    return cartItems.map(
        function(item) {

            const data =
                products[
                    item.product
                ];


            const result = {

                product:
                    data.name,

                quantity:
                    1,

                price:
                    data.price,

                subtotal:
                    data.price,

                note:
                    item.note || ""

            };


            if (item.mie) {

                result.mie_choice =
                    item.mie;


                result.mie_choices = {

                    [item.mie]:
                        1

                };

            }


            return result;

        }
    );

}


// =========================================================
// RESET CART
// =========================================================

function resetCart() {

    cartItems.length =
        0;


    payment =
        null;


    gps =
        null;


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

function showOrderSuccess(
    orderId
) {

    const message =
        "✅ ORDER BERHASIL!\n\n" +
        "🧾 No Order: " +
        orderId +
        "\n\n" +
        "🔥 Bakso Juragan\n" +
        "Pesanan kamu sudah diterima.\n\n" +
        "Silakan tunggu konfirmasi dari admin.";


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
    // ITEMS
    // =====================================================

    const items =
        buildItems();


    if (!items.length) {

        alert(
            "Keranjang masih kosong."
        );

        return;

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
            function(sum, item) {

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
    // SEND
    // =====================================================

    try {

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

            throw new Error(
                "Server mengembalikan response bukan JSON"
            );

        }


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
            "✅ ORDER BERHASIL"
        );


        console.log(
            "🧾 ORDER ID:",
            result.order_id
        );


        showOrderSuccess(
            result.order_id
        );


        resetCart();


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
            result.status ===
            "online"
        ) {

            statusElement.textContent =
                "ONLINE";


            statusWrapper.className =
                "online-status online";


            indicator.className =
                "online-dot";


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


        renderProducts();

        updateDisplay();


        // SERVER STATUS

        checkServerStatus();


        setInterval(
            checkServerStatus,
            10000
        );


        // CHECKOUT

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


        // CONFIRM

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


        // BACK

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

window.openItemNote =
    openItemNote;

window.closeItemNote =
    closeItemNote;

window.saveItemNote =
    saveItemNote;
