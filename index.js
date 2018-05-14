// private b9387eb3d701ea1e371e1f554eb585c5
// public ab730e7076afd4c1be7f21cabdc8b507


// search for Events using API
function createEventSearchString(limit, key, startDate) {
    return 'https://gateway.marvel.com:443/v1/public/events?orderBy=' + startDate + '&limit=' + limit + '&apikey=' + key;
}

// actually call the API that will help grab the teams/events
function apiCallTeams() {
    const marvelAPI = createEventSearchString(7, 'ab730e7076afd4c1be7f21cabdc8b507', '-startDate');
    $.getJSON(marvelAPI, function(result) {
        populateDropdown(result.data.results);
    }).done(function(response) {
        console.log("Lets see the response ", response);
    })
};

// Create the dropdown with the Events from the API
// Add code that will insert ID as well so we can grab it more easily
function populateDropdown(data) {
    const teams = $('#teams');
    for (let i = 0; i < data.length; i++) {
        $(`<option class='selectTeam' value='${data[i].id}'>${data[i].title}</option>`).appendTo(teams);
    }
}
// ^^ may want to remove the selectTeam class
//^^data as object should be results

// grab event ID so I can then use the ID to grab the characters
function getEventId() {
    // console.log(eventID);
    $('#teams').on('change', function() {
        $(".profilePage").empty();
        //^^ we console logged inside the function to see if it brought up anything. It did which meant that it was working!
        //^^ then we console logged this.value and got the value, so now we know that we don't need the $ and () just literally this.value to get the event ID!
        // console.log(this.value);
        const eventID = this.value;
        apiCallCharacters(eventID);
    });
}

// catch all document ready function that calls other functions
$(function() {
    apiCallTeams();
    getEventId()
});

// search for Characters using API
function createCharacterSearchString(eventID, limit, key, modified) {
    return 'https://gateway.marvel.com:443/v1/public/events/' + eventID + '/characters?orderBy=' + modified + '&limit=' + limit + '&apikey=' + key;
}

// actually call the API that will grab the characters/team members
function apiCallCharacters(eventID) {
    const marvelAPIC = createCharacterSearchString(eventID, 7, 'ab730e7076afd4c1be7f21cabdc8b507', 'modified');
    $.getJSON(marvelAPIC, function(result) {
        populateMemberProfileImages(result.data.results);
    }).done(function(response) {
        // console.log("Lets see the response 2 ", response);
    })
};

// Create the member profile IMAGES via API info
function populateMemberProfileImages(data) {
    const ProfPage =$('.profilePage');
    const Members = $('.memberProfile');
    const memberPhotos = $('.imageBoxes');
    // const memberDescriptions = $('.descriptionText');


    for (let i = 0; i < data.length; i++) { 
    
    const newImageSRC = data[i].thumbnail.path + "." + data[i].thumbnail.extension;
    // ^^ this variable didn't work because it was outside of the loop and didn't recognize i!

    let newUL = document.createElement("UL");
    newUL.className="memberProfile";

    let teamMemberName = data[i].name;

    let description = "Learn more about your team member. See what they've been working on and with whom by clicking this button";
    if (data[i].description.length > 1) {
      description = data[i].description;
    }

    const appendImage = $("<li class='newLI2'> <img class='imageBoxes' src='" + newImageSRC + "'> </li>").appendTo(newUL);
// ^^ clean up class names


    // $("#profPic").attr("src",newImageSRC)
      // console.log(newImageSRC);

// ^^ add LI

    $("appendImage").appendTo(memberPhotos); 

    $(newUL).appendTo(ProfPage);

    // console.log(data[i].description);
    const appendText = $("<li class='newLI'>" + teamMemberName + description + "<button onClick='myFunction("+data[i].series.collectionURI+")'>Projects</button></li>").appendTo(newUL);
   
    // appendText.appendTo(Members);
       }
}

// function showProjectPage() {
//   $('#teams').on('change', function() {
//     // apiCallSeries();
//     // ^^ create this!
//     populateProjectPage();
//   }
// }

// function populateProjectPage() {
//   const projects = $('.projectHeader');
//   const projectPhotos = $('.largerImageBox');
// }

//^^ check out the series link and fixed. Button with on click that calls some javascript, takes eventID and collectionURI as params. 


