# grunt-json-schema-validation

Grunt wrapper for validating JSON Schema.

## Getting Started
This plugin requires [Grunt](https://gruntjs.com) `~0.4.5`

Install this plugin with:
```shell
npm install grunt-json-schema-validation --save-dev
```

Add this line to your project's `grunt.js` Gruntfile:

```js
grunt.loadNpmTasks('grunt-json-schema-validation');
```

### Usage
In your project's Gruntfile, add a section named `json_schema_validation` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  json_schema_validation: {
    options: {
      files: ['test/files/*.json'],
      schema: {
        main: 'test/schemas/person.json'
      }
    }
  }
});
```

### Options

#### files
Type: Array

An array of json files to be validated.

#### schema.main
Type: String

The main schema against which the files will be validated.

### schema.refs
Type: Array

The references that may exist inside of the main schema.