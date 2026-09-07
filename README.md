# ShowBar

پروتوتایپ کامل UI/UX برای پلتفرم مدیریت بار ShowBar با React + TypeScript + Vite.

## اجرا

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

فایل‌های خروجی در `dist/` قرار می‌گیرند و برای هاست استاتیک/cPanel قابل Deploy هستند.

## مسیرها

### تجربه عمومی راننده
- `/loads`
- `/loads/:id`
- `/basket`
- `/request`
- `/request/success`
- `/notify/:id`

### پنل ادمین
- `/admin/login`
- `/admin`
- `/admin/loads`
- `/admin/loads/new`
- `/admin/loads/:id`
- `/admin/loads/:id/edit`
- `/admin/requests`
- `/admin/requests/:id`
- `/admin/vehicles`
- `/admin/vehicles/:id`
- `/admin/drivers`
- `/admin/settings`

این نسخه UI/Prototype است و احراز هویت و دیتابیس واقعی ندارد. داده‌ها در `src/data/mock.ts` قرار دارند و سبد راننده در LocalStorage نگهداری می‌شود.
