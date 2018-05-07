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
//^^data as object should be results

// grab event ID so I can then use the ID to grab the characters
function getEventId() {
    $('#teams').on("change", 'selectTeam', function(event) {
        const eventID = $(this).val();
        console.log("ID", eventID);
    });
}

// catch all document ready function that calls other functions
$(function() {
    apiCallTeams();
    apiCallCharacters();
    getEventId()
});




// search for Characters using API
function createCharacterSearchString(limit, key, id) {
    return 'https://gateway.marvel.com:443/v1/public/events/eventID/characters=' + 'id' + '&limit=' + limit + '&apikey=' + key;
}

// actually call the API that will grab the characters/team members
function apiCallCharacters() {
    const marvelAPIC = createCharacterSearchString(7, 'ab730e7076afd4c1be7f21cabdc8b507', 'eventID');
    $.getJSON(marvelAPIC, function(result) {
        populateMemberProfileImages(result.data.results);
        populateMemberProfileDescriptions(result.data.results);
    }).done(function(response) {
        console.log("Lets see the response 2 ", response);
    })
};

// Create the member profile IMAGES via API info
function populateMemberProfileImages(data) {
    const Members = $('.memberProfile');
    const memberPhotos = $('.imageBoxes');
    // const memberDescriptions=$('.descriptionText');
    for (let i = 0; i < data.length; i++) { $("<li>" + data[i].thumbnail + "</li").appendTo(Members); }
}

// Create the member profile TEXT via API info
function populateMemberProfileDescriptions(data) {
    const Members = $('.memberProfile');
    // const memberPhotos=$('.imageBoxes');
    const memberDescriptions = $('.descriptionText');
    for (let i = 0; i < data.length; i++) { $("<li>" + data[i].name.description.series + "</li>").appendTo(Members); }
}


