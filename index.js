// private b9387eb3d701ea1e371e1f554eb585c5
// public ab730e7076afd4c1be7f21cabdc8b507


let resultData;

// search for Events using API
function createEventSearchString(limit, key, startDate) {
    return 'https://gateway.marvel.com:443/v1/public/events?orderBy=' + startDate + '&limit=' + limit + '&apikey=' + key;
}

// actually call the API that will help grab the teams/events
function apiCallTeams() {
    const marvelAPI = createEventSearchString(10, 'ab730e7076afd4c1be7f21cabdc8b507', '-startDate');
    $.getJSON(marvelAPI, function (result) {
        populateDropdown(result.data.results);
    }).done(function (response) {})
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
    $('#teams').on('change', function () {
        $(".profilePage").empty();
        // console.log(this.value);
        const eventID = this.value;
        apiCallCharacters(eventID);
    });
}




// ^^ change name to make sure it's clear

// search for Characters using API
function createCharacterSearchString(eventID, limit, key, modified) {
    return 'https://gateway.marvel.com:443/v1/public/events/' + eventID + '/characters?orderBy=' + modified + '&limit=' + limit + '&apikey=' + key;
}

// actually call the API that will grab the characters/team members
function apiCallCharacters(eventID) {
    const marvelAPIC = createCharacterSearchString(eventID, 7, 'ab730e7076afd4c1be7f21cabdc8b507', 'modified');
    let profileDescription = "Hmm. Looks like this team has been disbanded, abandoned, or is just getting started. Reach out to your supervisor to find out more information.";

    $.getJSON(marvelAPIC, function (result) {
        resultData = populateMemberProfile(result.data.results);
        console.log(resultData);
    }).done(function (response) {
        console.log(response, response.data.results.length);
        if (response.data.results.length < 1) {
            resultData = profileDescription;
             console.log(resultData);
        }
    })
};

// Create the member profiles via API info
function populateMemberProfile(data) {
    const ProfPage = $('.profilePage');
    const Members = $('.memberProfile');
    const memberPhotos = $('.imageBoxes');

    for (let i = 0; i < data.length; i++) {

        const newImageSRC = data[i].thumbnail.path + "." + data[i].thumbnail.extension;

        let newUL = document.createElement("UL");
        newUL.className = "memberProfile";

        let teamMemberName = data[i].name;

        let description = "Want to learn more about your team member? Since they haven't yet entered their own description, see what they've been working on and with whom by clicking the Projects button below!";
        if (data[i].description.length > 1) {
            description = data[i].description;
        }

        const appendImage = $("<li class='imageBoxes'> <img src='" + newImageSRC + "'> </li>").appendTo(newUL);

        $("appendImage").appendTo(memberPhotos);

        $(newUL).appendTo(ProfPage);

        console.log(data[i].id);
        const appendText = $(`<li class="newLI"><span>${teamMemberName}</span>${description}<button class="projectButton">Projects</button></li>`).appendTo(newUL);
    }
    $('.projectButton').on('click', function () {
        let i = $(this).closest('.memberProfile').index();
        displayCharacterProjects(i);
    });
    return data;
}

// ^^ moved function out of here

// $('.profilePage').on('click', '.newLI span', function() {
//     console.log('span');
// });
// ^^ this didn't work for some reason

// grab characterID so I can then use the ID to grab the Series
function displayCharacterProjects(id) {
    $(".profilePage").empty();
    console.log("id: " + id, resultData);
    apiCallSeries(id);
}
// ^^ so far it empties the page but it won't call the apiCallSeries function well


// search for Series using API
function createSeriesSearchString(id, limit, key, modified) {
    
    let k = 'https://gateway.marvel.com:443/v1/public/characters/' + id + '/series?orderBy=' + modified + '&limit=' + limit + '&apikey=' + key;
    console.log(k);
    return k;
    }

// actually call the API that will grab the Series/Projects
function apiCallSeries(id) {
    console.log(id);
    const marvelAPIS = createSeriesSearchString(id, 7, 'ab730e7076afd4c1be7f21cabdc8b507', 'title');
    let projectDescription = "Hmm. Looks like your team member hasn't had a lot going on. Maybe they like to keep to themselves. Reach out to your team member to find out if they're looking for a chance to get more involved or prefer to work on their own private projects.";

    $.getJSON(marvelAPIS, function (result) {
        populateProjectProfile(result.data.results);
    }).done(function (response) {
        // if (result.data.results > 1) {
        //     projectDescription = result.data.results;
        // }
    })
};

// Create the member profiles via API info
function populateProjectProfile(data) {

    // all the naming
    const projPage = $('.projectsPage');
    const projHead = $('.projectHeader');
    const projectPhotos = $('.largerImageBox');
    const Projects = $('.projectProfile');

    let newUL = document.createElement("UL");
    newUL.className = "projectHeader";

    let newUL2 = document.createElement("UL");
    newUL2.className = "projectProfile";

    // loop start
    for (let i = 0; i < data.length; i++) {

        // loop specific naming
        const profImageSRC = data[i].thumbnail.path + "." + data[i].thumbnail.extension;
        let projectName = data[i].name;

        // filler text for profiles without descriptions
        let description = "It seems like your team members didn't get a chance to write a description about their project. Reach out to your supervisor to find out more.";
        if (data[i].description.length > 1) {
            description = data[i].description;
        }


        // appendages to projectHeader of NAME and IMAGE
        const appendProfileImage = $("<li class='largerImageBox'> <img src='" + profImageSRC + "'> </li>").appendTo(newUL);

        $("appendProfileImage").appendTo(projectPhotos);

        const appendText1 = $("<li class='teamMemberName'>" + projectName + "</li>").appendTo(newUL);

        $(newUL).appendTo(profPage);

        // appendages to projectProfile
        const appendText2 = $("<li class='descriptionText'>" + projectName + "</li>").appendTo(newUL2);

        $(newUL2).appendTo(profPage);
    }
}



// function that makes the whosWho nav bar item display the new page
function whosWho() {
    $('section').hide();
    $('#whosWhoPage').show();
}


// catch all document ready function that calls other functions
$(function () {
    // event listener for whos who button
    $('.whosWho').on('click', function (whosWho) {});
    $('.whoswhoPage').hide();
    //populate dropdown and initial data for view
    apiCallTeams();
    getEventId();


});