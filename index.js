const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser')

app.use(bodyparser.json());

var mysqlConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_crud'

});

mysqlConn.connect((error) => {
    if (!error)
        console.log('DB connection succeded');
    else
        console.log('DB ailed failed \n Error: ' + JSON.stringify(error, undefined, 2));
});

app.listen(3000, () => console.log('Express is running at port 3000'));


//Get data from database
app.get('/employees', (re1, res) => {
    mysqlConn.query('Select * from employee', (error, rows, fields) => {
        if (!error)
        //show results on console   
        // console.log(rows[0]) 
        //show results on browser
            res.send(rows);
        else
            console.log(error)
    })
});

//Get an employee
app.get('/employees/:id', (req, res) => {
    mysqlConn.query('Select * from employee Where id= ?', [req.params.id], (error, rows, fields) => {
        if (!error)
        //show results on console   
        //console.log(rows[0])
        //show results on browser
            res.send(rows);
        else
            console.log(error)
    })
});

//Delete an employee
app.delete('/employees/:id', (req, res) => {
    mysqlConn.query('Delete from employee Where id= ?', [req.params.id], (error, rows, fields) => {
        if (!error)
        //show results on console   
        //console.log(rows[0])
        //show results on browser
            res.send('Deleted successfully!');
        else
            console.log(error)
    })
});

//Insert an employee
app.post('/insert', (req, res) => {
    mysqlConn.query('Insert into employee (name, code, salary) values (?, ?,?)', [req.body.name, req.body.code, req.body.salary], (error, rows, fields) => {
        if (!error)
        //show results on console   
        //console.log(rows[0])
        //show results on browser
            res.send('Insert successfully!');
        else
            console.log(error)
    })
});


//Update an employee
app.post('/update', (req, res) => {
    mysqlConn.query('Update employee SET name=?, code=? WHERE id=?', [req.body.name, req.body.code, req.body.id], (error, rows, fields) => {
        if (!error)
        //show results on console   
        //console.log(rows[0])
        //show results on browser
            res.send('Updated successfully!');
        else
            console.log(error)
    });
});