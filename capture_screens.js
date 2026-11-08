import puppeteer from 'puppeteer';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/chath/.gemini/antigravity/brain/37eeff88-76c7-43a9-bb15-7559bb6c7734/screenshots';

const routes = [
  { name: 'o1_booking_requests.png', path: '/owner/bookings/requests' },
  { name: 'o2_viewing_appointments.png', path: '/owner/bookings/viewings' },
  { name: 'o3_generate_agreement.png', path: '/owner/bookings/generate-agreement' },
  { name: 'o4_tenants_rent.png', path: '/owner/tenants' },
  { name: 'o5_payments_income.png', path: '/owner/tenants/payments' },
  { name: 'o6_deposits_refunds.png', path: '/owner/tenants/deposits' },
  { name: 'o7_owner_messages.png', path: '/owner/messages' },
  { name: 's1_student_notifications.png', path: '/student/notifications' },
  { name: 's2_student_messages.png', path: '/student/messages' },
  { name: 's3_request_booking.png', path: '/student/bookings/request' },
  { name: 's4_schedule_viewing.png', path: '/student/bookings/schedule-viewing' },
  { name: 's5_my_bookings.png', path: '/student/bookings/my-bookings' },
  { name: 's6_rental_agreement.png', path: '/student/tenancy/agreement' },
  { name: 's7_student_payments.png', path: '/student/tenancy/payments' },
  { name: 's8_move_in_checklist.png', path: '/student/tenancy/move-in-checklist' },
];

async function capture() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 2 });

  for (const r of routes) {
    const url = `http://127.0.0.1:3100${r.path}`;
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
    await new Promise(res => setTimeout(res, 800)); // wait for fonts and rendering
    const savePath = path.join(ARTIFACTS_DIR, r.name);
    await page.screenshot({ path: savePath, fullPage: true });
    console.log(`Saved screenshot to ${savePath}`);
  }

  await browser.close();
  console.log('All 15 full-page screenshots captured successfully from port 3100!');
}

capture().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
