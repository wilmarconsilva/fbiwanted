function req_json_wanted (page)
{
    console.log(page);

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", 'https://api.fbi.gov/@wanted?pageSize=50&page='+page, false);
    xhttp.send();
    var retorno = JSON.parse(xhttp.responseText);
    console.log(retorno);
    var procurados = retorno.items;

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

    //requisita uma nova página caso não alcance 12 criminosos no filtro
    while( (Object.keys(procurados).length) < 12 )
    {
        page+=1;

        var aux = req_json_wanted(page);
        procurados = procurados.concat(aux);
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

function get_procurado (id)
{
    const procurado = req_json_wanted_person(id);
    console.log(procurado);

    var img = document.getElementById("img-card-sobre");
    img.src = procurado.images[0].original;

    document.getElementById("h1-nome-procurado").innerHTML = procurado.title;
    document.getElementById("descricao").innerHTML = procurado.description;
    document.getElementById("h1-recompensa").innerHTML = procurado.reward_text;
}

//main

const procurados = get_procurados();

console.log(procurados);

var col_card = document.getElementById('col1');

//zerar coluna
col_card.innerHTML = '';

//cria os cards
for (var i in procurados) {

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
        link_img.href = './sobre.html';
        link_img.id = procurados.uid;
        link_img.onclick = function (e)
        {
            get_procurado(this.id);
        }

        var img = document.createElement("img");
        img.src = procurados[i].images[0].original;

        link_img.appendChild(img);
        card.appendChild(link_img);

        //card body

        var card_body = document.createElement("div");

        var nome = document.createElement("h5");
        nome.classList.add("text-center");
        var texto_nome = document.createTextNode(procurados[i].title);

        nome.appendChild(texto_nome);
        card_body.appendChild(nome);
        card.appendChild(card_body);

        col_card.appendChild(card);

}

teste = '3f5d03cb681c454f8cc324c3303a579d';
get_procurado(teste);

