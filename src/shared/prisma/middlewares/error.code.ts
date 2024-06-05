import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
} from "@prisma/client/runtime";
import {IApiResponse} from "../../interface/api/format";
const ErrorCodes = (err: Error): IApiResponse => {
  //Error generico node prisma
  const stingError = err.message.toString();
  const splitError = stingError.replace(/\n/gi,'').split(":");
  const customError = splitError;
  let res: IApiResponse = {
    code: 500,
    message: "Internal server error 500",
    stackError: {message:customError}
  }
  //Customizar error segun la instancia del error de prisma
  /**
   * Prisma Client lanza una PrismaClientKnownRequestError excepción si el motor de consulta 
   * devuelve un error conocido relacionado con la solicitud, 
   * por ejemplo, una violación de restricción única.
   */
  if (err instanceof PrismaClientKnownRequestError) {
    res.code = 400;
    res.message = "Bad Request";
    res.stackError = err?.meta;
    res.stackError.message = customError;
    if(err.code=="P2025"){
      res.code = 404;
      res.message = "not found";
    }
    if(err.code=="P1008" || err.code=="P5009"){
      res.code = 408;
      res.message = "Operations timed out";
    }
    if(err.code=="P2002"){
      res.code = 409;
      res.message = "constraint target already exists";
    }
    if(err.code=="P2028" || err.code=="P5015"){
      res.code = 500;
      res.message = "Transaction API error";
    }
  }
  /**
   * Prisma Client lanza una PrismaClientValidationError
   * excepción si la validación falla, por ejemplo:
   * Campo faltante: por ejemplo, una propiedad vacía data: {} al crear un nuevo registro
   * Se proporcionó un tipo de campo incorrecto
   */
  if (err instanceof PrismaClientValidationError) {
    res.code = 400;
    res.message = "Bad Request";
    res.stackError.message = customError;
  }

  /**
  * Prisma Client lanza una PrismaClientUnknownRequestError 
  * excepción si el motor de consulta devuelve un error relacionado con una solicitud 
  * que no tiene un código de error.
   */
  if (err instanceof PrismaClientUnknownRequestError) {
    res.code = 500;
    res.message = "Internal server error 500";
    res.stackError.message = `conexion prisma codigo de error no controlado ${customError}`;
  }

  /**
   * Prisma Client lanza una PrismaClientInitializationError 
   * excepción si algo sale mal cuando se inicia el motor de consultas y se crea la conexión a la base de datos. Esto sucede ya sea:
   * Cuando prisma.$connect()se llama O Cuando se ejecuta la primera consulta Los errores que pueden ocurrir incluyen:
   * Las credenciales proporcionadas para la base de datos no son válidas
   * No hay ningún servidor de base de datos ejecutándose con el nombre de host y el puerto proporcionados
   * El puerto al que el servidor HTTP del motor de consultas desea vincularse ya está en uso
   * Una variable de entorno faltante o inaccesible
   * No se pudo encontrar el binario del motor de consulta para la plataforma actual ( generatorbloque)
   */
  if (err instanceof PrismaClientInitializationError) {
    res.code = 500;
    res.message = "Internal server error 500";
    res.stackError.message = `Base de datos no conectada detalles: ${customError}`;
  }

  /**
   * Prisma Client lanza una PrismaClientRustPanicErrorexcepción 
   * si el motor subyacente falla y sale con un código de salida distinto de cero. 
   * En este caso, se debe reiniciar Prisma Client o todo el proceso del Nodo.
   */
  if (err instanceof PrismaClientRustPanicError) {
    res.code = 500;
    res.message = "Internal server error 500";
    res.stackError.message = `Base de datos no conectada (reiniciar Prisma Client) detalles: ${customError}`;
  }
  return res;
}
export default ErrorCodes;
