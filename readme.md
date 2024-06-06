# onesta-node-api  
api de ejemplo para test de onesta.     


## INSTALACION: 
``` 
//on local
git clone https://github.com/trabol/onesta-api-backend.git
cd onesta-api-backend
npm install

npx prisma migrate dev --name test-model
npx prisma generate

npm run build
 
npm start
```

## Documentación postman: 

importa en postman desde .src/onesta-api-backend/postman/onesta-api.postman_collection.json

## ejecucion postman: 

Mtodo disponibles   
- Crear registro

curl --location 'http://localhost:8080/v1/report' \
--header 'Content-Type: application/json' \
--data-raw '{
    "mail_agricultor": "mail_agricultor1@hola.cl",
    "nombre_agricultor": "hola",
    "apellido_agricultor": "hola",
    "mail_cliente": "mail_cliente1@hola.cl",
    "nombre_cliente": "hola",
    "apellido_cliente": "hola",
    "nombre_campo": "hola1",
    "ubicacion_campo": "hola1",
    "fruta_cosechada": "hola1",
    "variedad_cosechada": "hola"
}' 

- Subir csv de ejemplo 

curl --location 'http://localhost:8080/v1/    report/upload-csv' \--form 'files=@"/home/icar/Escritorio/    cosechas.csv"'




