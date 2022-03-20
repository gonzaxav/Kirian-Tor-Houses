var kirian_tor_battles_array = [];

function ShowRankingPlayers(array) {
    let content = "";

    for (let i = 1; i < array.length; i++) {

        if (array[i][0] != "") {
            let house = array[i];

            if (i == 1) {
                content +=
                `
                <tr class="firstplace">
                `;
                if (house[4] != null){
                    content +=
                    `
                    <th>${i}</th>

                        <td class=""><img src="${house[4]}" class="logo1" alt="${house[0]}"> ${house[0]}</td>
                    `;
                }
                else{
                    content +=
                    `
                    <th>${i}</th>

                        <td class="">${house[0]}</td>
                    `;
                }
            }
            else if (i == 2) {
                content +=
                `
                <tr class="secondplace">
                `;
                if (house[4] != null){
                    content +=
                    `
                    <th>${i}</th>

                        <td class=""><img src="${house[4]}" class="logo2" alt="${house[0]}"> ${house[0]}</td>
                    `;
                }
                else{
                    content +=
                    `
                    <th>${i}</th>

                        <td class="">${house[0]}</td>
                    `;
                }
            }
            else if (i == 3) {
                content +=
                `
                <tr class="thirdplace">
                `;
                if (house[4] != null){
                    content +=
                    `
                    <th>${i}</th>

                        <td class=""><img src="${house[4]}" class="logo3" alt="${house[0]}"> ${house[0]}</td>
                    `;
                }
                else{
                    content +=
                    `
                    <th>${i}</th>

                        <td class="">${house[0]}</td>
                    `;
                }
            }
            else {
                content +=
                `
                <tr>
                `;
                if (house[4] != null){
                    content +=
                    `
                    <th>${i}</th>

                        <td class=""><img src="${house[4]}" class="logo4" alt="${house[0]}"> ${house[0]}</td>
                    `;
                }
                else{
                    content +=
                    `
                    <th>${i}</th>

                        <td class="">${house[0]}</td>
                    `;
                }
            }

            content +=
            `
                <td class="text-center">${house[1]}</td>

                <td class="text-center">${house[2]}</td>

                <td class="text-center">${house[3]}</td>
            </tr>
            `;
        }
    }

    document.getElementById("tableHouses").innerHTML = content;
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(KIRIAN_TOR_HOUSES_RANKING).then(function (resultObj) {
        if (resultObj.status === "ok") {
            kirian_tor_battles_array = resultObj.data.values;

            ShowRankingPlayers(kirian_tor_battles_array);
        }
    });
});