var kirian_tor_players_ranking_array = [];

function ShowRankingPlayers(array) {
    let content = "";

    for (let i = 0; i < array.length; i++) {

        if (array[i][0] != "") {
            let player = array[i];

            if (i == 0) {
                content +=
                `
                <tr class="firstplace">
                
                    <th>${i+1}</th>

                        <td class="">${player[0]}</td>
                    `;
            }
            else if (i == 1) {
                content +=
                `
                <tr class="secondplace">
                    <th>${i+1}</th>

                        <td class="">${player[0]}</td>
                    `;
            }
            else if (i == 2) {
                content +=
                `
                <tr class="thirdplace">
                    <th>${i+1}</th>

                        <td class="">${player[0]}</td>
                    `;
            }
            else {
                content +=
                `
                <tr>
                    <th>${i+1}</th>

                        <td class="">${player[0]}</td>
                    `;
            }

            content +=
            `
                <td class="text-center">${player[2]}</td>

                <td class="text-center">${player[3]}</td>

                <td class="text-center">${player[4]}</td>
            </tr>
            `;
        }
    }

    document.getElementById("tableHouses").innerHTML = content;
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(KIRIAN_TOR_HOUSES_PLAYERS_RANKING).then(function (resultObj) {
        if (resultObj.status === "ok") {
            kirian_tor_players_ranking_array = resultObj.data.values;

            ShowRankingPlayers(kirian_tor_players_ranking_array);
        }
    });
});