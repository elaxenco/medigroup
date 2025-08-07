Proyecto : Ejercicio técnico para dessarrolador FullStack
Programador: Axel Enrique Cortez Ruiz
Stack principal: NextJs 15.4.5 + PostgreSQL 
Librerias de apoyo : 
    Sweet alerts - para mostrar alertas mas esteticas sin la necesidad de agregar diseño.
    AG Grid - se utilza aggrid para realizar tablas mas faciles de manipular y con varias funciones que pueden ahorrar desarrollo 
    Bootstrap - se utiliza bootstrap para el diseño general

Requerimientos : NodeJS 18.18 o Superior 

El proyecto se realizo con Typescript y Slint para manejar mejor los valores de las variables y la consistencia del proyecto.

Instrucciones para ejecutar el proyecto :

    1.- npm install (para instalar dependencias necesarias indicadas en el package.json)
    2.- npm run build ( este comando ejecuta next build para compilar el proyecto)
    3.- npm run dev (inicializa el proyecto)
    
Para la db utilice PostgreSQL con supabase.com para generar una db de pruebas.
la conexion se encuentra en src/app/lib/db.ts puede sustituirse o integrarse en un .env en caso de no ser pruebas
