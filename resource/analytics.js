function main(){
  var id = 'manual_analytics';
  var script_tag = document.getElementById(id);
  var query = script_tag.src.replace(/^[^\?]+\??/, '');
  // Parse the querystring into arguments and parameters
  var vars = query.split("&");

  varsObj = vars.reduce((varObj, attr) => {
    const splitter = '=';
    attr = attr.split(splitter);
    if (attr.length == 2)
      varObj[attr[0]] = attr[1];
    return varObj;
  }, {});
  console.log(varsObj);
  let height = window.screen.height;
  let width = window.screen.width;
  let resolution = {height, width};
  let pageUrl = window.location.href;
  sendGeoInfo({id:varsObj.id, resolution, pageUrl},(data)=>{
    console.log(data);
  });
}

function sendGeoInfo({id, resolution, pageUrl}, cb){
  let uri = '/';
  var data = new FormData();
  data.append("json", JSON.stringify({id, pageUrl}));
  let options = {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id, pageUrl, resolution})
  };
  
  // fetch(`/${id}`);
  fetch(uri, options);
}

main();




