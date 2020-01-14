//https://api.myjson.com/bins/tce4u


$(document).ready(function () {
    ListHotels();
    function ListHotels () {
        $.ajax ({
            dataType: 'json',
            type: 'get',
            url: 'https://api.myjson.com/bins/iz7sq',
            success: function (data) {
                var hotels = data[1].entries;
                hotels.forEach(function(hotel){
                    $('#hotelsList').append(
                        '<section>' +
                            '<div class="row  margin-0 mt-3 p-1">' +
                                '<div class="col-md-3 col-sm-1 text-center">' +
                                    '<img class="d-block w-100 image-size" src="'+ hotel.thumbnail +'" alt="First slide">' + 
                                '</div>' +
                                ' <div class="col-md-3 col">' +
                                    ' <blockquote class="blockquote">' +
                                        '<h5 class="card-title mb-0">"'+ hotel.hotelName +'"</h5>' +
                                            '<footer>' +
                                                '<h6 id="next-stars"><span id="stars">'+ ratingsHotel(hotel.rating) +'</span>Hotel</h6>' +
                                            '</footer>' +
                                    '</blockquote>' +
                                    '<div class="info-hotels">' +
                                        '<div>' +
                                        '<h6>"' + hotel.city +'"</h6>' +
                                        '</div>' +
                                        '<div>' +
                                            '<h6 id="next-to-rate"><button type="button" class="border-0" disabled>"'+ hotel.ratings.no +'"</button><strong>"'+ hotel.ratings.text +'"</strong></h6>' +
                                        '</div>' +
                                        '<div>' +
                                            '<h6>"Excellent location" (8.8 / 10)</h6>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                    '<div class="col-md-3 col">' +
                                    '</div>' +
                                    '<div class="col-md-3 col text-center flexing">' +
                                        '<div class="price-nights" id="prices">' +
                                        '<h5 id="website">Hotel Webside</h5>' +
                                            '<h6 id="price-hotel">"' + hotel.price + '$' +'"</h6>' +
                                    '</div>' +
                                    '<button type="submit" class="deal-buttons btn-lg" id="deal-btn">View Deal ></button>' +
                                '</div>' +
                            '</div>' +
                        '</section>'
                    )
                });
            },
            error: function() {
                alert('error');
            }
        });
    }
    function ratingsHotel(stars){
        if(stars == 1)
        {
            return '&starf;'
        }
        else if(stars == 2)
        {
            return '&starf;&starf;'
        }
        else if (stars == 3)
        {
            return '&starf;&starf;&starf;'
        }
        else if (stars == 4)
        {
            return '&starf;&starf;&starf;&starf;'
        }
        else{
            return '&starf;&starf;&starf;&starf;&starf;'
        }
    }
    var uniqueFilters = [];
    getUniqueFilters();
    function getUniqueFilters() {
        $.ajax({
            datatype: 'json',
            type: 'get',
            url: 'https://api.myjson.com/bins/tce4u',
            success: function(data) {
                var m = data[1].entries;
                m.forEach(function(datas){
                    for(j =0; j <datas.filters.length; j++){
                        if(uniqueFilters.indexOf(datas.filters[j].name) === -1){
                            uniqueFilters.push(datas.filters[j].name);
                        }
                    }
                })
                populateFilters();
            },
            error: function(){
    
            }
        });
    }
 
    
    function populateFilters(){
        var option = '';
        var i;
        for(i = 0; i < uniqueFilters.length; i++){
            option += '<option value="' + uniqueFilters[i] + '">' + uniqueFilters[i] + '</option>';
        }
        console.log(option);
        $('#sort-by-filters').append(option);
    }


    function autocomplete(inp, arr) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
              /*check if the item starts with the same letters as the text field value:*/
              if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
              }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
              /*If the arrow DOWN key is pressed,
              increase the currentFocus variable:*/
              currentFocus++;
              /*and and make the current item more visible:*/
              addActive(x);
            } else if (e.keyCode == 38) { //up
              /*If the arrow UP key is pressed,
              decrease the currentFocus variable:*/
              currentFocus--;
              /*and and make the current item more visible:*/
              addActive(x);
            } else if (e.keyCode == 13) {
              /*If the ENTER key is pressed, prevent the form from being submitted,*/
              e.preventDefault();
              if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
              }
            }
        });
        function addActive(x) {
          /*a function to classify an item as "active":*/
          if (!x) return false;
          /*start by removing the "active" class on all items:*/
          removeActive(x);
          if (currentFocus >= x.length) currentFocus = 0;
          if (currentFocus < 0) currentFocus = (x.length - 1);
          /*add class "autocomplete-active":*/
          x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
          /*a function to remove the "active" class from all autocomplete items:*/
          for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
          }
        }
        function closeAllLists(elmnt) {
          /*close all autocomplete lists in the document,
          except the one passed as an argument:*/
          var x = document.getElementsByClassName("autocomplete-items");
          for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
              x[i].parentNode.removeChild(x[i]);
            }
          }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
      }
      
      /*An array containing all the country names in the world:*/
      var cities =["Paris", "Toulouse", "Marseille"];
      autocomplete(document.getElementById("myInput"), cities);
});

