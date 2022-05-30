const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://salim:salim123@salim.yms3o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(()=> console.log('Mongo is UP.'))
.catch(err => console.log('Mongo is Down , raison : ',err.message));