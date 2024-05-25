# Api Documentation

## Basic command

starting project first install **node_modules**

`pnpm install`

start project in dev mode

`pnpm run dev`

build the project to create a file in the folder called **dist/server.js**

`pnpm run build`

## Application

`GET http://localhost:8000/`

Return the index.html

## Api Route

`GET http://localhost:8000/api/v1`

## USERS

### **Get all users**

`GET http://localhost:8000/api/v1/users`

```json
{
  "users": [
    {
      "id": 1,
      "email": "admin@email.com",
      "area": "secretary",
      "role": "admin",
      "has_access": 1
    }
  ]
}
```

### **Get all notifications**

`GET http://localhost:8000/api/v1/users/notifications`

> result

```json
{
  "users": [
    {
      "id": 1,
      "email": "admin@email.com",
      "area": "secretary",
      "role": "admin",
      "has_access": 0
    }
  ]
}
```

### **Route to change toggle accesss**

`POST http://localhost:8000/api/v1/users/toggle-access`

> body

```json
{
  "access": true,
  "userId": 1
}
```

## AUTH

### **Route to login**

`POST http://localhost:8000/api/v1/login`

> body

```json
{
  "email": "put a valid email",
  "password": "put a password"
}
```

### **Route to signup**

`POST http://localhost:8000/api/v1/signup`

> body

```json
{
  "email": "put a valid email",
  "fullname": "put your name",
  "password": "put a password",
  "area": "admin"
}
```

### Add a new result in the form

`POST http://localhost:8000/api/v1/result`

```json
{
  "user_id": 1,
  "field_id": 1
}
```

## UPLOAD FILES

`POST http://localhost:8000/api/v1/multimedia`

```html
<form method="post">
  <input type="text" name="name" />
  <input type="file" name="media" />
  <button>submit</button>
</form>
```

#### response:

```json
{
  "id": 1,
  "name": "name of the file",
  "hash": "identifier"
}
```

`GET http://localhost:8000/api/v1/multimedia/:image_name.jpg`  
you can get the images with this endpoint

## FORM_SCHEME

### **Get all form_schemes**

`POST http://localhost:8000/api/v1/form-schemes`

```json
{
  "form_schemes": [
    {
      "id": 1,
      "label": "Formulario Ola",
      "form_groups": [
        {
          "id": 1,
          "label": "Información referencial",
          "form_scheme_id": 1,
          "fields": [
            {
              "id": 1,
              "label": "Ciudad",
              "component": "input",
              "metadata": { "type": "text" },
              "form_group_id": 1
            },
            {
              "id": 2,
              "label": "Fecha",
              "component": "input",
              "metadata": { "type": "date" },
              "form_group_id": 1
            }
          ]
        }
      ]
    }
  ]
}
```
