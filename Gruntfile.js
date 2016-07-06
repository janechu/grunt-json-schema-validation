'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    json_schema_validation: {
      all: {
        options: {
          files: [
            'test/files/*.json'
          ],
          schema: {
            main: 'test/schemas/products.json',
            refs: [
              'test/schemas/refs/*.json'
            ]
          }
        }
      }
    }
  });

  grunt.loadTasks('tasks');
};
