/**
 * @file This script handles all the interactive logic for the F&B Prompt Generator.
 * It manages theme switching, dynamic content updates, form resetting, and prompt generation.
 */

/**
 * An object containing product suggestions for different categories, with both Indonesian and English names.
 * @type {Object<string, Array<{id: string, en: string, desc: string}>>}
 */
const productSuggestions = {
    kategori_signature: [
        { id: 'Gula Aren Signature', en: 'Signature Palm Sugar', desc: 'Cita rasa klasik nusantara dengan manis alami.' },
        { id: 'Caramel Dream', en: 'Caramel Dream', desc: 'Manis lembut yang disukai semua kalangan.' },
        { id: 'Vanilla Soft Blend', en: 'Vanilla Soft Blend', desc: 'Lembut, creamy, dan cocok untuk penikmat kopi pemula.' },
        { id: 'Hazelnut Chill', en: 'Hazelnut Chill', desc: 'Rasa kacang yang elegan, cocok untuk semua usia.' },
        { id: 'Mocha Delight', en: 'Mocha Delight', desc: 'Kombinasi kopi dan cokelat yang aman dan nikmat.' }
    ],
    kategori_rempah: [
        { id: 'Pandan Latte', en: 'Pandan Latte', desc: 'Aroma khas Indonesia yang unik dan menggoda.' },
        { id: 'Kopi Jahe Hangat', en: 'Warm Ginger Coffee', desc: 'Cocok untuk musim hujan dan penikmat herbal.' },
        { id: 'Kopi Rempah Nusantara', en: 'Archipelago Spice Coffee', desc: 'Eksotik, hangat, dan penuh cita rasa tradisi.' }
    ],
    kategori_nonkopi: [
        { id: 'Choco Lava Milk', en: 'Choco Lava Milk', desc: 'Coklat tebal, cocok untuk anak dan remaja.' },
        { id: 'Matcha Breeze', en: 'Matcha Breeze', desc: 'Rasa green tea manis yang sedang tren.' },
        { id: 'Taro Velvet', en: 'Taro Velvet', desc: 'Warna ungu menarik dengan rasa creamy.' },
        { id: 'Strawberry Cloud', en: 'Strawberry Cloud', desc: 'Warna cerah, rasa manis, cocok untuk semua.' }
    ],
    kategori_kekinian: [
        { id: 'Es Kopi Susu Klasik', en: 'Classic Iced Milk Coffee', desc: 'Favorit sepanjang masa.' },
        { id: 'Brown Sugar Coffee Milk', en: 'Brown Sugar Coffee Milk', desc: 'Manis dengan aftertaste smoky yang kekinian.' },
        { id: 'Coconut Cold Brew', en: 'Coconut Cold Brew', desc: 'Segar dan unik, kombinasi kopi & kelapa.' }
    ],
    kategori_kreatif: [
        { id: 'Sunrise Blend', en: 'Sunrise Blend', desc: 'Untuk mood pagi yang cerah.' },
        { id: 'Midnight Coffee', en: 'Midnight Coffee', desc: 'Kopi hitam kuat untuk penikmat malam.' },
        { id: 'Creamy Sunset', en: 'Creamy Sunset', desc: 'Kopi sore hari dengan warna estetik.' },
        { id: 'Silent Latte', en: 'Silent Latte', desc: 'Tenang, lembut, dan cocok untuk introvert.' },
        { id: 'Galaxy Coffee', en: 'Galaxy Coffee', desc: 'Nama menarik untuk racikan dengan tampilan warna gradasi.' }
    ],
    kategori_sehat: [
        { id: 'Oat Milk Latte', en: 'Oat Milk Latte', desc: 'Alternatif susu nabati yang creamy dan rendah kalori.' },
        { id: 'Sugar-Free Americano', en: 'Sugar-Free Americano', desc: 'Kopi hitam murni tanpa gula, untuk penikmat kopi sejati.' },
        { id: 'Kombucha Teh Hijau', en: 'Green Tea Kombucha', desc: 'Minuman fermentasi teh yang kaya probiotik dan antioksidan.' },
        { id: 'Vegan Choco-Avocado Smoothie', en: 'Vegan Choco-Avocado Smoothie', desc: 'Smoothie cokelat lezat dan sehat dengan bahan dasar alpukat.' }
    ],
    kategori_fusion: [
        { id: 'Cheese Tea Coffee', en: 'Cheese Tea Coffee', desc: 'Kombinasi unik kopi dengan lapisan foam keju gurih.' },
        { id: 'Espresso Tonic', en: 'Espresso Tonic', desc: 'Perpaduan segar antara espresso dan air tonik, hit di kalangan coffee enthusiast.' },
        { id: 'Kopi Klepon', en: 'Klepon Coffee', desc: 'Minuman yang terinspirasi dari jajanan pasar, dengan rasa pandan dan kelapa.' },
        { id: 'Spicy Mango Cold Brew', en: 'Spicy Mango Cold Brew', desc: 'Cold brew dengan sentuhan sirup mangga dan sedikit cabai untuk sensasi tak terduga.' }
    ],
    kategori_makanan_ringan: [
        { id: 'Roti Bakar Cokelat Keju', en: 'Chocolate Cheese Toast', desc: 'Lumer, manis-gurih, cocok untuk semua umur. Bisa dikreasikan dengan topping.' },
        { id: 'Croffle (Croissant + Waffle)', en: 'Croffle', desc: 'Hits di kalangan anak muda dengan berbagai varian topping.' },
        { id: 'Kentang Goreng & Saus Spesial', en: 'French Fries & Special Sauce', desc: 'Classic & selalu laris dengan tambahan bumbu atau saus unik.' },
        { id: 'Donat Mini / Bomboloni', en: 'Mini Donuts / Bomboloni', desc: 'Donat isi lumer yang cocok untuk sharing.' },
        { id: 'Risoles Mayo / Ragout', en: 'Mayonnaise / Ragout Risoles', desc: 'Lembut dan gurih, isi bisa divariasikan (ayam, smoked beef, keju).' },
        { id: 'Churros Saus Cokelat', en: 'Churros with Chocolate Sauce', desc: 'Ringan tapi menarik, cocok untuk remaja hingga dewasa.' },
        { id: 'Pisang Nugget Topping', en: 'Topped Banana Nuggets', desc: 'Murah meriah tapi digemari banyak orang dengan aneka topping.' }
    ],
    kategori_makanan_berat: [
        { id: 'Nasi Ayam Geprek Level', en: 'Spicy Smashed Chicken Rice', desc: 'Favorit semua kalangan, bisa ditambah mozzarella dengan level pedas.' },
        { id: 'Nasi Dori Sambal Matah', en: 'Dory Fish Rice with Matah Sambal', desc: 'Ikan dori crispy dengan sambal matah segar.' },
        { id: 'Nasi Telur Krispi', en: 'Crispy Egg Rice', desc: 'Simple, murah, tapi sangat mengenyangkan dan nagih.' },
        { id: 'Ricebowl Ayam Teriyaki', en: 'Teriyaki Chicken Rice Bowl', desc: 'Gaya kekinian ala Jepang yang disukai anak muda.' },
        { id: 'Mie Goreng Level Pedas', en: 'Spicy Level Fried Noodles', desc: 'Mie dengan topping ayam, bakso, dan level pedas yang bisa diatur.' },
        { id: 'Spaghetti Bolognese', en: 'Bolognese Spaghetti', desc: 'Pasta klasik dengan saus daging yang disukai semua orang.' },
        { id: 'Sop Iga Sapi', en: 'Beef Ribs Soup', desc: 'Menu hangat, gurih, dan berisi untuk segmen keluarga.' }
    ],
    kategori_paket_combo: [
        { id: 'Paket Hemat Kopi + Roti Bakar', en: 'Coffee + Toast Value Package', desc: 'Kombinasi klasik untuk memulai hari atau teman santai.' },
        { id: 'Paket Anak Muda: Croffle + Matcha', en: 'Youth Package: Croffle + Matcha', desc: 'Paket kekinian yang sangat populer di media sosial.' },
        { id: 'Paket Kantoran: Ricebowl + Kopi Susu', en: 'Office Package: Rice Bowl + Milk Coffee', desc: 'Solusi makan siang praktis dan mengenyangkan.' },
        { id: 'Paket Santai: Pisang Nugget + Taro', en: 'Relax Package: Banana Nuggets + Taro', desc: 'Teman sempurna untuk bersantai di sore hari.' }
    ]
};

/**
 * Initializes the application after the DOM is fully loaded.
 * Sets up all event listeners for theme switching, dynamic options, and form actions.
 */
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeLabel = document.querySelector('#theme-switcher .form-check-label');

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
        themeLabel.textContent = '☀️';
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('dark-mode');
            themeLabel.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            themeLabel.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });

    const customInputSections = [
        'gaya_visual', 'lokasi', 'aksesoris', 
        'wadah', 'model', 'cahaya', 'posisi', 'style_mood'
    ];

    customInputSections.forEach(name => {
        const customText = document.getElementById(`${name}_custom_text`);
        const customRadio = document.getElementById(`${name}_custom_radio`);
        if(customText && customRadio) {
            customText.addEventListener('focus', () => {
                customRadio.checked = true;
            });
        }
    });

    const categorySelect = document.getElementById('product_category');
    categorySelect.addEventListener('change', updateProductNameOptions);
    
    document.getElementById('nama_produk_custom_text').addEventListener('focus', () => {
        document.getElementById('nama_produk_custom_radio').checked = true;
    });

    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', resetForm);

    const form = document.getElementById('prompt-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generatePrompt();
    });

    const copyButtonId = document.getElementById('copy-button-id');
    const resultPromptId = document.getElementById('result-prompt-id');
    copyButtonId.addEventListener('click', function() {
        resultPromptId.select();
        navigator.clipboard.writeText(resultPromptId.value).then(() => {
            copyButtonId.textContent = 'Disalin!';
            setTimeout(() => { copyButtonId.textContent = 'Salin'; }, 2000);
        });
    });

    const copyButtonEn = document.getElementById('copy-button-en');
    const resultPromptEn = document.getElementById('result-prompt-en');
    copyButtonEn.addEventListener('click', function() {
        resultPromptEn.select();
        navigator.clipboard.writeText(resultPromptEn.value).then(() => {
            copyButtonEn.textContent = 'Copied!';
            setTimeout(() => { copyButtonEn.textContent = 'Copy'; }, 2000);
        });
    });

    // Initial call to populate product name options on page load
    updateProductNameOptions();
});

/**
 * Resets the entire form to its default state.
 * Clears all inputs, hides the result container, and scrolls to the top.
 */
function resetForm() {
    // 1. Reset the entire form to its initial state defined in the HTML
    document.getElementById('prompt-form').reset();

    // 2. Manually trigger the category change to update the dynamic product names
    // and the Jenis/Kategori Teks field
    const categorySelect = document.getElementById('product_category');
    categorySelect.dispatchEvent(new Event('change'));
    
    // 3. Hide the result box
    document.getElementById('result-container').style.display = 'none';
    
    // 4. Scroll to the top of the page for a fresh start
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Updates the product name radio buttons based on the selected category.
 * Also sets a default value for the "Jenis/Kategori Teks" input.
 */
function updateProductNameOptions() {
    const category = document.getElementById('product_category').value;
    const optionsContainer = document.getElementById('product_name_options');
    const jenisProdukInput = document.getElementById('jenis_produk');
    optionsContainer.innerHTML = ''; // Clear existing options

    const suggestions = productSuggestions[category] || [];
    
    if (suggestions.length > 0) {
        suggestions.forEach((product, index) => {
            const optionId = `nama_produk_opt_${index}`;
            const formCheck = document.createElement('div');
            formCheck.className = 'form-check';
            formCheck.innerHTML = `
                <input class="form-check-input" type="radio" name="nama_produk_radio" id="${optionId}" value="${product.id}" 
                       data-english-value="${product.en}" 
                       data-description="${product.desc}" 
                       ${index === 0 ? 'checked' : ''}>
                <label class="form-check-label" for="${optionId}" title="${product.desc}">${product.id}</label>
            `;
            optionsContainer.appendChild(formCheck);
        });
        
        // Set initial description from the first (default checked) product
        jenisProdukInput.value = suggestions[0].desc;
        jenisProdukInput.placeholder = 'Deskripsi produk akan muncul di sini...';


        document.getElementById('nama_produk_custom_radio').checked = false;
        document.getElementById('nama_produk_custom').disabled = true;
        document.getElementById('nama_produk_custom').value = '';

    } else {
        // Fallback for categories without suggestions (currently none)
        jenisProdukInput.value = '';
        jenisProdukInput.placeholder = 'Tulis deskripsi singkat produk Anda di sini';
        document.getElementById('nama_produk_custom_radio').checked = true;
        document.getElementById('nama_produk_custom').disabled = false;
    }

    // Add event listeners to ALL radio buttons in the group
    const allProductRadios = document.querySelectorAll('input[name="nama_produk_radio"]');
    allProductRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const customNameInput = document.getElementById('nama_produk_custom');
            const customNameRadio = document.getElementById('nama_produk_custom_radio');
            const jenisProdukInput = document.getElementById('jenis_produk');
            
            if (customNameRadio.checked) {
                // If "Ketik Sendiri" is checked
                customNameInput.disabled = false;
                customNameInput.focus();
                jenisProdukInput.value = ''; // Clear description field for custom input
                jenisProdukInput.placeholder = 'Tulis deskripsi singkat produk kustom Anda';
            } else {
                // If a pre-defined product is checked
                customNameInput.disabled = true;
                customNameInput.value = '';
                // Update description field with the selected product's description
                const selectedProductRadio = document.querySelector('input[name="nama_produk_radio"]:checked');
                if (selectedProductRadio) {
                    jenisProdukInput.value = selectedProductRadio.getAttribute('data-description');
                }
                jenisProdukInput.placeholder = 'Deskripsi produk akan muncul di sini...';
            }
        });
    });
}

/**
 * Gets the selected product name in both Indonesian and English.
 * Handles both pre-defined radio options and the custom text input.
 * @returns {{id: string, en: string}} The product name object.
 */
function getProductName() {
    const customRadio = document.getElementById('nama_produk_custom_radio');
    const customText = document.getElementById('nama_produk_custom_text');
    if (customRadio && customRadio.checked && customText) {
        const value = customText.value;
        return { id: value, en: value };
    }
    const selected = document.querySelector('input[name="nama_produk_radio"]:checked');
    if (selected) {
        return {
            id: selected.value,
            en: selected.dataset.englishValue || selected.value
        };
    }
    return { id: '', en: '' };
}

/**
 * Gets the value of a customizable field (which has radio options and a custom text input).
 * @param {string} name - The base name of the field (e.g., 'gaya_visual').
 * @returns {{id: string, en: string}} The selected value object.
 */
function getCustomizableValue(name) {
    const customRadio = document.getElementById(`${name}_custom_radio`);
    const customText = document.getElementById(`${name}_custom_text`);
    if (customRadio && customRadio.checked && customText) {
        const value = customText.value;
        return { id: value, en: value };
    }
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    if (selected) {
        return {
            id: selected.value,
            en: selected.dataset.englishValue || selected.value
        };
    }
    return { id: '', en: '' };
}

/**
 * The main function to generate the final prompts.
 * It gathers all selected values, constructs the prompts in both Indonesian and English,
 * and displays them in the result tabs.
 */
function generatePrompt() {
    // --- 1. GATHER ALL VALUES ---
    const namaProduk = getProductName();
    const jenisProdukInput = document.getElementById('jenis_produk');
    const jenisProduk = {
        id: jenisProdukInput.value,
        en: jenisProdukInput.value 
    };
    const gayaVisual = getCustomizableValue('gaya_visual');
    const lokasi = getCustomizableValue('lokasi');
    const aksesoris = getCustomizableValue('aksesoris');
    const wadah = getCustomizableValue('wadah');
    const model = getCustomizableValue('model');
    const cahaya = getCustomizableValue('cahaya');
    const posisi = getCustomizableValue('posisi');
    const styleMood = getCustomizableValue('style_mood');
    const logoFile = document.getElementById('logo_upload').files[0];
    const letakLogo = getCustomizableValue('letak_logo');
    const tagline = document.getElementById('tagline').value;
    const harga = document.getElementById('harga').value;
    const letakHarga = getCustomizableValue('letak_harga');
    const penjelasan = document.getElementById('penjelasan').value;

    // --- PROMPT BAHASA INDONESIA ---
    let promptId = `[PROMPT DESKRIPTIF]\n`;
    promptId += `Foto produk komersial untuk ${jenisProduk.id || 'produk'} dengan nama "${namaProduk.id}".\n`;
    promptId += `Gaya visualnya adalah ${gayaVisual.id}, dengan mood iklan ${styleMood.id}. `;
    promptId += `Produk disajikan dalam ${wadah.id}, ${lokasi.id}, dan ditemani dengan ${aksesoris.id}. `;
    promptId += `Pencahayaan menggunakan ${cahaya.id}. `;
    if (model && model.id !== 'fokus hanya pada produk') {
        promptId += `Terdapat model dalam foto: ${model.id}. `;
    } else {
        promptId += `Foto berfokus penuh pada produk tanpa model. `;
    }
    promptId += `Pengambilan gambar dari sudut ${posisi.id}. `;
    if (penjelasan) {
        promptId += `\nPenjelasan: "${penjelasan}".`;
    }

    // --- PROMPT BAHASA INGGRIS ---
    let promptEn = `[DESCRIPTIVE PROMPT]\n`;
    promptEn += `Commercial product photography for a ${jenisProduk.en || 'product'} named "${namaProduk.en}".\n`;
    promptEn += `The visual style is ${gayaVisual.en}, with a ${styleMood.en} advertising mood. `;
    promptEn += `The product is served in a ${wadah.en}, located ${lokasi.en}, and accompanied by ${aksesoris.en}. `;
    promptEn += `The lighting setup uses ${cahaya.en}. `;
    if (model && model.en !== 'focusing solely on the product') {
        promptEn += `There is a model in the photo: ${model.en}. `;
    } else {
        promptEn += `The photo focuses entirely on the product without a model. `;
    }
    promptEn += `The shot is taken from a ${posisi.en} angle. `;
    if (penjelasan) {
        promptEn += `\nDescription: "${penjelasan}".`;
    }
    
    // --- INSTRUKSI DESAINER (SHARED) ---
    let designerInstructionsId = `\n\n[INSTRUKSI DESAINER]\n`;
    let designerInstructionsEn = `\n\n[DESIGNER INSTRUCTIONS]\n`;
    if (logoFile) {
        designerInstructionsId += `- Logo: Gunakan file (${logoFile.name}), letakkan ${letakLogo.id}.\n`;
        designerInstructionsEn += `- Logo: Use the uploaded file (${logoFile.name}), place it ${letakLogo.en}.\n`;
    } else {
        designerInstructionsId += `- Logo: Letakkan logo produk ${letakLogo.id}.\n`;
        designerInstructionsEn += `- Logo: Place the product logo ${letakLogo.en}.\n`;
    }
    if (tagline) {
         designerInstructionsId += `- Tagline: "${tagline}".\n`;
         designerInstructionsEn += `- Tagline: "${tagline}".\n`;
    }
    if (harga) {
        designerInstructionsId += `- Harga: Cantumkan "${harga}", letakkan ${letakHarga.id}.\n`;
        designerInstructionsEn += `- Price: Include "${harga}", place it ${letakHarga.en}.\n`;
    }

    promptId += designerInstructionsId;
    promptEn += designerInstructionsEn;

    // --- AI IMAGE PROMPT (SHARED, BASED ON ENGLISH) ---
    let aiPrompt = [
        `commercial product photography of a ${jenisProduk.en || ''} "${namaProduk.en}"`,
        `in a ${wadah.en}`,
        gayaVisual.en,
        styleMood.en,
        `served ${lokasi.en}`,
        `with ${aksesoris.en}`,
        `${cahaya.en} lighting`,
        `shot from ${posisi.en} angle`,
        (model.en && model.en !== 'focusing solely on the product' ? model.en : 'no people'),
        'photorealistic, high detail, 8k'
    ].filter(v => v && v.trim() !== 'served' && v.trim() !== 'with' && v.trim() !== 'in a').join(', ');

    promptId += `\n[PROMPT AI IMAGE GENERATOR]\n` + aiPrompt;
    promptEn += `\n[AI IMAGE GENERATOR PROMPT]\n` + aiPrompt;

    // --- 4. DISPLAY RESULTS ---
    document.getElementById('result-prompt-id').value = promptId;
    document.getElementById('result-prompt-en').value = promptEn;
    
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
    setTimeout(() => {
        resultContainer.style.opacity = '1';
    }, 10); // A tiny delay to allow the browser to register display:block before starting the transition

    resultContainer.scrollIntoView({ behavior: 'smooth' });
} 