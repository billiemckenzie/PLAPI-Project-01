

$(document).ready(function(){

    var search_query = '';
    var modelsearch_query = '';
    var selected_year = 0;

    //Document is loaded, ready to run more code
    $("#search-form").on("submit", function(e){
        e.preventDefault(); //prevent form refresh

    });

    //on keyup, start search cars
    $("#search-form #search-nickname").on("keyup", function(){
        search_query = $(this).val();
        cool_search();
    }); // end of search keyup
    
    $("#search-form #search-model").on("keyup", function(){
        modelsearch_query = $(this).val();
        cool_search();
    }); // end of search keyup

    // on Change of select field
    $("#year-select").on("change", function(){
        selected_year = $(this).val();
        cool_search();
    });

    /*
    * cool_search
    * send search query to search.php
    * return json results
    */

    function cool_search() {

        $.post (
            'ajax/search.php', //URL of file to call
            {
                search: search_query, 
                year: selected_year,
                model: modelsearch_query
            }, // Data to be passed to file via POST
            function(car_data){ // On complete function (returned data)
                
                if(car_data == "") return;
                
                var cars = JSON.parse(car_data); // translates php json into usable JavaScript
                var table_rows = '';

                          // function: for each (index, object)
                $.each(cars, function(i, car) {
                    table_rows += "<tr><td>"+car.make+"</td><td>"+car.model+"</td><td>"+car.year+"</td><td>"+car.nickname+"</td></tr>";
                });

                $("#search-results").html(table_rows);

            }
        );

    } // end of cool search

}); //end of document.ready