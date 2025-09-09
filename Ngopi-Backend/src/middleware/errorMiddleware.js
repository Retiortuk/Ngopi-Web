// Middleware untuk menangani request ke rute yang tidak ada (404)
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // Meneruskan error ke middleware selanjutnya (errorHandler)
};

// Middleware untuk menangani semua error lain yang terjadi di aplikasi
const errorHandler = (err, req, res, next) => {
    // Terkadang error datang dengan status code 200, kita ubah ke 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    
    // Kirim response error dalam format JSON
    res.json({
        message: err.message,
        // Tampilkan stack trace hanya jika kita tidak di mode production (untuk keamanan)
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export { notFound, errorHandler };