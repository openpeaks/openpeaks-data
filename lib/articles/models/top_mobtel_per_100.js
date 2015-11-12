'use strict';

var utils = require('../../utils');
var Promise = utils.Promise;

module.exports = {
	/**
	 * Creates the model.
	 * @param {object} options - Params
	 * @param {object} options.model - Base model
	 * @param {object} options.seqs - A seqs access service
	 * @param {object} options.data - Data module
	 */
	create: function(options) {
		var seqs = options.seqs;
		var data = options.data;
		var model = options.model || {};

		function formatModel(name, rows) {
			model[name] = [];
			rows.forEach(function(row) {
				var item = {};
				item.data = row;
				item.topic = data.topics.getCountry(row.value);
				model[name].push(item);
			});
			return model;
		}

		var props = {
			top: seqs.queryValues({
				key: 'MOBTEL.TOP#latest',
				limit: 10,
				attributes: ['range', 'value', 'label'],
				sort: 'descending'
			}),
			top2: seqs.queryValues({
				key: 'MOBTEL.TOP#latest',
				limit: 10,
				attributes: ['range', 'value', 'label']
			})
		}
		return Promise.props(props)
			.then(function(result) {
				formatModel('topCountries', result.top);
				formatModel('topCountries2', result.top2);
				return model;
			});
	}
};
