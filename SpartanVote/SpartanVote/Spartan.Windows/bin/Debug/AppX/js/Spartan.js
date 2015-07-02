var races = [];
var props = [];
var voteLog = [];
var subjectID = 0;
var subject = "STAR-Vote";
var numberOfRaces;
var numberOfProps;
var numberOfItems;
var qxml;
var box = 0;
var currentRace = 0;
var Counter = 0;
var race1;
var goto = 0;
var title;
var xmlhttp;
var eventLog = [];
var prev = false;
var submitBallot = "Ballot Submitted";
var choice1 = "Choice-1";
var choice2 = "Choice-2";
var choice3 = "Choice-3";
var begin = "Begin";
var nextLabel = "Next";
var previous = "Previous";
var review = "Back To Review";
var rIndex = 0;
var ReviewClick0 = "Reviewed Race 0";
var ReviewClick1 = "Reviewed Race 1";
var ReviewClick2 = "Reviewed Race 2";
var ReviewClick3 = "Reviewed Race 3";
var ReviewClick4 = "Reviewed Race 4";
var ReviewClick5 = "Reviewed Race 5";
var ReviewClick6 = "Reviewed Race 6";
var ReviewClick7 = "Reviewed Race 7";
var ReviewClick8 = "Reviewed Race 8";
var ReviewClick9 = "Reviewed Race 9";
var ReviewClick10 = "Reviewed Race 10";
var ReviewClick11 = "Reviewed Race 11";
var ReviewClick12 = "Reviewed Race 12";
var ReviewClick13 = "Reviewed Race 13";
var ReviewClick14 = "Reviewed Race 14";
var ReviewClick15 = "Reviewed Race 15";
var ReviewClick16 = "Reviewed Race 16";
var ReviewClick17 = "Reviewed Race 17";
var ReviewClick18 = "Reviewed Race 18";
var ReviewClick19 = "Reviewed Race 19";
var ReviewClick20 = "Reviewed Race 20";
var ReviewClick21 = "Reviewed Race 21";
var ReviewClick22 = "Reviewed Race 22";
var ReviewClick23 = "Reviewed Race 23";
var ReviewClick24 = "Reviewed Race 24";
var ReviewClick25 = "Reviewed Race 25";
var ReviewClick26 = "Reviewed Race 26";
var endoftask = "Printed ballot_finished voting";
var movingtoprint = "Finish Reviewing Ballot";

function connect() {
    var fileName = "ms-appx:///rsrc/election.xml";
    xmlhttp = null;
    try {
        // IE7+, Firefox, Opera 8.0+, Safari...
        xmlhttp = new XMLHttpRequest();
    } catch (ex) {
        // Internet Explorer...
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (ex) {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }


    if (xmlhttp == null) {
        window.alert("AJAX is not available in this browser");
        return;
    }

    xmlhttp.onreadystatechange = stateChanged;
    xmlhttp.open("GET", fileName, true);
    xmlhttp.send();


}

//checks if browser supports XML or ActiveObject
function GetXmlHttpObject() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function stateChanged() {
    var state = xmlhttp.readyState;
    //When state = 4 the file has been received
    //alert("state: "+ state);
    //Puts the state in the status field just for testing purposes
    if (state === 4) {
        qxml = xmlhttp.responseXML;
        // The global variable qml is equal to the xml file
        start();
    }
}

function setUpRaces() {
    console.log("There are " + numberOfRaces + " races.");
    races = [];
    var thisRace;
    var button;
    var label;
    var input;
    var img;
    var name;
    var party;
    var race;
    for (var j = 0; j < numberOfRaces; j++) {
        race = document.createElement("div");
        race.id = "race" + j;
        race.className = "race";

        races[j] = {};
        thisRace = qxml.getElementsByTagName("race")[j];
        console.log(thisRace.getElementsByTagName("title")[0].textContent);
        races[j].title = thisRace.getElementsByTagName("title")[0].textContent;
        races[j].text = thisRace.getElementsByTagName("raceText")[0].textContent;
        races[j].number = thisRace.getElementsByTagName("number")[0].textContent;

        console.log("//////////////" + races[j].number);
        races[j].cand = thisRace.getElementsByTagName("choice");
        races[j].candidates = [];
        for (var i = 0; i < races[j].cand.length; i++) {
            races[j].candidates[i] = {};
            races[j].candidates[i].index = i;
            races[j].candidates[i].voted = false;
            races[j].candidates[i].name = races[j].cand[i].getElementsByTagName("name")[0].textContent;

            console.log(races[j].candidates[i].name);

            if (races[j].cand[i].hasAttribute("party"))
                races[j].candidates[i].party = races[j].cand[i].getElementsByTagName("party")[0].textContent;

            // add the candidate to the document

            var candidate = document.createElement("div");
            candidate.id = "choice" + j + "" + i;
            candidate.className = "choice";
            candidate.setAttribute("onClick", "selectChoice(" + j + ", " + i + ");");
            button = document.createElement("div");
            button.className = "voteButton";
            label = document.createElement("label");
            label.name = "label" + j + "" + i;
            input = document.createElement("input");
            input.name = "vote";
            input.type = "radio";
            input.id = "radio" + j + "" + i;
            input.className = "vote";
            input.setAttribute("onClick", "selectChoice(" + j + ", " + i + ");");
            img = document.createElement("img");
            img.src = "images/check_selected copy-01.png";


            label.appendChild(input);
            label.appendChild(img);

            button.appendChild(label);
            name = document.createElement("div");
            name.id = "c" + j + "" + i;
            name.className = "name";
            party = document.createElement("div");
            party.id = "p" + j + "" + i;
            party.className = "selectparty";

            candidate.appendChild(button);
            candidate.appendChild(name);
            candidate.appendChild(party);

            race.appendChild(candidate);
        }

        race.style.visibility = "hidden";

        document.getElementById("races").appendChild(race);


    }

    races = races.concat(props);
}

function start() {

    numberOfRaces = qxml.getElementsByTagName("race").length;

    setUpRaces();

    console.log("Races: " + races);

    numberOfItems = numberOfRaces;

    // Now populate the review screen with review buttons

    var leftCol = document.createElement("div");
    leftCol.id = "reviewLeft";
    leftCol.style = "visibility: hidden";

    document.getElementById("reviews").appendChild(leftCol);

    var rightCol = document.createElement("div");
    rightCol.id = "reviewRight";
    rightCol.style = "visibility: hidden";

    //document.getElementById("reviews").appendChild(rightCol);

    // NOTE We can only handle up to 26 items
    for (var idx = 0; idx < numberOfItems; idx++) {

        var reviewButton = document.createElement("div");

        reviewButton.id = "race" + idx;
        reviewButton.className = "race";

        reviewButton.setAttribute("onClick", "goToAndRecord(" + idx + ");");


        var raceTitle = document.createElement("div");
        raceTitle.id = "raceTitle" + idx;
        raceTitle.className = "title";

        var raceBox = document.createElement("div");
        raceBox.id = "raceBox" + idx;
        raceBox.className = "noSel";

        var raceSel = document.createElement("div");
        raceSel.id = "race" + idx + "p";
        raceSel.className = "raceSel";

        var partySel = document.createElement("div");
        partySel.id = "party" + idx;
        partySel.className = "party";
        partySel.style = "font-weight: bold";

        raceBox.appendChild(raceSel);
        raceBox.appendChild(partySel);


        reviewButton.appendChild(raceTitle);
        reviewButton.appendChild(raceBox);


        if (idx < 13) {

            document.getElementById("reviewLeft").appendChild(reviewButton);

        } else {

            document.getElementById("reviewRight").appendChild(reviewButton);

            
        }
    }

}

function goToAndRecord(raceNum) {
    goToRace(raceNum);
    recordEvent(raceNum);
}

//early functions here
function submitID() {
    //records authentication credential and takes voter to election info
    subjectID = document.getElementById("idText").value;
    if (subjectID === "") {
        var dialog = new Windows.UI.Popups.MessageDialog("You must enter correctly your 5-digit authentication number.");

        var cmd = new Windows.UI.Popups.UICommand();
        cmd.label = "Okay";
        dialog.commands.append(cmd);

        dialog.showAsync();
    } else {
        document.getElementById("IDArea").value = subjectID + " " + subject;
        document.getElementById("info").style.visibility = "visible";
        //shows election information page or start
        document.getElementById("ID").style.display = "none";
        //hides the elements on the authentication page
        document.getElementById("enterID").style.display = "none";
        document.getElementById("idText").style.display = "none";
    }
}

function gotoFirstInstructions() {
    hide();

    //takes voter to instructions page
    document.getElementById("first_instructions").style.display = "block";
    //de-invisibles
    document.getElementById("first_instructions").style.visibility = "visible";
    //displays instructions
    document.getElementById("Back").style.visibility = "visible";
    document.getElementById("Back").style.display = "block";
    //shows the back button that takes you to the election info page
    document.getElementById("Begin").style.visibility = "visible";
    document.getElementById("Begin").style.display = "block";
    //shows the button that is pressed to start voting
    document.getElementById("info").style.display = "none"; //makes the instructions invisible
}

function gotoInfo() {
    hide();

    //Takes voter from instructions page back to election info page
    document.getElementById("Begin").style.visibility = "hidden";
    //hides the bigin and back buttons shown on the instructions page
    document.getElementById("Back").style.visibility = "hidden";
    document.getElementById("first_instructions").style.display = "none";
    //makes the instructions invisible
    document.getElementById("info").style.display = "block"; //shows election information page or start


    document.getElementById("Previous").style.visibility = "hidden";
    document.getElementById("Next").style.visibility = "hidden";
    document.getElementById("progress").style.visibility = "hidden";
}

function next(y) {
    hide();

    console.log("Setting current race to " + y);
    currentRace = y;
    //when leaving first instructions, hide instructions, show questions, and change button message
    Counter = y;
    if (Counter === 0) {
        document.getElementById("voteFor").style.display = "block";
        document.getElementById("voteFor").style.visibility = "visible";
        document.getElementById("progress").innerHTML = currentRace + 1 + " of " + numberOfItems;
        //progress in footer

        if (numberOfRaces > 0)
            nextRace(Counter);
        else
            goToReview();
    } //while voting, clicking next records selection and continues to next race 
    else if (Counter < numberOfRaces && Counter > 0) {

        console.log("Showing race " + Counter + "!");
        document.getElementById("Previous").style.visibility = "visible";
        document.getElementById("voteFor").style.display = "block";
        document.getElementById("voteFor").style.visibility = "visible";
        document.getElementById("progress").innerHTML = currentRace + 1 + " of " + numberOfItems;
        //progress in footer
        //if(prev==false){
        nextRace(Counter);
    } else if (Counter === numberOfItems) {
        //recordVote();
        document.getElementById("reviews").style.display = "block";
        document.getElementById("reviews").style.visibility = "visible";
        document.getElementById("reviewTop").style.visibility = "visible";

        document.getElementById("reviewLeft").style.visibility = "visible";
        //document.getElementById("reviewRight").style.visibility = "visible";

        document.getElementById("confirm").style.visibility = "visible";
        document.getElementById("confirm").style.display = "inline-block";

        goToReview();
    } //ChangeSteps()	//added in in case it impacts reading
}

function nav(x) {

    // Handle the error cases
    if (goto < 0) {
        goto = 0;
    }
    if (goto > numberOfItems) {
        goto = numberOfItems;
    }

    // This means we"re going back
    if (x === 0) {

        // If we"re not going back to the start, go to the previous page
        if (goto > 0) {
            goto = goto - 1;
        }
        prev = true;
    } else if (x === 1)
        // Otherwise, we"re going forward so go to the next page
        if (goto < numberOfItems) {
            {
                goto++;
            }
            prev = false;
        } else {
            prev = false;
        }
    next(goto);
}

//Major page elements shown/not shown
function goToReview() {

    hide();

    //the review screen

    //Clean the checkboxes to make sure there are no weird selections
    for (var ra = 0; ra < races.length; ra++) {
        for (box = 0; box < races[ra].candidates.length; box++) {
            document.getElementById("radio" + ra + "" + box).checked = false;
        }
    }

    document.getElementById("confirm").style.display = "inline-block";
    document.getElementById("confirm").style.visibility = "visible";

    document.getElementById("reviews").style.visibility = "visible";
    document.getElementById("reviewTop").style.visibility = "visible";
    document.getElementById("reviewLeft").style.visibility = "visible";
    //document.getElementById("reviewRight").style.visibility = "visible";
    document.getElementById("reviewHeader").style.visibility = "visible";
    document.getElementById("reviewInstructions").style.visibility = "visible";



    for (var x = 0; x < races.length; x++) {
        var selection = false;
        var title = races[x].title;
        //title = title.bold();
        for (var l = 0; l < races[x].candidates.length; l++) {
            if (races[x].candidates[l].voted === true) {
                selection = true;
                document.getElementById("race" + (x)).style.background = "#FFF";
                document.getElementById("raceTitle" + (x)).innerHTML = races[x].number + ". " + title;
                document.getElementById("race" + (x) + "p").innerHTML = races[x].candidates[l].name;

                if (document.getElementById("race" + (x) + "p").innerHTML.length < 42)
                    document.getElementById("raceBox" + (x)).className = "sel";
                else
                    document.getElementById("raceBox" + (x)).className = "selBig";

                switch (races[x].candidates[l].party) {
                    case "REP":
                        document.getElementById("party" + (x)).innerHTML = "REP";
                        break;
                    case "DEM":
                        document.getElementById("party" + (x)).innerHTML = "DEM";
                        break;
                    case "IND":
                        document.getElementById("party" + (x)).innerHTML = "IND";
                        break;
                    case "LIB":
                        document.getElementById("party" + (x)).innerHTML = "LIB";
                        break;
                    case "GRN":
                        document.getElementById("party" + (x)).innerHTML = "GRN";
                        break;
                    case "CON":
                        document.getElementById("party" + (x)).innerHTML = "CON";
                        break;
                    default:
                        document.getElementById("party" + (x)).innerHTML = "";
                        break;

                }
            }
        }
        if (selection === false) {
            document.getElementById("raceTitle" + (x)).innerHTML = races[x].number + ". " + title;
            document.getElementById("race" + (x) + "p").innerHTML = "NO SELECTION. If you would like to make one, touch here.";
            document.getElementById("party" + (x)).innerHTML = " ";
            document.getElementById("raceBox" + (x)).className = "noSel"; //document.getElementById("race"+(x+1)).style.backgroundColor = "#ff6600"
        }
    }
}

function recordVote() {
    var time = new Date();
    var selection = false;
    var e = {};

    e.type = races[currentRace].number;
    for (var box = 0; box < races[currentRace].candidates.length; box++) {
        if (document.getElementById("radio" + currentRace + "" + box).checked) {
            races[currentRace].candidates[box].voted = true;
            e.choice = races[currentRace].candidates[box].name;
            e.party = races[currentRace].candidates[box].party;
            selection = true;
        } else {
            races[currentRace].candidates[box].voted = false;
        }
    }
    if (selection === false) {
        e.choice = "No Selection";
        e.party = "None";
    }
    e.time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + "." + time.getMilliseconds();
    voteLog.push(e);
}

function recordEvent(b) {
    var e, time;
    if (currentRace > 0 && currentRace < numberOfItems) {
        e = {};
        time = new Date();
        e.type = b;
        console.log("Current race: " + currentRace);
        e.page = races[currentRace].number;
        e.time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + "." + time.getMilliseconds();
        eventLog.push(e);
    } else if (currentRace >= numberOfItems) {
        e = {};
        time = new Date();
        e.type = b;
        e.page = "";
        e.time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + "." + time.getMilliseconds();
        eventLog.push(e);
    }
}

function recordReviewChange(m) {
    var index = m;
    //alert("m = "+ index)
    var time = new Date();
    var selection = false;
    var e = {};
    e.type = races[m].number;

    for (var box = 0; box < races[currentRace].candidates.length; box++) {
        if (document.getElementById("radio" + currentRace + "" + box).checked) {
            races[currentRace].candidates[box].voted = true;
            e.choice = races[currentRace].candidates[box].name;
            e.party = races[currentRace].candidates[box].party;
            selection = true;
        } else {
            races[currentRace].candidates[box].voted = false;
        }
    }
    if (selection === false) {
        e.choice = "No Selection";
        e.party = "None";
    }
    e.time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + ":" + time.getMilliseconds();
    voteLog.push(e);
    goToReview();
}

//Selects the button/candidate, but cannot deselect
function selectChoice(i, j) {
    //alert("Selected!")
    console.log("selecting race " + i + " choice " + j);

    var checked = document.getElementById("radio" + i + "" + j).checked;

    console.log("selecting race " + i + " choice " + j + ". Checked: " + checked);

    document.getElementById("Next").setAttribute("class", "skip");
    document.getElementById("Next").innerHTML = "Skip";

    for (box = 0; box < races[i].candidates.length; box++) {
        // Uncheck everyone
        document.getElementById("radio" + i + "" + box).checked = false;

        if (box === j && !checked) {
            document.getElementById("radio" + i + "" + box).checked = true;

            console.log("Changing " + document.getElementById("Next").innerHTML);

            document.getElementById("Next").setAttribute("class", "next");
            document.getElementById("Next").innerHTML = "Next";

            console.log("Changed " + document.getElementById("Next").innerHTML);

            document.getElementById("c" + i + "" + box).style.color = "white";
            document.getElementById("p" + i + "" + box).style.color = "white";

        } else {

            console.log("Skipping");

            document.getElementById("c" + i + "" + box).style.color = "black";
            document.getElementById("p" + i + "" + box).style.color = "black";
        }


    }

    recordVote();
}

function goToRace(n) {

    hide();

    // This should never happen
    if (n > numberOfItems || n < 0) {
        throw new Error("Index out of range");
    }

    currentRace = n;
    rIndex = n;

    //document.getElementById("propText").style.visibility = "visible";

    // Iterate over all the choices and make them visible
    var count;
    for (count = 0; count < races[n].cand.length; count++) {
        document.getElementById("choice" + n + "" + count).style.visibility = "visible";
        document.getElementById("choice" + n + "" + count).style.display = "block";
    }


    for (count = 0; count < races[n].cand.length; count++) {
        document.getElementById("c" + n + "" + count).style.color = "black";
        document.getElementById("p" + n + "" + count).style.color = "black";
    }

    document.getElementById("titles").style.visibility = "visible";
    document.getElementById("raceTitle").innerHTML = races[n].text;
    document.getElementById("raceTitle").style.visibility = "visible";
    document.getElementById("raceTitle").style.display = "block";

    //Clean the checkboxes to make sure there are no weird selections
    for (box = 0; box < races[n].candidates.length; box++) {
        document.getElementById("radio" + n + "" + box).checked = false;
    }

    document.getElementById("Next").setAttribute("class", "skip");
    document.getElementById("Next").innerHTML = "Skip";

    for (box = 0; box < races[n].candidates.length; box++) {
        document.getElementById("radio" + n + "" + box).checked = (races[n].candidates[box].voted === true);
        if (document.getElementById("radio" + n + "" + box).checked) {

            document.getElementById("c" + n + "" + box).style.color = "white";
            document.getElementById("p" + n + "" + box).style.color = "white";
            document.getElementById("Next").setAttribute("class", "next");
            document.getElementById("Next").innerHTML = "Next";
        }
    }
    for (var h = 0; h < races[n].cand.length; h++) {
        document.getElementById("c" + n + "" + (h)).innerHTML = races[n].candidates[h].name;
    }


       
    document.getElementById("Review").style.display = "inline-block";
    document.getElementById("Review").style.visibility = "visible";
        
    document.getElementById("titles").style.visibility = "visible";
    document.getElementById("raceTitle").innerHTML = races[n].title;
    document.getElementById("raceTitle").style.visibility = "visible";
    document.getElementById("voteText").innerHTML = races[n].text;
    document.getElementById("voteText").style.visibility = "visible";
    document.getElementById("voteFor").style.visibility = "visible";

      
    document.getElementById("progress").style.visibility = "visible";
    document.getElementById("progress").innerHTML = n + 1 + " of " + numberOfItems;

}

// TODO merge races and propositions...

//displays race to voter
function nextRace(counter) {
    hide();


    // Iterate over all the choices and make them visible
    var count;
    for (count = 0; count < races[counter].cand.length; count++) {
        document.getElementById("choice" + counter + "" + count).style.visibility = "visible";
        document.getElementById("choice" + counter + "" + count).style.display = "block";
    }

    for (count = 0; count < races[counter].cand.length; count++) {
        document.getElementById("c" + counter + "" + count).style.color = "black";
        document.getElementById("p" + counter + "" + count).style.color = "black";
    }




    //Clean the checkboxes to make sure there are no weird selections
    for (box = 0; box < races[counter].candidates.length; box++) {
        document.getElementById("radio" + counter + "" + box).checked = false;
    }

    document.getElementById("Next").setAttribute("class", "skip");
    document.getElementById("Next").innerHTML = "Skip";

    for (box = 0; box < races[counter].candidates.length; box++) {
        document.getElementById("radio" + counter + "" + box).checked = (races[counter].candidates[box].voted === true);
        if (document.getElementById("radio" + counter + "" + box).checked) {

            document.getElementById("c" + counter + "" + box).style.color = "white";
            document.getElementById("p" + counter + "" + box).style.color = "white";
            document.getElementById("Next").setAttribute("class", "next");
            document.getElementById("Next").innerHTML = "Next";
        }
    }
    for (var h = 0; h < races[counter].cand.length; h++) {
        document.getElementById("c" + counter + "" + (h)).innerHTML = races[counter].candidates[h].name;
    }

    document.getElementById("titles").style.visibility = "visible";
    document.getElementById("raceTitle").innerHTML = races[counter].title;
    document.getElementById("raceTitle").style.visibility = "visible";
    document.getElementById("voteText").innerHTML = races[counter].text;
    document.getElementById("voteText").style.visibility = "visible";
    document.getElementById("voteFor").style.visibility = "visible";

    //Vote for 1.

    document.getElementById("progress").style.visibility = "visible";
    document.getElementById("progress").innerHTML = counter + 1 + " of " + numberOfItems;

    document.getElementById("Next").style.visibility = "visible";
    document.getElementById("Next").style.display = "block";

    if (counter > 0) {
        document.getElementById("Previous").style.visibility = "visible";
        document.getElementById("Previous").style.display = "block";
    }
}

function showVoteData() {
    var r0 = "Race" + ";" + "Time" + ";" + "Choice" + ";" + "Party" + "\n";
    var e0 = "Type" + ";" + "Page" + ";" + "Time" + "\n";
    var v0 = ""; // = "Race;Choice;Party" + "\n";
    for (var x = 0; x < voteLog.length; x++) {
        r0 += voteLog[x].type + ";" + voteLog[x].time + ";" + voteLog[x].choice + ";" + voteLog[x].party + "\n";
    }
    for (x = 0; x < eventLog.length; x++) {
        e0 += eventLog[x].type + ";" + eventLog[x].page + ";" + eventLog[x].time + "\n";
    }
    for (x = 0; x < races.length; x++) {
        var selection = false;
        v0 += races[x].number + ";";
        for (var l = 0; l < races[x].candidates.length; l++) {
            if (races[x].candidates[l].voted === true) {
                selection = true;
                v0 += races[x].candidates[l].name + ";" + races[x].candidates[l].party + "\n";
            }
        }
        if (selection === false) {
            v0 += "No Selection;None" + "\n";
        }
    }
    document.getElementById("voteLog").value = r0;
    document.getElementById("eventLog").value = e0;
    document.getElementById("Results").value = v0;
}

function confirm() {

    console.log("Finish up called!");
    hide();

    document.getElementById("submitScreen").style.visibility = "visible";
    document.getElementById("submitHeading").style.visibility = "visible";
    document.getElementById("submitText").style.visibility = "visible";
    document.getElementById("submitScreenBtns").style.visibility = "visible";
    document.getElementById("returnToBallot").style.visibility = "visible";
    document.getElementById("endVoting").style.visibility = "visible";


}

function hide() {

    document.getElementById("submitScreen").style.visibility = "hidden";
    document.getElementById("submitHeading").style.visibility = "hidden";
    document.getElementById("submitText").style.visibility = "hidden";
    document.getElementById("submitScreenBtns").style.visibility = "hidden";
    document.getElementById("returnToBallot").style.visibility = "hidden";
    document.getElementById("endVoting").style.visibility = "hidden";
    document.getElementById("reviewInstructions").style.visibility = "hidden";
    document.getElementById("reviewHeader").style.visibility = "hidden";
    document.getElementById("reviews").style.visibility = "hidden";
    document.getElementById("reviewLeft").style.visibility = "hidden";
    //document.getElementById("reviewRight").style.visibility = "hidden";
    document.getElementById("Review").style.visibility = "hidden";
    document.getElementById("Review").style.display = "none";
    document.getElementById("confirmation").style.visibility = "hidden";
    document.getElementById("confHeading").style.visibility = "hidden";
    document.getElementById("confirm").style.visibility = "hidden";
    document.getElementById("Next").style.visibility = "hidden";
    document.getElementById("Next").style.display = "none";
    document.getElementById("Previous").style.visibility = "hidden";

    document.getElementById("first_instructions").style.visibility = "hidden";

    document.getElementById("Begin").style.visibility = "hidden";
    document.getElementById("Begin").style.display = "none";

    document.getElementById("Back").style.display = "none";


    document.getElementById("progress").style.visibility = "hidden";

    document.getElementById("voteText").style.visibility = "hidden";
    document.getElementById("raceTitle").style.visibility = "hidden";
    document.getElementById("voteFor").style.visibility = "hidden";


    // Note that doing this messes up the formatting for the progress bar
    //document.getElementById("Previous").style.display = "none";


    var c, i, item;
    // Hide all the choices
    for (c = 0; c < numberOfRaces; c++) {
        item = qxml.getElementsByTagName("race")[c];

        for (i = 0; i < item.getElementsByTagName("choice").length; i++) {
            document.getElementById("choice" + c + "" + i).style.visibility = "hidden";
            document.getElementById("choice" + c + "" + i).style.display = "none";
        }
    }
}

function finish() {

    console.log("Finish called!");

    hide();


    document.getElementById("confirmation").style.visibility = "visible";
    document.getElementById("confHeading").style.visibility = "visible";
    showVoteData();

    trackerNum = generateTrackerNum();
    print();
    //sendResults();

    window.setTimeout(function () {
        hide();
        gotoInfo();
    }, 5000);

    // TODO 
    //Clean the checkboxes to make sure there are no weird selections

    for (var i = 0; i < numberOfRaces; i++) {

        for (box = 0; box < races[i].candidates.length; box++) {
            // Uncheck everyone
            document.getElementById("radio" + i + "" + box).checked = false;
        }
    }

    // Clear data by reloading the races
    setUpRaces();

    currentRace = 0;
    Counter = 0;
    goto = 0;
}

function sendResults() {
    var http = new XMLHttpRequest();
    var url = "http://localhost:8080/test";
    var params = "tNum=" + trackerNum + "&votes=" + document.getElementById("Results").value;


    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.setRequestHeader("Content-length", params.length);
    http.setRequestHeader("Connection", "close");

    http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.status === 200) {
            console.log(http.responseText);
        } else if (http.readyState === 4) {
            var dialog = new Windows.UI.Popups.MessageDialog("Your vote was not recorded. Please contact a poll worker.\nERROR: " + http.status + "" + http.readyState);

            var cmd = new Windows.UI.Popups.UICommand();
            cmd.label = "Okay";
            dialog.commands.append(cmd);

            dialog.showAsync();
        }

    }

    
    http.send(params);

}

function print() {

    var html = generatePrintableHTML();

    var http = new XMLHttpRequest();
    var url = "http://localhost:8080/print";

    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.setRequestHeader("Content-length", html.length);
    http.setRequestHeader("Connection", "close");

   

    http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.status === 200) {
            console.log(http.responseText);
        } else if (http.readyState === 4) {
            var dialog = new Windows.UI.Popups.MessageDialog("Your vote was not printed. Please contact a poll worker.\nERROR: " + http.status + "" + http.readyState);

            var cmd = new Windows.UI.Popups.UICommand();
            cmd.label = "Okay";
            dialog.commands.append(cmd);

            dialog.showAsync();
        }

    }


    http.send(html);

    printReceipt();
}

function printReceipt() {


    // TODO Actually print the thing
}

function generateTrackerNum() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 128; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function printIframe() {
    if (navigator.userAgent.indexOf("Firefox") != -1) {
        var iframe_window = window.frames["printout"];

        console.log(iframe_window);
        iframe_window.focus();
        iframe_window.print();
    } else if (navigator.userAgent.indexOf("MSIE") != -1) {
        var x = document.getElementById("printout");

        console.log(x);
        x.focus();
        x.print();
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        document.my_iframe.focus();
        document.my_iframe.print();
    } else {

        console.log("It's an app!");

        window.frames["printout"].focus();
        window.frames["printout"].print();

        //var printManager = Windows.Graphics.Printing.PrintManager.getForCurrentView();
        //printManager.onprinttaskrequested = onPrintTaskRequested;
        ////Windows.Graphics.Printing.PrintManager.showPrintUIAsync();
        //WinJS.UI.processAll();
    }


}

function onPrintTaskRequested(printEvent) {
    var printTask = printEvent.request.createPrintTask("Print Ballot", function (args) {
        args.setSource(MSApp.getHtmlPrintDocumentSource(window.frames["printout"].document));

        // Register the handler for print task completion event
        printTask.oncompleted = onPrintTaskCompleted;
    });
}

function onPrintTaskCompleted(printTaskCompletionEvent) {
    // Notify the user about the failure
    if (printTaskCompletionEvent.completion === Windows.Graphics.Printing.PrintTaskCompletion.failed) {
        console.log("Failed to print.", "ballot", "error");
    }

    console.log("Printed.");
}

/**
 * This function returns the entire html page for the ballot print (AKA 'Record of Voter
 *  Intent'), INCLUDING The CSS <style> block (see the example file for any questions)
 *
 * Inputs:
 *      This code uses the global 'races' array but doesn't actually take in any inputs (as of now)
 *      If we refactor this code to get rid of the constant use of  globals then this will need to
 *      take races as an input.
 *
 * Outputs:
 *      A string that holds the entire html page for the ballot print (AKA 'Re
 *
 **/
function generatePrintableHTML() {
    var output = '';

    //TODO - figure out what this is and why it was here!
    //console.log(document.getElementById('Results').value);

    //initial setup of HTML/CSS printout
    output = output +
        '<!DOCTYPE html>\n' +
        '<html>\n' +
        '<head>\n' +

        //begin CSS part of the HTML printout
        '<style>\n\n' +

            //CSS overall font
            'html * { font-family: "Avenir Next" !important; color: black;}\n\n' +

            //CSS classes, taken directly (but formatted differently) from the example HTML/CSS printout as of 6/29/15
            //See ballot printout example files for css style guide. DO NOT MAKE CHANGES HERE WITHOUT CHANGING THE PRINTOUT EXAMPLE FIRST!!!!
            'hr.divideRace { /* Formatting for the black horizontal line that divides up the races */' +
            ' display: block; font-size: 13.5pt; margin-top: -1.5pt; margin-left: 0pt; margin-bottom: 10pt;' +
            ' margin-right: 0pt; font-weight: bolder; }\n\n' +

            'h1 { /*Upper left header ("Official Ballot")*/ display: inline; font-size: 13.5pt; margin-top: 0pt;' +
            ' margin-left: 36pt; margin-bottom: 0pt; margin-right: 0pt; font-weight: bold; } \n\n' +

            'h2 { /*Upper rightt header ("PLACE THIS IN BALLOT BOX")*/ display: inline;' +
            ' text-align: right; font-size: 17.3pt; margin-top: 0pt; margin-right: 36pt; margin-left: 101.5pt;' +
            ' margin-bottom: 0pt; font-weight: bold; } \n\n' +

            'divDate { /*Date, just underneath the first (upper left) header*/ display:block; font-size: 10.1pt;' +
            ' margin-top: -5pt; margin-left: 36pt; margin-bottom: 0pt; margin-right: 36pt; font-weight: normal; } \n\n' +

            ' divLocation { /*Location, just underneath the date*/ display: block; font-size: 10.1pt; margin-top: -2.5pt;' +
            ' margin-left: 36pt; margin-bottom: 19pt; margin-right: 36pt; font-weight: normal; }  \n\n' +

            'div.electionOrProposition { /*The name of each election */ display:block; font-size: 11pt; margin-top:0pt;' +
            ' margin-left:0pt; margin-bottom: 1.5pt; margin-right:0pt; font-weight: bold } \n\n' +

            'div.namePlusAND { /* ONLY used for the first person of two total */ display:block;' +
            ' font-size: 10.5pt; margin-top:0pt; margin-left:0pt; margin-bottom: -3pt; margin-right:5pt; font-weight:' +
            ' normal; }  div.onlyOrSecondPerson { /* Used for one person total, or the second of two.' +
            ' THIS ONE IS SPECIAL - it relies on using the width field to work with .party!! */ display: inline-block;' +
            ' font-size: 10.5pt; margin-top:0pt; margin-left:0pt; margin-bottom: 0pt; margin-right:0pt; font-weight:' +
            ' normal; width: 82%; }\n\n' +

            'div.namePlusAND {/* ONLY used for the first person of two total */ display:block; font-size: 10.5pt; margin-top:0pt;' +
            ' margin-left:0pt; margin-bottom: -3pt; margin-right:5pt; font-weight: normal; } \n\n' +

            'div.onlyOrSecondPerson { /* Used for one person total, or the second of two. THIS ONE IS SPECIAL - it relies' +
            ' on using the width field to work with .party!! */ display: inline-block; font-size: 10.5pt; margin-top:0pt;' +
            ' margin-left:0pt; margin-bottom: 0pt; margin-right:0pt; font-weight: normal; width: 82%; }\n\n' +

            'div.party { /* SPECIAL - only used for sticking party on the same line as the (second, if a team) person being voted for */' +
            ' display: inline-block; font-size: 10.75pt; text-align: right; font-weight:bold; width: 8%; }\n\n' +

            'div.noSelection_outer { /* SPECIAL - only used for highlighting the special "YOU DID NOT SELECT ANYTHING"' +
            ' message */ display: block; background-color: #D6D7D8; } \n\n' +

            'div.noSelection_inner {/* SPECIAL - only used for the font and positioning of' +
            ' the special "YOU DID NOT SELECT ANYTHING" message */ font-size: 10.75pt; margin-top:0pt; margin-left:6pt;' +
            ' margin-bottom: 0pt; margin-right:0pt; font-weight: bold; }\n\n' +

            'divLeftSide {/*SPECIAL - Contains the left side of the page*/ float: left; width: 190pt; padding-left: 36pt; line-height:15pt; }\n\n' +

            'divRightSide {/*SPECIAL - Contains the right side of the page*/ float: right; width: 190pt; margin-right: 36pt; line-height:15.5pt;\n\n }' +

        '</style>\n\n';
    output += '</head>\n\n';


    //The actual document's header (date, instructions for voter, location, etc.)
    output += '<body>\n\n';
    output += '<h1>Official Ballot</h1> <h2>PLACE THIS IN BALLOT BOX</h2>\n';
    output += '<divDate>November 8, 2016, General Election</divDate> <divLocation>Harris County, Texas Precint 101A</divLocation>\n\n';

    //now formatting the races on the left side of the printout page
    output += '<divLeftSide>\n';

    //first of the two main for-loop where we auto-generate stuff
    //each "block" is one race or proposition; the LEFT is because these blocks are on the left side of the printout page
    for (var blockNumberLEFT = 0; blockNumberLEFT < Math.floor(races.length / 2) ; blockNumberLEFT++) { //TODO - check for rounding errors.
        // Each iteration focueses on one particular race or proposition
        var nextLeftSideBlock = handleOneBlockHTML(blockNumberLEFT);
        output += nextLeftSideBlock;
    }
    output += '</divLeftSide>\n\n';



    //now the same thing for the races on the right side of the printout page
    output += '<divRightSide>\n';

    //second of the main for-loops where we auto-generate stuff
    //the RIGHT at the end is because these blocks are on the right side of the printout
    for (var blockNumberRIGHT = Math.floor(races.length / 2) ; blockNumberRIGHT < races.length; blockNumberRIGHT++) { //TODO - again, check for rounding errors
        // Each iteration focueses on one particular race or proposition
        var nextRightSideBlock = handleOneBlockHTML(blockNumberRIGHT);
        output += nextRightSideBlock;
    }
    output += '</divRightSide>\n\n';

    //TODO - make sure this isn't important
    //console.log(document.getElementById('Results').value);

    //Add in the barcode. TODO - make sure that it fits completely, possibly rework how you put in the image.
    output += '<img src="fakeBarcode.jpg" alt="BARCODE GOES HERE" style="width:350px;height:35px;">\n'

    //now just close it up
    output += '</body>\n';
    output += '</html>\n';
    return output;
}
/**
 * The main function that handles each individual "block" of HTML for the printout of hte ballot
 * I am defining one "block" to be either one race or proposition 
 *
 * This function will be called once for each iteration of the for loops in the main HTML generating function
 *
 *  ***TODO - Right now, we rely on hardcoding in selections the helper functions for dealing with multi-person races 
 *            using the number of the race or proposition (what I later call the "block number") since the races
 *            for this research is remaining fixed (for the next few months at least) 
 * 
 */
function handleOneBlockHTML(blockNumber) {
    var chosenTicket;
    var chosenTicketParty; //should be just null for propositions (I hope?)
    var nameOfRace = races[blockNumber].title;
    var selection = false; //flag for if there was a selectoin
    var twoPersonSelection = false; //for now, just a flag for presidential elections (two people on ticket)

    //TODO - see docstring; eventually will figure this out from other information, instead of hardcoding it like this
    //WARNING!!! - if you take out the error checking inside this, you will need to change this to an && for proper behavior!
    if (blockNumber == 0 || nameOfRace == "President and Vice President") {
        //twoPersonSelection = true;

        //ture&&true==true, false&&false==false, and trueXORtrue is an error
        //unfortunately there is no quick XOR in javascript, so I made the earlier line an OR and then checked if either were false
        //if (blockNumber != 0 || nameOfRace != "President and Vice President") {
        //    console.log("\nAs of now, only the Presidential election can have two candidates\n");
        //    var errorString = "ERROR IN TWO PERSON SELECTION!!!!!! nameOfRace is " + nameOfRace + "and blockNumber is " + 0 + " ; one of these is wrong!";
        //    console.log('\n\n\n\n\n' + errorString + '\n\n\n\n\n');
        //    return errorString;
        //}
    }

    //determine who the person voted for, if any
    //races[blockNumber] gets something that looks like:          Object {title: "President and Vice President", number: "1", cand: HTMLCollection[3], candidates: Array[3]}
    //races[blockNumber].candidates[candidateNumber] gets something like:           Object {index: 1, voted: true, name: "Vernon Stanley Albury and Richard Rigby", party: "DEM"}
    //the blockNumber, the races[blockNumber].candidate[candidateNumber].name and .party, and races[blockNumber].title are the four things I really need to generate the block
    //note that the internal logic for a proposition is identical, the "names" are 'yes' and 'no' and the "party" is ' '
    for (var l = 0; l < races[blockNumber].candidates.length; l++) {
        if (races[blockNumber].candidates[l].voted == true) {
            selection = true;
            chosenTicket = races[blockNumber].candidates[l].name; //NOTE THAT THIS MIGHT BE MORE THAN ONE NAME!
            chosenTicketParty = races[blockNumber].candidates[l].party === undefined ? "" : races[blockNumber].candidates[l].party;
        }
    }

    //this means the voter skipped this one, and didn't make a selection
    if (selection == false) {
        return generateBlock_NOSELECTION(blockNumber, nameOfRace);
    }

        //this means the voter DID make a selection
    else if (selection == true) {
        //TODO - see docstring; eventually this will need to support more types of blocks, and handle more than just Presidential two-person tickets

        if (twoPersonSelection == true) {
            if (nameOfRace == "President and Vice President") {
                var helperArray = chosenTicket.split(" and ", 2);
                //console.log("\n\n\n\n testing - these should be two names!->   " +  helperArray[0] + helperArray[1] + "from this array ->   " + helperArray);
                return generateBlock_Race_TwoPersonSelection(blockNumber, helperArray[0], helperArray[1], chosenTicketParty, nameOfRace);
            }
            else {
                //As of now, only the Presidential election can have two candidates\n");
                throw ("ERROR IN TWO PERSON SELECTION! nameOfRace is " + nameOfRace + "instead of President And Vice President");
            }
        }

        else if (twoPersonSelection == false) {
            return generateBlock_Race_OnePersonSelection(blockNumber, chosenTicket, chosenTicketParty, nameOfRace);
        }

        else {
            throw ('ERROR - twoPersonSelection is netiher true nor false')
        }
    }

    else {
        throw ('ERROR - selection is neither true nor false');
    }

}

/*************************************
 *** BEGIN BLOCK GENERATION FUNCTIONS 
 *
 * These are the various functions that generate the actual text of each of the blocks
 *
 * Name style:
 *      generateBlock_<either 'Race' or Proposition>_<additional specifications>
 *  
 * inputs: blockNumber, chosenCandidate, chosenCandidateParty
 * 
 * Each should follow the same general format (excepting the NOSELECTION function), and will return the text as a string
 * 
 * TODO - propositions
 */

/*
 * Standard sort of election race. with one person on each ticket
 *
 * TODO - don't use block number to determine the race like this - change it to take in an inputted
 * string like with the candidate and part
 */
function generateBlock_Race_OnePersonSelection(blockNumber, chosenCandidate, chosenCandidateParty, nameOfRace) {

    //TODO - assuming the syntax used in the twopersonselection works, condense this similarly
    var constructingBlock = '';
    /*
        console.log("\n");
        console.log("The things we have are blockNumber, chosenCandidate, chosenCandidateParty, and nameOfRace ->    " + blockNumber + chosenCandidate + chosenCandidateParty + nameOfRace);
        console.log("\n");
    */
    //stick in the name of the election
    constructingBlock += '<div class="electionOrProposition">' + nameOfRace + '</div> ';

    //stick in the selected candidate's name
    constructingBlock += '<div class="onlyOrSecondPerson">';
    constructingBlock += chosenCandidate;
    constructingBlock += '</div> ';

    //stick in the party of the selected candidate
    constructingBlock += '<div class="party">';
    constructingBlock += chosenCandidateParty
    constructingBlock += '</div>';
    constructingBlock += '<hr class ="divideRace">';

    return constructingBlock;
}


/*
 * Standard sort of election race, but with TWO people running together on each ticket
 *
 * For the demo, this is only for the presidential election'
 * 
 * TODO - eventually this will need to handle more than just the presidential election
 
 * TODO - don't use block number to determine the race like this - change it to take in an inputted
 * string like with the candidate and part
 */
function generateBlock_Race_TwoPersonSelection(blockNumber, chosenCandidate0, chosenCandidate1, chosenCandidateParty, nameOfRace) {

    var constructingBlock = '';

    if (blockNumber != 0) {
        //TODO - what sort of exception or error?
        console.log("Uh oh! Something other than the 0th race in the two person selection! Current blockNumber is: " + blockNumber);
    }
    if (nameOfRace != "President and Vice President") {
        //TODO - change the string above to the correct one
        console.log("Uh oh! Something other than the presidential election in the two person selection! Current nameOfRace is: " + nameOfRace);
    }
    /*
    console.log("\n");
    console.log("The things we have are blockNumber, chosenCandidate0, chosenCandidate1, chosenCandidateParty, and nameOfRace ->    " + blockNumber + chosenCandidate0 + chosenCandidate1 + chosenCandidateParty + nameOfRace);
    console.log("\n");
    */
    //stick in the name of the election
    constructingBlock += '<div class="electionOrProposition">' + nameOfRace + '</div>';

    // stick in the first person's name, as well as the "And"
    constructingBlock += '<div class="namePlusAND"> ' + chosenCandidate0 + 'and </div>';

    //stick in the second person's name/
    constructingBlock += '<div class="onlyOrSecondPerson">' + chosenCandidate1 + '</div>';

    //stick in the party of the selected candidate
    constructingBlock += '<div class="party">' + chosenCandidateParty + '</div>';
    constructingBlock += '<hr class ="divideRace">';

    return constructingBlock;
}

function generateBlock_NOSELECTION(blockNumber, nameOfRace) {
    //TODO - need to divide this so that we get the extra line for unselected two party tickets without relying on the block number like this
    var constructingBlock = '';
    constructingBlock += '<div class="electionOrProposition">' + nameOfRace + '</div>';

    if (blockNumber == 0) { //TODO - later on, when it's more general purpose, this quick hack won't work
        constructingBlock += '<br>\n' //Since unselected two-person tickets need an extra space in there
    }
    constructingBlock += '<div class="noSelection_outer"><div class="noSelection_inner">YOU DID NOT SELECT ANYTHING</div></div>'
    constructingBlock += '<hr class ="divideRace">';

    return constructingBlock;
}

function generateBlock_proposition(blockNumber, answerSelection) {
    constructingBlock += '<div class="electionOrProposition">' + nameOfRace + '</div>';
    constructingBlock += '<div class="onlyOrSecondPerson>' + answerSelection + '</div>';
    constructingBlock += '<hr class ="divideRace">';

}
/*** END BLOCK GENERATION FUNCTIONS
 *****************************************/

// JavaScript Document