import pool from './database.js';
import { isAlphanumerical } from 'is-alphanumerical';

const getUserViaWebsiteKey = (website_key) => {
	return new Promise(function(resolve, reject) {
		if (isAlphanumerical(website_key)) {
			pool.query(`
			select *
			from accounts
			where website_key='${website_key}';
			`, (error, results) => {
				if (error) {
					reject(error);
				} else {
					resolve(results.rows);
				}
			});
		} else {
			reject(`website_key is not alphanumerical:\n\r${website_key}`);
		}
	});
}

export default {
	getUserViaWebsiteKey
}
