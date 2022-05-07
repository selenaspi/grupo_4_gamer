const bcryptjs = require('bcryptjs');
let hash = bcryptjs.hashSync('1231', 10);

console.log(bcryptjs.compareSync('1231', hash));
console.log(hash)
1231