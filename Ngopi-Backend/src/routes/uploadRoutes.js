import path from 'path';
import express from 'express';
import multer from 'multer';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Konfigurasi penyimpanan untuk Multer
const storage = multer.diskStorage({
    destination(req, file, cb) {
        // Menentukan folder tujuan penyimpanan file
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        // Membuat nama file yang unik untuk menghindari nama yang sama
        // Hasilnya akan seperti: image-1678886400000.jpg
        cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

// Middleware Multer yang menggunakan konfigurasi di atas
const upload = multer({
    storage,
});

// Mendefinisikan endpoint untuk upload gambar
// Alurnya: User mengirim request -> dicek oleh 'protect' -> dicek oleh 'admin' -> diproses oleh 'upload.single('image')'
router.post('/', protect, admin, upload.single('image'), (req, res) => {
  // Jika berhasil, kirim kembali path gambar yang sudah diformat dengan benar
    res.status(200).send({
    message: 'Gambar berhasil diunggah',
    image: `/${req.file.path.replace(/\\/g, "/")}`, // Mengganti backslash (\) menjadi forward slash (/)
});
});

export default router;