<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Daftarkan layanan yang dibutuhkan, jika ada
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Untuk memperbaiki error migrasi pada kolom string yang memiliki panjang lebih dari 191 karakter
        Schema::defaultStringLength(191);
        
        // Bisa menambahkan service lainnya yang perlu disetting di sini
    }
}
