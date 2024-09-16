const db = require('../config/db')
const Event = require('../models/Event')


let newEvents = [

    new Event({
        title: 'beach cleaning at Muscat',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        location: 'Muscat',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'beach cleaning at Oman',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        location: 'Oman',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'beach cleaning at Sohar',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        location: 'Muscat',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'beach cleaning at Nizwa',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        location: 'Nizwa',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'beach cleaning at Sur',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        location: 'Sur',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'beach cleaning at Sur',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        location: 'Sur',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'beach cleaning at Sur',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        location: 'Sur',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'beach cleaning at Sur',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        location: 'Sur',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'beach cleaning at Sur',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        location: 'Sur',
        date: Date.now(),
        created_at: Date.now()
    }),

]

newEvents.forEach(eve => {
    eve.save();
})