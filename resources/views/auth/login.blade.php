@extends('name')

@section('kontent')
    <div class="w-50. center. rounded. border. p-5">
        <h1>Login</h1>
        @csrf
        <form action="/login" method="post">
            <div class="mb-3">
                <label for="email">Email:</label>
                <input type="email" name="email" id="email" required>
            </div>
            <div class="mb-3">
                <label for="password">Password:</label>
                <input type="password" name="password" id="password" required>
            </div>
            <div class="btn btn-primary">
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
