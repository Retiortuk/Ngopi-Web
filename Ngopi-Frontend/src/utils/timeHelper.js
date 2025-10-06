export function generatePickupTimes() {
    // Inisialisasi Waktu Sekarang (local)
    const now =  new Date();
    // Slot Waktu yang tersedia akan masuk kesini
    const availableSlots = [];

    // Start Open Toko
    const startTime = new Date();
    startTime.setHours(8, 30, 0, 0);

    // Close Toko
    const endTime = new Date();
    endTime.setHours(21, 0, 0, 0);

    // Check if now > endTime(Toko tutup)
    if (now > endTime || now < startTime) {
        return[{times: 'Our Store Closed', disabled: true}]
    }

    // Waktu Sekarang dalam range startTime - endTime
    let currentSlotTime = new Date(startTime);

    while (currentSlotTime <= endTime) {
        if(currentSlotTime > now) {
            const hours = String(currentSlotTime.getHours()).padStart(2, '0');
            const minutes = String(currentSlotTime.getMinutes()).padStart(2, '0');
            availableSlots.push({times: `${hours}:${minutes}`})
        }
        currentSlotTime.setMinutes(currentSlotTime.getMinutes() + 30);
    }

    // push ke array yang sebenarnya
    const finalPickupTimes = [
        {
            times:'Now',
            description: "By Choosing this means you're at the store, and ready to pickup when your order called"
        },
        ...availableSlots.slice(0,4)
    ];
    return finalPickupTimes;
}