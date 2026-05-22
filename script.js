const contenedor=document.getElementById(
"contenedorNoticias"
);

const boton=document.getElementById(
"btnActualizar"
);

const API_KEY = "TU_API_KEY";

async function cargarNoticias(){

contenedor.innerHTML=
"<p>Cargando noticias...</p>";

try{

const respuesta = await fetch(
`https://gnews.io/api/v4/search?q=tecnologia&lang=es&country=mx&max=10&apikey=${API_KEY}`
);

if(!respuesta.ok){

throw new Error(
"Error al conectar API"
);

}

const datos=await respuesta.json();

if(
!datos.articles ||
datos.articles.length===0
){

contenedor.innerHTML=
"<p>No hay noticias disponibles</p>";

return;

}

mostrarNoticias(
datos.articles
);

}

catch(error){

contenedor.innerHTML=`

<p class="error">

No fue posible cargar noticias

</p>

`;

console.log(error);

}

}

function mostrarNoticias(
noticias
){

contenedor.innerHTML="";

noticias.forEach(
noticia=>{

const tarjeta=
document.createElement(
"div"
);

tarjeta.classList.add(
"noticia"
);

tarjeta.innerHTML=`

<img src="${noticia.image}">

<h2>

${noticia.title}

</h2>

<p>

${noticia.description || "Sin descripción"}

</p>

<a href="${noticia.url}"

target="_blank">

Leer noticia completa

</a>

`;

contenedor.appendChild(
tarjeta
);

}

);

}

boton.addEventListener(
"click",
cargarNoticias
);

cargarNoticias();
