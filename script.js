$(document).ready(function() {
  $("#btnOk").click(function(){
    var city=$("#city").val();
    var code=$("#code").val();
    if(city.length>1){
      var urllink='http://api.openweathermap.org/data/2.5/weather?q=';
      urllink=urllink + city;
      if(code.length==2){
           urllink=urllink+','+code;
      }
      urllink=urllink+'&appid=8a493275eec43a055015e52e37ec5329';

       $.ajax({
         url: urllink,
         data : { format: 'json' } ,
         error : function(){
             $("#main").html("Error. No response from server! Please check the inputs!")
         },
         dataType: 'json',
         success : function(data){
            console.log("temp:"+data.main.temp);
            console.log("desc:"+data.weather[0].description);
            $('#main').empty();
            var table=$("<table/>");
            table.addClass("weatherTable");

            var tr=getLine('City',city);
            table.append(tr);

            var tr=getLine('Country',data.sys.country);
            table.append(tr);

            tr=getLine("Temperature", data.main.temp-273.15);
            table.append(tr);

            tr=getLine("Humidity", data.main.humidity+' %');
            table.append(tr);

            tr=getLine("Pressure", data.main.pressure+' hPa');
            table.append(tr);

            tr=getLine("Description", data.weather[0].description);
            table.append(tr);

            $('#main').append(table) ;

            if($("#details").is(':checked')){
              tr=getLine("Wind", data.wind.speed);
              table.append(tr);

              tr=getLine("Min temp", data.main.temp_min-273.15);
              table.append(tr);

              tr=getLine("Max temp", data.main.temp_max-273.15);
              table.append(tr);

              tr=getLine("Sunrise", new Date(data.sys.sunrise*1000).getHours()+':'+new Date(data.sys.sunrise*1000).getMinutes());
              table.append(tr);

              tr=getLine("Sunset", new Date(data.sys.sunset*1000).getHours()+':'+new Date(data.sys.sunset*1000).getMinutes());
              table.append(tr);
            }
         },
         type: 'GET'

      });

    }
  });

  function getLine(data1,data2){
    var tr=$("<tr/>");
    var td1=$("<td/>");
    $(td1).append(data1);
    var td2=$("<td/>");
    $(td2).append(data2);
    tr.append(td1);
    tr.append(td2);
    return tr;
  }

});
