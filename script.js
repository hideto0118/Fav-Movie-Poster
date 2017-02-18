$(document).ready(function(){

   $('#term').focus(function(){
      var full = $("#poster").has("img").length ? true : false;
      if(full == false){
         $('#poster').empty();
      }
   });

   var getPoster = function(){

        var film = $('#term').val();

         if(film == ''){

            $('#poster').html("<h2 class='short-comment'>Ha! Please enter something.</h2>");

         } else {

            $('#poster').html("<h2 class='short-comment'>Your poster is on its way!</h2>");

            $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=4c629c9d25705e8aa4f9aaf6ec8a0c8b&language=en-US&query=" + film, function(json) {
               if (json.total_results != 0 ){
                $('#poster').html('<h2 class="short-comment">Heee Haaa! We found you a poster!</h2><h2 class="movie-title">' + json.results[0].original_title +'</h2><div class="img-box"><img id="thePoster" src="https://image.tmdb.org/t/p/original' + json.results[0].poster_path + '" /></div>');
                } else {
                     $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=4c629c9d25705e8aa4f9aaf6ec8a0c8b&language=en-US&query=Totoro", function(json) {
                        console.log(json);
                        $('#poster').html('<h2 class="short-comment">No result found.<br> Let me show you my favorite instead.</h2><h2 class="movie-title">' + json.results[0].original_title +'</h2><div class="img-box"><img id="thePoster" src="https://image.tmdb.org/t/p/original' + json.results[0].poster_path + '" /></div>');
                     });
                  }
             });

          }

        return false;
   }

   $('#search').click(getPoster);
   $('#term').keyup(function(event){
       if(event.keyCode == 13){
           getPoster();
       }
   });
});