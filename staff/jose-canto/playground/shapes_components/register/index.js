// Creamos una instancia de Component y la asociamos al body del documento
var view = new Component(document.body);

// Creamos un encabezado con nivel 1 y establecemos el texto como "REGISTER"
var headerLogin = new Header(1);
headerLogin.setText("REGISTER");

// Creamos un enlace para redirigir al usuario al inicio de sesión
var loginLink = new Link();
loginLink.setText("Login");
// Configuramos un evento onclick para redirigir al usuario al inicio de sesión
loginLink.onClick(function (event) {
  event.preventDefault(); // Prevenimos el comportamiento predeterminado del enlace
  console.log("...en espera de 1 segundo ⌛");
  setTimeout(function () {
    location.href = "../login"; // Redireccionamos al usuario al inicio de sesión después de 1 segundo
  }, 1000);
});

// Creamos una instancia de la clase RegisterComponent
var registerForm = new RegisterComponent();

// Escuchamos el evento submit del formulario de registro
registerForm.onSubmit(function (event) {
  event.preventDefault(); // Prevenimos el comportamiento predeterminado del formulario

  // Obtenemos los datos del formulario de registro
  var email = registerForm.getEmail();
  var username = registerForm.getUsername();
  var password = registerForm.getPassword();
  var passwordRepeat = registerForm.getPasswordRepeat();

  // Obtenemos los usuarios del Local Storage o creamos un array vacío si no existen
  var usersJson = localStorage.users || "[]";

  // Convertimos la cadena JSON de usuarios a un array de objetos
  var usersArray = JSON.parse(usersJson);

  // Creamos un objeto con los datos del nuevo usuario
  var user = {
    email: email,
    username: username,
    password: password,
    passwordRepeat: passwordRepeat
  };

  // Agregamos el nuevo usuario al array de usuarios
  usersArray.push(user);

  // Convertimos el array de usuarios de nuevo a una cadena JSON
  var updatedUsersJson = JSON.stringify(usersArray);

  // Guardamos la cadena JSON actualizada en el Local Storage
  localStorage.users = updatedUsersJson;

  // Limpiamos el formulario de registro
  registerForm.clear();
});

// Agregamos los elementos al componente principal
view.add(headerLogin);
view.add(registerForm);
view.add(loginLink);
