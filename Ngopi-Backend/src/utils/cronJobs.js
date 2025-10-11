import cron from "node-cron";
import Order from "../models/orderModel.js";
import { DateTime } from "luxon";

const ZONE = 'Asia/Jakarta';

const cancelExpiredOrders = async () => {
  const now = DateTime.now().setZone(ZONE);

  try {
    const pendingOrders = await Order.find({
      status: { $in: ['Waiting To Be Confirmed', 'Waiting For Payment'] }
    });

    for (const order of pendingOrders) {
      let shouldCancel = false;

      const timeValue = order.pickupDetails?.time;
      if (!timeValue) continue;

      if (timeValue === 'Now') {
        const thirtyFiveMinAgo = now.minus({ minutes: 35 }).toMillis();

        const createdMillis = new Date(order.createdAt).getTime();

        if (createdMillis < thirtyFiveMinAgo) {
          shouldCancel = true;
        }
      } else {
        try {
          const parts = timeValue.split(':');
          if (parts.length < 2) throw new Error('Invalid time format');

          const hours = parseInt(parts[0], 10);
          const minutes = parseInt(parts[1], 10);

          const pickupDT = now.set({ hour: hours, minute: minutes, second: 0, millisecond: 0 });

          if (now.toMillis() > pickupDT.toMillis()) { 
            shouldCancel = true;
          }
        } catch (e) {
          console.error(`Format waktu salah untuk pesanan ${order._id}: ${timeValue}`, e);
        }
      }

      if (shouldCancel) {
        order.status = 'Cancelled';
        await order.save();
        console.log(`Order ${order._id} cancelled by cron (pickup time: ${timeValue})`);
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
