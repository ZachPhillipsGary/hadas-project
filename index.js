$(function() {
    // $('.mainPage').css("display", "flex");
    // formDropdown();
    apiCall();
    // setListenersForprofilePage();
    // setListenersForWhosWhoPage();
});

function apiCall() {
    var marvelAPI = 'https://gateway.marvel.com/v1/public/comics';
    $.getJSON(marvelAPI, {
        apikey: 'ab730e7076afd4c1be7f21cabdc8b507'
    })
    .done(function(response){
        console.log("Lets see the response " + response);
    })
}
//      .done(function( response ) {
//       var results = response.data.results;
//       debugger;
//       var resultsLen = results.length;
//       var output = '<ul>'; 
      
//       for(var i=0; i<resultsLen; i++){
//         if(results[i].images.length > 0) {
//           var imgPath = results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension;
//           output += '<li><img src="' + imgPath + '"><br>'+results[i].title+'</li>';
//         }
//       }  
//       output += '</ul>'
//       $('#results').append(output);
//   });
   
// };

    // function formDropdown(#teams) {
    //     let params = {
    //         part: 'events'
    //         maxResults: 7
    //     }
    // };