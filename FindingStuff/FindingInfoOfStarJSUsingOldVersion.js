var races = [];
var props = [];
var voteLog = [];
var checkboxes = ['radio1', 'radio2', 'radio3'];
var subjectID =0;
var subject= "STAR-Vote";
var numberOfRaces;
var numberOfProps;
var qxml;
var box =0;
var currentRace = 0;
var Counter = 0;
var r = 0;
var title;
var xmlhttp;
var eventLog= [];
var prev = false;
var submitBallot = "Ballot Submitted";
var choice1="Choice-1";
var choice2 = "Choice-2";
var choice3= "Choice-3";
var begin = "Begin";
var next = "Next";
var previous = "Previous";
var review = "Back To Review";
var rIndex= 0;
var ReviewClick1= "Reviewed Race 1";
var ReviewClick2= "Reviewed Race 2";
var ReviewClick3= "Reviewed Race 3";
var ReviewClick4= "Reviewed Race 4";
var ReviewClick5= "Reviewed Race 5";
var ReviewClick6= "Reviewed Race 6";
var ReviewClick7= "Reviewed Race 7";
var ReviewClick8= "Reviewed Race 8";
var ReviewClick9= "Reviewed Race 9";
var ReviewClick10= "Reviewed Race 10";
var ReviewClick11= "Reviewed Race 11";
var ReviewClick12= "Reviewed Race 12";
var ReviewClick13= "Reviewed Race 13";
var ReviewClick14= "Reviewed Race 14";
var ReviewClick15= "Reviewed Race 15";
var ReviewClick16= "Reviewed Race 16";
var ReviewClick17= "Reviewed Race 17";
var ReviewClick18= "Reviewed Race 18";
var ReviewClick19= "Reviewed Race 19";
var ReviewClick20= "Reviewed Race 20";
var ReviewClick21= "Reviewed Race 21";
var ReviewClick22= "Reviewed Race 22";
var ReviewClick23= "Reviewed Race 23";
var ReviewClick24= "Reviewed Race 24";
var ReviewClick25= "Reviewed Race 25";
var ReviewClick26= "Reviewed Race 26";
var ReviewClick27= "Reviewed Race 27";
var endoftask= "Printed ballot_finished voting";
var movingtoprint= "Finish Reviewing Ballot";



function connect() {
    var fileName="election.xml";
    xmlhttp=GetXmlHttpObject();
    if (xmlhttp==null){
        alert ("Your browser does not support XMLHTTP!");
        return;
    }
    xmlhttp.onreadystatechange=stateChanged;
    xmlhttp.open("GET",fileName,true);
    xmlhttp.send(null);
}

//checks if browser supports XML or ActiveObject
function GetXmlHttpObject() {
    if (window.XMLHttpRequest){
        return new XMLHttpRequest();
    }
    if (window.ActiveXObject){
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function stateChanged(){
    var state=xmlhttp.readyState;
    //When state = 4 the file has been received
    //alert("state: "+ state);
    document.getElementById("Debug").value=state;
    //Puts the state in the status field just for testing purposes
    if (state==4){
        qxml =xmlhttp.responseXML;
        // The global variable qml is equal to the xml file
        start()
    }
}

function start(){
    numberOfRaces = qxml.getElementsByTagName("race").length;
    var races1 = [];

    for (var j = 0; j < numberOfRaces; j++){
        races1[j] = {};
        //qxml.getElementsByTagName pulls the listed race out of the HTML file
        //The format for it is in this order: title, number, candidate1, candidate2, candidate3...
        var currentRace = qxml.getElementsByTagName("race")[j];
        console.log("HELLO THERE!");
        console.log("This is the races field from the xml I think -> ");
        console.log(qxml.getElementsByTagName("race"));
        console.log("This is the current race entry in the xml races field -> ");
        console.log(currentRace);
        console.log("This is the 'number' tag of the current race entry in the xml races field -> ");
        console.log(currentRace.getElementsByTagName("number"));
        console.log("This is the 0th index of the 'number' tag of the current race entry in the xml races field -> ");
        console.log(currentRace.getElementsByTagName("number")[0]);
        console.log("This is the .firstChild of the 0th index of the 'number' tag of the current race entry in the xml races field -> ");
        console.log(currentRace.getElementsByTagName("number")[0].firstChild);
        //console.log("This is the .nodeValue of the .firstChild of the 0th index of the stuff from above -> ");
        //console.log(currentRace.getElementsByTagName("number")[0].firstChild.nodeValue);

        races1[j].title = currentRace.getElementsByTagName("title")[0].firstChild.nodeValue;
        races1[j].number = currentRace.getElementsByTagName("number")[0].firstChild.nodeValue;
        races1[j].cand = currentRace.getElementsByTagName("candidate");

        console.log("this is what is stuffed into the races1 array at the variable j in the start function" + races1[j].title + races1[j].number + races[j].cand);

        races1[j].candidates = [];
        for (var i=0;i<races1[j].cand.length;i++) {
            races1[j].candidates[i] = {};
            races1[j].candidates[i].index = i;
            races1[j].candidates[i].voted = false;
            races1[j].candidates[i].name = races1[j].cand[i].getElementsByTagName("name")[0].firstChild.nodeValue;
            races1[j].candidates[i].party = races1[j].cand[i].getElementsByTagName("party")[0].firstChild.nodeValue
        }
    }

    numberOfProps = qxml.getElementsByTagName("proposition").length;
    //alert("number of props"+numberOfProps)
    for (var p = 0; p < numberOfProps; p++){
        props[p] = {};
        props[p].log = [];
        var currentProp = qxml.getElementsByTagName("proposition")[p];
        props[p].title = currentProp.getElementsByTagName("title")[0].firstChild.nodeValue;
        props[p].text = currentProp.getElementsByTagName("propositionText")[0].firstChild.nodeValue;
        props[p].number = currentProp.getElementsByTagName("number")[0].firstChild.nodeValue;
        props[p].cand = currentProp.getElementsByTagName("response");

        props[p].candidates = [];
        for (var l=0; l<props[p].cand.length;l++) {
            props[p].candidates[l] = {};
            props[p].candidates[l].index = l;
            props[p].candidates[l].voted = false;
            if(l == 0){
                props[p].candidates[l].name= "Yes";
                props[p].candidates[l].party = " ";
            }
            else{
                props[p].candidates[l].name = "No";
                props[p].candidates[l].party = " ";
            }
            //props[p].candidates[l].name = props[p].cand[l].getElementsByTagName("response")[0].firstChild.nodeValue
        }
    }

    races = races1.concat(props);
    //alert("Races legnth: "+races1.length);
    //alert("Races legnth: "+races.length);
    //alert("Props Length: "+props.length);
}

//early functions here
function submitID() {   //records authentication credential and takes voter to election info
    subjectID = document.getElementById("idText").value;
    if(subjectID==""){
        alert("You must enter correctly your 5-digit authentication number.");
    }
    else{
        document.getElementById("IDArea").value= subjectID+ " "+ subject;
        document.getElementById("info").style.visibility="visible"; //shows election information page or start
        document.getElementById("ID").style.display="none"; //hides the elements on the authentication page
        document.getElementById("enterID").style.display="none";
        document.getElementById("idText").style.display="none"
    }
}

function gotoFirstInstructions() { //takes voter to instructions page
    document.getElementById("first_instructions").style.display="block"; //de-invisibles
    document.getElementById("first_instructions").style.visibility="visible"; //displays instructions
    document.getElementById("Back").style.visibility="visible"; //shows the back button that takes you to the election info page
    document.getElementById("Begin").style.visibility="visible"; //shows the button that is pressed to start voting
    document.getElementById("info").style.display="none"; //makes the instructions invisible
}

function gotoInfo() { //Takes voter from instructions page back to election info page
    document.getElementById("Begin").style.visibility="hidden"; //hides the bigin and back buttons shown on the instructions page
    document.getElementById("Back").style.visibility="hidden";
    document.getElementById("first_instructions").style.display="none"; //makes the instructions invisible
    document.getElementById("info").style.display="block"; //shows election information page or start
}

//moves through the races one increment at a time
function Nav(x){

    document.getElementById("Debug").value="Nav( "+x+" )";
    if(r<0)
    {
        r = 0;
    }
    if(r>27)
    {
        r=27

    }

    if (x==0) {
        if(r>0)
        {r= r - 1}
        prev = true;
    }
    else if (x==1)
        if(r<27){
            {r++}
            prev = false;
        }
        else{
            prev= false;
        }
    document.getElementById("Debug").value = "r = "+r;
    Next(r)


}

//Major page elements shown/not shown
function Next(y)
{   document.getElementById("Debug").value="Next( "+y+" )";
    currentRace= y;
//when leaving first instructions, hide instructions, show questions, and change button message
    Counter = y;
    if (Counter==0)
    {
        //document.getElementByID("Clear").style.visibility="visible"
        document.getElementById("Begin").style.display="none";
        document.getElementById("Back").style.display="none";
        document.getElementById("Next").style.visibility="visible";
        document.getElementById("Previous").style.visibility = "hidden";  //need to make unusable on first screen
        //document.getElementByID("votes").style.visibility = "visible"
        //document.getElementByID("VotingContentDIV").style.visibility="visible"; //Why does keeping this in break the interface?
        document.getElementById("first_instructions").style.display="none";
        document.getElementById("TitleDIV").style.display="none";
        document.getElementById("propText").style.display="none";
        //document.getElementById("TitleDIV").style.visibility="hidden"
        //document.getElementById("propText").style.visibility="hidden"
        document.getElementById("voteFor").style.display="block";
        document.getElementById("voteFor").style.visibility="visible";
        document.getElementById("progress").innerHTML= (Counter + 1) + " of 27"; //progress in footer
        nextRace(Counter)
    }
//while voting, clicking next records selection and continues to next race 
    else if (Counter < 21 && Counter > 0 )
    {
        // document.getElementById("Clear").style.visibility="visible"
        document.getElementById("Debug").value="Next <21";
        document.getElementById("Previous").style.visibility = "visible";
        //document.getElementByID("VotingContentDIV").style.visibility="hidden"
        //document.getElementById("next_instructions").style.visibility="hidden"
        document.getElementById("TitleDIV").style.display="none";
        document.getElementById("propText").style.display="none";
        document.getElementById("TitleDIV").style.visibility="hidden";
        document.getElementById("propText").style.visibility="hidden";
        document.getElementById("voteFor").style.display="block";
        document.getElementById("voteFor").style.visibility="visible";
        //document.getElementByID("votes").style.visibility = "visible"
        document.getElementById("progress").innerHTML= (Counter + 1) + " of 27"; //progress in footer
        //if(prev==false){

        nextRace(Counter)
    }

    else if (Counter > 20 && Counter <27)
    {
        // document.getElementById("Clear").style.visibility="visible"
        //document.getElementById("VotingContentDIV").style.visibility="visible" //not for prop
        document.getElementById("TitleDIV").style.display="block";
        document.getElementById("propText").style.display="block";
        //document.getElementByID("votes").style.visibility = "visible"
        document.getElementById("TitleDIV").style.visibility="visible";
        document.getElementById("propText").style.visibility="visible";
        document.getElementById("voteFor").style.display="none";
        document.getElementById("Debug").value="Next >20";
        document.getElementById("progress").innerHTML= (Counter + 1) + " of 27"; //progress in footer

        nextProp(Counter)
    }
    else if (Counter == 27){

        //recordVote();

        document.getElementById("reviews").style.display="block";
        document.getElementById("reviews").style.visibility="visible";
        document.getElementById("reviewTop").style.visibility="visible";
        document.getElementById("review1").style.visibility="visible";
        document.getElementById("review2").style.visibility="visible";
        //document.getElementById("grid").style.visibility="hidden"
        //document.getElementById("Clear").style.visibility="hidden"
        //document.getElementById("VotingContentDIV").style.display="none"
        document.getElementById("propText").style.visibility="hidden";
        document.getElementById("racetitle").style.visibility="Hidden";
        //document.getElementById("voteFor").style.visibility="hidden"
        document.getElementById("first").style.visibility="hidden";
        document.getElementById("second").style.visibility="hidden";
        document.getElementById("third").style.visibility="hidden";
        //document.getElementById("VotingContentDIV").style.visibility = "hidden"
        //document.getElementById("TitleDIV").innerHTML = "Review Choices"
        document.getElementById("Next").style.display="none";
        document.getElementById("Previous").style.visibility="hidden";
        document.getElementById("Next").style.visibility="hidden";
        document.getElementById("progress").style.visibility="hidden";
        document.getElementById("finishUp").style.visibility = "visible";
        //document.getElementById("datafield").style.visibility= "visible"
        //document.getElementById("votinginstructions").style.visibility ="visible"
        //document.getElementById("votinginstructions").innerHTML = "Shown below are the selections you have made. Click on a race to change your selection. To submit your ballot, click the Submit button, and your vote will be recorded."

        goToReview()

    }
    //ChangeSteps()	//added in in case it impacts reading
}


function goToReview(){ //the review screen

    var checkboxes = ['radio1', 'radio2', 'radio3']
    for (box = 0; box < races[rIndex].candidates.length; box++) {
        document.getElementById(checkboxes[box]).checked=false
    }

    //document.getElementById("Clear").style.visibility="hidden"
    document.getElementById("Review").style.display="none";
    document.getElementById("Review").style.visibility="hidden";
    document.getElementById("finishUp").style.display="inline-block";
    document.getElementById("finishUp").style.visibility="visible";
    document.getElementById("p1").style.visibility="hidden";
    document.getElementById("p2").style.visibility="hidden";
    document.getElementById("p3").style.visibility="hidden";
    document.getElementById("reviews").style.display="block";
    document.getElementById("reviews").style.visibility="visible";
    document.getElementById("reviewTop").style.visibility="visible";
    document.getElementById("review1").style.visibility="visible";
    document.getElementById("review2").style.visibility="visible";
    //document.getElementById("grid").style.visibility="hidden"
    //document.getElementById("VotingContentDiv").style.display="none"
    document.getElementById("propText").style.visibility="hidden";
    document.getElementById("racetitle").style.visibility="Hidden";
    document.getElementById("voteFor").style.visibility="hidden";
    document.getElementById("first").style.visibility="hidden";
    document.getElementById("second").style.visibility="hidden";
    document.getElementById("third").style.visibility="hidden";
    document.getElementById("progress").style.visibility="hidden";
    //document.getElementById("VotingContentDIV").style.visibility = "hidden"
    document.getElementById("TitleDIV").style.display="none";
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

    for(var x=0; x< races.length; x++)
    {  	var selection = false;
        var title=races[x].title;
        title=title.bold();
        for(var l=0; l<races[x].candidates.length;l++)
        {
            if(races[x].candidates[l].voted==true)
            {
                selection = true;
                document.getElementById("race"+(x+1)).style.background="#FFF";
                document.getElementById("raceTit"+(x+1)).innerHTML=(x+1)+". "+title;
                document.getElementById("race"+(x+1)+"p").innerHTML=races[x].candidates[l].name;
                document.getElementById("raceBox"+(x+1)).className = "sel";

                if(races[x].candidates[l].party== "REP")
                {
                    document.getElementById("party"+(x+1)).innerHTML= "REP"

                }
                else
                if(races[x].candidates[l].party== "DEM")
                {
                    document.getElementById("party"+(x+1)).innerHTML= "DEM"
                }
                else
                if(races[x].candidates[l].party== "IND")
                {
                    document.getElementById("party"+(x+1)).innerHTML= "IND"

                }
                else
                if(races[x].candidates[l].party=="LIB")
                {
                    document.getElementById("party"+(x+1)).innerHTML= "LIB"
                }
                else
                if(races[x].candidates[l].party=="GRN")
                {
                    document.getElementById("party"+(x+1)).innerHTML= "GRN"
                }
                else
                if(races[x].candidates[l].party=="CON")
                {
                    document.getElementById("party"+(x+1)).innerHTML= "CON"
                }

                else
                {
                    document.getElementById("party"+(x+1)).innerHTML = ""
                }



            }


        }
        if (selection == false)
        {
            document.getElementById("raceTit"+(x+1)).innerHTML=(x+1)+". "+title;
            document.getElementById("race"+(x+1)+"p").innerHTML="You did not vote for anyone. If you want to vote, touch here.";
            document.getElementById("party"+(x+1)).innerHTML =" ";
            document.getElementById("raceBox"+(x+1)).className = "noSel";
            //document.getElementById("race"+(x+1)).style.backgroundColor = "#ff6600"
        }


    }
}


function recordVote() {

    //each time next is clicked, the vote is added to data (array of objects) and wipes the checkboxes clean.
    var time = new Date();
    var selection= false;
    var e = {};
    e.type =races[Counter].number;


    for (var box = 0; box < races[Counter].candidates.length; box++) {
        if (document.getElementById(checkboxes[box]).checked) {
            races[Counter].candidates[box].voted = true;
            e.choice= races[Counter].candidates[box].name;
            e.party =races[Counter].candidates[box].party;
            selection = true;
        } else {
            races[Counter].candidates[box].voted = false;
        }
    }
    if (selection == false)
    {
        e.choice = "No Selection";
        e.party = "None"

    }

    e.time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()+ "."+ time.getMilliseconds();
    voteLog.push(e);


}

function recordEvent(b){

    var e, time;
    if(currentRace<27){
        e = {};
        time = new Date;
        e.type = b;
        e.page = races[currentRace].number;
        e.time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + "."+ time.getMilliseconds();
        eventLog.push(e)
    }

    else if(currentRace>26){
        e = {};
        time = new Date;
        e.type = b;
        e.page = "";
        e.time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + "."+ time.getMilliseconds();
        eventLog.push(e)
    }

}

function recordReviewChange(m){
    var index = m;
    //alert("m = "+ index)
    var time = new Date();
    var selection= false;
    var e = {};
    e.type =races[m].number;
    for (var x=0; x< races[index].candidates.length; x++) {
        races[index].candidates[x].voted=false;
    }

    for (var box = 0; box < checkboxes.length; box++) {
        if (document.getElementById(checkboxes[box]).checked==true) {
            races[index].candidates[box].voted = true;
            e.choice= races[index].candidates[box].name;
            e.party =races[index].candidates[box].party;
            selection = true;
        }

        document.getElementById(checkboxes[box]).checked=false
    }
    if (selection == false)
    {
        e.choice = "No Selection";
        e.party = "None"

    }

    e.time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()+ ":"+ time.getMilliseconds();
    voteLog.push(e);

    goToReview()
}

<!--Selects the button/candidate, but cannot deselect-->
function selectChoice(j){
    //alert("Selected!")
    var index = j;
    var flag = false;
    var selID, unsel1, unsel2 = "";

    if(index==1)
    {
        document.getElementById("radio1").checked = !document.getElementById("radio1").checked;
        flag = document.getElementById("radio1").checked;
        selID= "1";
        unsel1 = "2";
        unsel2 = "3";

    }
    else if(index==2)
    {
        document.getElementById("radio2").checked = !document.getElementById("radio2").checked;
        flag = document.getElementById("radio2").checked;
        selID= "2";
        unsel1 = "1";
        unsel2 = "3";
    }
    else if(index==3)
    {
        document.getElementById("radio3").checked = !document.getElementById("radio3").checked;
        flag = document.getElementById("radio3").checked;
        selID= "3";
        unsel1 = "1";
        unsel2 = "2";
    }

    if(flag) {
        document.getElementById("Next").setAttribute("class", "next");
        document.getElementById("Next").innerHTML = "Next";

        document.getElementById("c" + selID).style.color = "white";
        document.getElementById("p" + selID).style.color = "white";



    } else {
        document.getElementById("Next").setAttribute("class", "skip");
        document.getElementById("Next").innerHTML ="Skip";

        document.getElementById("c" + selID).style.color = "black";
        document.getElementById("p" + selID).style.color = "black";

    }

    document.getElementById("c" + unsel1).style.color = "black";
    document.getElementById("p" + unsel1).style.color = "black";
    document.getElementById("c" + unsel2).style.color = "black";
    document.getElementById("p" + unsel2).style.color = "black";

    recordVote();
}



function goToRace(n){
    currentRace = n;
    rIndex = n;

    document.getElementById("c1").style.color = "black";
    document.getElementById("p1").style.color = "black";
    document.getElementById("c2").style.color = "black";
    document.getElementById("p2").style.color = "black";
    document.getElementById("c3").style.color = "black";
    document.getElementById("p3").style.color = "black";

    //alert("Now setting up the checkboxes!");
    for (box = 0; box < races[n].candidates.length; box++) {
        document.getElementById(checkboxes[box]).checked = (races[n].candidates[box].voted == true);


        if(document.getElementById(checkboxes[box]).checked) {
            var id = "";

            if (box === 0) {
                id = "1";
            } else if (box === 1) {
                id = "2";
            } else if (box === 2) {
                id = "3";
            } else {
                alert("Something has gone wrong!");
            }


            document.getElementById("c" + id).style.color = "white";
            document.getElementById("p" + id).style.color = "white";

            document.getElementById("Next").setAttribute("class", "next");
            document.getElementById("Next").innerHTML ="Next";
        }
    }

    if(rIndex<21) //for Races

    {

        // document.getElementById("Clear").style.visibility="visible"
        document.getElementById("finishUp").style.display="none";
        document.getElementById("finishUp").style.visibility="hidden";
        document.getElementById("Review").style.display="inline-block";
        document.getElementById("Review").style.visibility="visible";
        //document.getElementById("votinginstructions").style.visibility ="visible"
        document.getElementById("reviews").style.display="none";
        document.getElementById("reviews").style.visibility="hidden";
        document.getElementById("reviewTop").style.visibility="hidden";
        document.getElementById("review1").style.visibility="hidden";
        document.getElementById("review2").style.visibility="hidden";
        //document.getElementById("VotingContentDiv").style.display="block"
        document.getElementById("Debug").value="Next Race Counter= "+rIndex;
        document.getElementById("racetitle").style.visibility = "visible";
        document.getElementById("racetitle").innerHTML= " ";
        document.getElementById("racetitle").className = "racetitle";
        //document.getElementById("racetitle").style.fontSize = "24px";
        //document.getElementById("racetitle").setAttribute("align", "center");
        //document.getElementById("TitleDIV").innerHTML = races[rIndex].title
        document.getElementById("TitleDIV").style.display="none";
        document.getElementById("TitleDIV").style.visibility="hidden";
        document.getElementById("propText").style.display="none";
        document.getElementById("propText").style.visibility="hidden";
        document.getElementById("racetitle").innerHTML = races[rIndex].title;
        document.getElementById("voteFor").style.display="block";
        document.getElementById("voteFor").style.visibility = "visible"; //Vote for 1.
        document.getElementById("first").style.visibility="visible";
        document.getElementById("second").style.visibility="visible";
        document.getElementById("third").style.visibility="visible";
        document.getElementById("first").className = "candidate";
        document.getElementById("second").className = "candidate";
        document.getElementById("p1").style.visibility="visible";
        document.getElementById("p2").style.visibility = "Visible";
        document.getElementById("p3").style.visibility = "visible";
        document.getElementById("progress").style.visibility="visible";
        document.getElementById("progress").innerHTML= (n + 1) + " of 27";
        // document.getElementById("votinginstructions").innerHTML= "To make your choice, click on the box next to the candidate's name. A checkmark will appear next to your choice. If you want to change your choice, just click on a different candidate's box. Please select only ONE candidate."

        //Clean the checkboxes to make sure there are no weird selections
        for(box = 0; box < checkboxes.length; box++)
            document.getElementById(checkboxes[box]).checked = false;

        for (box = 0; box < races[rIndex].candidates.length; box++) {
            document.getElementById(checkboxes[box]).checked = races[rIndex].candidates[box].voted == true;
        }


        var t=new Array(races[rIndex].cand.length);
        var p=new Array(races[rIndex].cand.length);
        for (var i=0;i<races[rIndex].cand.length;i++) {
            t[i] = races[rIndex].cand[i].getElementsByTagName("name")[0];
            p[i] = races[rIndex].cand[i].getElementsByTagName("party")[0]
        }
        // loop that adds candidates to and parties to array


        if(races[rIndex].cand.length >2)
        {
            document.getElementById("first").style.visibility="visible";
            document.getElementById("second").style.visibility="visible";
            document.getElementById("third").style.visibility="visible"
        }
        if (races[rIndex].cand.length == 2)
        {
            document.getElementById("third").style.visibility="hidden";
            document.getElementById("p3").style.visibility="hidden"
        }

        if (races[rIndex].cand.length==1 )
        {
            document.getElementById("second").style.visibility="hidden";
            document.getElementById("third").style.visibility="hidden";
            document.getElementById("p2").style.visibility="hidden";
            document.getElementById("p3").style.visibility="hidden"


        }



        for (h = 0; h<races[rIndex].cand.length; h++)
        {
            document.getElementById("c"+(h+1)).innerHTML =races[rIndex].candidates[h].name;
            document.getElementById("p"+(h+1)).innerHTML =races[rIndex].candidates[h].party
        }

    }
    else if (rIndex>20)
    {
        //document.getElementById("Clear").style.visibility="visible"
        document.getElementById("finishUp").style.visibility="hidden";
        document.getElementById("Review").style.display="inline-block";
        document.getElementById("Review").style.visibility="visible";
        //document.getElementById("votinginstructions").style.visibility ="visible"
        document.getElementById("reviews").style.display="none";
        document.getElementById("reviews").style.visibility="hidden";
        document.getElementById("reviewTop").style.visibility="hidden";
        document.getElementById("review1").style.visibility="hidden";
        document.getElementById("review2").style.visibility="hidden";
        document.getElementById("Debug").value="Next Prop Counter= "+Counter;
        //document.getElementById("VotingContentDiv").style.display="block"
        document.getElementById("TitleDIV").style.display="block";
        document.getElementById("TitleDIV").style.visibility="visible";
        document.getElementById("TitleDIV").innerHTML = races[rIndex].title;
        //document.getElementById("votinginstructions").innerHTML = "Click on the box next to the response to make a selection.  A checkmark will appear next to your choice. If you want to change your choice, just click on a different box."
        document.getElementById("propText").style.display="block";
        document.getElementById("propText").style.visibility="visible";
        document.getElementById("racetitle").style.visibility="visible";
        document.getElementById("first").style.visibility="visible";
        document.getElementById("second").style.visibility="visible";
        document.getElementById("racetitle").className = "racetitle";
        //document.getElementById("racetitle").style.fontSize = "17px";
        //document.getElementById("racetitle").setAttribute("align", "left");
        document.getElementById("third").style.visibility="hidden";
        document.getElementById("second").style.visiblility= "visible";
        document.getElementById("first").style.visibility= "visible";
        document.getElementById("first").className = "propchoice";
        document.getElementById("second").className = "propchoice";
        document.getElementById("racetitle").className = "propText";
        document.getElementById("racetitle").innerHTML = "";
        document.getElementById("c1").innerHTML= "";
        document.getElementById("c2").innerHTML= "";
        document.getElementById("p1").style.visibility="hidden";
        document.getElementById("p2").style.visibility= "hidden";
        document.getElementById("progress").style.visibility="visible";
        document.getElementById("progress").innerHTML= (n + 1) + " of 27";
        document.getElementById("racetitle").innerHTML = races[rIndex].text;
        for (var box = 0; box < races[rIndex].candidates.length; box++) {
            document.getElementById(checkboxes[box]).checked = !!races[rIndex].candidates[box].voted;
        }


        for (var h=0; h<races[rIndex].cand.length; h++)
        {
            document.getElementById("c"+(h+1)).innerHTML =races[rIndex].candidates[h].name

        }


    }

}


//displays race to voter
function nextRace(Counter)
{
    document.getElementById("reviews").style.display="none";
    document.getElementById("reviews").style.visibility="hidden";
    document.getElementById("reviewTop").style.visibility="hidden";
    document.getElementById("review1").style.visibility="hidden";
    document.getElementById("review2").style.visibility="hidden";
    document.getElementById("Debug").value="Next Race Counter= "+Counter;
    document.getElementById("racetitle").style.visibility = "visible";
    document.getElementById("racetitle").innerHTML= " ";
    document.getElementById("racetitle").className = "racetitle";
    //document.getElementById("racetitle").style.fontSize = "24px";
    //document.getElementById("racetitle").setAttribute("align", "center");
    //document.getElementById("TitleDIV").innerHTML = races[Counter].title
    document.getElementById("racetitle").innerHTML = races[Counter].title;
    document.getElementById("voteFor").style.visibility = "visible"; //Vote for 1.
    document.getElementById("propText").style.visibility="hidden";
    //document.getElementByID("propText").style.visibility = "hidden" not in old document
    document.getElementById("first").style.visibility="visible";
    document.getElementById("second").style.visibility="visible";
    document.getElementById("third").style.visibility="visible";
    document.getElementById("first").className = "candidate";
    document.getElementById("second").className = "candidate";
    //document.getElementById("p1").style.visibility="visible";
    //document.getElementById("p2").style.visibility= "visible";

    //Clean the checkboxes to make sure there are no weird selections
    for(box = 0; box < checkboxes.length; box++) {
        document.getElementById(checkboxes[box]).checked = false;


        document.getElementById("Next").setAttribute("class", "skip");
        document.getElementById("Next").innerHTML ="Skip"
    }

    document.getElementById("c1").style.color = "black";
    document.getElementById("p1").style.color = "black";
    document.getElementById("c2").style.color = "black";
    document.getElementById("p2").style.color = "black";
    document.getElementById("c3").style.color = "black";
    document.getElementById("p3").style.color = "black";

    //alert("Now setting up the checkboxes!");
  for (box = 0; box < races[Counter].candidates.length; box++) {
          document.getElementById(checkboxes[box]).checked = (races[Counter].candidates[box].voted == true);


        if(document.getElementById(checkboxes[box]).checked) {
            var id = "";

            if (box === 0) {
                id = "1";
            } else if (box === 1) {
                id = "2";
            } else if (box === 2) {
                id = "3";
            } else {
                alert("Something has gone wrong!");
            }


            document.getElementById("c" + id).style.color = "white";
            document.getElementById("p" + id).style.color = "white";

            document.getElementById("Next").setAttribute("class", "next");
            document.getElementById("Next").innerHTML ="Next";
        }
    }


    var t=new Array(races[Counter].cand.length);
    var p=new Array(races[Counter].cand.length);
    for (var i=0;i<races[Counter].cand.length;i++) {
        t[i] = races[Counter].cand[i].getElementsByTagName("name")[0];
        p[i] = races[Counter].cand[i].getElementsByTagName("party")[0]
    }
    // loop that adds candidates to and parties to array


    if(races[Counter].cand.length >2)
    {
        document.getElementById("first").style.visibility="visible";
        document.getElementById("second").style.visibility="visible";
        document.getElementById("third").style.visibility="visible"
    }
    if (races[Counter].cand.length == 2)
    {
        document.getElementById("third").style.visibility="hidden"
    }

    if (races[Counter].cand.length==1 )
    {
        document.getElementById("second").style.visibility="hidden";
        document.getElementById("third").style.visibility="hidden"
    }



    for (var h=0; h<races[Counter].cand.length; h++)
    {
        document.getElementById("c"+(h+1)).innerHTML =races[Counter].candidates[h].name;
        document.getElementById("p"+(h+1)).innerHTML =races[Counter].candidates[h].party
    }
}

function nextProp(Counter)
{
    document.getElementById("reviews").style.display="none";
    document.getElementById("reviews").style.visibility="hidden";
    document.getElementById("reviewTop").style.visibility="hidden";
    document.getElementById("review1").style.visibility="hidden";
    document.getElementById("review2").style.visibility="hidden";
    document.getElementById("Debug").value="Next Prop Counter= "+Counter;
    document.getElementById("TitleDIV").innerHTML = races[Counter].title;
    //document.getElementById("votinginstructions").innerHTML = "Click on the box next to the response to make a selection.  A checkmark will appear next to your choice. If you want to change your choice, just click on a different box."
    document.getElementById("racetitle").className = "racetitle";
    //document.getElementById("racetitle").style.fontSize = "17px";
    //document.getElementById("racetitle").setAttribute("align", "left");
    document.getElementById("third").style.visibility="hidden";
    document.getElementById("voteFor").style.visibility="hidden";
    document.getElementById("propText").style.visibility="visible";
    document.getElementById("second").style.visiblility= "visible";
    document.getElementById("first").style.visibility= "visible";
    document.getElementById("first").className = "propchoice";
    document.getElementById("second").className = "propchoice";
    document.getElementById("racetitle").className = "propText";
    document.getElementById("racetitle").innerHTML = "";
    //document.getElementByID("propText").style.visibility = "visible" not in old document
    document.getElementById("c1").innerHTML= "";
    document.getElementById("c2").innerHTML= "";
    document.getElementById("p1").style.visibility="hidden";
    document.getElementById("p2").style.visibility= "hidden";
    document.getElementById("racetitle").innerHTML = races[Counter].text;

    //Clean the checkboxes to make sure there are no weird selections
    for(box = 0; box < checkboxes.length; box++) {
        document.getElementById(checkboxes[box]).checked = false;



        document.getElementById("Next").setAttribute("class", "skip");
        document.getElementById("Next").innerHTML ="Skip"
    }

    document.getElementById("c1").style.color = "black";
    document.getElementById("p1").style.color = "black";
    document.getElementById("c2").style.color = "black";
    document.getElementById("p2").style.color = "black";
    document.getElementById("c3").style.color = "black";
    document.getElementById("p3").style.color = "black";

    //alert("Now setting up the checkboxes!");
    for (box = 0; box < races[Counter].candidates.length; box++) {
        document.getElementById(checkboxes[box]).checked = (races[Counter].candidates[box].voted == true);


        if(document.getElementById(checkboxes[box]).checked) {
            var id = "";

            if (box === 0) {
                id = "1";
            } else if (box === 1) {
                id = "2";
            } else if (box === 2) {
                id = "3";
            } else {
                alert("Something has gone wrong!");
            }


            document.getElementById("c" + id).style.color = "white";
            document.getElementById("p" + id).style.color = "white";

            document.getElementById("Next").setAttribute("class", "next");
            document.getElementById("Next").innerHTML ="Next";
        }
    }


    for (var h=0; h<races[Counter].cand.length; h++)
    {
        document.getElementById("c"+(h+1)).innerHTML =races[Counter].candidates[h].name
    }
}

function showVoteData(){
    var r0= "Race" + ";" +"Time" +  ";" + "Choice" + ";" + "Party"+ "\n";
    var e0="Type"+ ";" +"Page" + ";" +"Time"+ "\n";
    var v0 = "Race;Choice;Party" +"\n";
    for (var x = 0; x < voteLog.length; x++) {
        r0 += voteLog[x].type+ ";"+ voteLog[x].time + ";"+ voteLog[x].choice + ";" + voteLog[x].party +"\n"
    }
    for (x = 0; x < eventLog.length; x++) {
        e0 += eventLog[x].type + ";" +eventLog[x].page +";"+ eventLog[x].time + "\n"
    }
    for(x=0; x<races.length; x++)
    {  	var selection = false;
        v0+=races[x].number+";";
        for(var l=0; l<races[x].candidates.length;l++)
        {
            if(races[x].candidates[l].voted==true)
            {
                selection = true;
                v0+=races[x].candidates[l].name+";" +races[x].candidates[l].party +"\n"
            }
        }
        if (selection == false)
        {
            v0+="No Selection;None"+"\n"

        }

    }


    document.getElementById("voteLog").value = r0;
    document.getElementById("eventLog").value= e0;
    document.getElementById("Results").value=v0

}

function finishUp(){
    document.getElementById("reviews").style.visibility="hidden";
    document.getElementById("reviewTop").style.visibility="hidden";
    document.getElementById("review1").style.visibility="hidden";
    document.getElementById("review2").style.visibility="hidden";
    document.getElementById("finishUp").style.visibility="hidden";

    document.getElementById("submitScreen").style.visibility = "visible";
    document.getElementById("submitHeading").style.visibility= "visible";
    document.getElementById("submitText").style.visibility= "visible";
    document.getElementById("submitScreenBtns").style.visibility= "visible";
    document.getElementById("submit").style.visibility= "visible";
    document.getElementById("returnToBallot").style.visibility= "visible";
    document.getElementById("endVoting").style.visibility= "visible";

    print();
}

function hide(){
    document.getElementById("submitScreen").style.visibility = "hidden";
    document.getElementById("submitHeading").style.visibility="hidden";
    document.getElementById("submitText").style.visibility="hidden";
    document.getElementById("submitScreenBtns").style.visibility="hidden";
    document.getElementById("submit").style.visibility="hidden";
    document.getElementById("returnToBallot").style.visibility="hidden";
    document.getElementById("endVoting").style.visibility="hidden";
}

function finish() {
    document.getElementById("submitScreen").style.display = "none";
    //document.getElementById("submitHeading").style.display = "none";
    //document.getElementByID("submitText").style.display = "none";
    //document.getElementByID("submitScreenBtns").style.display = "none";

    //document.getElementByID("returnToBallot").style.display = "none";
    //document.getElementById("endVoting").style.display = "none"
    document.getElementById("confirmation").style.visibility= "visible";
    document.getElementById("confText").style.visibility= "visible";
    document.getElementById("confHeading").style.visibility= "visible";
    document.getElementById("submit").style.visibility= "visible";
    showVoteData();

    //document.getElementById("end").style.visibility = "visible"
    //document.getElementById("end").innerHTML = "Your vote has been submitted!"
    //document.getElementById("review").style.visibility = "hidden"
    //document.getElementById("Title").innerHTML = "Vote Submitted!"
}

function print(){
    var html = generatePrintableHTML();
    document.getElementById("printout").innerHTML = 'data:text/html;charset=utf-8,' + encodeURI(html);




    window.frames["printout"].print();
}

function generatePrintableHTML() {
    var output = '';

    output += '<html>';


    output += '</html>';

    return output;
}


// JavaScript Document