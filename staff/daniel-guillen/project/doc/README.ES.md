# DEMO - MICHELANGELO
![Logo Universal](img/logo.png)

![Aplicacion](https://media4.giphy.com/media/Zu9Dt0nOVYWTiQcvV6/giphy.webp?cid=ecf05e475j58b42vamctteexwavgy2o6np19ih5fmv5oeggd&ep=v1_gifs_search&rid=giphy.webp&ct=g)

Las aplicaciones personalizadas son herramientas diseñadas específicamente para satisfacer las necesidades particulares de una empresa. Estas aplicaciones pueden ofrecer una amplia gama de beneficios que pueden mejorar la eficiencia, la productividad y la competitividad. Algunas de las principales razones por las que son útiles: Adaptación a NECESIDADES Específicas, INTEGRACION con Sistemas Existentes, Mejora de la EFICIENCIA Operativa, SEGURIDAD y Recopilación y Análisis de Datos.

### Login, Registro y lista de Usuarios

![Login - Registro de usuarios y listado de usuarios](img/users.png)

### Casos de Usuario

### Administador

- Crear usuario (nombre, contraseña y asignar sección)
- Eliminar usuario
- Acceso y uso de todas las secciones

### Usuario

- Acceso y uso de la seccion asignada

### HOME

![HOME](img/home.png)

Solo podra acceder el ADMIN despues de completar login con sus credenciales unicas, tendra en un primer vistazo acceso a las principales categorias(Incentario, Salidas, Vehiculos y Usuarios).


### Almacen e Inventario

El inventario sera un registro detallado de los residuos que la empresa almacena, y es fundamental para la gestión eficiente de los recursos. 

Aquí tienes algunas razones clave por las cuales es necesario mantener un inventario: control real de existencias, optimizar recursos, evitar accidentes y ayudar en la planificacion y toma de decisiones.

![Inventario](https://media2.giphy.com/media/VnKkglxCbWsg6CLHtR/giphy.webp?cid=790b76116t7fael4s77gqms15dct1h0c9t39ei9f3yafdk04&ep=v1_gifs_search&rid=giphy.webp&ct=g)

## Almacen

Solo podra acceder el usuario que tenga asignada esta seccion (almacen:inventario, estancados, datos y buscar)

## Inventario

![Inventario](img/inventario.png)

El usuario podra hacer registro de los residuos:

    - LER: Desplegable y filtro de listado Europeo de Residuos.
    - Acondicionamiento o almacenado en: GRG, Palet, Big Bag, Bidones de 200 o de inferior tamaño.
    - Peso: indicado en kilogramos.
    - Estado del residuo: correcto o estancado (marcar cuando el residuo se encuentra almacenado (minimo un mes) durante un periodo prolongado).

En el inventario el usuario podra ver los residuos registrados donde se mostraran agrupados por LER y diferenciados por su acondicionamiento e indicando su peso en kg.

## Resumen y Estancados

![Resumen](img/status.png)

Usuario pueden consultar un resumen de los resudios almacenados (Cantidad total en kg por LER) y recordatorio de los que se encuentran estancados.

## Buscar

![Buscar](img/search.png)

El usuario puede buscar todos los residuos registrados con un LER especifico:
    - Introducir un LER en el buscador
    - Eliminar un registro insertado


### Salidas y Cargas de Trailer

Preparar una lista de la carga de un camión es fundamental por varias razones, tanto logísticas como de seguridad y eficiencia operativa. algunas de las razones más importantes: optimizar espacio, seguridad o evitar accidentes, seguimiento o trazabilidad y ayudar en la planificacion y toma de decisiones.

![Carga](https://media3.giphy.com/media/QTFhZj677ZnuSvVwt7/200.webp?cid=ecf05e47lg08yr00zqqvzb39tew2hr02vai2anwyi3oyq1rp&ep=v1_gifs_search&rid=200.webp&ct=g)

## Salidas

Solo podra acceder el usuario que tenga asignada esta seccion (salidas:Acteco, trailer2, trailer3 y buscar)

![Salidas](img/truckload.png)

## Trailer 1, Trailer 2 y Trailer 3

El usuario podra hacer un registro de los residuos que se cargaran en el trailer, podra indicar:

    - LER: Desplegable y filtro de listado Europeo de Residuos.
    - Acondicionamiento del residuo: GRG, Palet, Big Bag, Bidones de 200 o de inferior tamaño.
    - Peso: indicado en kilogramos.

Ademas, se guardaran datos automaticamente como: semana del año y año, para una facil futura busqueda.

## Buscar

El usuario puede buscar todos los residuos registrados para cargar en los trailers con un LER especifico:
    - Introducir un LER en el buscador
    - Introducir semana del año
    - Introducir año
    - Introducir 1a carga, 2a Carga o 3a Carga

### Vehiculo y Mantenimiento

Hacer un seguimiento del estado de los vehículos es crucial por varias razones que abarcan la seguridad, el rendimiento operativo, la economía y el cumplimiento normativo. Algunas de las razones que justifican hacerlo: seguridad de todos, optiminar uso y evitar inactividad, económica, cumplir las leyes, por el medio ambiente y ayudar en la planificacion y toma de decisiones.

![Mantenimiento](https://media0.giphy.com/media/O6gydbyHcE9YQ/200.webp?cid=790b7611djdgjbyq56q6swvjde2j6u2l5kbr3bpwagzy3758&ep=v1_gifs_search&rid=200.webp&ct=g)

## Vehiculos

Solo podra acceder el usuario que tenga asignada de esta seccion, un vehiculo especifico (furgo1, furgo2, camion1, camion2, camion3,camion4 y buscar)

## Furgo1 (ejemplo)

El usuario podra hacer un seguimiento o revision del estado del vehiculo asignado, mediante un checklist o un formulario.

Partes que hay que vigilar o revisar:
    - Documentacion
    - Luces
    - Motor
    - Freno
    - Neumaticos
    - Transmision
    - Zona del conductor
    - Zona de la carga
    - Carroceria
    - Accesorios basicos
    - Accesorios ADR

![Vehiculos - Furgo 1, Furgo 2, Camion 1...](img/Vehicles.png)