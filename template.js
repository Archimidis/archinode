/*
 * grunt-init-archinode
 */

'use strict';

// Basic template description.
exports.description = 'Create a Node.js module, ' +
  'including automated testing environment throught grunt using mocha, chai ' +
  'and sinon.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ shouldn\'t contain "node" or "js" and should ' +
  'be a unique ID not already in use at search.npmjs.org.';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'node'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('bugs'),
    init.prompt('licenses'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url'),
    init.prompt('node_version', '>= 0.10.0'),
    init.prompt('main'),
    init.prompt('npm_test', 'grunt nodeunit'),
  ], function(err, props) {
    props.keywords = [];
    props.dependencies = {
      'lodash': '~2.4.1',
      'log4js': '~0.6.20'
    };
    props.devDependencies = {
      'mocha': '2.x',
      'chai': '1.x',
      'sinon': '1.x',
      'sinon-chai': '2.x',
      'grunt-contrib-jshint': '~0.10.0',
      'grunt-jscs': '~1.0.0',
      'grunt-mocha-test': '~0.12.4',
      'grunt-contrib-watch': '~0.6.1',
    };

    // Files to copy (and process).
    var files = init.filesToCopy(props);
    if (!props.travis) { delete files['.travis.yml']; }

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};
