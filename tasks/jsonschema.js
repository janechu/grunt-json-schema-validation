'use strict';

module.exports = function (grunt) {
  grunt.registerMultiTask('json_schema_validation', 'Grunt wrapper for validating JSON Schema.', function () {

    var getErrors,
      getFile,
      validateAll,
      validate,
      Validator;

    /**
    * Validate Options
    */
    validate = function (o) {
      if (o.files === undefined && o.files.length > 0) {
        grunt.log.warn('\'files\' property can not be emtpy or missing.');
        return false;
      }

      if (o.schema.main === undefined) {
        grunt.log.warn('\'schema\' property can not be empty or missing.');
        return false;
      }

      validateAll(o.files, o.schema.main, o.schema.refs);

      return true;
    };

    /**
    * Validate All files
    */
    validateAll = function (files, schema, references) {
      var
        Validator,
        v,
        json,
        _schema,
        validation;

      Validator = require('jsonschema').Validator;
      v = new Validator();

      grunt.file.expand({}, files).forEach(function (file) {
        if (references && references.length) {
          grunt.file.expand({}, references).forEach(function (ref) {
            var schemaTemplate = getFile(ref);
            v.addSchema(schemaTemplate, schemaTemplate.id);
          });
        }

        json = getFile(file);
        _schema = getFile(schema);

        validation = v.validate(json, _schema);
        getErrors(validation, file);

        grunt.log.ok('Passed Validation: ' + file);
      });
    }

    /** 
    * Check for errors
    */
    getErrors = function (v, fileName) {
      if (v.errors.length !== 0) {
        for (var i = 0; i < v.errors.length; i++) {
          grunt.log.warn('ERROR: ' + v.errors[i].toString());
          grunt.fail.fatal('file: ' + fileName);
        }
        return false;
      }
      return true;
    };

    /** 
    * Return files
    */
    getFile = function (path) {
      if (path === null || path === undefined) {
        grunt.log.warn('path is undefined or null');
        return false;
      }
      if (!grunt.file.exists(path)) {
        grunt.log.warn('path does not exist: ' + path);
        return false;
      }
      return JSON.parse(grunt.file.read(path));
    };

    return validate(this.options());

  });

};