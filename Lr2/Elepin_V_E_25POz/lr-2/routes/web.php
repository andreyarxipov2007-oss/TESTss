<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\LkController;
use App\Http\Controllers\OrderServiceController;
use App\Http\Controllers\ResponseController;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VacancyController;
use App\Models\Resume;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', [VacancyController::class, 'index'])->name('home')->middleware(['auth', 'verified']);

Auth::routes(['verify' => true]);
// Route::get('/email/verify', function () {
//     return view('auth.verify-email');
// })->middleware('auth')->name('verification.notice');

//Вакансии
Route::get('/vacancies', [VacancyController::class, 'index'])->name('vacancy.index');
Route::get('/vacancies/search', [VacancyController::class, 'search'])->name('vacancy.search');
Route::get('/my-vacancies', [VacancyController::class, 'myVacancy'])->name('vacancy.my-vacancy')->middleware(['auth', 'verified', 'employer']);
Route::get('/vacancies/create', [VacancyController::class, 'create'])->name('vacancy.create')->middleware(['auth', 'verified', 'employer']);
Route::post('/vacancies/store', [VacancyController::class, 'store'])->name('vacancy.store')->middleware(['auth', 'verified', 'employer']);
Route::get('/vacancies/{vacancy}/edit', [VacancyController::class, 'edit'])->name('vacancy.edit')->middleware(['auth', 'verified', 'employer']);
Route::patch('/vacancies/{vacancy}', [VacancyController::class, 'update'])->name('vacancy.update')->middleware(['auth', 'verified', 'employer']);
Route::get('/vacancies/{vacancy}/destroy', [VacancyController::class, 'destroy'])->name('vacancy.destroy')->middleware(['auth', 'verified', 'employer']);

//Избранное
Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorite.index')->middleware(['auth', 'verified', 'no-admin']);
Route::get('/add-favorite/{favorite}', [FavoriteController::class, 'addFavorite'])->name('add-favorite')->middleware(['auth', 'verified', 'no-admin']);

//Услуги
Route::get('/services', [ServiceController::class, 'index'])->name('service.index');
Route::get('/services/{service}', [ServiceController::class, 'index_for'])->name('service.index_for')->middleware('checkUserForService');

//Резюме
Route::get('/resumes', [ResumeController::class, 'index'])->name('resume.index')->middleware(['auth', 'verified', 'worker']);
Route::get('/resumes/create', [ResumeController::class, 'create'])->name('resume.create')->middleware(['auth', 'verified', 'worker']);
Route::post('/resumes', [ResumeController::class, 'store'])->name('resume.store')->middleware(['auth', 'verified', 'worker']);
Route::get('/resumes/{resume}/edit', [ResumeController::class, 'edit'])->name('resume.edit')->middleware(['auth', 'verified', 'worker']);
Route::patch('/resumes/{resume}', [ResumeController::class, 'update'])->name('resume.update')->middleware(['auth', 'verified', 'worker']);
Route::get('/resumes/{resume}/destroy', [ResumeController::class, 'destroy'])->name('resume.destroy')->middleware(['auth', 'verified', 'worker']);

//Админ панель
Route::get('/admin/order-service', [AdminController::class, 'orderService'])->name('admin.order-service')->middleware(['auth', 'verified', 'admin']);
Route::get('/admin/{order}/accept', [AdminController::class, 'accept'])->name('admin.accept')->middleware(['auth', 'verified', 'admin']);
Route::get('/admin/{order}/complete', [AdminController::class, 'complete'])->name('admin.complete')->middleware(['auth', 'verified', 'admin']);
Route::get('/vacancies/{vacancy}/ban', [VacancyController::class, 'ban'])->name('vacancy.ban')->middleware(['auth', 'verified', 'admin']);
Route::get('/service/create', [ServiceController::class, 'create'])->name('service.create')->middleware(['auth', 'verified', 'admin']);
Route::post('/services/store', [ServiceController::class, 'store'])->name('service.store')->middleware(['auth', 'verified', 'admin']);
Route::get('/services/{service}/edit', [ServiceController::class, 'edit'])->name('service.edit')->middleware(['auth', 'verified', 'admin']);
Route::patch('/services/{service}', [ServiceController::class, 'update'])->name('service.update')->middleware(['auth', 'verified', 'admin']);
Route::get('/services/{service}/destroy', [ServiceController::class, 'destroy'])->name('service.destroy')->middleware(['auth', 'verified', 'admin']);

//Заказанные услуги
Route::get('/order-service', [OrderServiceController::class, 'index'])->name('order-service.index')->middleware(['auth', 'verified', 'no-admin']);
Route::get('/add-order/{order}', [OrderServiceController::class, 'addOrder'])->name('add-order')->middleware(['auth', 'verified', 'no-admin']);

//Отклики
Route::get('/responses', [ResponseController::class, 'index'])->name('response.index')->middleware(['auth', 'verified', 'no-admin']);
Route::post('/responses/store', [ResponseController::class, 'store'])->name('response.store')->middleware(['auth', 'verified', 'worker']);
Route::get('/responses/{response}/cross', [ResponseController::class, 'cross'])->name('response.cross')->middleware(['auth', 'verified', 'employer']);
Route::get('/responses/{response}/check', [ResponseController::class, 'check'])->name('response.check')->middleware(['auth', 'verified', 'employer']);
