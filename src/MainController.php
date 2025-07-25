<?php
namespace App;

use Symfony\Component\HttpFoundation\Response;

class MainController {

  public function index() {
    $vite = Vite::make()
      ->useHotFile('/public/ap.hot')
      ->useBuildDirectory('public/dist')
      ->withEntryPoints(['main.ts'])
      ->toHtml();

    return new Response(
      '<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>My App</title>
          ' . $vite . '
      </head>
      <body>
          <h1>Hello, World!</h1>
      </body>
      </html>'
    );
  }

  public function hello($name = 'World') {
    return new Response("Hello, $name!");
  }

  public function notFound() {
    http_response_code(404);
    echo "404 Not Found";
  }
}