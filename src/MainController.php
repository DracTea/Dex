<?php

namespace App;

use Symfony\Component\HttpFoundation\Response;

class MainController {

  public function index() {
    $vite = Vite::make()
      ->useHotFile('/public/ap.hot')
      ->useBuildDirectory('public/dist')
      ->withEntryPoints(['src/main.ts'])
      ->toHtml();

    ob_start();
    include __DIR__ . '/../template/index.php';
    $html = ob_get_clean();

    return new Response($html);
  }

  public function hello($name = 'World') {
    return new Response("Hello, $name!");
  }

  public function notFound() {
    http_response_code(404);
    echo "404 Not Found";
  }
}
