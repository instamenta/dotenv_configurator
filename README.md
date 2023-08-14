# Dot Configurator

Dot configurator is a lightweight utility package for Node.js that simplifies the process of converting `process.env`
variables into various JavaScript data types. Whether you're dealing with numbers, objects, arrays, or booleans,
DotConfigurator can automatically transform your environment variables into the correct data types.

## Features

- 🚀 Effortlessly convert environment variables
- 📦 Supports numbers, objects, arrays, and booleans
- 🌈 Intuitive and easy-to-use API
- ⚙️ Lightweight and dependency-free

## Installation

```bash
npm install dotenv_configurator
```

## How it works? It's quite simple

### Booleans
The DotConfigurator class provides an intuitive mechanism to detect and convert environment variables to their respective JavaScript data types. In the case of boolean values, the class employs a comprehensive approach that covers various representations. Whether an environment variable's value is specified as 
* "true" 
* "false" 
* "on" 
* "off" 
* "yes"  
* "no" 

### Logic for Detecting Array, Object, and Number

In the `DotConfigurator` class, the logic is implemented to automatically detect and convert different types of environment variables. Here's how it handles arrays, objects, and numbers:

- **Array Detection:** If a variable value is enclosed within square brackets (`[...]`), the `DotConfigurator` class attempts to parse it using `JSON.parse()` to convert it into an array. If the parsing is successful and the result is indeed an array, the variable is stored as an array. If the parsing fails or the result is not an array, the variable is treated as a parsing error and assigned the value `'PARSING_ERROR'`.

- **Object Detection:** For variables that contain curly braces (`{...}`), the `DotConfigurator` class applies `JSON.parse()` to convert the variable into an object. If the parsing is successful and the result is a valid object, the variable is stored as an object. If the parsing fails, the variable is treated as a parsing error and assigned the value `'PARSING_ERROR'`.

- **Number Detection:** Numeric variables are detected using the `isNaN()` function. If the variable can be successfully converted to a number using `Number()`, it is stored as a number. Otherwise, it's left unchanged.

This logic ensures that environment variables are correctly converted to their intended data types, and any parsing errors are properly handled. The `DotConfigurator` class simplifies the process of working with various data types in the `process.env` variables while providing ease of use and reliability.

the DotConfigurator class intelligently detects these variations and accurately transforms them into the corresponding boolean value. This smart handling ensures that your boolean variables are consistently interpreted, regardless of the specific string representation used in your environment. This capability simplifies the process of managing and utilizing boolean configuration settings within your application.

## Usage

```.env
  SERVER_PORT: '8080',
  API_URL: 'https://api.example.com',
  ENABLE_FEATURE: 'true',
  DATABASE_CONFIG: '{"host":"localhost","port":3306}'
```

```index.js
const DotConfigurator = require('dotenv_configurator');

const dot = new DotConfigurator(process.env);

const serverPort = dot.GET('SERVER_PORT'); // Returns a number: 8080

const apiUrl = dot.GET('API_URL'); // Returns a string: "https://api.example.com"

const enableFeature = dot.GET('ENABLE_FEATURE'); // Returns a boolean: true

const dbConfig = dot.GET('DATABASE_CONFIG'); // Returns an object: { host: localhost, port:3306 }
```

## Error Handling
If there's an error during conversion, the variable will not be cached, and "PARSING_ERROR" will be assigned instead. Be sure to check for this value when retrieving a converted variable.

In case of error's the dotConfigurator will only alert but wont break the app in case you want to still use it you can always access it with just process.env...

## License

This project is licensed under the MIT License.

Happy coding! 👨‍💻👩‍💻