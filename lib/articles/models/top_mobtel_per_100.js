'use strict';

module.exports = {
	create: function(model, seqs, data) {
		return seqs.queryValues({
			key: 'MOBTEL.TOP#latest',
			limit: 10
		}).then(function(rows) {
			console.log('rows', rows);
			model.topCountries = [];
			var item = {};
			rows.forEach(function(row) {
				item.data = row;
				item.topic = data.topics.getCountry(row.value);
				model.topCountries.push(item);
			});
		});
	}
};
