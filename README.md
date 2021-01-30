# Food-delivery-api

# Requirements

- [Docker](https://docs.docker.com/install/)
- Docker Compose
- NodeJS version >= v8
- yarn

# Run required services (For running mongodb in your pc)

```
docker-compose up --build -d
```

Copy `.env.example` to `.env` and edit as your local config.

### start dev server

```bash
$ npm run start:dev
```




# Api List

```

  /signup   --> post route
```

### request payload
```js 
  {
    "email": "example@gmail.com",
    "password": "123abc", 
    "deliveryAddress": "dkfjkdjfkdjf", 
    "name": "mah"
}
 
```

### response

```
"status": "success",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE0ZmIwOTk5NDA0M2Q4YzhhZDEwYjciLCJlbWFpbCI6Im1haG11ZDEwMEBnbWFpbC5jb20iLCJuYW1lIjoiZm1haCIsImRlbGl2ZXJ5QWRkcmVzcyI6ImRrZmprZGpma2RqZiIsImlhdCI6MTYxMTk4NzcyMSwiZXhwIjoxNjEyMDcyMzIxfQ.-SoNCNbvHbWnMAHKRxwK3Ku48VZyykRUGNHQbMYkWbg",
        "expiresIn": 84600,
        "user": {
            "_id": "6014fb09994043d8c8ad10b7",
            "email": "example@gmail.com",
            "name": "fmah",
            "deliveryAddress": "dkfjkdjfkdjf"
        }
    },
    "message": "User created successfully"
```


```
  /login    --> post route
```

### request payload
```js 
  {
    "email": "example@gmail.com",
    "password": "123abc" 
    
}
```
### response 
```js
{
    "status": "success",
    "data": {
        "name": "fmah",
        "email": "example@gmail.com",
        "deliveryAddress": "dkfjkdjfkdjf",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwMTRkYjA4NWJlYTBhYzJhMzNjOTQ5NyIsIm5hbWUiOiJmbWFoIiwiZW1haWwiOiJtYWhtdWRAZ21haWwuY29tIiwiZGVsaXZlcnlBZGRyZXNzIjoiZGtmamtkamZrZGpmIn0sImlhdCI6MTYxMTk5NjgwMywiZXhwIjoxNjEyMDgxNDAzfQ._ol4yUR-JHamTocz7Vfy9MTaTMK3mqOalwNK1G3iBOg",
        "expiresIn": 84600
    },
    "message": "User loggedin successfully"
}
```

```
  /users/update   --> put route
```

### request payload
```
  {
      "name": "demo",
  }
```
### header 
```
 "x-access-token": login token
```

```
  /users/delete    --> delete route
```

### query params
```
  "email": "example@gmail.com
```
### header 
```
 "x-access-token": login token
```


```
  /foods   --> get route
```
### header 
```
 "x-access-token": login token
```


```
  /orders   --> post route
```

### request payload
```
  {
    "user": {
        "_id": "601449b452da32a10754b5c7"
    },
    "items": [
        {
            "food": {
                "_id": "60144a0452da32a10754b5ca"
             },
            "quantity": 3
            
        }   
    ]
}
```
### header 
```
 "x-access-token": login token
```

### response 

```
{
    "status": "success",
    "data": {
        "newOrder": {
            "_id": "6015236dd90398ff84c53600",
            "items": [
                {
                    "_id": "6015236dd90398ff84c53601",
                    "food": {
                        "description": "cripsy and nice Subway,  you can try",
                        "price": 220,
                        "_id": "6015227b9be3aefe9ac4db0f",
                        "name": "Subway",
                        "__v": 0
                    },
                    "quantity": 3
                }
            ]
        }
    },
    "message": "Order created successfully"
}
```







