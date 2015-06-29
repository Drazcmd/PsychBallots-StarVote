var races = [];
var props = [];
var voteLog = [];
var checkboxes = [
    'radio1',
    'radio2',
    'radio3'
];
var subjectID = 0;
var subject = 'STAR-Vote';
var numberOfRaces;
var numberOfProps;
var numberOfItems;
var qxml;
var box = 0;
var currentRace = 0;
var Counter = 0;
var goto = 0;
var title;
var xmlhttp;
var eventLog = [];
var prev = false;
var submitBallot = 'Ballot Submitted';
var choice1 = 'Choice-1';
var choice2 = 'Choice-2';
var choice3 = 'Choice-3';
var begin = 'Begin';
var next = 'Next';
var previous = 'Previous';
var review = 'Back To Review';
var rIndex = 0;
var ReviewClick0 = 'Reviewed Race 0';
var ReviewClick1 = 'Reviewed Race 1';
var ReviewClick2 = 'Reviewed Race 2';
var ReviewClick3 = 'Reviewed Race 3';
var ReviewClick4 = 'Reviewed Race 4';
var ReviewClick5 = 'Reviewed Race 5';
var ReviewClick6 = 'Reviewed Race 6';
var ReviewClick7 = 'Reviewed Race 7';
var ReviewClick8 = 'Reviewed Race 8';
var ReviewClick9 = 'Reviewed Race 9';
var ReviewClick10 = 'Reviewed Race 10';
var ReviewClick11 = 'Reviewed Race 11';
var ReviewClick12 = 'Reviewed Race 12';
var ReviewClick13 = 'Reviewed Race 13';
var ReviewClick14 = 'Reviewed Race 14';
var ReviewClick15 = 'Reviewed Race 15';
var ReviewClick16 = 'Reviewed Race 16';
var ReviewClick17 = 'Reviewed Race 17';
var ReviewClick18 = 'Reviewed Race 18';
var ReviewClick19 = 'Reviewed Race 19';
var ReviewClick20 = 'Reviewed Race 20';
var ReviewClick21 = 'Reviewed Race 21';
var ReviewClick22 = 'Reviewed Race 22';
var ReviewClick23 = 'Reviewed Race 23';
var ReviewClick24 = 'Reviewed Race 24';
var ReviewClick25 = 'Reviewed Race 25';
var ReviewClick26 = 'Reviewed Race 26';
var endoftask = 'Printed ballot_finished voting';
var movingtoprint = 'Finish Reviewing Ballot';

function connect() {
    var fileName = "election.xml";
    xmlhttp = null;
    try {
        // IE7+, Firefox, Opera 8.0+, Safari...
        xmlhttp = new XMLHttpRequest();
    }
    catch (ex) {
        // Internet Explorer...
        try {
            xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (ex) {
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
    }


    if (xmlhttp == null) {
        window.alert('AJAX is not available in this browser');
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
        return new ActiveXObject('Microsoft.XMLHTTP');
    }
}
function stateChanged() {
    var state = xmlhttp.readyState;
    //When state = 4 the file has been received
    //alert("state: "+ state);
    document.getElementById('Debug').value = state;
    //Puts the state in the status field just for testing purposes
    if (state === 4) {
        qxml = xmlhttp.responseXML;
        // The global variable qml is equal to the xml file
        start();
    }
}

function loadData() {

    var uri = new Windows.Foundation.Uri("ms-appx:///rsrc/election.xml");


    console.log("The URI is: " + uri.absoluteCanonicalUri);

    Windows.Data.Xml.Dom.XmlDocument.loadFromUriAsync(uri).done(

        function (file) {
            console.log("Finished!");
            console.log(file);
            qxml = file;

            start();

        },

        function (error) {

            console.log("---------- Error ----------");
            console.log(error.stack);
            console.log(error.asyncOpSource.stack + " called " + error.asyncOpType);
            console.log("---------------------------");
        }
    );

    // Wait for the promise to finish
    //while (!promise.Completed);
    console.log("Promise has completed");


}


function start() {

    //var uri = new Windows.Foundation.Uri('ms-appx:///rsrc/election.xml');
    //Windows.Storage.StorageFile.getFileFromApplicationUriAsync(uri).done(function(file) {
    //    qxml = file;
    //});
    ////qxml = window.Windows.Data.Xml.Dom.XmlDocument.LoadFromFileAsync("/");

    //loadData();
    console.log(qxml);

    numberOfRaces = qxml.getElementsByTagName("race").length;
    var races1 = [];
    for (var j = 0; j < numberOfRaces; j++) {
        races1[j] = {};
        var currentRace = qxml.getElementsByTagName("race")[j];
        races1[j].title = currentRace.getElementsByTagName("title")[0].firstChild.nodeValue;
        races1[j].number = currentRace.getElementsByTagName("number")[0].firstChild.nodeValue;
        races1[j].cand = currentRace.getElementsByTagName("candidate");
        races1[j].candidates = [];
        for (var i = 0; i < races1[j].cand.length; i++) {
            races1[j].candidates[i] = {};
            races1[j].candidates[i].index = i;
            races1[j].candidates[i].voted = false;
            races1[j].candidates[i].name = races1[j].cand[i].getElementsByTagName("name")[0].firstChild.nodeValue;
            races1[j].candidates[i].party = races1[j].cand[i].getElementsByTagName("party")[0].firstChild.nodeValue;
        }
    }
    numberOfProps = qxml.getElementsByTagName("proposition").length;
    console.log("number of props" + numberOfProps);
    for (var p = 0; p < numberOfProps; p++) {
        props[p] = {};
        props[p].log = [];
        var currentProp = qxml.getElementsByTagName("proposition")[p];
        props[p].title = currentProp.getElementsByTagName("title")[0].firstChild.nodeValue;
        props[p].text = currentProp.getElementsByTagName("propositionText")[0].firstChild.nodeValue;
        props[p].number = currentProp.getElementsByTagName("number")[0].firstChild.nodeValue;
        props[p].cand = currentProp.getElementsByTagName("response");
        props[p].candidates = [];
        for (var l = 0; l < props[p].cand.length; l++) {
            props[p].candidates[l] = {};
            props[p].candidates[l].index = l;
            props[p].candidates[l].voted = false;
            if (l === 0) {
                props[p].candidates[l].name = "Yes";
                props[p].candidates[l].party = " ";
            } else {
                props[p].candidates[l].name = "No";
                props[p].candidates[l].party = " ";
            }    //props[p].candidates[l].name = props[p].cand[l].getElementsByTagName("response")[0].firstChild.nodeValue
        }
    }
    races = races1.concat(props);    //alert("Races legnth: "+races1.length);
                                     //alert("Races legnth: "+races.length);
    //alert("Props Length: "+props.length);

    numberOfItems = numberOfProps + numberOfRaces;

    // Now populate the review screen with review buttons

    // First, see how many columns we need
    if (numberOfItems < 13) {
        // Only one column
        var col = document.createElement("div");
        col.id = "reviewOnly";
        col.style = "visibility: hidden";

        document.getElementById("reviews").appendChild(col);
    } else {

        var leftCol = document.createElement("div");
        leftCol.id = "reviewLeft";
        leftCol.style = "visibility: hidden";

        document.getElementById("reviews").appendChild(leftCol);

        var rightCol = document.createElement("div");
        rightCol.id = "reviewRight";
        rightCol.style = "visibility: hidden";

        document.getElementById("reviews").appendChild(rightCol);
    }

    // NOTE We can only handle up to 26 items
    for (var idx = 0; idx < numberOfItems; idx++) {
        
        var reviewButton = document.createElement("div");

        reviewButton.id = "race" + idx;
        reviewButton.class = "race";

        reviewButton.setAttribute("onClick", "goToAndRecord(" + idx + ");");


        var raceTitle = document.createElement("div");
        raceTitle.id = "raceTitle" + idx;
        raceTitle.class = "title";

        var raceBox = document.createElement("div");
        raceBox.id = "raceBox" + idx;
        raceBox.class = "noSel";

        var raceSel = document.createElement("div");
        raceSel.id = "race" + idx + "p";
        raceSel.class = "raceSel";

        var partySel = document.createElement("div");
        partySel.id = "party" + idx;
        partySel.class = "party";

        raceBox.appendChild(raceSel);
        raceBox.appendChild(partySel);


        reviewButton.appendChild(raceTitle);
        reviewButton.appendChild(raceBox);

        if (numberOfItems < 13) {

            document.getElementById("reviewOnly").appendChild(reviewButton);

        } else {
            if (idx < 13) {

                document.getElementById("reviewLeft").appendChild(reviewButton);

            } else {

                document.getElementById("reviewRight").appendChild(reviewButton);
            }
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
    subjectID = document.getElementById('idText').value;
    if (subjectID === '') {
        var dialog = new Windows.UI.Popups.MessageDialog('You must enter correctly your 5-digit authentication number.');

        cmd = new Windows.UI.Popups.UICommand();
        cmd.label = "Okay";
        dialog.commands.append(cmd);

        dialog.showAsync();
    } else {
        document.getElementById('IDArea').value = subjectID + ' ' + subject;
        document.getElementById('info').style.visibility = 'visible';
        //shows election information page or start
        document.getElementById('ID').style.display = 'none';
        //hides the elements on the authentication page
        document.getElementById('enterID').style.display = 'none';
        document.getElementById('idText').style.display = 'none';
    }
}
function gotoFirstInstructions() {
    //takes voter to instructions page
    document.getElementById('first_instructions').style.display = 'block';
    //de-invisibles
    document.getElementById('first_instructions').style.visibility = 'visible';
    //displays instructions
    document.getElementById('Back').style.visibility = 'visible';
    //shows the back button that takes you to the election info page
    document.getElementById('Begin').style.visibility = 'visible';
    //shows the button that is pressed to start voting
    document.getElementById('info').style.display = 'none';    //makes the instructions invisible
}
function gotoInfo() {
    //Takes voter from instructions page back to election info page
    document.getElementById('Begin').style.visibility = 'hidden';
    //hides the bigin and back buttons shown on the instructions page
    document.getElementById('Back').style.visibility = 'hidden';
    document.getElementById('first_instructions').style.display = 'none';
    //makes the instructions invisible
    document.getElementById('info').style.display = 'block';    //shows election information page or start
}
//moves through the races one increment at a time
function Nav(x) {
    document.getElementById('Debug').value = 'Nav( ' + x + ' )';

    // Handle the error cases
    if (goto < 0) {
        goto = 0;
    }
    if (goto > numberOfItems) {
        goto = numberOfItems;
    }

    // This means we're going back
    if (x === 0) {

        // If we're not going back to the start, go to the previous page
        if (goto > 0) {
            goto = goto - 1;
        }
        prev = true;
    } else if (x === 1)

        // Otherwise, we're going forward so go to the next page
        if (goto < numberOfItems) {
            {
                goto++;
            }
            prev = false;
        } else {
            prev = false;
        }
    document.getElementById('Debug').value = 'r = ' + goto;
    Next(goto);
}
//Major page elements shown/not shown
function Next(y) {
    document.getElementById('Debug').value = 'Next( ' + y + ' )';
    currentRace = y;
    //when leaving first instructions, hide instructions, show questions, and change button message
    Counter = y;
    if (Counter === 0) {
        //document.getElementByID("Clear").style.visibility="visible"
        document.getElementById('Begin').style.display = 'none';
        document.getElementById('Back').style.display = 'none';
        document.getElementById('Next').style.visibility = 'visible';
        document.getElementById('Previous').style.visibility = 'hidden';
        //need to make unusable on first screen
        //document.getElementByID("votes").style.visibility = "visible"
        //document.getElementByID("VotingContentDIV").style.visibility="visible"; //Why does keeping this in break the interface?
        document.getElementById('first_instructions').style.display = 'none';
        document.getElementById('TitleDIV').style.display = 'none';
        document.getElementById('propText').style.display = 'none';
        //document.getElementById("TitleDIV").style.visibility="hidden"
        //document.getElementById("propText").style.visibility="hidden"
        document.getElementById('voteFor').style.display = 'block';
        document.getElementById('voteFor').style.visibility = 'visible';
        document.getElementById('progress').innerHTML = currentRace + 1 + ' of ' + numberOfItems;
        //progress in footer
        nextRace(Counter);
    }    //while voting, clicking next records selection and continues to next race 
    else if (Counter < numberOfRaces && Counter > 0) {

        console.log("Showing race " + Counter + "!");
        // document.getElementById("Clear").style.visibility="visible"
        document.getElementById('Debug').value = 'Next < ' + numberOfRaces;
        document.getElementById('Previous').style.visibility = 'visible';
        //document.getElementByID("VotingContentDIV").style.visibility="hidden"
        //document.getElementById("next_instructions").style.visibility="hidden"
        document.getElementById('TitleDIV').style.display = 'none';
        document.getElementById('propText').style.display = 'none';
        document.getElementById('TitleDIV').style.visibility = 'hidden';
        document.getElementById('propText').style.visibility = 'hidden';
        document.getElementById('voteFor').style.display = 'block';
        document.getElementById('voteFor').style.visibility = 'visible';
        //document.getElementByID("votes").style.visibility = "visible"
        document.getElementById('progress').innerHTML = currentRace + 1 + ' of ' + numberOfItems;
        //progress in footer
        //if(prev==false){
        nextRace(Counter);
    } else if (Counter >= numberOfRaces && Counter < numberOfItems) {
        console.log("Showing prop " + Counter + "!");
        // document.getElementById("Clear").style.visibility="visible"
        //document.getElementById("VotingContentDIV").style.visibility="visible" //not for prop
        document.getElementById('TitleDIV').style.display = 'block';
        document.getElementById('propText').style.display = 'block';
        //document.getElementByID("votes").style.visibility = "visible"
        document.getElementById('TitleDIV').style.visibility = 'visible';
        document.getElementById('propText').style.visibility = 'visible';
        document.getElementById('voteFor').style.display = 'none';
        document.getElementById('Debug').value = 'Next > ' + numberOfRaces;
        document.getElementById('progress').innerHTML = currentRace + 1 + ' of ' + numberOfItems;
        //progress in footer
        nextProp(Counter);
    } else if (Counter === numberOfItems) {
        //recordVote();
        document.getElementById('reviews').style.display = 'block';
        document.getElementById('reviews').style.visibility = 'visible';
        document.getElementById('reviewTop').style.visibility = 'visible';

        if (numberOfItems > 13) {
            document.getElementById('reviewLeft').style.visibility = 'visible';
            document.getElementById('reviewRight').style.visibility = 'visible';
        } else {
            document.getElementById('reviewOnly').style.visibility = 'visible';
        }
        //document.getElementById("grid").style.visibility="hidden"
        //document.getElementById("Clear").style.visibility="hidden"
        //document.getElementById("VotingContentDIV").style.display="none"
        document.getElementById('propText').style.visibility = 'hidden';
        document.getElementById('racetitle').style.visibility = 'Hidden';
        //document.getElementById("voteFor").style.visibility="hidden"
        document.getElementById('first').style.visibility = 'hidden';
        document.getElementById('second').style.visibility = 'hidden';
        document.getElementById('third').style.visibility = 'hidden';
        //document.getElementById("VotingContentDIV").style.visibility = "hidden"
        //document.getElementById("TitleDIV").innerHTML = "Review Choices"
        document.getElementById('Next').style.display = 'none';
        document.getElementById('Previous').style.visibility = 'hidden';
        document.getElementById('Next').style.visibility = 'hidden';
        document.getElementById('progress').style.visibility = 'hidden';
        document.getElementById('finishUp').style.visibility = 'visible';
        //document.getElementById("datafield").style.visibility= "visible"
        //document.getElementById("votinginstructions").style.visibility ="visible"
        //document.getElementById("votinginstructions").innerHTML = "Shown below are the selections you have made. Click on a race to change your selection. To submit your ballot, click the Submit button, and your vote will be recorded."
        goToReview();
    }    //ChangeSteps()    //added in in case it impacts reading
}
function goToReview() {
    //the review screen
    var checkboxes = [
        'radio1',
        'radio2',
        'radio3'
    ];
    for (box = 0; box < races[rIndex].candidates.length; box++) {
        document.getElementById(checkboxes[box]).checked = false;
    }
    //document.getElementById("Clear").style.visibility="hidden"
    document.getElementById('Review').style.display = 'none';
    document.getElementById('Review').style.visibility = 'hidden';
    document.getElementById('finishUp').style.display = 'inline-block';
    document.getElementById('finishUp').style.visibility = 'visible';
    document.getElementById('p1').style.visibility = 'hidden';
    document.getElementById('p2').style.visibility = 'hidden';
    document.getElementById('p3').style.visibility = 'hidden';
    document.getElementById('reviews').style.display = 'block';
    document.getElementById('reviews').style.visibility = 'visible';
    document.getElementById('reviewTop').style.visibility = 'visible';
    if (numberOfItems > 13) {
        document.getElementById('reviewLeft').style.visibility = 'visible';
        document.getElementById('reviewRight').style.visibility = 'visible';
    } else {
        document.getElementById('reviewOnly').style.visibility = 'visible';
    }
    //document.getElementById("grid").style.visibility="hidden"
    //document.getElementById("VotingContentDiv").style.display="none"
    document.getElementById('propText').style.visibility = 'hidden';
    document.getElementById('racetitle').style.visibility = 'Hidden';
    document.getElementById('voteFor').style.visibility = 'hidden';
    document.getElementById('first').style.visibility = 'hidden';
    document.getElementById('second').style.visibility = 'hidden';
    document.getElementById('third').style.visibility = 'hidden';
    document.getElementById('progress').style.visibility = 'hidden';
    //document.getElementById("VotingContentDIV").style.visibility = "hidden"
    document.getElementById('TitleDIV').style.display = 'none';
    //document.getElementById("TitleDIV").style.visibility="visible"
    //document.getElementById("TitleDIV").innerHTML = "Review Choices";
    //document.getElementById("datafield").style.visibility= "visible"
    //document.getElementById("votinginstructions").style.visibility ="visible"
    //document.getElementById("votinginstructions").innerHTML = "Shown below are the selections you have made. Click on a race to change your selection. To submit your ballot, click the Submit button, and your vote will be recorded."
    //document.getElementById("submitScreen").style.visibility = "hidden";
    //document.getElementById("submitHeading").style.visibility="hidden";
    //document.getElementByID("submitText").style.visibility="hidden";
    //document.getElementByID("submitScreenBtns").style.visibility="hidden";
    //document.getElementByID("submit").style.visibility="hidden";
    //document.getElementByID("returnToBallot").style.visibility="hidden";
    for (var x = 0; x < races.length; x++) {
        var selection = false;
        var title = races[x].title;
        //title = title.bold();
        for (var l = 0; l < races[x].candidates.length; l++) {
            if (races[x].candidates[l].voted === true) {
                selection = true;
                document.getElementById('race' + (x )).style.background = '#FFF';
                document.getElementById('raceTitle' + (x )).innerHTML = x  + '. ' + title;
                document.getElementById('race' + (x ) + 'p').innerHTML = races[x].candidates[l].name;
                document.getElementById('raceBox' + (x )).className = 'sel';
                if (races[x].candidates[l].party === 'REP') {
                    document.getElementById('party' + (x )).innerHTML = 'REP';
                } else if (races[x].candidates[l].party === 'DEM') {
                    document.getElementById('party' + (x )).innerHTML = 'DEM';
                } else if (races[x].candidates[l].party === 'IND') {
                    document.getElementById('party' + (x )).innerHTML = 'IND';
                } else if (races[x].candidates[l].party === 'LIB') {
                    document.getElementById('party' + (x )).innerHTML = 'LIB';
                } else if (races[x].candidates[l].party === 'GRN') {
                    document.getElementById('party' + (x )).innerHTML = 'GRN';
                } else if (races[x].candidates[l].party === 'CON') {
                    document.getElementById('party' + (x )).innerHTML = 'CON';
                } else {
                    document.getElementById('party' + (x )).innerHTML = '';
                }
            }
        }
        if (selection === false) {
            document.getElementById('raceTitle' + (x )).innerHTML = x  + '. ' + title;
            document.getElementById('race' + (x ) + 'p').innerHTML = 'You did not vote for anyone. If you want to vote, touch here.';
            document.getElementById('party' + (x )).innerHTML = ' ';
            document.getElementById('raceBox' + (x )).className = 'noSel';    //document.getElementById("race"+(x+1)).style.backgroundColor = "#ff6600"
        }
    }
}
function recordVote() {
    //each time next is clicked, the vote is added to data (array of objects) and wipes the checkboxes clean.
    var time = new Date();
    var selection = false;
    var e = {};

    e.type = races[currentRace].number;
    for (var box = 0; box < races[currentRace].candidates.length; box++) {
        if (document.getElementById(checkboxes[box]).checked) {
            races[currentRace].candidates[box].voted = true;
            e.choice = races[currentRace].candidates[box].name;
            e.party = races[currentRace].candidates[box].party;
            selection = true;
        } else {
            races[currentRace].candidates[box].voted = false;
        }
    }
    if (selection === false) {
        e.choice = 'No Selection';
        e.party = 'None';
    }
    e.time = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + '.' + time.getMilliseconds();
    voteLog.push(e);
}
function recordEvent(b) {
    var e, time;
    if (currentRace > 0 && currentRace < numberOfItems) {
        e = {};
        time = new Date();
        e.type = b;
        console.log('Current race: ' + currentRace);
        e.page = races[currentRace].number;
        e.time = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + '.' + time.getMilliseconds();
        eventLog.push(e);
    } else if (currentRace >= numberOfItems) {
        e = {};
        time = new Date();
        e.type = b;
        e.page = '';
        e.time = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + '.' + time.getMilliseconds();
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
    for (var x = 0; x < races[index].candidates.length; x++) {
        races[index].candidates[x].voted = false;
    }
    for (var box = 0; box < checkboxes.length; box++) {
        if (document.getElementById(checkboxes[box]).checked === true) {
            races[index].candidates[box].voted = true;
            e.choice = races[index].candidates[box].name;
            e.party = races[index].candidates[box].party;
            selection = true;
        }
        document.getElementById(checkboxes[box]).checked = false;
    }
    if (selection === false) {
        e.choice = 'No Selection';
        e.party = 'None';
    }
    e.time = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ':' + time.getMilliseconds();
    voteLog.push(e);
    goToReview();
}
//Selects the button/candidate, but cannot deselect
function selectChoice(j) {
    //alert("Selected!")
    var index = j;
    var flag = false;
    var selID, unsel1, unsel2 = '';
    if (index === 1) {
        document.getElementById('radio1').checked = !document.getElementById('radio1').checked;
        flag = document.getElementById('radio1').checked;
        selID = '1';
        unsel1 = '2';
        unsel2 = '3';
    } else if (index === 2) {
        document.getElementById('radio2').checked = !document.getElementById('radio2').checked;
        flag = document.getElementById('radio2').checked;
        selID = '2';
        unsel1 = '1';
        unsel2 = '3';
    } else if (index === 3) {
        document.getElementById('radio3').checked = !document.getElementById('radio3').checked;
        flag = document.getElementById('radio3').checked;
        selID = '3';
        unsel1 = '1';
        unsel2 = '2';
    }
    if (flag) {
        document.getElementById('Next').setAttribute('class', 'next');
        document.getElementById('Next').innerHTML = 'Next';
        document.getElementById('c' + selID).style.color = 'white';
        document.getElementById('p' + selID).style.color = 'white';
    } else {
        document.getElementById('Next').setAttribute('class', 'skip');
        document.getElementById('Next').innerHTML = 'Skip';
        document.getElementById('c' + selID).style.color = 'black';
        document.getElementById('p' + selID).style.color = 'black';
    }
    document.getElementById('c' + unsel1).style.color = 'black';
    document.getElementById('p' + unsel1).style.color = 'black';
    document.getElementById('c' + unsel2).style.color = 'black';
    document.getElementById('p' + unsel2).style.color = 'black';
    recordVote();
}
function goToRace(n) {

    // This should never happen
    if (n > numberOfItems || n < 0) {
        throw new Error("Index out of range");
    }

    currentRace = n;
    rIndex = n;
    document.getElementById('c1').style.color = 'black';
    document.getElementById('p1').style.color = 'black';
    document.getElementById('c2').style.color = 'black';
    document.getElementById('p2').style.color = 'black';
    document.getElementById('c3').style.color = 'black';
    document.getElementById('p3').style.color = 'black';
    //alert("Now setting up the checkboxes!");
    for (box = 0; box < races[n].candidates.length; box++) {
        document.getElementById(checkboxes[box]).checked = races[n].candidates[box].voted === true;
        if (document.getElementById(checkboxes[box]).checked) {
            var id = '';
            if (box === 0) {
                id = '1';
            } else if (box === 1) {
                id = '2';
            } else if (box === 2) {
                id = '3';
            } else {
                alert('Something has gone wrong!');
            }
            document.getElementById('c' + id).style.color = 'white';
            document.getElementById('p' + id).style.color = 'white';
            document.getElementById('Next').setAttribute('class', 'next');
            document.getElementById('Next').innerHTML = 'Next';
        }
    }
    if (rIndex < numberOfRaces)
        //for Races
    {

        console.log("Showing a race!");
            // document.getElementById("Clear").style.visibility="visible"
            document.getElementById('finishUp').style.display = 'none';
            document.getElementById('finishUp').style.visibility = 'hidden';
            document.getElementById('Review').style.display = 'inline-block';
            document.getElementById('Review').style.visibility = 'visible';
            //document.getElementById("votinginstructions").style.visibility ="visible"
            document.getElementById('reviews').style.display = 'none';
            document.getElementById('reviews').style.visibility = 'hidden';
            document.getElementById('reviewTop').style.visibility = 'hidden';
            //document.getElementById('review1').style.visibility = 'hidden';
            //document.getElementById('review2').style.visibility = 'hidden';
            //document.getElementById("VotingContentDiv").style.display="block"
            document.getElementById('Debug').value = 'Next Race Counter= ' + rIndex;
            document.getElementById('racetitle').style.visibility = 'visible';
            document.getElementById('racetitle').innerHTML = ' ';
            document.getElementById('racetitle').className = 'racetitle';
            //document.getElementById("racetitle").style.fontSize = "24px";
            //document.getElementById("racetitle").setAttribute("align", "center");
            //document.getElementById("TitleDIV").innerHTML = races[rIndex].title
            document.getElementById('TitleDIV').style.display = 'none';
            document.getElementById('TitleDIV').style.visibility = 'hidden';
            document.getElementById('propText').style.display = 'none';
            document.getElementById('propText').style.visibility = 'hidden';
            document.getElementById('racetitle').innerHTML = races[rIndex].title;
            document.getElementById('voteFor').style.display = 'block';
            document.getElementById('voteFor').style.visibility = 'visible';
            //Vote for 1.
            document.getElementById('first').style.visibility = 'visible';
            document.getElementById('second').style.visibility = 'visible';
            document.getElementById('third').style.visibility = 'visible';
            document.getElementById('first').className = 'candidate';
            document.getElementById('second').className = 'candidate';
            document.getElementById('p1').style.visibility = 'visible';
            document.getElementById('p2').style.visibility = 'Visible';
            document.getElementById('p3').style.visibility = 'visible';
            document.getElementById('progress').style.visibility = 'visible';
            document.getElementById('progress').innerHTML = n + 1 + ' of ' + numberOfItems;
            // document.getElementById("votinginstructions").innerHTML= "To make your choice, click on the box next to the candidate's name. A checkmark will appear next to your choice. If you want to change your choice, just click on a different candidate's box. Please select only ONE candidate."
            //Clean the checkboxes to make sure there are no weird selections
            for (box = 0; box < checkboxes.length; box++)
                document.getElementById(checkboxes[box]).checked = false;
            for (box = 0; box < races[rIndex].candidates.length; box++) {
                document.getElementById(checkboxes[box]).checked = races[rIndex].candidates[box].voted === true;
            }
            var t = new Array(races[rIndex].cand.length);
            var p = new Array(races[rIndex].cand.length);
            for (var i = 0; i < races[rIndex].cand.length; i++) {
                t[i] = races[rIndex].cand[i].getElementsByTagName('name')[0];
                p[i] = races[rIndex].cand[i].getElementsByTagName('party')[0];
            }
            // loop that adds candidates to and parties to array
            if (races[rIndex].cand.length > 2) {
                document.getElementById('first').style.visibility = 'visible';
                document.getElementById('second').style.visibility = 'visible';
                document.getElementById('third').style.visibility = 'visible';
            }
            if (races[rIndex].cand.length === 2) {
                document.getElementById('third').style.visibility = 'hidden';
                document.getElementById('p3').style.visibility = 'hidden';
            }
            if (races[rIndex].cand.length === 1) {
                document.getElementById('second').style.visibility = 'hidden';
                document.getElementById('third').style.visibility = 'hidden';
                document.getElementById('p2').style.visibility = 'hidden';
                document.getElementById('p3').style.visibility = 'hidden';
            }
            for (h = 0; h < races[rIndex].cand.length; h++) {
                document.getElementById('c' + (h + 1)).innerHTML = races[rIndex].candidates[h].name;
                document.getElementById('p' + (h + 1)).innerHTML = races[rIndex].candidates[h].party;
            }
        }
    else if (rIndex > numberOfRaces) {
        //document.getElementById("Clear").style.visibility="visible"
        document.getElementById('finishUp').style.visibility = 'hidden';
        document.getElementById('Review').style.display = 'inline-block';
        document.getElementById('Review').style.visibility = 'visible';
        //document.getElementById("votinginstructions").style.visibility ="visible"
        document.getElementById('reviews').style.display = 'none';
        document.getElementById('reviews').style.visibility = 'hidden';
        document.getElementById('reviewTop').style.visibility = 'hidden';
        document.getElementById('review1').style.visibility = 'hidden';
        document.getElementById('review2').style.visibility = 'hidden';
        document.getElementById('Debug').value = 'Next Prop Counter= ' + Counter;
        //document.getElementById("VotingContentDiv").style.display="block"
        document.getElementById('TitleDIV').style.display = 'block';
        document.getElementById('TitleDIV').style.visibility = 'visible';
        document.getElementById('TitleDIV').innerHTML = races[rIndex].title;
        //document.getElementById("votinginstructions").innerHTML = "Click on the box next to the response to make a selection.  A checkmark will appear next to your choice. If you want to change your choice, just click on a different box."
        document.getElementById('propText').style.display = 'block';
        document.getElementById('propText').style.visibility = 'visible';
        document.getElementById('racetitle').style.visibility = 'visible';
        document.getElementById('first').style.visibility = 'visible';
        document.getElementById('second').style.visibility = 'visible';
        document.getElementById('racetitle').className = 'racetitle';
        //document.getElementById("racetitle").style.fontSize = "17px";
        //document.getElementById("racetitle").setAttribute("align", "left");
        document.getElementById('third').style.visibility = 'hidden';
        document.getElementById('second').style.visiblility = 'visible';
        document.getElementById('first').style.visibility = 'visible';
        document.getElementById('first').className = 'propchoice';
        document.getElementById('second').className = 'propchoice';
        document.getElementById('racetitle').className = 'propText';
        document.getElementById('racetitle').innerHTML = '';
        document.getElementById('c1').innerHTML = '';
        document.getElementById('c2').innerHTML = '';
        document.getElementById('p1').style.visibility = 'hidden';
        document.getElementById('p2').style.visibility = 'hidden';
        document.getElementById('progress').style.visibility = 'visible';
        document.getElementById('progress').innerHTML = n + 1 + ' of ' + numberOfItems;
        document.getElementById('racetitle').innerHTML = races[rIndex].text;
        for (var box = 0; box < races[rIndex].candidates.length; box++) {
            document.getElementById(checkboxes[box]).checked = !!races[rIndex].candidates[box].voted;
        }
        for (var h = 0; h < races[rIndex].cand.length; h++) {
            document.getElementById('c' + (h + 1)).innerHTML = races[rIndex].candidates[h].name;
        }
    }
}
//displays race to voter
function nextRace(counter) {
    //document.getElementById("reviews").style.display = "none";
    //document.getElementById("reviews").style.visibility = "hidden";
    //document.getElementById("reviewTop").style.visibility = "hidden";
    //document.getElementById("review1").style.visibility = "hidden";
    //document.getElementById("review2").style.visibility = "hidden";
    document.getElementById("Debug").value = "Next Race Counter= " + counter;
    document.getElementById("racetitle").style.visibility = "visible";
    document.getElementById("racetitle").innerHTML = " ";
    document.getElementById("racetitle").className = "racetitle";
    //document.getElementById("racetitle").style.fontSize = "24px";
    //document.getElementById("racetitle").setAttribute("align", "center");
    //document.getElementById("TitleDIV").innerHTML = races[Counter].title
    document.getElementById("racetitle").innerHTML = races[counter].title;
    document.getElementById("voteFor").style.visibility = "visible";
    //Vote for 1.
    document.getElementById("propText").style.visibility = "hidden";
    //document.getElementByID("propText").style.visibility = "hidden" not in old document
    document.getElementById("first").style.visibility = "visible";
    document.getElementById("second").style.visibility = "visible";
    document.getElementById("third").style.visibility = "visible";
    document.getElementById("first").className = "candidate";
    document.getElementById("second").className = "candidate";
    //document.getElementById("p1").style.visibility="visible";
    //document.getElementById("p2").style.visibility= "visible";
    //Clean the checkboxes to make sure there are no weird selections
    for (box = 0; box < checkboxes.length; box++) {
        document.getElementById(checkboxes[box]).checked = false;
        document.getElementById("Next").setAttribute("class", "skip");
        document.getElementById("Next").innerHTML = "Skip";
    }
    document.getElementById("c1").style.color = "black";
    document.getElementById("p1").style.color = "black";
    document.getElementById("c2").style.color = "black";
    document.getElementById("p2").style.color = "black";
    document.getElementById("c3").style.color = "black";
    document.getElementById("p3").style.color = "black";
    document.getElementById("p1").style.visibility = "visible";
    document.getElementById("p2").style.visibility = "visible";
    document.getElementById("p3").style.visibility = "visible";
    //alert("Now setting up the checkboxes!");
    for (box = 0; box < races[counter].candidates.length; box++) {
        document.getElementById(checkboxes[box]).checked = races[counter].candidates[box].voted === true;
        if (document.getElementById(checkboxes[box]).checked) {
            var id = "";
            if (box === 0) {
                id = "1";
            } else if (box === 1) {
                id = "2";
            } else if (box === 2) {
                id = "3";
            } else {
                throw new Error("Something has gone wrong!");
            }
            document.getElementById("c" + id).style.color = "white";
            document.getElementById("p" + id).style.color = "white";
            document.getElementById("Next").setAttribute("class", "next");
            document.getElementById("Next").innerHTML = "Next";

            break;
        }
    }

    var t = new Array(races[counter].cand.length);
    var p = new Array(races[counter].cand.length);
    for (var i = 0; i < races[counter].cand.length; i++) {
        t[i] = races[counter].cand[i].getElementsByTagName("name")[0];
        p[i] = races[counter].cand[i].getElementsByTagName("party")[0];
    }
    // loop that adds candidates to and parties to array
    if (races[counter].cand.length === 3) {
        document.getElementById("first").style.visibility = "visible";
        document.getElementById("second").style.visibility = "visible";
        document.getElementById("third").style.visibility = "visible";
    }
    if (races[counter].cand.length === 2) {
        document.getElementById("third").style.visibility = "hidden";
        document.getElementById("p3").style.visibility = "hidden";
    }
    if (races[counter].cand.length === 1) {
        document.getElementById("second").style.visibility = "hidden";
        document.getElementById("third").style.visibility = "hidden";
        document.getElementById("p2").style.visibility = "hidden";
        document.getElementById("p3").style.visibility = "hidden";

    }
    for (var h = 0; h < races[counter].cand.length; h++) {

        console.log("Painting candidate c" + h + 1 + ": " + races[counter].candidates[h].name);
        document.getElementById("c" + (h + 1)).innerHTML = races[counter].candidates[h].name;
        console.log("Painting party p" + h + 1 + ": " + races[counter].candidates[h].party);
        document.getElementById("p" + (h + 1)).innerHTML = races[counter].candidates[h].party;
    }
}
function nextProp(counter) {
    document.getElementById('reviews').style.display = 'none';
    document.getElementById('reviews').style.visibility = 'hidden';
    document.getElementById('reviewTop').style.visibility = 'hidden';
    //document.getElementById('review1').style.visibility = 'hidden';
    //document.getElementById('review2').style.visibility = 'hidden';
    document.getElementById('Debug').value = 'Next Prop Counter= ' + counter;
    document.getElementById('TitleDIV').innerHTML = races[counter].title;
    //document.getElementById("votinginstructions").innerHTML = "Click on the box next to the response to make a selection.  A checkmark will appear next to your choice. If you want to change your choice, just click on a different box."
    document.getElementById('racetitle').className = 'racetitle';
    //document.getElementById("racetitle").style.fontSize = "17px";
    //document.getElementById("racetitle").setAttribute("align", "left");
    document.getElementById('third').style.visibility = 'hidden';
    document.getElementById('voteFor').style.visibility = 'hidden';
    document.getElementById('propText').style.visibility = 'visible';
    document.getElementById('second').style.visiblility = 'visible';
    document.getElementById('first').style.visibility = 'visible';
    document.getElementById('first').className = 'propchoice';
    document.getElementById('second').className = 'propchoice';
    document.getElementById('racetitle').className = 'propText';
    document.getElementById('racetitle').innerHTML = '';
    //document.getElementByID("propText").style.visibility = "visible" not in old document
    document.getElementById('c1').innerHTML = '';
    document.getElementById('c2').innerHTML = '';
    document.getElementById('p1').style.visibility = 'hidden';
    document.getElementById('p2').style.visibility = 'hidden';
    document.getElementById('p3').style.visibility = 'hidden';
    document.getElementById('racetitle').innerHTML = races[counter].text;
    //Clean the checkboxes to make sure there are no weird selections
    for (box = 0; box < checkboxes.length; box++) {
        document.getElementById(checkboxes[box]).checked = false;
        document.getElementById('Next').setAttribute('class', 'skip');
        document.getElementById('Next').innerHTML = 'Skip';
    }
    document.getElementById('c1').style.color = 'black';
    document.getElementById('p1').style.color = 'black';
    document.getElementById('c2').style.color = 'black';
    document.getElementById('p2').style.color = 'black';
    document.getElementById('c3').style.color = 'black';
    document.getElementById('p3').style.color = 'black';
    //alert("Now setting up the checkboxes!");
    for (box = 0; box < races[counter].candidates.length; box++) {
        document.getElementById(checkboxes[box]).checked = races[counter].candidates[box].voted === true;
        if (document.getElementById(checkboxes[box]).checked) {
            var id = '';
            if (box === 0) {
                id = '1';
            } else if (box === 1) {
                id = '2';
            } else if (box === 2) {
                id = '3';
            } else {
                alert('Something has gone wrong!');
            }
            document.getElementById('c' + id).style.color = 'white';
            document.getElementById('p' + id).style.color = 'white';
            document.getElementById('Next').setAttribute('class', 'next');
            document.getElementById('Next').innerHTML = 'Next';
        }
    }
    for (var h = 0; h < races[counter].cand.length; h++) {
        document.getElementById('c' + (h + 1)).innerHTML = races[counter].candidates[h].name;
    }
}
function showVoteData() {
    var r0 = 'Race' + ';' + 'Time' + ';' + 'Choice' + ';' + 'Party' + '\n';
    var e0 = 'Type' + ';' + 'Page' + ';' + 'Time' + '\n';
    var v0 = 'Race;Choice;Party' + '\n';
    for (var x = 0; x < voteLog.length; x++) {
        r0 += voteLog[x].type + ';' + voteLog[x].time + ';' + voteLog[x].choice + ';' + voteLog[x].party + '\n';
    }
    for (x = 0; x < eventLog.length; x++) {
        e0 += eventLog[x].type + ';' + eventLog[x].page + ';' + eventLog[x].time + '\n';
    }
    for (x = 0; x < races.length; x++) {
        var selection = false;
        v0 += races[x].number + ';';
        for (var l = 0; l < races[x].candidates.length; l++) {
            if (races[x].candidates[l].voted === true) {
                selection = true;
                v0 += races[x].candidates[l].name + ';' + races[x].candidates[l].party + '\n';
            }
        }
        if (selection === false) {
            v0 += 'No Selection;None' + '\n';
        }
    }
    document.getElementById('voteLog').value = r0;
    document.getElementById('eventLog').value = e0;
    document.getElementById('Results').value = v0;
}

function finishUp() {
    document.getElementById('reviews').style.visibility = 'hidden';
    document.getElementById('reviewTop').style.visibility = 'hidden';
    if (numberOfItems > 13) {
        document.getElementById('reviewLeft').style.visibility = 'hidden';
        document.getElementById('reviewRight').style.visibility = 'hidden';
    } else {
        document.getElementById('reviewOnly').style.visibility = 'hidden';
    }
    document.getElementById('finishUp').style.visibility = 'hidden';
    document.getElementById('submitScreen').style.visibility = 'visible';
    document.getElementById('submitHeading').style.visibility = 'visible';
    document.getElementById('submitText').style.visibility = 'visible';
    document.getElementById('submitScreenBtns').style.visibility = 'visible';
    document.getElementById('submit').style.visibility = 'visible';
    document.getElementById('returnToBallot').style.visibility = 'visible';
    document.getElementById('endVoting').style.visibility = 'visible';
}
function hide() {
    document.getElementById('submitScreen').style.visibility = 'hidden';
    document.getElementById('submitHeading').style.visibility = 'hidden';
    document.getElementById('submitText').style.visibility = 'hidden';
    document.getElementById('submitScreenBtns').style.visibility = 'hidden';
    document.getElementById('submit').style.visibility = 'hidden';
    document.getElementById('returnToBallot').style.visibility = 'hidden';
    document.getElementById('endVoting').style.visibility = 'hidden';
}
function finish() {

    document.getElementById('submitScreen').style.display = 'none';
    //document.getElementById("submitHeading").style.display = "none";
    //document.getElementByID("submitText").style.display = "none";
    //document.getElementByID("submitScreenBtns").style.display = "none";
    //document.getElementByID("returnToBallot").style.display = "none";
    //document.getElementById("endVoting").style.display = "none"
    document.getElementById('confirmation').style.visibility = 'visible';
    document.getElementById('confText').style.visibility = 'visible';
    document.getElementById('confHeading').style.visibility = 'visible';
    document.getElementById('submit').style.visibility = 'visible';
    //showVoteData();    //document.getElementById("end").style.visibility = "visible"
                       //document.getElementById("end").innerHTML = "Your vote has been submitted!"
                       //document.getElementById("review").style.visibility = "hidden"
                       //document.getElementById("Title").innerHTML = "Vote Submitted!"
    print();

}
function print() {
    var html = generatePrintableHTML();
    var printframe = window.frames["printout"];

    console.log("HTML: " + html);
    //printframe.document.body.innerHTML = html;//'data:text/html;charset=utf-8,' + encodeURI(html);
    //window.frames["printout"].innerHTML = 'data:text/html;charset=utf-8,' + encodeURI(html);;
    printframe.document.write('data:text/html;charset=utf-8,' + encodeURI(html));
    printframe.document.close();

    console.log(window.frames["printout"]);
    printIframe();
}

function printIframe() {
    if (navigator.userAgent.indexOf("Firefox") != -1) {
        var iframe_window = window.frames["printout"];

        console.log(iframe_window);
        iframe_window.focus();
        iframe_window.print();
    }
    else if (navigator.userAgent.indexOf("MSIE") != -1) {
        var x = document.getElementById("printout");

        console.log(x);
        x.focus();
        x.print();
    }
    else if (navigator.userAgent.indexOf("Chrome") != -1) {
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

    //TODO - what's this line printing?
    console.log(document.getElementById('Results').value);

    //initial setup
    //TODO - check the <!DOCTYPE html> thingy is neccessary
    output += '<!DOCTYPE html>\n'
    output += '<html>\n';
    output += '<head>\n';
    output += '<style>\n';

    //CSS overall font
    output += 'html * { font-family: "Avenir Next" !important; color: black;}\n';

    //CSS classes, taken directly (but formatted differently to save space) from the example HTML/CSS printout 6/18/15
    //TODO - make this more legible
    
    output += 'hr.divideRace { /* Formatting for the black horizontal line that divides up the races */' +
            ' display: block; font-size: 13.5pt; margin-top: -1.5pt; margin-left: 0pt; margin-bottom: 10pt;' +
            ' margin-right: 0pt; font-weight: bolder; }\n' +
            'h1 { /*Upper left header ("Official Ballot")*/ display: inline; font-size: 13.5pt; margin-top: 0pt;' +
            ' margin-left: 36pt; margin-bottom: 0pt; margin-right: 0pt; font-weight: bold; } \n' +
            'h2 { /*Upper rightt header ("PLACE THIS IN BALLOT BOX")*/ display: inline;' +
            ' text-align: right; font-size: 17.3pt; margin-top: 0pt; margin-right: 36pt; margin-left: 106pt;' +
            ' margin-bottom: 0pt; font-weight: bold; } \n' +
            'divDate { /*Date, just underneath the first (upper left)' +
            ' header*/ display:block; font-size: 10.1pt; margin-top: -5pt; margin-left: 36pt; margin-bottom: 0pt;' +
            ' margin-right: 36pt; font-weight: normal; } \n' + 
            ' divLocation { /*Location, just underneath the date*/' +
            ' display: block; font-size: 10.1pt; margin-top: -2.5pt; margin-left: 36pt; margin-bottom: 19pt;' +
            ' margin-right: 36pt; font-weight: normal; }  \n' + 
            'div.electionOrProposition { /*The name of each election */' +
            ' display:block; font-size: 11pt; margin-top:0pt; margin-left:0pt; margin-bottom: 1.5pt; margin-right:0pt; ' +
            ' font-weight: bold } \n' +  
            'div.namePlusAND { /* ONLY used for the first person of two total */ display:block;' +
            ' font-size: 10.5pt; margin-top:0pt; margin-left:0pt; margin-bottom: -3pt; margin-right:5pt; font-weight:' +
            ' normal; }  div.onlyOrSecondPerson { /* Used for one person total, or the second of two.' +
            ' THIS ONE IS SPECIAL - it relies on using the width field to work with .party!! */ display: inline-block;' +
            ' font-size: 10.5pt; margin-top:0pt; margin-left:0pt; margin-bottom: 0pt; margin-right:0pt; font-weight:' +
            ' normal; width: 82%; }\n' + 
            'div.namePlusAND {/* ONLY used for the first person of two total */ display:block;' +
            ' font-size: 10.5pt; margin-top:0pt; margin-left:0pt; margin-bottom: -3pt; margin-right:5pt; font-weight: normal; } \n' +
            'div.onlyOrSecondPerson { /* Used for one person total, or the second of two. THIS ONE IS SPECIAL - it relies' +
            ' on using the width field to work with .party!! */ display: inline-block; font-size: 10.5pt; margin-top:0pt;' +
            ' margin-left:0pt; margin-bottom: 0pt; margin-right:0pt; font-weight: normal; width: 82%; }\n' +  
            'div.party { /* SPECIAL - only used for sticking party on the same line as the (second, if a team) person being voted for */' +
            ' display: inline-block; font-size: 10.75pt; text-align: right; font-weight:bold; width: 8%; }\n' + 
            'div.noSelection_outer { /* SPECIAL - only used for highlighting the special "YOU DID NOT SELECT ANYTHING" message */ display: block;' +
            ' background-color: #D6D7D8; } \n' +  
            'div.noSelection_inner {/* SPECIAL - only used for the font and positioning of' +
            ' the special "YOU DID NOT SELECT ANYTHING" message */ font-size: 10.75pt; margin-top:0pt; margin-left:6pt;' +
            ' margin-bottom: 0pt; margin-right:0pt; font-weight: bold; }\n' + 
            'divLeftSide {/*SPECIAL - Contains the left side of the' +
            ' page*/ float: left; width: 190pt; padding-left: 36pt; line-height:15pt; }\n divRightSide {/*SPECIAL -' +
            ' Contains the right side of the page*/ float: right; width: 190pt; margin-right: 36pt; line-height:15.5pt; }'

    output += '</style>\n';
    output += '</head>\n';


    //actual data
    output += '<body>\n';

    //TODO - format this better (leaving as is for now since it doesn't affect output. See exapmle CSS page for details)
    output += '<h1>Official Ballot</h1> <h2>PLACE THIS IN BALLOT BOX</h2>\n';
    output += '<divDate>November 8, 2016, General Election</divDate> <divLocation>Harris County, Texas Precint 101A</divLocation>\n';

    //now formatting the races on the left side of the printout page
    output += '<divLeftSide>\n';

    //first of the two main for-loop where we auto-generate stuff
    //each "block" is one race or proposition; the LEFT is because these blocks are on the left side of the printout page
    //TODO - Check this setup is ok
    //propositions are shorter text so we do one more block on the left side
    for(var blockNumberLEFT = 0; blockNumberLEFT < Math.floor(races.length/2); blockNumberLEFT++) { //TODO - check for rounding errors.
        // Each iteration focueses on one particular race or proposition
        var nextLeftSideBlock =  handleOneBlockHTML(blockNumberLEFT);
        output += nextLeftSideBlock;
    }

    output += '</divLeftSide>\n';
    //now the same thing for the races on the right side of the printout page
    output += '<divRightSide>\n';

    //second of the main for-loops where we auto-generate stuff
    //the RIGHT at the end is because these blocks are on the right side of the printout
    for(var blockNumberRIGHT = Math.floor(races.length/2); blockNumberRIGHT < races.length; blockNumberRIGHT++) { //TODO - again, check for rounding errors
        // Each iteration focueses on one particular race or proposition
        var nextRightSideBlock = handleOneBlockHTML(blockNumberRIGHT);
        output += nextRightSideBlock;
    }
    output += '</divRightSide>\n';

    //TODO - what's this line doing?
    output += document.getElementById('Results').value;

    //TODO - change the image to be better!
    output += '<img src="fakeBarcode.jpg" alt="BARCODE GOES HERE" style="width:350px;height:35px;">'

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
 *            Eventually, we'll need to have a way to determine up here what type of block we're dealing with,
 *            and call one of the helper functions based on this intelligent selection, *            all blocks the same way.
 * 
 *  STYLE GUIDE for CSS:
 *
 *     Excepting what is listed at the bottom of this:
 *     Each piece will have a 1 line description
 *     All colons will have one space following them
 *     There will be no spaces before the semicolons
 *     Depending on the font weight, you may need to change the size slightly
 *     Prefer using top margins for spacing when possible
 *
 *     The order shall go:
 *     description
 *     display
 *     fontsize
 *     top margin (basically, go counterclockwise)
 *     left margin
 *     bottom margin
 *     right margin
 *     bolding weight of font
 *
 *
 *     EXCEPTIONS:
 *        1.xdivLeftSide and divRightSide: 2 floating divs I use to split up the left and right side
 *
 *        2. Div.party and div.onlyOrSecondPerson: Getting the party name inline to the right of candidate names
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
        twoPersonSelection = true;

        //ture&&true==true, false&&false==false, and trueXORtrue is an error
        //unfortunately there is no quick XOR in javascript, so I made the earlier line an OR and then checked if either were false
        if (blockNumber != 0 || nameOfRace != "President and Vice President") {
            console.log("\nAs of now, only the Presidential election can have two candidates\n");
            var errorString = "ERROR IN TWO PERSON SELECTION!!!!!! nameOfRace is " + nameOfRace + "and blockNumber is " + 0 + " ; one of these is wrong!";
            return errorString;
        }
    }

    //determine who the person voted for, if any
    //races[blockNumber] gets something that looks like:          Object {title: "President and Vice President", number: "1", cand: HTMLCollection[3], candidates: Array[3]}
    //races[blockNumber].candidates[candidateNumber] gets something like:           Object {index: 1, voted: true, name: "Vernon Stanley Albury and Richard Rigby", party: "DEM"}
    //the blockNumber, the races[blockNumber].candidate[candidateNumber].name and .party, and races[blockNumber].title are the four things I really need to generate the block
    //note that the internal logic for a proposition is identical, the "names" are 'yes' and 'no' and the "party" is ' '
    for(var l=0; l <races[blockNumber].candidates.length; l++) {
        if(races[blockNumber].candidates[l].voted==true) {
            selection = true;
            chosenTicket = races[blockNumber].candidates[l].name; //NOTE THAT THIS MIGHT BE MORE THAN ONE NAME!
            chosenTicketParty = races[blockNumber].candidates[l].party;
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
                console.log("\n\n\n\n testing - these should be two names!->   " +  helperArray[0] + helperArray[1] + "from this array ->   " + helperArray);
                return generateBlock_Race_TwoPersonSelection(blockNumber, helperArray[0], helperArray[1], chosenTicketParty, nameOfRace);
            } 
            else {
                console.log("\nAs of now, only the Presidential election can have two candidates\n");
                return "ERROR IN TWO PERSON SELECTION!!!!!! nameOfRace is " + nameOfRace + "instead of President And Vice President";
            }
        }

        else if (twoPersonSelection == false) {
            return generateBlock_Race_OnePersonSelection(blockNumber, chosenTicket, chosenTicketParty, nameOfRace);
        }

        else {
            console.log("\nThis is not good! Something weird with our HTML. And/or boolean logic\n")
            //should NEVER execute this block (if here, 'YOU DUN GOOFED')
            //TODO - figure out what to do in bizarre screwup bug situations. Throw an execption?

        }
    }

    else {
        console.log("\nThis is not good! Something weird with our HTML; that or we broke logic\n")
        //TODO - figure out what to do in bizarre screwup bug situations. Throw an execption?
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
function generateBlock_Race_OnePersonSelection (blockNumber, chosenCandidate, chosenCandidateParty, nameOfRace) {

    //TODO - assuming the syntax used in the twopersonselection works, condense this similarly
    var constructingBlock = '';
    console.log("\n");
    console.log("The things we have are blockNumber, chosenCandidate, chosenCandidateParty, and nameOfRace ->    " + blockNumber + chosenCandidate + chosenCandidateParty + nameOfRace);
    console.log("\n");

    //stick in the name of the election
    constructingBlock += '<div class="electionOrProposition">' + nameOfRace +  '</div> ';

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
function generateBlock_Race_TwoPersonSelection (blockNumber, chosenCandidate0, chosenCandidate1, chosenCandidateParty, nameOfRace){
    
    var constructingBlock = '';
    
    if (blockNumber != 0) {
        //TODO - what sort of exception or error?
        console.log("Uh oh! Something other than the 0th race in the two person selection! Current blockNumber is: " + blockNumber);
    }
    if (nameOfRace != "President and Vice President") {
        //TODO - change the string above to the correct one
        console.log("Uh oh! Something other than the presidential election in the two person selection! Current nameOfRace is: " + nameOfRace);
    }

    console.log("\n");
    console.log("The things we have are blockNumber, chosenCandidate0, chosenCandidate1, chosenCandidateParty, and nameOfRace ->    " + blockNumber + chosenCandidate0 + chosenCandidate1 + chosenCandidateParty + nameOfRace);
    console.log("\n");
    
    //stick in the name of the election
    constructingBlock += '<div class="electionOrProposition">' + nameOfRace +  '</div>';

    // stick in the first person's name, as well as the "And"
    constructingBlock += '<div class="namePlusAND"> ' +  chosenCandidate0 + 'and </div>';

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
    constructingBlock += '<div class="electionOrProposition">' + nameOfRace +  '</div>';

    if (blockNumber == 0) { //TODO - later on, when it's more general purpose, this quick hack won't work
        constructingBlock += '<br>\n' //Since unselected two-person tickets need an extra space in there
    }
    constructingBlock += '<div class="noSelection_outer"><div class="noSelection_inner">YOU DID NOT SELECT ANYTHING</div></div>'
    constructingBlock += '<hr class ="divideRace">';

    return constructingBlock;
}

function generateBlock_proposition(blockNumber, answerSelection) {
    constructingBlock += '<div class="electionOrProposition">' + nameOfRace +  '</div>';
    constructingBlock += '<div class="onlyOrSecondPerson>' + answerSelection + '</div>';
    constructingBlock += '<hr class ="divideRace">';
 
}
/*** END BLOCK GENERATION FUNCTIONS
 ***********************************/

// JavaScript Document




