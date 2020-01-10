

$(document).ready(function(){
    //Document is loaded, ready to run more code

    var search_query = '';
    var modelsearch_query = '';
    var selected_year = 0;
    var car_id = false;

    cool_search();

    //prevent form refresh
    $("#search-form").on("submit", function(e){
        e.preventDefault();
    });

    //on keyup, start search cars
    $("#search-form #search-nickname").on("keyup", function(){
        search_query = $(this).val();
        cool_search();
    }); // end of search keyup
    
    $("#search-form #modelsearch").on("keyup", function(){
        modelsearch_query = $(this).val();
        cool_search();
    }); // end of search keyup

    // on Change of select field
    $("#year-select").on("change", function(){
        selected_year = $(this).val();
        cool_search();
    });

    //On Delete Button(trash can) click
    $("#search-results").on("click", "[data-action=delete]", function(){
        car_id = $(this).data("car");
        $("#deleteCarAlert").modal("show");
    });

    //On Delete Confirmation click
    $("#deleteCarAlert").on("click", "[data-action=confirm-delete]", function(){
        $.ajax({
            url: "ajax/delete.php", 
            type: "POST", 
            data: {
                id: car_id
            },
            success: function(result){
                console.log(result);
                $("#deleteCarAlert").modal("hide");
                car_id = false;
                cool_search();
            }
        });
    });

    //On add button click
    $("[data-action='new_car']").on("click", function(){
        var car_make_input = $("#car_make_input").val();
        var car_model_input = $("#car_model_input").val();
        var car_year_input = $("#car_year_input").val();
        var car_nickname_input = $("#car_nickname_input").val();
        $.ajax({
            url: "ajax/addnew.php", 
            type: "POST", 
            data: {
                make: car_make_input,
                model: car_model_input,
                year: car_year_input,
                nickname: car_nickname_input
            },
            success: function(result){
                console.log(result);
                cool_search();
            }
        });
    })


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
                modelsearch: modelsearch_query
            }, // Data to be passed to file via POST
            function(car_data){ // On complete function (returned data)
                
                if(car_data == "") return;
                
                var cars = JSON.parse(car_data); // translates php json into usable JavaScript
                var table_rows = '';

                          // function: for each (index, object)
                $.each(cars, function(i, car) {
                    table_rows += "<tr><td>"+car.make+"</td><td>"
                                            +car.model+"</td><td>"
                                            +car.year+"</td><td>"
                                            +car.nickname+"</td><td>"
                                            +"<button class='btn btn-outline-danger' data-action='delete' data-car='"+car.id+"'><i class='fas fa-trash'></i></button>"+"</td></tr>";
                });

                $("#search-results").html(table_rows);

            }
        );

    } // end of cool search

}); //end of document.ready