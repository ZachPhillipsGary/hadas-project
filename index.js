// private b9387eb3d701ea1e371e1f554eb585c5
// public ab730e7076afd4c1be7f21cabdc8b507


// search for Events using API
function createEventSearchString(limit, key, startDate) {
    return 'https://gateway.marvel.com:443/v1/public/events?orderBy=' + startDate + '&limit=' + limit + '&apikey=' + key;
}

// actually call the API that will help grab the teams/events
function apiCallTeams() {
    const marvelAPI = createEventSearchString(10, 'ab730e7076afd4c1be7f21cabdc8b507', '-startDate');
    $.getJSON(marvelAPI, function(result) {
        populateDropdown(result.data.results);
    }).done(function(response) {
    })
};

// Create the dropdown with the Events from the API
// Add code that will insert ID as well so we can grab it more easily
function populateDropdown(data) {
    const teams = $('#teams');
    for (let i = 0; i < data.length; i++) {
        $(`<option value='${data[i].id}'>${data[i].title}</option>`).appendTo(teams);
    }
}
//^^data as object should be results

// grab event ID so I can then use the ID to grab the characters
function getEventId() {
    $('#teams').on('change', function() {
        $(".profilePage").empty();
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
    let profileDescription = "Hmm. Looks like this team has been disbanded, abandoned, or is just getting started. Reach out to your supervisor to find out more information.";

    $.getJSON(marvelAPIC, function(result) {
        populateMemberProfile(result.data.results);
    }).done(function(response) {
        if (result.data.results > 1) {
      profileDescription = result.data.results;
    }
    })
};

// Create the member profiles via API info
function populateMemberProfile(data) {
    const ProfPage =$('.profilePage');
    const Members = $('.memberProfile');
    const memberPhotos = $('.imageBoxes');


    for (let i = 0; i < data.length; i++) { 
    
    const newImageSRC = data[i].thumbnail.path + "." + data[i].thumbnail.extension;

    let newUL = document.createElement("UL");
    newUL.className="memberProfile";

    let teamMemberName = data[i].name;

    let description = "Want to learn more about your team member? Since they haven't yet entered their own description, see what they've been working on and with whom by clicking the Projects button below!";
    if (data[i].description.length > 1) {
      description = data[i].description;
    }

    const appendImage = $("<li class='imageBoxes'> <img src='" + newImageSRC + "'> </li>").appendTo(newUL);

    $("appendImage").appendTo(memberPhotos); 

    $(newUL).appendTo(ProfPage);

    // console.log(data[i].description);
    const appendText = $("<li class='newLI'>" + "<span>" + teamMemberName + "</span>" + description + "<button onClick='showProjectPage("+data[i].series.collectionURI+")'>Projects</button></li>").appendTo(newUL);
   
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


// function that makes the whosWho nav bar item display the new page
// function whosWho() {
//   $('section').hide();
//   $('#whosWhoPage').show();
// }
