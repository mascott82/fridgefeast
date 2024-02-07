# Fridge Feast - Backend Service.

## How to start it:

```
   npm install

   npm start
```

## How to access it:

```
   http://localhost:3000
```

## APIs

### Find Recipes

#### Parameters
> Comma seperated, max 5 ingredients

```
   http://localhost:3000/s/ingredient1[,ingredient2,ingredient3,ingredient4,ingredient5]
```

### Display a recipe
#### Parameters
>  Recipe id

```
   http://localhost:3000/recipes/:recipeId
```

### List recipes

```
   http://localhost:3000/recipes/
```

### To save a review
#### Parameters
>  Method:  **POST**
> - user_id
> - recipe_id
> - rating
> - comment

```
   http://localhost:3000/reviews/save
```

### List reviews

```
   http://localhost:3000/reviews/
```

### User login
#### Parameters
> Method:   **POST**
> - first_name
> - last_name
> - email
> - password

```
   http://localhost:3000/users/auth
```

### User signup
#### Parameters
> Method:   **POST**
> - email
> - password

```
   http://localhost:3000/users/save
```

### List favorites

```
   http://localhost:3000/favorites/
```

### To mark as favorited
#### Parameters
> Method:   **POST**
> - user_id
> - recipe_id

```
   http://localhost:3000/favorites/save
```

### Similar Recipes
#### Parameters
> Method:   **GET**
> - recipeId

```
   http://localhost:3000/s/:id/similar
```

### Get Random Recipes
#### Parameter
> Method:   **GET**

```
   http://localhost:3000/s/random
```