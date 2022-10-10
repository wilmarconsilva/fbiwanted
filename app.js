function req_json (page)
{
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", 'https://api.fbi.gov/@wanted?pageSize=50&page='+page, false);
    xhttp.send();
    var retorno = JSON.parse(xhttp.responseText);

    return retorno.items;
}

function get_procurados() {

    var page = 1;

    var procurados = req_json(page);
    
    for (var i in procurados)
    {
        if(procurados[i].reward_text == null || procurados[i].sex == null)
        {
            procurados.splice(i);
        }
    }

    if( (Object.keys(procurados).length) < 16 )
    {
        page+=1;
        procurados.concat(req_json(page));
    }

    return procurados;

}

const procurados = get_procurados();

console.log(procurados);

quantidade = (Object.keys(procurados).length) / 4;
var limite1 = quantidade;
var limite2 = quantidade * 2;
var limite3 = quantidade * 3;
var limite4 = quantidade * 4;

var col1 = document.getElementById('col1');
var col2 = document.getElementById('col2');
var col3 = document.getElementById('col3');
var col4 = document.getElementById('col4');

col1.innerHTML = '';
col2.innerHTML = '';
col3.innerHTML = '';
col4.innerHTML = '';

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


