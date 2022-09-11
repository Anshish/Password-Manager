
# Password Manager

Password Manager project is created usign SERN stack. You can save passwords. Passowrds are saved in MySql database after using AES encryption. You can reveal password by clicking on the title. You can also delete passwords.

## Setting up the project

Go to the folder in which you want to work. You can either clone or download the zip file.

### Setting up server

To set up server run following commands

```
cd server
npm install
```

After installing all dependencies you have to configure environmental variables by creating config.env file in server folder.

Structure of config.env file

```
DB_Password=<your sql password>
```

You also need to make a sql database and create a table on your local machine by typing following commands

```
CREATE TABLE `passwordmanager`.`password` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(255) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `iv` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));
```

### Setting up client
Go to frondend folder and run following commands

```
cd client
npm install
```

All the dependencies should be installed. Now, you just have to start the React server by following command

```
npm start
```

### Tech Stack
* React
* Node.js
* Express.js
* MySql
* Crypto

## Demo

Click here for demo

https://drive.google.com/file/d/1qwFbiRtTc5C2FC4P0tWiEk27HJoNM_Yv/view?usp=sharing