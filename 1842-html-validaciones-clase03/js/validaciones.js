
//esto se manda a llamar cada que la persona se sale del input que estaba rellenando
export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  //hacer que aparezca que es un elemento invalido si no se escribio nada
if(input.validity.valid){
  //si es valido (true) se va a quitar input-container--invalid
 input.parentElement.classList.remove("input-container--invalid");
 input.parentElement.querySelector(".input-message-error").innerHTML = "";
} else{
//en caso de que no sea valido (false) se añade el input-container--invalid lo que va a hacer que diga que es un elemento invalido
input.parentElement.classList.add("input-container--invalid");
input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
}
}

//arreglo
const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
]

//Mensajes de error para que cada uno salga de acuerdo a lo que se pide
//es un objeto y dentro de este objeto vamos a definir el tipo de los errores de cada uno de los inputs

const mensajesDeError = {
  nombre:{
    valueMissing: "El campo nombre no puede estar vacío",
  },
  email:{
    valueMissing: "El campo correo no puede estar vacío",
    typeMismatch: "El correo no es válido",
  },
  password:{
    valueMissing: "El campo contraseña no puede estar vacío",
    patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
  },
  nacimiento:{
    valueMissing: "El campo de fecha de nacimiento no puede estar vacío",
    customError: "Debes tener al menos 18 años de edad.",
  },
  numero: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El formato requerido es (xxx) xxx xxxx 10 números",
  },
  direccion: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La dirección debe contener entre 10 a 40 caracteres",
  },
  ciudad:{
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres",
  },
  estado:{
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El estado debe contener entre 10 a 40 caracteres",
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje=""
  tipoDeErrores.forEach(error => {
    if(input.validity[error]) {
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });

  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
