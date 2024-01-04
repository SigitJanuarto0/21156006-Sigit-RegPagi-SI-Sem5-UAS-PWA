function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const dbName = "comment_db";
const dbVersion = 1;
let db;

const openRequest = indexedDB.open(dbName, dbVersion);

openRequest.onerror = function(event) {
    console.error("Terjadi kesalahan saat membuka database.");
};

openRequest.onupgradeneeded = function(event) {
    db = event.target.result;

    // Gunakan autoIncrement sebagai keyPath
    const objectStore = db.createObjectStore("komen", { autoIncrement: true });
};

openRequest.onsuccess = function(event) {
    db = event.target.result;

    // Anda dapat memindahkan fungsi simpankomen di sini
};

// Fungsi simpankomen tetap sama
function simpankomen() {
    const transaction = db.transaction(["komen"], "readwrite");
    const objectStore = transaction.objectStore("komen");

    const nama = document.getElementById("nama").value;
    const desc = document.getElementById("desc").value;

    // Pastikan semua input telah diisi sebelum menyimpan
    if (nama && desc) {
        const komen = { nama, desc };
        const request = objectStore.add(komen);

        request.onsuccess = function (event) {
            console.log("komen berhasil disimpan.");

            // Setelah menyimpan, bersihkan nilai input
            document.getElementById("nama").value = "";
            document.getElementById("desc").value = "";

            // Tampilkan notifikasi menggunakan alert
            alert("Komentar berhasil disimpan.");
        };

        request.onerror = function (event) {
            console.error("Terjadi kesalahan saat menyimpan komen.");
            alert("Terjadi kesalahan saat menyimpan komen.");
        };
    } else {
        alert("Harap isi semua kolom pada formulir sebelum menyimpan.");
    }
}

  
