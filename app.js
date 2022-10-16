function req_json_wanted (page)
{
    console.log(page);

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", 'https://api.fbi.gov/@wanted?pageSize=50&page='+page, false);
    xhttp.send();
    const retorno = JSON.parse(xhttp.responseText);

    return retorno.items;
}

function get_procurados() {

    var page = 1;

    var aux = req_json_wanted(page);
    var procurados = aux;

    //requisita uma nova página até que a requisição não tenha mais dados
    while (Object.keys(aux).length != 0)
    {
        page+=1;

        //mantém somente criminosos no objeto
        for (var i in procurados)
        {
            if(procurados[i].reward_text == null || procurados[i].sex == null)
            {
                procurados.splice(i);
            }
        }

        aux = req_json_wanted(page);
        procurados = procurados.concat(aux);
     }

     console.log(procurados);
     return procurados;

 }

function req_json_wanted_person (id)
{
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", 'https://api.fbi.gov/@wanted-person/'+id, false);
    xhttp.send();
    const procurado = JSON.parse(xhttp.responseText);

    return procurado;
}

function sobre (id)
{
    const procurado = req_json_wanted_person(id);

    var img = document.getElementById("img-card-sobre");
    img.src = procurado.images[0].thumb;

    document.getElementById("h1-nome-procurado").innerHTML = procurado.title;
    document.getElementById("descricao").innerHTML = procurado.description;
    document.getElementById("h1-recompensa").innerHTML = get_reward(procurado);
}

function get_reward(procurado)
{
    const result = 'U$ ' + procurado.reward_text.replace(/([^\d])+/gim, '');

    return result;
}



//main

const procurados = get_procurados();

var row_cards = document.getElementById("row-card");

//zerar row
row_cards.innerHTML = '';

//cria os cards
for (var i in procurados) {

        var card = document.createElement("div");
        card.classList.add("card");
        card.style = 'width: 18rem;';
        card.id = 'card-index';

        //procurado
        var titulo = document.createElement("h4");
        titulo.classList.add("text-danger");
        titulo.classList.add("text-center");
        var texto_titulo = document.createTextNode("procurado");

        titulo.appendChild(texto_titulo);
        card.appendChild(titulo);

        //img
        var link_img = document.createElement("a");
        link_img.href = '#jumbo-sobre';
        link_img.id = procurados[i].uid;
        link_img.onclick = function (e)
        {
            sobre(this.id);
            document.getElementById("jumbo-sobre").style.display = 'block';
        }

        var img = document.createElement("img");
        img.id = 'img-card-index';
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

        row_cards.appendChild(card);

}
