import cron from 'node-cron';
import bookingStatusUpdater from '../services/bookingStatusUpdater';

cron.schedule('* * * * *', async () => {
  console.log('Running booking status update job...');
  await bookingStatusUpdater.updateStatuses();
  console.log('Testing complrte status')
});

console.log('Booking status cron job scheduled to run every minute');