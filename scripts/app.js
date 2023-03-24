function Requisition(method, url) {
    var xhttp = new XMLHttpRequest();
    xhttp.open(method, url, false);
    xhttp.send();
    const retorno = JSON.parse(xhttp.responseText);

    return retorno.items;
}

function GetWanteds() {

    var page = 1;

    var aux = Requisition('GET', 'https://api.fbi.gov/@wanted?pageSize=50&page=' + page);
    var procurados = aux;

    //requisita uma nova página até que a requisição não tenha mais dados
    while (Object.keys(aux).length != 0) {
        page += 1;

        //mantém somente criminosos no objeto
        for (var i in procurados) {
            if (procurados[i].reward_text == null || procurados[i].sex == null) {
                procurados.splice(i);
            }
        }

        aux = Requisition('GET', 'https://api.fbi.gov/@wanted?pageSize=50&page=' + page);
        procurados = procurados.concat(aux);
    }

    return procurados;

}

function GetWantedDetails(id) {
    const procurado = Requisition("GET", 'https://api.fbi.gov/@wanted-person/' + id);

    var img = document.getElementById("img-card-GetWantedDetails");
    img.src = procurado.images[0].thumb;

    document.getElementById("h1-nome-procurado").innerHTML = procurado.title;
    document.getElementById("descricao").innerHTML = procurado.description
    document.getElementById("h1-recompensa").innerHTML = GetReward(procurado);
}

function GetReward(procurado) {
    var result = 'U$ ' + procurado.reward_text.replace(/([^\d])+/gim, '');

    return result;
}

function RenderIndex() {
    const procurados = GetWanteds();

    //zerar row
    var row_cards = document.getElementById("row-card");
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
        link_img.href = '#jumbo-GetWantedDetails';
        link_img.id = procurados[i].uid;
        link_img.onclick = function (e) {
            document.getElementById('jumbo-GetWantedDetails').style = ''
            GetWantedDetails(this.id)
        }

        var img = document.createElement("img");
        img.id = 'img-card-index';
        img.src = procurados[i].images[0].original;
        img.alt = 'IMAGEM INDISPONÍVEL'

        link_img.appendChild(img);
        card.appendChild(link_img);

        //card body

        var card_body = document.createElement("div");

        var nome = document.createElement("h5");
        nome.classList.add("text-center");
        nome.id = 'nome'
        var texto_nome = document.createTextNode(procurados[i].title);

        nome.appendChild(texto_nome);
        card_body.appendChild(nome);
        card.appendChild(card_body);

        row_cards.appendChild(card);
    }
}
