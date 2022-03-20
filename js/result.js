kirian_tor_battles_array = [];
kirian_tor_players_array = [];

players_array_filtered = [];

function changeScore(type, amount) {
    var First = document.getElementById("FirstInputId");
    var Second = document.getElementById("SecondInputId");
    var Third = document.getElementById("ThirdInputId");
    var Fourth = document.getElementById("FourthInputId");
    var numberFirst = parseInt(First.innerText);
    var numberSecond = parseInt(Second.innerText);
    var numberThird = parseInt(Third.innerText);
    var numberFourth = parseInt(Fourth.innerText);

    if (type == "first") {
        First.innerText = checkNumber(numberFirst + amount, -2, 4);
    } else if (type == "second") {
        Second.innerText = checkNumber(numberSecond + amount, -2, 4);
    } else if (type == "third") {
        Third.innerText = checkNumber(numberThird + amount, -2, 4);
    } else if (type == "fourth") {
        Fourth.innerText = checkNumber(numberFourth + amount, -2, 4);
    }
}

function checkNumber(number, min, max) {
    if (number > max) {
        return max;
    } else if (number < min) {
        return min;
    } else {
        return number;
    }
}

function AddOptionsToSelect(select, array) {
    for (var i = 1; i < kirian_tor_battles_array.length; i++) {
        if (kirian_tor_battles_array[i][0] != "") {

            var opt = document.createElement('option');
            opt.value = kirian_tor_battles_array[i][0];
            opt.innerHTML = kirian_tor_battles_array[i][0];
            select.appendChild(opt);
        }
    }

    var opt = document.createElement('option');
    opt.value = "Other (random)";
    opt.innerHTML = "Other (random)";
    select.appendChild(opt);
}

function GetPlayers(){
    for (var i = 0; i < kirian_tor_players_array.length; i++){
        for (var e = 0; e < kirian_tor_players_array[i].length; e++){
            if (kirian_tor_players_array[i][e] != ""){
                players_array_filtered.push(kirian_tor_players_array[i][e]);
            }
        }
    }
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + " autocomplete-list");
        a.setAttribute("class", "autocomplete-items dropdown-menu dropdown-menu-dark show");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].toLowerCase().indexOf(val.toLowerCase()) != -1) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("a");
            b.setAttribute("class", "dropdown-item");
            /*make the matching letters bold:*/
            b.innerHTML += arr[i].substr(0, arr[i].toLowerCase().indexOf(val.toLowerCase()));
            b.innerHTML += "<strong>" + arr[i].substr(arr[i].toLowerCase().indexOf(val.toLowerCase()), val.length) + "</strong>";
            b.innerHTML += arr[i].substr(arr[i].toLowerCase().indexOf(val.toLowerCase()) + val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + " autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  } 

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(KIRIAN_TOR_HOUSES_RANKING).then(function (resultObj) {
        if (resultObj.status === "ok") {
            kirian_tor_battles_array = resultObj.data.values;

            getJSONData(KIRIAN_TOR_HOUSES_PLAYERS).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    kirian_tor_players_array = resultObj.data.values;

                    AddOptionsToSelect(document.getElementById("inputFirstHouse"), kirian_tor_battles_array);
                    AddOptionsToSelect(document.getElementById("inputSecondHouse"), kirian_tor_battles_array);
                    AddOptionsToSelect(document.getElementById("inputThirdHouse"), kirian_tor_battles_array);
                    AddOptionsToSelect(document.getElementById("inputFourthHouse"), kirian_tor_battles_array);

                    GetPlayers();

                    autocomplete(document.getElementById("First Player Name"), players_array_filtered);
                    autocomplete(document.getElementById("Second Player Name"), players_array_filtered);
                    autocomplete(document.getElementById("Third Player Name"), players_array_filtered);
                    autocomplete(document.getElementById("Fourth Player Name"), players_array_filtered);
                }
            });
        }
    });



    document.getElementById("btnFirstPlayerScoreMinus").addEventListener("click", function () {
        changeScore("first", -1)
    }, false);
    document.getElementById("btnFirstPlayerScorePlus").addEventListener("click", function () {
        changeScore("first", 1)
    }, false);
    document.getElementById("btnSecondPlayerScoreMinus").addEventListener("click", function () {
        changeScore("second", -1)
    }, false);
    document.getElementById("btnSecondPlayerScorePlus").addEventListener("click", function () {
        changeScore("second", 1)
    }, false);
    document.getElementById("btnThirdPlayerScoreMinus").addEventListener("click", function () {
        changeScore("third", -1)
    }, false);
    document.getElementById("btnThirdPlayerScorePlus").addEventListener("click", function () {
        changeScore("third", 1)
    }, false);
    document.getElementById("btnFourthPlayerScoreMinus").addEventListener("click", function () {
        changeScore("fourth", -1)
    }, false);
    document.getElementById("btnFourthPlayerScorePlus").addEventListener("click", function () {
        changeScore("fourth", 1)
    }, false);
});