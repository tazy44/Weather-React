function bringWeather() {

  var city = $('#cityField').val();
  var url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=c991a799fb3183a5142203a6f90d0a75';
  var response = ''; //The App's text reaction to user
  var bg = ''; //A background generated from Unsplash
  var img = new Image(); //An Image object to hold the bg and make sure it is fully loaded before it shows
  var responses = [
    "Nice my ass. It's freezing out there!", // Below 0
    "Kind of. It's a little chilly though!", // (0 - 9)
    "Hell yeah, it is. Get out and dance!", // (10 - 19)
    "Yes. It's a little warm though!", // (20 - 29)
    "Good luck getting BBQed out there!" // 30 or above]
  ];

  $.getJSON (url, function(res) { //The callback function in case the request is successful
    tempinCelcius = parseInt(res['main'].temp)-273; //Converting Temperature from Kelvin to Celcius

    //Based on the temperature range, a response displays and colors transition.
    //The response displays in callback function to force the new response to
    //display after the old response has already faded out
    //The response & color transition code is repeated in each case because
    //the classes that have to be removed from the body in each case is different

    switch (true) {
      case tempinCelcius < 0:
        response = responses[0];
        bg  = 'cold';
        img.src = 'https://source.unsplash.com/1600x900/?'+bg;
        $('#weather').find('h3').fadeOut(300, function() {
        $(this).html(response).fadeIn(300);
        $('body').addClass('reaction-zero', 1000)
        .removeClass('reaction-three reaction-four reaction-two reaction-one');
        });
        break;
        break;

      case tempinCelcius < 10:
        response = responses[1];
        bg  = 'chill';
        img.src = 'https://source.unsplash.com/1600x900/?'+bg;
        $('#weather').find('h3').fadeOut(300, function() {
        $(this).html(response).fadeIn(300);
        $('body').addClass('reaction-one', 1000)
        .removeClass('reaction-three reaction-four reaction-zero reaction-two');
        });
        break;

      case tempinCelcius < 20 :
        response = responses[2];
        bg  = 'dance';
        img.src = 'https://source.unsplash.com/1600x900/?'+bg;
        $('#weather').find('h3').fadeOut(300, function() {
        $(this).html(response).fadeIn(300);
        $('body').addClass('reaction-two', 1000)
        .removeClass('reaction-three reaction-four reaction-zero reaction-one');
        });
        break;

      case tempinCelcius < 30:
        response = responses[3];
        bg  = 'summer';
        img.src = 'https://source.unsplash.com/1600x900/?'+bg;
        $('#weather').find('h3').fadeOut(300, function() {
        $(this).html(response).fadeIn(300);
        $('body').addClass('reaction-three', 1000)
        .removeClass('reaction-two reaction-four reaction-zero reaction-one');
        });
        break;
      
      default:
        response = responses[4];
        bg  = 'hot';
        img.src = 'https://source.unsplash.com/1600x900/?'+bg;
        $('#weather').find('h3').fadeOut(300, function() {
        $(this).html(response).fadeIn(300);
        $('body').addClass('reaction-four', 1000)
        .removeClass('reaction-two reaction-three reaction-zero reaction-one');
        });
        break;
    }

    $('#weather').find('h2')
                  .html(tempinCelcius+'&deg;C</br>'+res['name']+', '+res['sys'].country)
                  .slideDown(1000);
    $('h4').fadeIn(8000, "linear");

    function showNewBg() {
      $('html').css({
        "background" : "url("+img.src+") no-repeat center center fixed",
        "-webkit-background-size": "cover",
        "-moz-background-size": "cover",
        "-o-background-size": "cover",
        "background-size": "cover"
      });
    }

    if (img.complete) {
      showNewBg();
    } else {
      img.addEventListener('load', showNewBg)
      img.addEventListener('error', function() {
          //Show the default bg saved on your server
          //alert('error');
      })
    } 

  })
  .fail(function() { //Error handler in case the user enters an unrecognized city
    resHTML = '<h3 class="display-4">I would tell you If you entered a real place!</h3>';
    $('#weather').html(resHTML);
  });            

}
      
// Try Cairo, london, toronto, juneau, sao paolo, moscow, lviv, warsaw, paris, mexico city, new york,
// vancouver, kiev, oslo, canberra, kuala lumpur, abuja, helsinki, madrid, Buenos Aires, khartoum, tel aviv   