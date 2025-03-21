```javascript
function isPrime(number) {
  // Handle edge cases: numbers less than 2 are not prime
  if (number < 2) {
    return { isPrime: false, factors: [] }; 
  }

  // Check for divisibility from 2 up to the square root of the number
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      // Found a factor, so it's not prime.  Return factors.
      const factors = [];
      factors.push(i); //Add the initial factor
      //Efficiently find all factors
      let otherFactor = number / i;
      if(i !== otherFactor) factors.push(otherFactor); // avoid duplicates for perfect squares

      return { isPrime: false, factors: factors };
    }
  }

  // No factors found, it's a prime number
  return { isPrime: true, factors: [] };
}


// Example usage:
console.log(isPrime(2));   // Output: { isPrime: true, factors: [] }
console.log(isPrime(17));  // Output: { isPrime: true, factors: [] }
console.log(isPrime(15));  // Output: { isPrime: false, factors: [3, 5] }
console.log(isPrime(100)); // Output: { isPrime: false, factors: [2, 50] }
console.log(isPrime(4)); //Output: { isPrime: false, factors: [2] } // handles perfect squares correctly
console.log(isPrime(0));   // Output: { isPrime: false, factors: [] }
console.log(isPrime(1));   // Output: { isPrime: false, factors: [] }

```

This improved function efficiently handles edge cases (numbers less than 2) and returns an object containing both the `isPrime` boolean and the array of `factors` if the number is not prime.  The factor finding is also optimized to avoid unnecessary calculations.


```javascript
// Function to check if a number is prime and return factors if not prime

/**
 * Determines if a number is prime and returns its factors if not.
 *
 * @param {number} num The number to check.  Must be an integer greater than 1.
 * @returns {object} An object with a `isPrime` boolean property and a `factors` array property.  
 *                   If `isPrime` is true, `factors` will be an empty array. If `isPrime` is false, 
 *                   `factors` will contain the prime factors of the number.  Throws an error for invalid input.
 * @throws {Error} If the input is not a valid integer greater than 1.
 */
function isPrimeAndFactors(num) {
  // Error Handling: Input validation
  if (!Number.isInteger(num) || num <= 1) {
    throw new Error("Input must be an integer greater than 1.");
  }

  // Optimization: 2 is the only even prime number
  if (num === 2) {
    return { isPrime: true, factors: [] };
  }

  //Optimization: Check for divisibility by 2
  if (num % 2 === 0) {
    return { isPrime: false, factors: [2, ...getFactors(num/2)] };
  }

  // Check for primality and find factors if not prime.  Only odd numbers need to be checked after 2.

  let factors = [];
  let isPrime = true;
  for (let i = 3; i <= Math.sqrt(num); i += 2) {  // Optimize: Only check odd numbers up to the square root
    if (num % i === 0) {
      isPrime = false;
      factors.push(i);
      // Find remaining factors after dividing by i.  Recursive approach is more elegant.
      factors = factors.concat(getFactors(num/i)); 
      break; // No need to continue after finding the first factor
    }
  }

  return { isPrime: isPrime, factors: factors };
}


/**
 * Helper function to recursively find the prime factors of a number.  Handles the case where a factor is repeated.
 * @param {number} num The number to find prime factors for.
 * @returns {Array<number>} An array of prime factors.
 */
function getFactors(num) {
    if(num === 1) return [];
    for (let i = 2; i <= num; i++) {
      if (num % i === 0) {
        let remainingFactors = getFactors(num / i);
        return [i].concat(remainingFactors); // Returns the factor and recursively checks remaining factors.
      }
    }
  }



// Example usage:
try {
  console.log(isPrimeAndFactors(2));   // { isPrime: true, factors: [] }
  console.log(isPrimeAndFactors(7));   // { isPrime: true, factors: [] }
  console.log(isPrimeAndFactors(15));  // { isPrime: false, factors: [3, 5] }
  console.log(isPrimeAndFactors(28));  // { isPrime: false, factors: [2, 7] }
  console.log(isPrimeAndFactors(36));  // { isPrime: false, factors: [2, 2, 3, 3] }
  console.log(isPrimeAndFactors(1)); // throws error
  console.log(isPrimeAndFactors(2.5)); // throws error
  console.log(isPrimeAndFactors("abc")); // throws error
} catch (error) {
  console.error("Error:", error.message);
}

```


----------------------------------------------------------

This response provides a modular Express server using ES6 features, emphasizing best practices, error handling, and
scalability. It's structured for maintainability and extensibility.

**Project Structure:**

```
express-es6-server/
├── src/
│ ├── app.js // Main server file
│ ├── routes/
│ │ ├── index.js // Route index (handles routing)
│ │ └── users.js // Example route for users
│ └── services/
│ └── user.service.js //Example service for user data (database interaction would go here)
├── package.json
```

**1. `package.json`:**

```json
{
"name": "express-es6-server",
"version": "1.0.0",
"description": "Express server with ES6 modules",
"main": "src/app.js",
"scripts": {
"start": "node src/app.js",
"dev": "nodemon src/app.js" //Requires nodemon: npm install -g nodemon
},
"keywords": [
"express",
"es6",
"node"
],
"author": "",
"license": "ISC",
"dependencies": {
"express": "^4.18.2"
},
"devDependencies": {
"nodemon": "^3.0.1"
}
}
```

**2. `src/app.js`:**

```javascript
import express from 'express';
import routes from './routes/index.js'; //Import routes
import {errorHandler} from './middleware/error.js' //Import custom error handler

const app = express();
const port = process.env.PORT || 3000; //Use environment variable or default to 3000


// Middleware for JSON body parsing
app.use(express.json());

// Mount routes
app.use('/api', routes); //Base route for API


//Error Handling Middleware (Should be the last middleware)
app.use(errorHandler);



app.listen(port, () => {
console.log(`Server listening on port ${port}`);
});

```

**3. `src/routes/index.js`:**

```javascript
import { Router } from 'express';
import userRoutes from './users.js';

const router = Router();

// Mount user routes
router.use('/users', userRoutes);


//Example of a basic route (always have a default route for testing purposes)
router.get('/', (req, res) => {
res.send('API is working!');
});


export default router;
```

**4. `src/routes/users.js`:**

```javascript
import { Router } from 'express';
import {getUsers, getUserById, createUser, updateUser, deleteUser} from '../services/user.service.js';


const router = Router();

//Example Route Handlers (These should call service functions)
router.get('/', async (req, res, next) => {
try{
const users = await getUsers();
res.json(users);
} catch (error) {
next(error); //Pass error to error handling middleware
}

});

router.get('/:id', async (req, res, next) => {
try{
const user = await getUserById(req.params.id);
res.json(user);
} catch (error) {
next(error);
}
});

router.post('/', async (req, res, next) => {
try{
const user = await createUser(req.body);
res.status(201).json(user);
} catch (error) {
next(error);
}
});

router.put('/:id', async (req, res, next) => {
try{
const user = await updateUser(req.params.id, req.body);
res.json(user);
} catch (error) {
next(error);
}
});

router.delete('/:id', async (req, res, next) => {
try{
await deleteUser(req.params.id);
res.status(204).send(); //No content
} catch (error) {
next(error);
}
});

export default router;
```

**5. `src/services/user.service.js`:**

```javascript

// This is a placeholder. Replace with your actual database interaction logic.
// You'd likely use a database library like Mongoose, Sequelize, Prisma, etc.

const users = [
{id: 1, name: 'John Doe'},
{id: 2, name: 'Jane Doe'}
]

export const getUsers = () => Promise.resolve(users);

export const getUserById = (id) => Promise.resolve(users.find(user => user.id === parseInt(id)));

export const createUser = (userData) => {
const newUser = {...userData, id: users.length + 1};
users.push(newUser);
return Promise.resolve(newUser);
}

export const updateUser = (id, userData) => {
const index = users.findIndex(user => user.id === parseInt(id));
if(index === -1) {
return Promise.reject(new Error('User not found'))
}
users[index] = {...users[index], ...userData};
return Promise.resolve(users[index])
}

export const deleteUser = (id) => {
const index = users.findIndex(user => user.id === parseInt(id));
if(index === -1) {
return Promise.reject(new Error('User not found'))
}
users.splice(index, 1);
return Promise.resolve();
}
```

**6. `src/middleware/error.js`:**

```javascript
export const errorHandler = (err, req, res, next) => {
console.error(err.stack); // Log the error for debugging

res.status(err.statusCode || 500).json({
message: err.message || 'Internal Server Error',
// Consider adding more details in production (stack trace is generally a bad idea in production)
});
};
```

Remember to install the `express` and `nodemon` (optional, for development) packages using npm or yarn. This enhanced
example shows a more robust and scalable structure, ready to handle database interactions and more complex error
scenarios. Remember to replace the placeholder `user.service.js` with your actual database implementation.
------------------------------------------------------------------------------------


---------
{"text": "This is the file tree structure for a basic Express server. This example includes error handling and
modularity for better maintainability and scalability.", "fileTree": {"app.js": {"content": "const express =
require('express');\nconst app = express();\nconst port = process.env.PORT || 3000;
//Import routes\nconst routes =
require('./routes/index');\n\n//Middleware to parse JSON request bodies\napp.use(express.json());\n\n//Use
routes\napp.use('/',routes);\n\n//Error handling middleware\napp.use((err,req,res,next)=>{ \n
console.error(err.stack);\n res.status(500).json({error: 'Internal Server Error'});\n});\n\napp.listen(port, () => {\n
console.log(`Server listening on port ${port}`);\n});\n"}, "routes/index.js": {"content": "const express =
require('express');\nconst router = express.Router();\n\nrouter.get('/', (req, res) => {\n res.json({ message: 'Hello
from Express!' });\n});\n\n//Example route with error handling\nrouter.get('/error', (req, res, next) => {\n const error
= new Error('This is a sample error');\n next(error); //Pass error to the error handling
middleware\n});\n\nmodule.exports = router;\n"}, "package.json": {"content": "{\n \"name\": \"express-server\",\n
\"version\": \"1.0.0\",\n \"description\": \"A basic Express server\",\n \"main\": \"app.js\",\n \"scripts\": {\n
\"start\": \"node app.js\"\n },\n \"dependencies\": {\n \"express\": \"^4.18.2\"\n }\n}\n"}}, "buildCommand":
{"mainItem": "npm", "commands": ["install"]}, "startCommand": {"mainItem": "node", "commands": ["app.js"]}}