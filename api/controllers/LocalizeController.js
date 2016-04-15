/**
 * LocalizeController
 *
 * @description :: Server-side logic for managing localizes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	goToView: function(req,res) {
        return res.view('homepage');
    }
};

