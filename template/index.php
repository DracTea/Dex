<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <?= $vite ?>
</head>

<body>
  <div id="app">
    <div v-controller="hello">
      <input data-hello-target="name" type="text">
      <button v-action="click->hello#greet">Greet</button>
      <span data-hello-target="output"></span>
    </div>


    <div class="other">
      <button id="remove">remove hello</button>
      <button id="add">add world</button>
    </div>
  </div>
</body>

</html>