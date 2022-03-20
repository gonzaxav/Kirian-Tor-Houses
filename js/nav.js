document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("navID").innerHTML =
    `
    <nav class="navbar navbar-expand-lg navbar-dark bg-darker">
        <div class="container">
            <a class="navbar-brand" href="index.html">Houses Ranking</a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse row" id="navbarNavAltMarkup">
                <div class="navbar-nav col">
                    <a class="nav-link col text-center" aria-current="page" href="rankingPlayers.html">Players Ranking </a>
                    <a class="nav-link col text-center" href="lastBattles.html">Last Battles</a>
                    <a class="nav-link col text-center" href="result.html">Upload result</a>
                </div>
            </div>
        </div>
    </nav>
    `
    document.getElementById("navID").classList.add("nav-sticky");
});