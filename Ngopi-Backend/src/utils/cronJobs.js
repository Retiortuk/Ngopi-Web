import cron from "node-cron";
import Order from "../models/orderModel.js";

const cancelExpiredOrders = async ()=> {
    const now = new Date();

    try {
        const pendingOrders = await Order.find({
            status : { $in: ['Waiting To Be Confirmed', 'Waiting For Payment']}
        });

        for (const order of pendingOrders) {
            let shouldCancel = false;
            // let reason = ''; soon implemented

            if(order.pickupDetails.time === 'Now') {
                const thrtyFiveMinutesAgo = new Date(now.getTime() - 35 * 60 * 1000);
                if(order.createdAt < thrtyFiveMinutesAgo) {
                    shouldCancel = true;
                    // reason = 'Expired';
                }
            } else {
                try {
                    const pickupDate = new Date(order.createdAt);
                    const [hours, minutes] = order.pickupDetails.time.split(':');
                    pickupDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

                    if (now > pickupDate) {
                        shouldCancel = true;
                        // reason = 'expired';
                    }
                } catch (e) {
                    console.error(`Format waktu salah untuk pesanan ${order._id}: ${order.pickupDetails.time}`);
                }
            }

            if(shouldCancel) {
                order.status = 'Cancelled';
                await order.save();
            }
        }
    } catch (error) {
        console.error("Error saat menjalankan cron job pembatalan pesanan:", error);
    }
};

const initCronJobs = () => {
    cron.schedule('* * * * *', cancelExpiredOrders);
    console.log("Cron job untuk membatalkan pesanan kedaluwarsa telah dijadwalkan.");
};

export default initCronJobs;