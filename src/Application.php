<?php
namespace App;

use Symfony\Component\HttpFoundation\Request;

class Application {
  private RadixRouter $router;
  private Request $request;

  public function __construct() {
    $this->router = new RadixRouter();
  }

  public static function make() {
    $app = new Application;
    $app->load();

    return $app;
  }

  public function load() {
    $this->request = Request::createFromGlobals();

    $cacheFile = __DIR__ . '/../storage/routes.cache.php';
    if(file_exists($cacheFile)) {
      $routes = require $cacheFile;
      $this->router->tree = $routes['tree'];
      $this->router->static = $routes['static'];
      return;
    }

    $this->router->add('GET', '/', 'index');

    // Register a route with an optional parameter and a handler
    $this->router->add('GET', '/hello/:world?', 'hello');


    $routes = ['tree' => $this->router->tree, 'static' => $this->router->static];
    file_put_contents($cacheFile, '<?php return ' . var_export($routes, true) . ';');
  }


  public function handle() {

    // Get the HTTP method and path from the request
    // $method = strtoupper($_SERVER['REQUEST_METHOD']);
    // $path = rawurldecode(strtok($_SERVER['REQUEST_URI'], '?'));

    $method = $this->request->getMethod();
    $path = $this->request->getPathInfo();

    // Look up the route for the current request
    $result = $this->router->lookup($method, $path);

    switch ($result['code']) {
      case 200:
        // Route matched: call the handler with parameters
        $m = new MainController();
        $h = $result['handler'];

        $res = call_user_func([$m, $h], ...$result['params']);
        $res->send();
       
        //$result['handler'](...$result['params']);
        break;

      case 404:
        // No matching route found
        http_response_code(404);
        echo '404 Not Found';
        break;

      case 405:
        // Method not allowed for this route
        header('Allow: ' . implode(', ', $result['allowed_methods']));
        http_response_code(405);
        echo '405 Method Not Allowed';
        break;
    }
  }
}