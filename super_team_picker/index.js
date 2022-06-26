/*
cohorts table
[{
    id:(increments)
    name:(string)
    logo_url:(string)
    members: ['Lily', 'David', 'Kevin'](array)
}, {

}, {

}]

*/

//build a navbar

const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const knex = require('./db/client');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', 'views');


app.get('/cohorts/new', (req, res) => {
    res.render('cohorts/new')
})

app.post('/cohorts', (req, res) => {
    const { name, logo_url, members_str } = req.body;
    const members_arr = members_str.split(',').map(element => element.trim());
    knex('cohorts')
    .insert({
        name, logo_url, members_arr
    })
    .returning('*')
    .then(cohorts => {
        const cohort = cohorts[0];
        res.redirect(`/cohorts/${cohort.id}`)
    })
})

app.get('/cohorts/:id', (req, res) => {
    // // let method = false;
    // // let quantity = false;
    let secondNum = 1;
    // if (req.query && req.query.method && req.query.quantity) {
    //     let method = req.query.method;
    //     let quantity = req.query.quantaty;
    // };
    

    knex('cohorts')
    .where('id', req.params.id)
    .first()
    .then(cohort => {
        if(!cohort) {
            res.send('No cohort found')
        } else {
            if(req.query && req.query.method && req.query.quantity) {secondNum = Math.ceil(cohort.members_arr.length / req.query.quantity)}; 
            res.render('cohorts/show', { 
                cohort: cohort,
                method: req.query.method,
                quantity: req.query.quantity,
                secondNum: secondNum
             })
        }
    })
})

app.get('/cohorts', (req, res) => {
    knex('cohorts')
    .then(cohorts => {
        //console.log(cohorts);
        res.render('cohorts/index', { cohorts: cohorts })
    })
})


app.listen(8000, () => {
    console.log('ON PORT 8000!')
})