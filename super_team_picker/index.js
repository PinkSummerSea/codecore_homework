const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const knex = require('./db/client');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));



app.get('/', (req, res)=> {
    res.render('home')
})

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

    knex('cohorts')
    .where('id', req.params.id)
    .first()
    .then(cohort => {
        if(!cohort) {
            res.send('No cohort found')
        } else {
            let finalArr = [];

            function shuffleArr(arr) {
                let newArr = [...arr];
                for (let i = 0; i < newArr.length; i++) {
                    let j = Math.floor(Math.random() * (newArr.length));
                    [newArr[j], newArr[i]] = [newArr[i], newArr[j]]
                }
                return newArr
            };

            let shuffledMembers = shuffleArr(cohort.members_arr);
            let secondNum = Math.floor(cohort.members_arr.length / Number(req.query.quantity));
            let remainder = cohort.members_arr.length % Number(req.query.quantity);
            const originalRemainder = remainder;
            if(req.query && req.query.method && req.query.quantity) {
                if (req.query.method == 'teamCount') {
                    for (let i = 0; i < Number(req.query.quantity); i++) {
                        let singleTeam = [];
                        if (remainder) {
                            singleTeam = shuffledMembers.slice(i + secondNum * i, i + secondNum * i + secondNum + 1);
                            remainder--;
                            finalArr.push(singleTeam);
                        } else {
                            singleTeam = shuffledMembers.slice(originalRemainder + secondNum * i, originalRemainder + secondNum * i + secondNum);
                            finalArr.push(singleTeam);
                        }
                    }
                    //console.log(finalArr);
                } else {
                    //if method == 'perTeam'
                    if (remainder > 0) {
                        let t = shuffledMembers.slice(0, remainder);
                        finalArr.push(t)
                    };
                    for (let i = 0; i < secondNum; i++) {
                        let singleTeam = [];
                        singleTeam = shuffledMembers.slice(remainder + Number(req.query.quantity) * i, remainder + Number(req.query.quantity) * i + Number(req.query.quantity));
                        //console.log(singleTeam);
                        finalArr.push(singleTeam);
                    }
                    //console.log(finalArr)
                }
            }

            res.render('cohorts/show', { 
                cohort: cohort,
                method: req.query.method,
                quantity: req.query.quantity,
                secondNum: secondNum,
                finalArr: finalArr
             })
        }
    })
})

app.get('/cohorts', (req, res) => {
    knex('cohorts')
    .orderBy('createdAt', 'DESC')
    .then(cohorts => {
        //console.log(cohorts);
        res.render('cohorts/index', { cohorts: cohorts })
    })
})

app.get('/cohorts/:id/edit', (req, res) => {
    knex('cohorts')
    .where('id', req.params.id)
    .first()
    .then(cohort => {
        res.render('cohorts/edit', {
            cohort: cohort
        })
    })
})

app.patch('/cohorts/:id', (req, res) => {
    knex('cohorts')
    .where('id', req.params.id)
    .update({
        name: req.body.name,
        logo_url: req.body.logo_url,
        members_arr: req.body.members_str.split(',')
    })
    .then(() => {
        res.redirect('/cohorts')
    })
})



app.delete('/cohorts/:id', (req, res) => {
    const { id } = req.params;
    knex('cohorts')
    .where('id', id)
    .del()
    .then(() => {
        res.redirect('/cohorts')
    })
})


app.listen(8080, () => {
    console.log('ON PORT 8080!')
})