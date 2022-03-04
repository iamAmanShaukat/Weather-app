const http = require('http');
const fs =require("fs");
var requests=require("requests");

const homeFile=fs.readFileSync("home.html","utf-8");
const replaceVal=(tempVal,orgVal)=>{
    let temperature =tempVal.replace("{%tempval%}",orgVal.main.temp);
    temperature =temperature.replace("{%tempmin%}",orgVal.main.temp_min);
    temperature =temperature.replace("{%tempmax%}",orgVal.main.temp_max);
    temperature =temperature.replace("{%location%}",orgVal. name);
    temperature =temperature.replace("{%country%}",orgVal.sys.country);
    temperature =temperature.replace("{%tempstatus%}",orgVal.weather[0].main);
    return temperature;
}

const server = http.createServer((req,res)=>{
    if (req.url=="/"){
        requests('https://api.openweathermap.org/data/2.5/weather?q=pune%20&appid=e84f74507ed91e6e205cbdd6b4c87b19')
        .on('data', function (chunk) {
            const objdata =JSON.parse(chunk)
            const arrData=[objdata]
        //   console.log(arrData)
            const realTimeData =arrData.map(val =>replaceVal(homeFile,val)).join("");
            res.write(realTimeData);
        })
        .on('end', function (err) {
          if (err) return console.log('connection closed due to errors', err);
         res.end();
        //   console.log('end');
        });   
    }
})

server.listen(8000,"127.0.0.1")


// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}



