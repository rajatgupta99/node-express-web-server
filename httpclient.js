const axios = require('axios');

var url = `http://localhost:3000`;

axios.get(url).then((response)  =>  {
  console.log(response);
}).catch((error) =>  {
    console.log(error);
});
