var express = require('express');
var router = express.Router();

var EmployeeProvider= require('./employeeprovider').EmployeeProvider

var employeeProvider= new EmployeeProvider('localhost', 27017);

//Routes

router.get('/', function(req, res){
    employeeProvider.findAll(function(error, emps){
        res.render('employee/index.jade', {
            title: 'Employees',
            employees:emps
        });
    });
});

router.get('/new', function(req, res) {
    res.render('employee/employee_new.jade', {
        title: 'New Employee'
    });
});

//save new employee
router.post('/new', function(req, res){
    employeeProvider.save({
        title: req.param('title'),
        name: req.param('name')
    }, function( error, docs) {
        res.redirect('/employee/')
    });
});

//update an employee
router.get('/:id/edit', function(req, res) {
    employeeProvider.findById(req.param('_id'), function(error, employee) {
        res.render('employee/employee_edit.jade',
            {
                employee: employee
            });
    });
});

//save updated employee
router.post('/:id/edit', function(req, res) {
    employeeProvider.update(req.param('_id'),{
        title: req.param('title'),
        name: req.param('name')
    }, function(error, docs) {
        res.redirect('/employee')
    });
});

//delete an employee
router.post('/:id/delete', function(req, res) {
    employeeProvider.delete(req.param('_id'), function(error, docs) {
        res.redirect('/employee')
    });
});

module.exports = router;