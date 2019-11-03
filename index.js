let para;
let obj;
let temp;
let grouptext;
let grouptext2;
let groupitemcount = 0;

let weekday = new Array(7);
weekday[0] = "Søndag";
weekday[1] = "Mandag";
weekday[2] = "Tirsdag";
weekday[3] = "Onsdag";
weekday[4] = "Torsdag";
weekday[5] = "Fredag";
weekday[6] = "Lørdag";


const bearingToCP = (bearing) => {
// Converts bearing in degrees to compass point
    let compassp = ['Nord', 'Nordnordøst', 'Nordøst', 'Østnordøst', 'Øst',
        'Østsydøst', 'Sydøst', 'Sydsydøst', 'Syd', 'Sydsydvest', 'Sydvest', 'Vestsydvest',
        'Vest', 'Vestnordvest', 'Nordvest', 'Nordnordvest'];
    return compassp[Math.floor((((bearing * 100) + 1125) % 36000) / 2250)];
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const userAction = async () => {
    let response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Odense%2Cdk&APPID=d3e192787ed1c3fc8dc762e2b39dea6f&units=metric&lang=da');
    let myJson = await response.json();
    let list;
    let s;
    obj = JSON.parse(JSON.stringify(myJson));
    console.log(obj);
    para = document.getElementById("humidity");
    para.childNodes[0].nodeValue = obj.main.humidity + ' %';
    para = document.getElementById("pressure");
    para.childNodes[0].nodeValue = obj.main.pressure + ' hPa';
    para = document.getElementById("temp")
    temp = obj.main.temp;
    temp = temp.toString().substr(0, temp.toString().indexOf("."));
    para.childNodes[0].nodeValue = temp + ' °C';
    if ((obj.visibility)){
        para = document.getElementById("visibility");
        para.childNodes[0].nodeValue = obj.visibility + ' meter';
    }
    para = document.getElementById("description");
    para.childNodes[0].nodeValue = capitalize(obj.weather[0].description);
    para = document.getElementById("speed");
    para.childNodes[0].nodeValue = obj.wind.speed + ' m/s';
    para = document.getElementById("deg");
    para.childNodes[0].nodeValue = bearingToCP(obj.wind.deg);
    para = document.getElementById("sunrise");
    s = new Date(parseInt(obj.sys.sunrise) * 1000).toLocaleTimeString("da-DK")
    para.childNodes[0].nodeValue = s;
    s = new Date(parseInt(obj.sys.sunset) * 1000).toLocaleTimeString("da-DK")
    para = document.getElementById("sunset");
    para.childNodes[0].nodeValue = s;
    let element = document.getElementById('weather_image');
    para = document.createElement("img");
    para.src = 'https://openweathermap.org/img/wn/' + obj.weather[0].icon + '@2x.png';
    element.appendChild(para);

    response = await fetch('http://api.openweathermap.org/data/2.5/forecast?q=Odense%2Cdk&APPID=d3e192787ed1c3fc8dc762e2b39dea6f&units=metric&lang=da');
    myJson = await response.json();
    obj = JSON.parse(JSON.stringify(myJson));
    list = obj.list;
    for (let i = 0; i < list.length; i++) {
        if (list[i].dt_txt.indexOf(grouptext) < 0) {
            grouptext = list[i].dt_txt.substr(0, list[i].dt_txt.indexOf(' '));
            grouptext2 = grouptext.substr(8, 2) + '-' + grouptext.substr(5, 2) + '-' + grouptext.substr(0, 4);
            ddd = document.createElement('div');
            ddd.setAttribute('class', 'groupheader');
            var d = new Date(grouptext);
            grouptext2 = weekday[d.getDay()] + ' ' + grouptext2;
            eee = document.createTextNode(grouptext2);
            ddd.appendChild(eee);
            element = document.getElementById('rightmain');
            element.appendChild(ddd);
            if (groupitemcount > 0) {
                document.getElementsByClassName('groupitem')[groupitemcount - 1].setAttribute('class', 'groupitem2');
                groupitemcount--;
            }
        }
        groupitem = document.createElement('div');
        groupitem.setAttribute('class', 'groupitem');
        mainweather = document.createElement('div');
        mainweather.setAttribute('class', 'mainweather');
        mainweathertext = document.createTextNode(list[i].dt_txt.substr(10, 6));
        mainweather.appendChild(mainweathertext);
        mainweatherimage = document.createElement('img');
        mainweatherimage.setAttribute('src', 'https://openweathermap.org/img/wn/' + list[i].weather[0].icon + '@2x.png');
        mainweatherimage.setAttribute('class', 'weatherimage');
        mainweather.appendChild(mainweatherimage);
        detailweather = document.createElement('div');
        upperdetailweather = document.createElement('div');
        upperdetailweather.setAttribute('class', 'upperdetailweather');
        detailweather.appendChild(upperdetailweather);
        lowerdetailweather = document.createElement('div');
        lowerdetailweather.setAttribute('class', 'lowerdetailweather');

        detailweather.appendChild(lowerdetailweather);
        detailweather.setAttribute('class', 'detailweather');
        detailweather_temp = document.createElement('div');
        detailweather_temp.setAttribute('class', 'detailweather_temp');
        detailweather_temp_span = document.createElement('span');
        detailweather_temp_span.setAttribute('class', 'detailweather_temp_span');
        detailweather_temp.appendChild(detailweather_temp_span);
        detailweather_temp_text = document.createTextNode(list[i].main.temp.toString().slice(0, -1) + ' °C');
        detailweather_temp_span.appendChild(detailweather_temp_text);
        upperdetailweather.append(detailweather_temp);
        detailweather_desc = document.createElement('span');
        detailweather_desc.setAttribute('class', 'detailweather_desc');
        detailweather_desc_text = document.createTextNode(capitalize(list[i].weather[0].description));
        detailweather_desc.appendChild(detailweather_desc_text);
        upperdetailweather.appendChild(detailweather_desc);

        detailweather_humidity = document.createElement('span');
        detailweather_humidity.setAttribute('class', 'detailweather_humidity');
        detailweather_humidity_text = document.createTextNode('Luftfugtighed: ' + list[i].main.humidity + '%');
        detailweather_humidity.appendChild(detailweather_humidity_text);
        upperdetailweather.appendChild(detailweather_humidity);

        detailweather_wind = document.createElement('div');
        detailweather_wind.setAttribute('class', 'detailweather_wind');
        detailweather_wind_text = document.createTextNode(list[i].wind.speed + ' m/s ' + bearingToCP(list[i].wind.deg));
        detailweather_wind.appendChild(detailweather_wind_text);
        lowerdetailweather.appendChild(detailweather_wind);

        detailweather_clouds = document.createElement('div');
        detailweather_clouds.setAttribute('class', 'detailweather_clouds');
        detailweather_clouds_text = document.createTextNode('Skydække: ' + list[i].clouds.all + '%');
        detailweather_clouds.appendChild(detailweather_clouds_text);
        lowerdetailweather.appendChild(detailweather_clouds);

        detailweather_pressure = document.createElement('div');
        detailweather_pressure.setAttribute('class', 'detailweather_pressure');
        detailweather_pressure_text = document.createTextNode(list[i].main.pressure + 'hPa');
        detailweather_pressure.appendChild(detailweather_pressure_text);
        lowerdetailweather.appendChild(detailweather_pressure);

        element = document.getElementById('rightmain');
        element.appendChild(groupitem)
        groupitem.appendChild(mainweather);
        groupitem.appendChild(detailweather);
        groupitemcount++;
    }
}

(function () {
    userAction();
}());
