//Fonction de formatage de la date
function formattedDate(d, type) {
    let date = new Date(d);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds()
    let dt = date.getDate();

    if (minutes === 0) {
        minutes = "00";
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    if (type == "small") {
        return (dt + '/' + month + '/' + year);
    } else {
        return (dt + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds);
    }
}

//Déclaration des variables fromDate et toDate
let fDate = new Date();
fDate = fDate.toISOString().slice(0, 19);

let tDate = new Date();
tDate.setHours(tDate.getHours() + 2);
tDate = tDate.toISOString().slice(0, 19);


//Fonction pour générer la section Dates
function creationDates() {
    let dates = document.createElement("section");
    dates.id = "dates";
    let fromLabel = document.createElement("label");
    fromLabel.textContent = "Date de début ";
    let fromDate = document.createElement("input");
    fromDate.type = "datetime-local";
    fromDate.value = fDate;

    let toLabel = document.createElement("label");
    toLabel.textContent = " Date de fin "
    let toDate = document.createElement("input");
    toDate.type = "datetime-local";
    toDate.value = tDate;

    let refreshButton = document.createElement("button");
    refreshButton.textContent = "Rafraîchir les dates";
    refreshButton.addEventListener("click", function () {
        fDate = fromDate.value;
        tDate = toDate.value;
    })

    //Affichage des éléments de la section dates
    document.getElementById("divDates").appendChild(dates)
    dates.appendChild(fromLabel);
    dates.appendChild(fromDate);
    dates.appendChild(toLabel);
    dates.appendChild(toDate);
    dates.appendChild(refreshButton);
}


// Récupération des éléments de la liste des choix
let listElementsMenu = document.getElementById("menu").getElementsByTagName("li");


//********************* DERNIERE MESURE ****************************************************//
//Ouverture de la fonction sur l'event click sur le choix "Dernière mesure"
listElementsMenu[0].addEventListener("click", function () {
    document.getElementById("divDates").innerHTML = '';
    if (document.getElementById("affichageResultats").firstElementChild !== null) {
        document.getElementById("affichageResultats").firstElementChild.remove()
    }
    if (document.getElementById("affichageResultats").firstElementChild !== null) {
        document.getElementById("affichageResultats").firstElementChild.remove()
    }

    let measureType = document.getElementById("listeDeroulante").value


// Emplacement de l'API météo sur le net
    const baseApiUrl = 'https://spring-meteo-station-api.herokuapp.com/api/measures';

// Récupération de la dernière valeur d'un type de mesure
    fetch(baseApiUrl + '/last?measure-type=' + measureType).then(function (response) {
        response.json().then(function (result) {
            let h3Affichage = document.createElement("h3")
            h3Affichage.textContent = ("Dernier relevé du " + formattedDate(result["measureDate"], "small"))
            let pAffichage = document.createElement("p")
            pAffichage.textContent = (result["type"] + " : " + result["value"] + " " + result ["unit"])
            document.getElementById("affichageResultats").appendChild(h3Affichage)
            document.getElementById("affichageResultats").appendChild(pAffichage)

            // A vous de jouer ! Il faut utiliser l'objet result qui contient la dernière valeur
        });
    }).catch(function (error) {
        console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
    });
})
//**********************************************************************************************************//


//******************* TOP MESURE **************************************************************************//
//Ouverture de la fonction sur l'event click sur le choix "Top mesure"
listElementsMenu[1].addEventListener("click", function () {
    document.getElementById("divDates").innerHTML = '';
    if (document.getElementById("affichageResultats").firstElementChild !== null) {
        document.getElementById("affichageResultats").firstElementChild.remove()
    }
    if (document.getElementById("affichageResultats").firstElementChild !== null) {
        document.getElementById("affichageResultats").firstElementChild.remove()
    }

    let measureType = document.getElementById("listeDeroulante").value

// Emplacement de l'API météo sur le net
    const baseApiUrl = 'https://spring-meteo-station-api.herokuapp.com/api/measures';

// Récupération de la dernière valeur d'un type de mesure
    fetch(baseApiUrl + '/top?measure-type=' + measureType).then(function (response) {
        response.json().then(function (result) {
            let h3Affichage = document.createElement("h3")
            h3Affichage.textContent = ("Mesure max du " + formattedDate(result["measureDate"], "small"));
            let pAffichage = document.createElement("p")
            pAffichage.textContent = (result["type"] + " : " + result["value"] + " " + result ["unit"])
            document.getElementById("affichageResultats").appendChild(h3Affichage)
            document.getElementById("affichageResultats").appendChild(pAffichage)

            // A vous de jouer ! Il faut utiliser l'objet result qui contient la dernière valeur
        });
    }).catch(function (error) {
        console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
    });
})
//*******************************************************************************************************************//


//***************************** TABLEAU DES MESURES *****************************************************************//
//Ouverture de la fonction sur l'event click sur le choix "Tableau des mesures"
listElementsMenu[2].addEventListener("click", function () {
    document.getElementById("divDates").innerHTML = '';
    if (document.getElementById("affichageResultats").firstElementChild !== null) {
        document.getElementById("affichageResultats").firstElementChild.remove()
    }
    if (document.getElementById("affichageResultats").firstElementChild !== null) {
        document.getElementById("affichageResultats").firstElementChild.remove()
    }

    let measureType = document.getElementById("listeDeroulante").value

   creationDates();

// Emplacement de l'API météo sur le net
    const baseApiUrl = 'https://spring-meteo-station-api.herokuapp.com/api/measures';

// Récupération de la dernière valeur d'un type de mesure
    fetch(baseApiUrl + '?measure-type=' + measureType + '&start-date=' + fDate + '&end-date=' + tDate).then(function (response) {
        response.json().then(function (result) {
            let tableauResultats = document.createElement("table");
            let ligneTitres = document.createElement("tr");
            let cellTitres1 = document.createElement("td")
            cellTitres1.textContent = "Date"
            ligneTitres.appendChild(cellTitres1);
            let cellTitres2 = document.createElement("td")
            cellTitres2.textContent = "Valeur de mesure"
            ligneTitres.appendChild(cellTitres2);
            tableauResultats.appendChild(ligneTitres);
            document.getElementById("affichageResultats").appendChild(tableauResultats)

            for (i = 0; i < result.length; i++) {
                let ligneTab = document.createElement("tr");
                let cellTab1 = document.createElement("td")
                cellTab1.textContent = formattedDate(result[i]["measureDate"], "large");
                ligneTab.appendChild(cellTab1);
                let cellTab2 = document.createElement("td")
                cellTab2.textContent = result[i]["value"]
                ligneTab.appendChild(cellTab2);
                tableauResultats.appendChild(ligneTab);
                console.log(formattedDate(result[i]["measureDate"], "large"))
            }
        });
    }).catch(function (error) {
        console.log('Il y a eu un problème avec la récupération de la dernière mesure ' + error.message);
    });
})
//************************************************************************************************************//


//************************************** GRAPHIQUE ***********************************************************//
listElementsMenu[3].addEventListener("click", function () {
    document.getElementById("affichageResultats").innerHTML = '';
    document.getElementById("divDates").innerHTML = '';

    let measureType = document.getElementById("listeDeroulante").value

    creationDates();

// Emplacement de l'API météo sur le net
    const baseApiUrl = 'https://spring-meteo-station-api.herokuapp.com/api/measures';

// Récupération de la dernière valeur d'un type de mesure
    fetch(baseApiUrl + '?measure-type=' + measureType + '&start-date=' + fDate + '&end-date=' + tDate).then(function (response) {
        response.json().then(function (result) {

            let graphique = document.createElement("canvas")
            graphique.id = "graphique"
            graphique.width = 500;
            document.getElementById("affichageResultats").appendChild(graphique);
//Code d'affichage du graphique
            let ctx = document.getElementById('graphique').getContext('2d');
            let labels = [];
            let dataSet = [];
            console.log(result);
            for (let i = 1; i < result.length; i++) {
                labels.push(formattedDate(result[i]["measureDate"], "long"));
                dataSet.push(result[i]["value"]);
            }

            console.log(labels);
            console.log(dataSet);
            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Courbe des ' + measureType,
                        data: dataSet,
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 1,
                    }]
                },
                options: {
                    responsive: true,
                }
            })
        })
    })
})
