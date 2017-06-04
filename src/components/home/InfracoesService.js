const radares = [
    "Av. Isaac Póvoas X Rua Comandante Costa",
    "Av.Miguel Sutil, Prox.a Verde Transportes",
    "Av. Tenente Cel. Duarte x Trav. João Dias",
    "Av. Tancredo Neves X Av. General Mello",
    "Av. Isaac Póvoas X Rua Barão de Melgaço",
    "Av. Pres. Getulio Vargas X Av. Marechal Deodoro",
    "Av.Republica do Libano, Prox.N.1055",
    "Av. Tenente Cel. Duarte x Av. XV de Novembro",
    "Av. Miguel Sutil - próx. Auto Peça Amigão (Trinc.)",
    "Av. Rubens de Mendonça x Rua Conselheiro Dr. Enio Vieira",
    "Av.Beira Rio, 875 Def.ao Motel Mont Blanc",
    "Av. Tenente Cel. Duarte x Av. Cel. Escolástico",
    "Av.Miguel Sutil, Prox.a Peixaria Okada",
    "Rua Barão de Melgaço X Av. Isaac Póvoas",
    "Av.Republica do Libano, Prox.N.860",
    "Av. Marechal Deodoro X Av. Pres Getulio Vargas",
    "Av. Profª Edna Maria de Albuquerque Affi - próx. PTE D. Bonifacio Peccinini",
    "Av. Beira Rio - Em frente Cidade Verde Paisag",
    "Rua Conselheiro Dr. Enio Vieira x Av. Rubens de Mendonça",
    "Av. General Melo X Tancredo Neves",
    "Av Profª Edna Maria de Albuquerque Affi - prox. Ponte Pastor Sebastião",
    "Av.Fernando Correa - Defronte Boliche",
    "Av. Miguel Sutil - próx. Calhas Socalhas (Trinc.)",
    "Av. Mato Grosso, 522",
    "Av.Rubens de Mendonça -Defronte CREA-MT",
    "Av. Cel. Escolástico x Av. Tenente Cel. Duarte",
    "Av. Fernando Correa, alt. 567 prox. Decorliz/Colégio Master",
    "Av. Mato Grosso, 613",
    "Av. Beira Rio - Em frente Acrimat",
    "Av. Fernando Correa - Defronte Bradiesel",
    "Av. Miguel Sutil, próx. A R João Goulart",
    "Av. Drº Vicente Emílio Vuolo - Próx. Rua 21",
    "Av. Fernando Correa, Prox. Motel Absinto",
    "AV. General Mello, 727",
    "Rua Comandante Costa X Av. Isaac Póvoas",
    "Av. Historiador Rubens de Mendonça, prox. Hosp. Cancer",
    "Av.Miguel Sutil, Prox.ao Ponto do Gelo",
    "Av. Historiador Rubens de Mendonça, Prox. Ibama"
];

function mesAnoToDate(mesAno, max) {
    var parts = mesAno.split('-');
    return new Date(parts[1], parts[0], (max ? 31 : 1));
}

function getInfracoesPorPeriodo(radar, inicio, fim) {

}

function getInfracoesPorTipoVeiculo(radar, inicio, fim) {
    const index = radares.indexOf(radar)
    if (index === -1) {
        return [];
    }

    let min = mesAnoToDate(inicio);
    let max = mesAnoToDate(fim, true);
    
    return fetch(`${process.env.PUBLIC_URL}/infracoes/${index}out.json`)
    .then(item => item.json())
    .then(response => {
        let tipos = {};
        response
            .forEach(function (item) {
                const current = mesAnoToDate(item[5]);
                const isValid = current.getTime() >= min.getTime() && current.getTime() <= max.getTime();
                if (!isValid) { return; }
                if (!tipos.hasOwnProperty(item[2])) {
                    tipos[item[2]] = 0;
                }
                tipos[item[2]]++;
                console.log(tipos);
            })
    
        return tipos;
    })

}

export { radares, getInfracoesPorPeriodo, getInfracoesPorTipoVeiculo }