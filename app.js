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

    bakso_komplit_kecil: {

        name: "Bakso Komplit Kecil\nមួយឈុត តូច",

        description: "∗ Bakso kecil 8pcs\n∗ Tetelan",

        price: 90,

        image:
            "images/komplit kecil.jpg",

        category: "Bakso Komplit",

        requireMie: true

    },

    bakso_komplit_Urat: {

        name: "Bakso Komplit Urat\nមួយឈុត សាច់",

        description: "∗ Bakso daging cincang 1pcs\n∗ Bakso kecil 5pcs\n∗ Tetelan",

        price: 110,

        image:
            "images/komplit urat.jpg",

        category: "Bakso Komplit",

        requireMie: true

             },

    bakso_komplit_telur: {

        name: "Bakso Komplit Telur\nមួយឈុត ពង",

        description: "∗ Bakso telur 1pcs\n∗ Bakso kecil 5pcs\n∗ Tetelan",

        price: 110,

        image:
            "images/komplit telur.jpg",

        category: "Bakso Komplit",

        requireMie: true

             },

    bakso_komplit_mercon: {

        name: "Bakso Komplit Mercon\nមួយឈុត ម្ទេស",

        description: "∗ Bakso mercon 1pcs\n∗ Bakso kecil 5pcs\n∗ Tetelan",

        price: 130,

        image:
            "images/komplit mercon.jpg",

        category: "Bakso Komplit",

        requireMie: true

             },

    bakso_komplit_urattelur: {

        name: "Bakso Komplit Urat + Telur\nមួយឈុត សាច់ + ពង",

        description: "∗ Bakso daging cincang 1pcs\n∗ Bakso telur 1pcs\n∗ Bakso kecil 5pcs\n∗ Tetelan",

        price: 150,

        image:
            "images/komplit urat telur.jpg",

        category: "Bakso Komplit",

        requireMie: true

             },

    bakso_komplit_uraturat: {

        name: "Bakso Komplit Urat + Urat\nមួយឈុត សាច់ + សាច់",

        description: "∗ Bakso daging cincang 2pcs\n∗ Bakso kecil 5pcs\n∗ Tetelan",

        price: 150,

        image:
            "images/kompolit uraturat.jpg",

        category: "Bakso Komplit",

        requireMie: true

             },

    bakso_komplit_telurtelur: {

        name: "Bakso Komplit Telur + Telur\nមួយឈុត ពង + ពង",

        description: "∗ Bakso telur 2pcs\n∗ Bakso kecil 5pcs\n∗ Tetelan",

        price: 150,

        image:
            "images/komplit telur 2.jpg",

        category: "Bakso Komplit",

        requireMie: true
             },

    bakso_indomie_kecil: {

        name: "Indomie Komplit Kecil\nមីសូតូ តូច",

        description: "∗ Indomie Soto\n∗ Bakso kecil 5pcs\n∗ Tetelan",

        price: 100,

        image:
            "images/indomie kecil.jpg",

        category: "Indomie Bakso",

        requireMie: false
             },

    bakso_indomie_urat: {

        name: "Indomie Komplit Urat\nមីសូតូ សាច់",

        description: "∗ Indomie Soto\n∗ Bakso daging cincang 1pcs\n∗ Bakso kecil 5pcs\n∗ Tetelan",

        price: 120,

        image:
            "images/indomie urat.jpg",

        category: "Indomie Bakso",

        requireMie: false
             },

    bakso_indomie_telur: {

        name: "Indomie Komplit Telur\nមីសូតូ ពង",

        description: "∗ Indomie Soto\n∗ Bakso telur 1pcs\n∗ Bakso kecil 5pcs\n∗ Tetelan",

        price: 120,

        image:
            "images/indomie_telur.jpg",

        category: "Indomie Bakso",

        requireMie: false
        
             },
    
    bakso_indomie_Mercon: {

        name: "Indomie Komplit Mercon\nមីសូតូ ម្ទេស",

        description: "∗ Indomie Soto\n∗ Bakso mercon 1pcs\n∗ Bakso kecil 5pcs\n∗ Tetelan",
        
        price: 140,

        image:
            "images/indomie mercon.jpg",

        category: "Indomie Bakso",

        requireMie: false
        
             },

    bakso_indomie_Urattelur: {

        name: "Indomie Komplit Urat + Telur\nមីសូតូ សាច់ + ពង",

        description: "∗ Indomie Soto\n∗ Bakso daging cincang 1pcs\n∗ Bakso telur 1pcs\n∗ Bakso kecil 5pcs\n∗ Tetelan",

        price: 160,

        image:
            "images/indomie urat telur.jpg",

        category: "Indomie Bakso",

        requireMie: false
        
             },

    bakso_indomie_Uraturat: {

        name: "Indomie Komplit Urat + Urat\nមីសូតូ សាច់ + សាច់",

        description: "∗ Indomie Soto\n∗ Bakso daging cincang 2pcs\n∗ Bakso kecil 5pcs\n∗ Tetelan",

        price: 160,

        image:
            "images/indomie urat2.jpg",

        category: "Indomie Bakso",

        requireMie: false
        
             },

    bakso_indomie_Telurtelur: {

        name: "Indomie Komplit Telur + Telur\nមីសូតូ ពង + ពង",

        description: "∗ Indomie Soto\n∗ Bakso telur 2pcs\n∗ Bakso kecil 5pcs\n∗ Tetelan",

        price: 160,

        image:
            "images/indomie telur2.jpg",

        category: "Indomie Bakso",

        requireMie: false
        
             },



        bakso_indomie_double_kecil: {

        name: "Indomie Double Komplit Kecil\nមីសូតូ តូច",

        description: "∗ Indomie Soto Double\n∗ Bakso kecil 5pcs\n∗ Tetelan",

        price: 100,

        image:
            "images/indomie kecil.jpg",

        category: "Indomie Double Bakso",

        requireMie: false
             },

    bakso_indomie_Double_urat: {

        name: "Indomie Double Komplit Urat\nមីសូតូ សាច់",

        description: "∗ Indomie Soto Double\n∗ Bakso daging cincang 1pcs\n∗ Bakso kecil 5pcs\n∗ Tetelan",

        price: 120,

        image:
            "images/indomie urat.jpg",

        category: "Indomie Double Bakso",

        requireMie: false
             },

    bakso_indomie_Double_telur: {

        name: "Indomie Double Komplit Telur\nមីសូតូ ពង",

        description: "∗ Indomie Soto Double\n∗ Bakso telur 1pcs\n∗ Bakso kecil 5pcs\n∗ Tetelan",

        price: 120,

        image:
            "images/indomie_telur.jpg",

        category: "Indomie Double Bakso",

        requireMie: false
        
             },
    
    bakso_indomie_Double_Mercon: {

        name: "Indomie Double Komplit Mercon\nមីសូតូ ម្ទេស",

        description: "∗ Indomie Soto Double\n∗ Bakso mercon 1pcs\n∗ Bakso kecil 5pcs\n∗ Tetelan",
        
        price: 140,

        image:
            "images/indomie mercon.jpg",

        category: "Indomie Double Bakso",

        requireMie: false
        
             },

    bakso_indomie_Double_Urattelur: {

        name: "Indomie Double Komplit Urat + Telur\nមីសូតូ សាច់ + ពង",

        description: "∗ Indomie Soto Double\n∗ Bakso daging cincang 1pcs\n∗ Bakso telur 1pcs\n∗ Bakso kecil 5pcs\n∗ Tetelan",

        price: 160,

        image:
            "images/indomie urat telur.jpg",

        category: "Indomie Double Bakso",

        requireMie: false
        
             },

    bakso_indomie_Double_Uraturat: {

        name: "Indomie DoubleKomplit Urat + Urat\nមីសូតូ សាច់ + សាច់",

        description: "∗ Indomie Soto Double\n∗ Bakso daging cincang 2pcs\n∗ Bakso kecil 5pcs\n∗ Tetelan",

        price: 160,

        image:
            "images/indomie urat2.jpg",

        category: "Indomie Double Bakso",

        requireMie: false
        
             },

    bakso_indomie_Double_Telurtelur: {

        name: "Indomie Double Komplit Telur + Telur\nមីសូតូ ពង + ពង",

        description: "∗ Indomie Soto Double\n∗ Bakso telur 2pcs\n∗ Bakso kecil 5pcs\n∗ Tetelan",

        price: 160,

        image:
            "images/indomie telur2.jpg",

        category: "Indomie Double Bakso",

        requireMie: false
        
             },
    

        Mie_ayam: {

        name: "Mie Ayam\nមី មាន់",

        description: "∗ Mie ayam\n∗ kuah kaldu",

        price: 80,

        image:
            "images/miayam.jpg",

        category: "Mie Ayam",

        requireMie: false
        
             },

    Mie_ayam_kecil: {

        name: "Mie Ayam Bakso Kecil\nមី មាន់ តូច",

        description: "∗ Mie ayam\n∗ Bakso kecil 3pcs\n∗ kuah kaldu",

        price: 90,

        image:
            "images/mie ayam bakso kecil.jpg",

        category: "Mie Ayam",

        requireMie: false
        
             },


Mie_ayam_urat: {

        name: "Mie Ayam Bakso Urat\nមី មាន់ សាច់",

        description: "∗ Mie ayam\n∗ Bakso urat 1pcs\n∗ kuah kaldu",

        price: 110,

        image:
            "images/mie ayam urat.jpg",

        category: "Mie Ayam",

        requireMie: false
        
             },

    Mie_ayam_telur: {

        name: "Mie Ayam Bakso Telur\nមី មាន់ ពង",

        description: "∗ Mie ayam\n∗ Bakso telur 1pcs\n∗ kuah kaldu",

        price: 110,

        image:
            "images/mie ayam telur.jpg",

        category: "Mie Ayam",

        requireMie: false
        
             },

    Mie_ayam_mercon: {

        name: "Mie Ayam Bakso Mercon\nមី មាន់ ម្ទេស",

        description: "∗ Mie ayam\n∗ Bakso mercon 1pcs\n∗ kuah kaldu",

        price: 130,

        image:
            "images/mieayammercon.jpg",

        category: "Mie Ayam",

        requireMie: false
        
             },

    Mie_ayam_urat_telur: {

        name: "Mie Ayam Bakso Urat + Bakso Telur\nមី មាន់ សាច់ + ពង",

        description: "∗ Mie ayam\n∗ Bakso urat 1pcs\n∗ Bakso telur 1pcs\n∗ kuah kaldu",

        price: 150,

        image:
            "images/mie ayam urat telur.jpg",

        category: "Mie Ayam",

        requireMie: false
        
             },

    Mie_ayam_urat_urat: {

        name: "Mie Ayam Bakso Urat + Bakso Urat\nមី មាន់ សាច់ + សាច់",

        description: "∗ Mie ayam\n∗ Bakso urat 2pcs\n∗ kuah kaldu",

        price: 150,

        image:
            "images/mie ayam urat 2.jpg",

        category: "Mie Ayam",

        requireMie: false
        
             },

    Mie_ayam_telur_telur: {

        name: "Mie Ayam Bakso Telur + Bakso Telur\nមី មាន់ ពង + ពង",

        description: "∗ Mie ayam\n∗ Bakso telur 2pcs\n∗ kuah kaldu",

        price: 150,

        image:
            "images/mie ayam telur 2.jpg",

        category: "Mie Ayam",

        requireMie: false
        
             },

    Mie_yamin: {

        name: "Mie Yamin\nមី យ៉ាមីន",

        description: "∗ Mie yamin\n∗ kuah kaldu",

        price: 80,

        image:
            "images/miayam.jpg",

        category: "Mie Yamin",

        requireMie: false
        
             },

    Mie_yamin_kecil: {

        name: "Mie Yamin Bakso Kecil\nមី យ៉ាមីន តូច",

        description: "∗ Mie yamin\n∗ Bakso kecil 3pcs\n∗ kuah kaldu",

        price: 90,

        image:
            "images/mie ayam bakso kecil.jpg",

        category: "Mie Yamin",

        requireMie: false
        
             },


Mie_yamin_urat: {

        name: "Mie Yamin Bakso Urat\nមី យ៉ាមីន សាច់",

        description: "∗ Mie yamin\n∗ Bakso urat 1pcs\n∗ kuah kaldu",

        price: 110,

        image:
            "images/mie ayam urat.jpg",

        category: "Mie Yamin",

        requireMie: false
        
             },

    Mie_yamin_telur: {

        name: "Mie Yamin Bakso Telur\nមី យ៉ាមីន ពង",

        description: "∗ Mie yamin\n∗ Bakso telur 1pcs\n∗ kuah kaldu",

        price: 110,

        image:
            "images/mie ayam telur.jpg",

        category: "Mie Yamin",

        requireMie: false
        
             },

    Mie_yamin_mercon: {

        name: "Mie Yamin Bakso Mercon\nមី យ៉ាមីន ម្ទេស",

        description: "∗ Mie yamin\n∗ Bakso mercon 1pcs\n∗ kuah kaldu",

        price: 130,

        image:
            "images/mieayammercon.jpg",

        category: "Mie Yamin",

        requireMie: false
        
             },

    Mie_yamin_urat_telur: {

        name: "Mie Yamin Bakso Urat + Bakso Telur\nមី យ៉ាមីន សាច់ + ពង",

        description: "∗ Mie yamin\n∗ Bakso urat 1pcs\n∗ Bakso telur 1pcs\n∗ kuah kaldu",

        price: 150,

        image:
            "images/mie ayam urat telur.jpg",

        category: "Mie Yamin",

        requireMie: false
        
             },

    Mie_yamin_urat_urat: {

        name: "Mie Yamin Bakso Urat + Bakso Urat\nមី យ៉ាមីន សាច់ + សាច់",

        description: "∗ Mie yamin\n∗ Bakso urat 2pcs\n∗ kuah kaldu",

        price: 150,

        image:
            "images/mie ayam urat 2.jpg",

        category: "Mie Yamin",

        requireMie: false
        
             },

    Mie_yamin_telur_telur: {

        name: "Mie Yamin Bakso Telur + Bakso Telur\nមី យ៉ាមីន ពង + ពង",

        description: "∗ Mie yamin\n∗ Bakso telur 2pcs\n∗ kuah kaldu",

        price: 150,

        image:
            "images/mie ayam telur 2.jpg",

        category: "Mie Yamin",

        requireMie: false
        
             },
    

    nasi_putih: {

        name: "Nasi Putih\nបាយ",

        description:
            "∗ Nasi putih 1 porsi",

        price: 20,

        image:
            "images/nasi.jpeg",

        category: "Tambahan",

        requireMie: false
},

    telur_rebus: {

        name: "Telur rebus\nពង ឆ្អិន ១ គ្រាប់",

        description:
            "∗ Telur rebus 1pcs",

        price: 20,

        image:
            "images/telurrebus.jpg",

        category: "Tambahan",

        requireMie: false
},
    
    bakso_kecil: {

        name: "Bakso Kecil\nប្រហិត តូច ៣ គ្រាប់",

        description:
            "∗ Bakso kecil 3pcs",

        price: 30,

        image:
            "images/kecil3pcs.jpg",

        category: "Tambahan",

        requireMie: false
 },
            
    bakso_urat: {

        name: "Bakso Urat\n ប្រហិត សាច់ ១ គ្រាប់",

        description:
            "∗ Bakso daging cincang 1pcs",

        price: 50,

        image:
            "images/urat1pcs.jpg",

        category: "Tambahan",

        requireMie: false

    },
    
    bakso_telur: {

        name: "Bakso Telur\nប្រហិត ពង ​១ គ្រាប់",

        description:
            "∗ Bakso telur 1pcs",

        price: 50,

        image:
            "images/telur 1pcs.jpg",

        category: "Tambahan",

        requireMie: false

    },

    bakso_mercon: {

        name: "Bakso Mercon\nប្រហិត ១ គ្រាប់",

        description:
            "∗ Bakso Mercon 1pcs",

        price: 70,

        image:
            "images/mercon 1pcs.jpg",

        category: "Tambahan",

        requireMie: false

    },

};

// =========================================================
// PAGINATION
// =========================================================

let currentPage = 1;

const productsPerPage = 10;

// =========================================================
// CATEGORY
// =========================================================

let activeCategory = "all";


function selectCategory(category) {

    activeCategory = category;

    currentPage = 1;


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


    // =====================================================
    // FILTER CATEGORY
    // =====================================================

    const filteredProducts =
        Object.keys(products).filter(
            productId => {

                const product =
                    products[productId];


                return (
                    activeCategory === "all" ||
                    product.category === activeCategory
                );

            }
        );


    // =====================================================
    // PAGINATION
    // =====================================================

    const totalPages =
        Math.ceil(
            filteredProducts.length /
            productsPerPage
        );


    // Kalau pindah kategori dan halaman sebelumnya terlalu tinggi
    if (currentPage > totalPages) {

        currentPage =
            totalPages || 1;

    }


    const startIndex =
        (currentPage - 1) *
        productsPerPage;


    const endIndex =
        startIndex +
        productsPerPage;


    const pageProducts =
        filteredProducts.slice(
            startIndex,
            endIndex
        );


    // =====================================================
    // RENDER PRODUCTS
    // =====================================================

    pageProducts.forEach(
        productId => {

            const product =
                products[productId];


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
    ).replace(/\n/g, "<br>")}
</h3>

                    <p>
    ${escapeHTML(
        product.description
    ).replace(/\n/g, "<br>")}
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


    // =====================================================
    // PAGINATION BUTTON
    // =====================================================

    if (totalPages > 1) {

        const pagination =
            document.createElement(
                "div"
            );


        pagination.className =
            "pagination";


        for (
            let page = 1;
            page <= totalPages;
            page++
        ) {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.textContent =
                page;


            if (
                page === currentPage
            ) {

                button.classList.add(
                    "active"
                );

            }


            button.onclick =
                function () {

                    currentPage =
                        page;


                    renderProducts();


                    // kembali ke atas daftar menu
                    const productList =
                        document.getElementById(
                            "product-list"
                        );


                    if (productList) {

                        productList.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                };


            pagination.appendChild(
                button
            );

        }


        container.appendChild(
            pagination
        );

    }

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

    payment = type;


    const cash =
        document.getElementById(
            "payment-cash"
        );


    const riel =
        document.getElementById(
            "payment-riel"
        );


    const bank =
        document.getElementById(
            "payment-bank"
        );


    if (cash) {

        cash.classList.remove(
            "selected"
        );

    }


    if (riel) {

        riel.classList.remove(
            "selected"
        );

    }


    if (bank) {

        bank.classList.remove(
            "selected"
        );

    }


    if (
        type === "cash_baht" &&
        cash
    ) {

        cash.classList.add(
            "selected"
        );

    }


    if (
        type === "cash_riel" &&
        riel
    ) {

        riel.classList.add(
            "selected"
        );

    }


    if (
        type === "transfer_bank" &&
        bank
    ) {

        bank.classList.add(
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


// =====================================================
// BUILD ITEMS
// =====================================================
//
// ITEM YANG SAMA AKAN DIGABUNG
// BEDANYA MIE / NOTE = TETAP TERPISAH
// =====================================================

function buildItems() {

    const grouped = {};


    cartItems.forEach(
        function(item) {

            const data =
                products[
                    item.product
                ];


            const mie =
                item.mie || "";


            const note =
                item.note || "";


            // ---------------------------------------------
            // KUNCI PENGGABUNGAN
            // ---------------------------------------------
            // Produk + mie + note harus sama
            // baru dianggap item yang sama

            const key =
                item.product +
                "|" +
                mie +
                "|" +
                note;


            // ---------------------------------------------
            // ITEM SUDAH ADA
            // ---------------------------------------------

            if (grouped[key]) {

                grouped[key].quantity += 1;

                grouped[key].subtotal =
                    grouped[key].quantity *
                    grouped[key].price;


                // jumlah pilihan mie
                if (mie) {

                    grouped[key].mie_choices[mie] =
                        grouped[key].quantity;

                }

                return;

            }


            // ---------------------------------------------
            // ITEM BARU
            // ---------------------------------------------

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
                    note

            };


            // ---------------------------------------------
            // MIE
            // ---------------------------------------------

            if (mie) {

                result.mie_choice =
                    mie;


                result.mie_choices = {

                    [mie]:
                        1

                };

            }


            grouped[key] =
                result;

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
    // WAJIB
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
            "⚠️ Alamat pengantaran wajib diisi."
        );

        if (addressElement) {

            addressElement.focus();

        }

        return;

    }


    // =====================================================
    // GPS
    // WAJIB
    // =====================================================

    if (
        !gps ||
        typeof gps !== "object" ||
        gps.latitude === undefined ||
        gps.longitude === undefined ||
        gps.latitude === null ||
        gps.longitude === null
    ) {

        alert(

            "⚠️ Lokasi GPS wajib dikirim.\n\n" +

            "Silakan tekan tombol " +
            "\"📍 KIRIM LOKASI\" terlebih dahulu."

        );

        return;

    }


    // =====================================================
    // VALIDASI NILAI GPS
    // =====================================================

    const latitude =
        Number(
            gps.latitude
        );


    const longitude =
        Number(
            gps.longitude
        );


    if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude)
    ) {

        alert(
            "⚠️ Data GPS tidak valid.\n\n" +
            "Silakan kirim lokasi GPS kembali."
        );

        return;

    }


    console.log(
        "📍 GPS VALID:",
        latitude,
        longitude
    );


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

        gps: {

            latitude:
                latitude,

            longitude:
                longitude

        }

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
                "🟢 OPEN";


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
            "🔴 CLOSE";


        statusWrapper.className =
            "online-status offline";


        indicator.className =
            "online-dot";

    }

} // ← INI YANG TADI KURANG BRO


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
