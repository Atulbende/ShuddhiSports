
const express =require('express');
const mysql = require('mysql');
const cors= require('cors');
const bcrypt = require('bcrypt');
const app= express();
app.use(express.json());
app.use(cors());
const Salt=10;
const db = mysql.createConnection({
            host:'127.0.0.1',
            user:'root',
            password:'SAVtech',
            database:'dashboard'
        });
    app.post('/login',(req,res)=>{
        db.query('Select * from users where UserName=?',[req.body.Login_UserName],(err,result)=>{
            if(result.length>0){
                bcrypt.compare(req.body.Login_Password,result[0].Password,(err,invalidate)=>{            
                res.send(invalidate);
            });
        }else{
            res.send(false);
        }
        });
    })
    app.post('/signup',(req,res)=>{
        let str=req.body.Signup_Password.toString();
        bcrypt.hash(str, 10, (err, hash) => {
            if (err) {
              console.error('Error hashing password:', err);
              return;
            }
            db.query(`call SignupSave(?,?,?,@Per_Result)`,[req.body.Signup_Email,req.body.Signup_UserName,hash],(error,result)=>{   
                if(error===null){res.send(result[0][0].Per_Result);}else {res.send("Access denied");}
             })
          });
    })
app.listen(3001,()=>{
    console.log('Connect');
});