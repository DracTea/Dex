<?php

function base_path($path = '') {
    return rtrim(dirname(__DIR__), '/') . '/' . ltrim($path, '/');
}

function asset($path) {
    return base_path('public/' . ltrim($path, '/'));
}