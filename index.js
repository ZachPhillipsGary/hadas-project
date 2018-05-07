// private b9387eb3d701ea1e371e1f554eb585c5
// public ab730e7076afd4c1be7f21cabdc8b507

const MARVEL_API = 'https://gateway.marvel.com:443/v1/public/characters?apikey=b9387eb3d701ea1e371e1f554eb585c5';
const MARVEL_COMICS_API = 'https://gateway.marvel.com:443/v1/public/characters/';
const MARVEL_CHARACTERS_API = 'https://gateway.marvel.com:443/v1/public/characters?eventList&orderBy=-name&limit=7&apikey=ab730e7076afd4c1be7f21cabdc8b507';
const MARVEL_EVENTS_API = 'https://gateway.marvel.com:443/v1/public/events?orderBy=startDate&limit=7&apikey=ab730e7076afd4c1be7f21cabdc8b507';

function createEventSearchString(limit, key, CharacterList) {
    return 'https://gateway.marvel.com:443/v1/public/events?characters=' + '-startDate' + '&limit=' + limit + '&apikey=' + key;
}
function createCharacterSearchString(limit, key, startDate) {
    return 'https://gateway.marvel.com:443/v1/public/events/eventID/characters=' + name + '&limit=' + limit + '&apikey=' + key;
}
function populateDropdown(data) {
  var teams=$('#teams');
  for (var i=0; i < data.length; i++)
    {$("<option>"+data[i].title+"</option>").appendTo(teams);}
}

$(function() {
    // $('.mainPage').css("display", "flex");
    // formDropdown();
    apiCallTeams();
    apiCallCharacters();
    // setListenersForMainPage();
    // setListenersForProfilePage();
    // setListenersForWhosWhoPage();
});

function apiCallTeams() {
    var marvelAPI = createEventSearchString(7, 'ab730e7076afd4c1be7f21cabdc8b507', '-startDate');
    $.getJSON(marvelAPI, function(result) {
        populateDropdown(result.data.results);
    }).done(function(response) {
        console.log("Lets see the response ", response);
    })
};

function apiCallCharacters() {
    var marvelAPIC = createCharacterSearchString(7, 'ab730e7076afd4c1be7f21cabdc8b507', 'CharacterList');
    $.getJSON(marvelAPIC, function(result) {
        populateMemberProfileImages(result.data.results);
        populateMemberProfileDescriptions(result.data.results);
    }).done(function(response) {
        console.log("Lets see the response 2 ", response);
    })
};

function populateMemberProfileImages(data) {
  var Members=$('.memberProfile');
  var memberPhotos=$('.imageBoxes');
  // var memberDescriptions=$('.descriptionText');
  for (var i=0; i < data.length; i++)
    {$("<li>"+data[i].thumbnail+"</li").appendTo(memberProfile);}
}

function populateMemberProfileDescriptions(data) {
  var Members=$('.memberProfile');
  // var memberPhotos=$('.imageBoxes');
  var memberDescriptions=$('.descriptionText');
  for (var i=0; i < data.length; i++)
    {$("<li>"+data[i].name.description.series+"</li>").appendTo(Members);}
}


//start with everything hidden so it doesn't have to rerender or display things then hide them
function hideAllSections() {
    $('section').hide();
}

//display the questions when the start button is clicked
function setListenersForProfilePage() {
    $('teams').select(function(event) {
        // alert(2);
        hideAllSections();
        // assuming this will be needed when we reload the page by selecting an item? Or is it not like a form?
        $('.profilePage').show();
    });
}

// dynamically create event list
// this is really tripping me up, might not be necessary for now

$('#teams').select(function(event) {
    event.preventDefault();
    let selectedTeam = $('option').val();
    getRequest(selectedTeam);
});

function getRequest(selectedTeam) {
    let params = {
        part: 'characterLists',
        key: 'ab730e7076afd4c1be7f21cabdc8b507',
        q: eventTitle,
        maxResults: 7
    };
    url = 'https://gateway.marvel.com:443/v1/public/events?orderBy=startDate&limit=7&apikey=ab730e7076afd4c1be7f21cabdc8b507';
    $.getJSON(url, params, function(data) {
        $('.selectedTeam').val("");
        $('.js-search-results').html("");
        showResults(data.items);
    });
}

// let dropdown = $('#locality-dropdown');

// dropdown.empty();

// dropdown.append('<option selected="true" disabled>Choose a Team</option>');
// dropdown.prop('selectedIndex', 0);

// const url = 'https://gateway.marvel.com/v1/public/events/{eventID}';

// // Populate dropdown with list of provinces
// $.getJSON(url, function (data) {
//   $.each(data, function (key, entry) {
//     dropdown.append($('<option></option>').attr('value', entry.abbreviation).text(entry.name));
//   })
// });




// };