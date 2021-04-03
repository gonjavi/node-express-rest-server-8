# Node-Express-Rest-Server-8 Cafe

This is a Cafe REST webserver for users, products, and categories using Node, and Express. It uses the methods Get, Post, Put, Delete.

url: https://gon-node-webserver2.herokuapp.com

user endpoints
- post: login - url/login
- get: get users - url/usuario
- post: create a user - url/usuario
- delete: delete a user - url/usuario/:id
- put: update user's picture - url/upload/usuarios/:id

Categories:
- get: get categories - url/categoria
- get: get a category - url/categoria/:id
- post: create a category - url/categoria
- put: update a category - url/categoria/:id
- delete: delete a category - url/categoria/:id

Products:
- get: get products - url/productos
- get: get a product - url/producto/:id
- post: create a product - url/producto
- put: update a product - url/producto/:id
- delete: delete a producto - url/producto/:id 
- put: update product's picture - url/upload/productos/:id

Search a product:
- get: search a product - url/productos/buscar/ban

Pictures:
- get: {{url}}/imagen/productos/5ffb55c9761047477595c43e-389.jpg?token={{token}}
- get: ver imagen {{url}}/imagen/usuarios/5ff8d890ed1e0da49a862f52-905.jpg?token={{token}}


## Built With

- NodeJS
- JavaScript
- Visual Code

### Prerequisites
npm 6.14.8

### Setup

 - Run $npm install   -to install all dependencies from a package.json file

 - Run $ nodemon server.js, and open the browser on localhost://3000 


## API Link

[API Link](https://gon-node-webserver2.herokuapp.com/)

## Author

👤 **Gonza Javier Mancilla**

- Github: [@gonjavi](https://github.com/gonjavi)
- Linkedin: [@g-javier-mancilla](https://www.linkedin.com/in/g-javier-mancilla-a686a9178/)


## 🤝 Contributing

Contributions, issues and feature requests are welcome!


## Show your support

Give a ⭐️ if you like this project!


## 📝 License

This project is [MIT](lic.url) licensed.
