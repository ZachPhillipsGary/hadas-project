$(function() {
    // $('.mainPage').css("display", "flex");
    formDropdown();
    apiCall();
    // setListenersForprofilePage();
    // setListenersForWhosWhoPage();
});

function apiCall() {
    var marvelAPI = 'https://gateway.marvel.com/v1/public/comics';
    $.getJSON(marvelAPI, {
        apikey: 'ab730e7076afd4c1be7f21cabdc8b507'
    });

    function formDropdown(#teams) {
        let params = {
            part: 'events'
            maxResults: 7
        }
    }