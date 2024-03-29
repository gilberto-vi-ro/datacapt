<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
$nc = "App\Http\Controllers\\";// Namespace del controller

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("user-signup", $nc."LoginController@signUp");

Route::post("user-login", $nc."LoginController@login");

Route::get("user-info/{email}", $nc."LoginController@userDetail");

Route::controller($nc.ProfileController::class)->group( function(){
    Route::get("profiles", "index");
    Route::get("profile-step/{id}", "step");
    Route::post("profile-create", "create");
    Route::get("profile-show/{id}", "show");
    Route::put("profile-update", "update");
    Route::post("profile-updateImg", "updateImg");
    Route::get("profile-users/{url}", "getImgUsers");
    Route::delete("profile-destroy/{id}", "destroy");

});

Route::controller($nc.PersonalInfoController::class)->group( function(){
    Route::get("personalInfo", "index");
    Route::get("personalInfo-exists/{id}/{json}", "exists");
    Route::get("personalInfo-show/{id}", "show");
    Route::post("personalInfo-create", "create");
    Route::put("personalInfo-update", "update");
});

Route::controller($nc.SchoolInfoController::class)->group( function(){
    Route::get("schoolInfo", "index");
    Route::get("schoolInfo-exists/{id}/{json}", "exists");
    Route::get("schoolInfo-show/{id}", "show");
    Route::post("schoolInfo-create", "create");
    Route::put("schoolInfo-update", "update");
});

Route::controller($nc.IndigenousInfoController::class)->group( function(){
    Route::get("indigenousInfo", "index");
    Route::get("indigenousInfo-exists/{id}/{json}", "exists");
    Route::get("indigenousInfo-show/{id}", "show");
    Route::post("indigenousInfo-create", "create");
    Route::put("indigenousInfo-update", "update");
});

Route::controller($nc.ResponsiblesController::class)->group( function(){
    Route::get("responsibles", "index");
    Route::get("responsibles-exists/{id}/{json}", "exists");
    Route::get("responsibles-show/{id}", "show");
    Route::post("responsibles-create", "create");
    Route::put("responsibles-update", "update");
    Route::delete("responsibles-delete/{id}", "delete");
});


Route::controller($nc.AdminController::class)->group( function(){
    Route::get("admin", "index");
    Route::post("admin-getAllUsers", "getAllUsers");
    Route::get("admin-getResponsibleBeneficiaries/{id}", "getResponsibleBeneficiaries");
    Route::get("admin-getUser/{id}", "getUser");
    Route::post("admin-select", "select");
    Route::post("admin-filter", "filter");
    Route::put("admin-updateBeneficiary", "updateBeneficiary");
    Route::delete("admin-deleteBeneficiary/{id}", "deleteBeneficiary");
    Route::delete("admin-deleteMasive/", "deleteMasive");
});