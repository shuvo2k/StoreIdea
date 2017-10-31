const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ensureAuthenticated } = require('../helper/auth');

//load idea model
require('../models/idea');
const Idea = mongoose.model('ideas');

//idea index page
router.get('/', ensureAuthenticated, (req, res) => {
    Idea.find({ user: req.user.id })
        .sort({ date: 'desc' })
        .then(ideas => {
            res.render('ideas/index', {
                ideas: ideas
            });
        });


});

//add idea form
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('ideas/add');
});

//edit idea form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Idea.findOne({
            _id: req.params.id
        })
        .then(ideas => {
            if (idea.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized.');
                res.redirect('/ideas');
            } else {
                res.render('ideas/edit', {
                    ideas: ideas
                });
            }

        });
});

//process form
router.post('/', ensureAuthenticated, (req, res) => {
    console.log(req.body);
    let errors = [];

    if (!req.body.title) {
        errors.push({ text: 'please add a tilte' });
    }
    if (!req.body.details) {
        errors.push({ text: 'please add some detail.' });
    }

    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.tilte,
            details: req.body.details
        });

    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details,
            user: req.user.id
        }
        new Idea(newUser)
            .save()
            .then(idea => {
                req.flash('success_msg', 'Project Idea Added.');
                res.redirect('/ideas');
            });
    };

});

//edit form process
router.put('/:id', ensureAuthenticated, (req, res) => {
    Idea.findOne({
            _id: req.params.id
        })
        .then(ideas => {
            //new values
            ideas.title = req.body.title;
            ideas.details = req.body.details;

            ideas.save()
                .then(ieas => {
                    req.flash('success_msg', 'Project Idea Updated.');
                    res.redirect('/ideas');
                })
        });
});

//Delete idea
router.delete('/:id', ensureAuthenticated, (req, res) => {
    Idea.remove({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Project Idea Removed.');
            res.redirect('/ideas');
        });
});



module.exports = router;