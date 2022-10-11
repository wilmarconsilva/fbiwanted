function req_json_wanted (page)
{
    console.log(page);

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", 'https://api.fbi.gov/@wanted?pageSize=50&page='+page, false);
    xhttp.send();
    var retorno = JSON.parse(xhttp.responseText);
    const procurados = retorno.items;

    //mantém somente criminosos no objeto
    for (var i in procurados)
    {
        if(procurados[i].reward_text == null || procurados[i].sex == null)
        {
            procurados.splice(i);
        }
    }

    return procurados;
}

function get_procurados() {

    var page = 1;

    var procurados = req_json_wanted(page);

    //requisita uma nova página caso não alcance 12 criminosos na requisição
    while( (Object.keys(procurados).length) < 12 )
    {
        page+=1;

        var aux = procurados;
        var aux2 = req_json_wanted(page);
        procurados = aux.concat(aux2);
    }

    return procurados;

}

function req_json_wanted_person (uid)
{
    console.log(uid);

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", 'https://api.fbi.gov/@wanted-person/'+uid, false);
    xhttp.send();
    var retorno = JSON.parse(xhttp.responseText);
    const procurado = retorno.items;

    console.log(procurado);
}

function sobre (uid)
{
    const procurado = req_json_wanted_person(uid);

    var img = document.getElementById("img-card-sobre");
    img.src = procurado.images[0].thumb;

    document.getElementById("h1-nome-procurado").innerHTML = procurado.title;
    document.getElementById("descricao").innerHTML = procurado.description;
    document.getElementById("h1-recompensa").innerHTML = procurado.reward_text;
}

//main
const procurados = get_procurados();

console.log(procurados);

const quantidade = (Object.keys(procurados).length) / 4;
const limite1 = quantidade;
const limite2 = quantidade * 2;
const limite3 = quantidade * 3;
const limite4 = quantidade * 4;

var col1 = document.getElementById('col1');
var col2 = document.getElementById('col2');
var col3 = document.getElementById('col3');
var col4 = document.getElementById('col4');

col1.innerHTML = '';
col2.innerHTML = '';
col3.innerHTML = '';
col4.innerHTML = '';

//cria os cards
for (var i = 0; i < limite1; i++) {

        var card = document.createElement("div");
        card.classList.add("card");
        card.style = 'width: 18rem;';

        //procurado
        var titulo = document.createElement("h4");
        titulo.classList.add("text-danger");
        titulo.classList.add("text-center");
        var texto_titulo = document.createTextNode("Procurado");

        titulo.appendChild(texto_titulo);
        card.appendChild(titulo);

        //img
        var link_img = document.createElement("a");
        link_img.href = "./sobre.html";
        link_img.id = procurados.uid;
        link_img.onclick = function (e)
        {
            sobre(this.id);
        }

        var img = document.createElement("img");
        img.src = procurados[i].images[0].thumb;

        link_img.appendChild(img);
        card.appendChild(link_img);

        //card body
        var link_nome = document.createElement("a");
        link_nome.href = "#topo";

        var card_body = document.createElement("div");

        var nome = document.createElement("h5");
        nome.classList.add("text-center");
        var texto_nome = document.createTextNode(procurados[i].title);

        //link_nome.appendChild(nome);
        nome.appendChild(texto_nome);
        card_body.appendChild(nome);
        card.appendChild(card_body);

        col1.appendChild(card);

}

for (var i = limite1; i < limite2; i++) {

        var card = document.createElement("div");
        card.classList.add("card");
        card.style = 'width: 18rem;';

        //procurado
        var titulo = document.createElement("h4");
        titulo.classList.add("text-danger");
        titulo.classList.add("text-center");
        var texto_titulo = document.createTextNode("Procurado");

        titulo.appendChild(texto_titulo);
        card.appendChild(titulo);

        //img
        var link_img = document.createElement("a");
        link_img.href = "#topo";

        var img = document.createElement("img");
        img.src = procurados[i].images[0].thumb;

        link_img.appendChild(img);
        card.appendChild(link_img);

        //card body
        var link_nome = document.createElement("a");
        link_nome.href = "#topo";

        var card_body = document.createElement("div");

        var nome = document.createElement("h5");
        nome.classList.add("text-center");
        var texto_nome = document.createTextNode(procurados[i].title);

        //link_nome.appendChild(nome);
        nome.appendChild(texto_nome);
        card_body.appendChild(nome);
        card.appendChild(card_body);

        col2.appendChild(card);
}

for (var i = limite2; i < limite3; i++) {

        var card = document.createElement("div");
        card.classList.add("card");
        card.style = 'width: 18rem;';

        //procurado
        var titulo = document.createElement("h4");
        titulo.classList.add("text-danger");
        titulo.classList.add("text-center");
        var texto_titulo = document.createTextNode("Procurado");

        titulo.appendChild(texto_titulo);
        card.appendChild(titulo);

        //img
        var link_img = document.createElement("a");
        link_img.href = "sobre.html";

        var img = document.createElement("img");
        img.src = procurados[i].images[0].thumb;

        link_img.appendChild(img);
        card.appendChild(link_img);

        //card body
        var link_nome = document.createElement("a");
        link_nome.href = "#topo";

        var card_body = document.createElement("div");

        var nome = document.createElement("h5");
        nome.classList.add("text-center");
        var texto_nome = document.createTextNode(procurados[i].title);

        //link_nome.appendChild(nome);
        nome.appendChild(texto_nome);
        card_body.appendChild(nome);
        card.appendChild(card_body);

        col3.appendChild(card);
}

for (var i = limite3; i < limite4; i++) {

        var card = document.createElement("div");
        card.classList.add("card");
        card.style = 'width: 18rem;';

        //procurado
        var titulo = document.createElement("h4");
        titulo.classList.add("text-danger");
        titulo.classList.add("text-center");
        var texto_titulo = document.createTextNode("Procurado");

        titulo.appendChild(texto_titulo);
        card.appendChild(titulo);

        //img
        var link_img = document.createElement("a");
        link_img.href = "#topo";

        var img = document.createElement("img");
        img.src = procurados[i].images[0].thumb;

        link_img.appendChild(img);
        card.appendChild(link_img);

        //card body
        //var link_nome = document.createElement("a");
        //link_nome.href = "#topo";

        var card_body = document.createElement("div");

        var nome = document.createElement("h5");
        nome.classList.add("text-center");
        var texto_nome = document.createTextNode(procurados[i].title);

        //link_nome.appendChild(nome);
        nome.appendChild(texto_nome);
        card_body.appendChild(nome);
        card.appendChild(card_body);

        col4.appendChild(card);
}

