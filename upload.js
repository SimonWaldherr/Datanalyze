/*
 * datanalyze
 *
 * Copyright 2014, Simon Waldherr - http://simon.waldherr.eu/
 * Released under the MIT Licence
 * http://simon.waldherr.eu/license/mit/
 *
 * Github:  https://github.com/simonwaldherr/datanalyze/
 * Version: 0.0.0
 */

/*jslint browser: true, plusplus: true, indent: 2 */
/*global FileReader */

if (!String.prototype.xtrim) {
  String.prototype.xtrim = function () {
    'use strict';
    return this.replace(/^[\s\"\'\t]+|[\s\"\'\t]+$/g, '');
  };
}

var datanalyze = {
  callback: function () {
    'use strict';
    return false;
  },
  droppable: function (element) {
    'use strict';
    element.addEventListener('dragover', function (evt) {
      evt.preventDefault();
    }, false);

    element.addEventListener('drop', function (evt) {
      var reader, file, files = evt.dataTransfer.files;
      evt.stopPropagation();
      evt.preventDefault();
      if (files.length > 0) {
        file = files[0];
        datanalyze.filetype(file);
        if ((window.FileReader !== undefined) && (datanalyze.filetype(file))) {
          reader = new FileReader();
          reader.onload = function (evt) {
            var helper, helper1, helper2, i, j, repstr;
            helper2 = {};
            helper2[';'] = [];
            helper2[','] = [];
            helper2[0] = [';', ','];
            helper1 = evt.target.result.trim().split('\n');
            for (j = 0; j < helper2[0].length; j++) {
              for (i = 0; i < helper1.length; i++) {
                if (i > 0) {
                  if (helper2[helper2[0][j]] !== false) {
                    if ((helper2[helper2[0][j]][i] !== helper2[helper2[0][j]][i - 1]) || (helper2[helper2[0][j]][i] === 1)) {
                      helper2[helper2[0][j]] = false;
                    }
                  }
                }
              }
            }
            if ((helper2[','] !== false) || (helper2[';'] !== false)) {
              if (helper2[';'] !== false) {
                helper2 = ';';
              } else {
                helper2 = ',';
              }
              repstr = '<table class="sortable">';
              for (i = 0; i < helper1.length; i++) {
                helper = helper1[i].split(helper2);
                repstr += '<tr>';
                for (j = 0; j < helper.length; j++) {
                  repstr += '<td>' + helper[j].xtrim() + '</td>';
                }
                repstr += '</tr>';
              }
              repstr += '</table>';
              datanalyze.callback(repstr);
            } else {
              datanalyze.callback('<code>' + helper1.join('\n') + '</code>');
            }
          };
          reader.readAsText(file);
        }
      }
      evt.preventDefault();
    }, false);
  },
  filetype: function (handler) {
    'use strict';
    //if ((handler.type === 'text/csv') || (handler.type === 'application/vnd.ms-excel') || (handler.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
    if (handler.type === 'text/csv') {
      return true;
    }
    return false;
  },
  upload: function (url, data) {
    'use strict';
    return ['coming soon', url, data];
  }
};
