/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = (operations, callback) => {
    const promises =[];

    for (let operation of operations) {
        const promise = new Promise((resolve, reject) => {
            operation((err, data) => {
                if(err)
                    reject(err);

                resolve(data);
            });
        });

        promises.push(promise);
    }

    Promise.all(promises)
        .then(data => callback(null, data))
        .catch(error => callback(error));
};