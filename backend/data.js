const bcrypt = require('bcryptjs')

const data = {
    users:[
        {
            name: 'manpreet singh',
            email: 'admin@example.com',
            password : bcrypt.hashSync('Red321!#',8),
            isAdmin : true
        },
        {
            name: 'damanpreet singh',
            email: 'user@example.com',
            password : bcrypt.hashSync('Red321!#',8),
            isAdmin : false
        }
        
    ]
}
module.exports = data