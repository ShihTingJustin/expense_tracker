# Expense Tracker
A simple expense tracker built with Node.js and Express.

## Features
1. Record and track your expense
2. Edit and delete record
3. See total expense amount
4. Filter record by category and month **(New)**
5. Login and create account **(New)**
6. Sort record after filter record by category  **(*In Progress*)**
7. 

![](https://i.imgur.com/YQt2csO.png)
![](https://i.imgur.com/jjL1W2A.jpg)
![](https://i.imgur.com/oNxKhLu.jpg)


## Getting Started
1. Clone repository to your local computer
```
$ git clone https://github.com/ShihTingJustin/expense_tracker.git
```
2. Install by [npm](https://www.npmjs.com/)
```
$ npm install
```
3. Download env.example from [here](https://bit.ly/3eUqqhA)

4. Put **env.example** in root directory and rename to **.env** in editor 

5. Enter your facebook ID and SECRET in **.env**
(You can apply from [here](https://developers.facebook.com/))

6. Use seed data 
```
$ npm run seed
```
7. Execute 
```
$ npm run dev 
```
8. Terminal show the message 
 ```
Express is listening on localhost:3000
mongodb connected!
```
Now you can browse the website on 
```
http://localhost:3000
```

## Test Account

```
email: tony@stark.com
password: iamironman

email: captain@hotmail.com
password: icandothisallday
```

## Built With
* Node.js: 10.15.0
* bcryptjs: 2.4.3
* body-parser: 1.19.0
* connect-flash: 0.1.1
* dotenv: 8.2.0
* express: 4.17.1
* express-session: 1.17.1
* express-handlebars: 4.0.4
* handlebars-helpers: 0.10.0
* method-override: 3.0.0
* mongoDB Community Server: 4.2.6
* mongoose: 5.9.14
* passport: 0.4.1
* passport-facebook: 3.0.0
* passport-local: 1.0.0

## Author
[Justin Huang 黃士庭](https://www.linkedin.com/in/justinhuang777/) 
