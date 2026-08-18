```javascript
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
//
// Sekarang cart menyimpan PER PORSI.
//
// Contoh:
//
// cartItems = [
//     {
//         product: "bakso_urat",
//         note: "Pedas",
//         mie: null
//     },
//     {
//         product: "bakso_urat",
//         note: "Jangan bawang",
//         mie: null
//     }
// ]
//
// Jadi produk sama bisa punya request berbeda.
// =========================================================

const cartItems = [];


// =========================================================
// POPUP REQUEST
// =========================================================

let requestProduct =
    null;


let requestCallback =
    null;


// =========================================================
// CREATE REQUEST MODAL
// =========================================================
//
// Modal dibuat otomatis oleh JavaScript.
// Jadi tidak perlu menambah HTML manual.
// =========================================================

function createRequestModal() {

    if (
        document.getElementById(
            "request-modal"
        )
    ) {

        return;

    }


    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "request-modal";


    modal.innerHTML = `

        <div
            style="
                position:fixed;
                inset:0;
                background:rgba(0,0,0,.55);
                display:flex;
                align-items:center;
                justify-content:center;
                z-index:99999;
                padding:20px;
            "
        >

            <div
                style="
                    width:100%;
                    max-width:400px;
                    background:#fff;
                    border-radius:18px;
                    padding:22px;
                    box-sizing:border-box;
                    box-shadow:0 15px 40px rgba(0,0,0,.25);
                "
            >

                <div
                    style="
                        font-size:20px;
                        font-weight:700;
                        margin-bottom:8px;
                    "
                >
                    📝 Butuh request?
                </div>


                <div
                    id="request-product-name"
                    style="
                        font-size:14px;
                        color:#777;
                        margin-bottom:15px;
                    "
                >
                </div>


                <input
                    id="request-input"
                    type="text"
                    maxlength="200"
                    placeholder="Contoh: kuah sedikit..."
                    style="
                        width:100%;
                        box-sizing:border-box;
                        padding:13px;
                        border:1px solid #ddd;
                        border-radius:10px;
                        font-size:15px;
                        outline:none;
                        margin-bottom:15px;
                    "
                >


                <div
                    style="
                        display:flex;
                        gap:10px;
                    "
                >

                    <button
                        type="button"
                        id="request-yes"
                        style="
                            flex:1;
                            border:0;
                            border-radius:10px;
                            padding:13px;
                            background:#16a34a;
                            color:white;
                            font-size:15px;
                            font-weight:700;
                            cursor:pointer;
                        "
                    >
                        ✓ YA
                    </button>


                    <button
                        type="button"
                        id="request-no"
                        style="
                            flex:1;
                            border:0;
                            border-radius:10px;
                            padding:13px;
                            background:#eee;
                            color:#333;
                            font-size:15px;
                            font-weight:700;
                            cursor:pointer;
                        "
                    >
                        ✕ TIDAK
                    </button>

                </div>

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    document
        .getElementById(
            "request-yes"
        )
        .addEventListener(
            "click",
            function() {

                const input =
                    document.getElementById(
                        "request-input"
                    );


                const note =
                    input
                        ? input.value.trim()
                        : "";


                closeRequestModal();


                if (requestCallback) {

                    const callback =
                        requestCallback;


                    requestCallback =
                        null;


                    callback(
                        note
                    );

                }

            }
        );


    document
        .getElementById(
            "request-no"
        )
        .addEventListener(
            "click",
            function() {

                closeRequestModal();


                if (requestCallback) {

                    const callback =
                        requestCallback;


                    requestCallback =
                        null;


                    callback(
                        ""
                    );

                }

            }
        );

}


// =========================================================
// OPEN REQUEST MODAL
// =========================================================

function openRequestModal(
    product,
    callback
) {

    createRequestModal();


    requestProduct =
        product;


    requestCallback =
        callback;


    const modal =
        document.getElementById(
            "request-modal"
        );


    const name =
        document.getElementById(
            "request-product-name"
        );


    const input =
        document.getElementById(
            "request-input"
        );


    if (name) {

        name.textContent =
            products[product].name;

    }


    if (input) {

        input.value =
            "";

    }


    if (modal) {

        modal.style.display =
            "block";

    }


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
// CLOSE REQUEST MODAL
// =========================================================

function closeRequestModal() {

    const modal =
        document.getElementById(
            "request-modal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }


    requestProduct =
        null;

}


// =========================================================
// MIE CHOICE
// =========================================================

let mieChoiceProduct =
    null;


let mieChoiceNote =
    "";


// =========================================================
// OPEN MIE CHOICE
// =========================================================

function openMieChoice(
    product,
    note = ""
) {

    if (!products[product]) {

        return;

    }


    mieChoiceProduct =
        product;


    mieChoiceNote =
        note;


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


    mieChoiceNote =
        "";

}


// =========================================================
// SELECT MIE
// =========================================================

function selectMieChoice(mie) {

    if (!mieChoiceProduct) {

        return;

    }


    const product =
        mieChoiceProduct;


    const note =
        mieChoiceNote;


    // Setiap pilihan mie = satu porsi
    cartItems.push({

        product:
            product,

        note:
            note || "",

        mie:
            mie

    });


    console.log(
        "🍜 ITEM DITAMBAHKAN:",
        cartItems[
            cartItems.length - 1
        ]
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


    // =====================================================
    // SEMUA PRODUK SEKARANG MUNCUL REQUEST POPUP
    // =====================================================

    openRequestModal(
        product,
        function(note) {

            // =================================================
            // PRODUK DENGAN PILIHAN MIE
            // =================================================

            if (
                products[product].requireMie
            ) {

                openMieChoice(
                    product,
                    note
                );

                return;

            }


            // =================================================
            // PRODUK BIASA
            // =================================================

            cartItems.push({

                product:
                    product,

                note:
                    note || "",

                mie:
                    null

            });


            console.log(
                "🛒 ITEM DITAMBAHKAN:",
                cartItems[
                    cartItems.length - 1
                ]
            );


            updateDisplay();

        }
    );

}


// =========================================================
// DECREASE
// =========================================================
//
// Hapus item terakhir dari produk tersebut.
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
                product
            );

            break;

        }

    }


    updateDisplay();

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

function escapeHTML(
    text
) {

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
// UPDATE DISPLAY
// =========================================================

function updateDisplay() {

    let total =
        0;


    let html =
        "";


    // =====================================================
    // UPDATE QUANTITY DI MENU
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
    // RENDER SETIAP PORSI
    // =====================================================

    cartItems.forEach(
        function(item) {

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
                                    font-weight:600;
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


    // =====================================================
    // CART HTML
    // =====================================================

    const cartItemsElement =
        document.getElementById(
            "cart-items"
        );


    if (cartItemsElement) {

        if (!html) {

            cartItemsElement.innerHTML =
                `
                <p class="empty">
                    Keranjang masih kosong
                </p>
                `;

        }

        else {

            cartItemsElement.innerHTML =
                html;

        }

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

    if (
        !cartItems.length
    ) {

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

let payment =
    null;


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

let gps =
    null;


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
// BUILD ITEMS
// =========================================================
//
// Setiap porsi dikirim sebagai item sendiri.
//
// Contoh:
//
// [
//   {
//      product: "Bakso Urat",
//      quantity: 1,
//      price: 4,
//      subtotal: 4,
//      note: "Pedas"
//   },
//   {
//      product: "Bakso Urat",
//      quantity: 1,
//      price: 4,
//      subtotal: 4,
//      note: "Jangan bawang"
//   }
// ]
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


            // =================================================
            // PILIHAN MIE
            // =================================================

            if (item.mie) {

                result.mie_choice =
                    item.mie;


                // Tetap kirim format lama
                // supaya backend lama lebih aman.
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


    // Payment
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


    // GPS
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


    // Customer note lama
    const noteElement =
        document.getElementById(
            "customer-note"
        );


    if (noteElement) {

        noteElement.value =
            "";

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


    if (
        !items.length
    ) {

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
    // CUSTOMER NOTE GLOBAL
    // =====================================================

    const noteElement =
        document.getElementById(
            "customer-note"
        );


    const customerNote =
        noteElement
            ? noteElement.value.trim()
            : "";


    // =====================================================
    // TOTAL
    // =====================================================

    const total =
        items.reduce(
            function(
                sum,
                item
            ) {

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


        if (
            !response.ok
        ) {

            throw new Error(
                result.error ||
                "Server error"
            );

        }


        if (
            !result.success
        ) {

            throw new Error(
                result.error ||
                "Order gagal dikirim"
            );

        }


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


        if (
            !response.ok
        ) {

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
            "🔴 SERVER OFFLINE"
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
        // REQUEST MODAL
        // =================================================

        createRequestModal();


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
        // CONFIRM
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
        // SERVER
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


window.openRequestModal =
    openRequestModal;


window.closeRequestModal =
    closeRequestModal;
```
