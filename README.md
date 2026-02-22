Here’s a complete and professional **README.md** you can use for your repository, including additional setup steps you may have missed (Sanctum config, CORS, CSRF, headers, environment setup, etc.).

You can copy this directly into your `README.md` file.

---

# React Native Auth Starter Kit (Laravel Sanctum Ready)

A production-ready **React Native startup kit** with authentication pre-configured and ready to connect to a **Laravel Sanctum backend**.

This starter includes:

* ✅ Login
* ✅ Register
* ✅ Forgot Password
* ✅ Reset Password
* ✅ API service layer
* ✅ Token handling
* ✅ Clean project structure
* ✅ Easy backend configuration

Anyone can clone this repository, update a single config file, and connect it to their Laravel backend.

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/mensahlloyd1998/rn-startup-kit
cd rn-startup-kit
npm install
```

or

```bash
yarn install
```

---

## 2️⃣ Update API URL

Go to:

```
constants/api.js
```

Update:

```js
export const API_URL = "http://your-backend-url.com";
```

Example:

```js
export const API_URL = "http://192.168.1.10:8000";
```

⚠️ If using a physical device, do NOT use `localhost`. Use your machine's local IP.

---

# 🛠 Laravel Backend Requirements

Your backend must use **Laravel Sanctum**.

Required routes in `routes/api.php`:

```php
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

```

---

# 🔐 Laravel Sanctum Setup (IMPORTANT)

Make sure Sanctum is properly configured.

## 1️⃣ Install Sanctum

```bash
composer require laravel/sanctum
```

Publish config:

```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

Run migrations:

```bash
php artisan migrate
```

---

## 2️⃣ Add Sanctum Middleware

In `app/Http/Kernel.php`, ensure:

```php
'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```

---

## 3️⃣ Configure CORS

In `config/cors.php`:

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'supports_credentials' => true,
```

If using local development:

```php
'allowed_origins' => ['*'],
```

---

## 4️⃣ Authentication Response Format

Your backend should return a JSON response like:

### Login Response Example

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "1|long-sanctum-token-string"
}
```

Make sure your controller generates token like:

```php
$token = $user->createToken('auth_token')->plainTextToken;
```

---

# 📦 Expected Protected Route Setup

Protected routes should use:

```php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
```

---

# 📱 React Native Auth Flow

The app expects:

* Token returned on login/register
* Token stored locally (AsyncStorage or secure storage)
* Token sent in headers:

```js
Authorization: Bearer {token}
Accept: application/json
```

---

# 🧠 Things You Might Miss (Important)

## ✅ 1. Accept Header

Laravel requires:

```http
Accept: application/json
```

Without this, validation errors may return HTML instead of JSON.

---

## ✅ 2. HTTPS in Production

Sanctum requires HTTPS in production. Make sure:

* You use SSL
* `SESSION_SECURE_COOKIE=true` in `.env`

---

## ✅ 3. CSRF (If Using SPA Mode)

If you are NOT using token-based authentication and instead using cookie-based SPA authentication, you must first call:

```
/sanctum/csrf-cookie
```

However, this starter kit assumes **token-based authentication**, which does NOT require CSRF cookies.

---

## ✅ 4. Password Reset Setup

Ensure your Laravel app has:

* Mail configured in `.env`
* `APP_URL` correctly set
* `FRONTEND_URL` if generating reset links

Example `.env` mail setup:

```
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
```

---

## ✅ 5. Validation Errors Format

Ensure Laravel returns errors like:

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email field is required."]
  }
}
```

---

# 🗂 Project Structure

```
/components
/screens
/navigation
/services
/constants
/context
```

---

# 🔄 Example AuthController (Laravel)

```php
public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json([
            'message' => 'Invalid credentials'
        ], 401);
    }

    $user = Auth::user();
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'user' => $user,
        'token' => $token
    ]);
}
```

---

# 🧪 Testing

Run Laravel backend:

```bash
php artisan serve
```

Run React Native:

```bash
npx react-native run-android
```

or

```bash
npx react-native run-ios
```

---

# 🛡 Security Recommendations

* Use HTTPS in production
* Use environment variables for API URL
* Consider using Secure Storage instead of AsyncStorage
* Implement token refresh if needed
* Rate-limit login attempts

---

# 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

# 📄 License

MIT

---

# ⭐ Support

If this starter kit helps you, consider giving it a star ⭐

