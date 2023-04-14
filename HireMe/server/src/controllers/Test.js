// const {Profile} = require ('../models')
// const {Post} = require ('../models')
// const jwt = require('jsonwebtoken')
// const config = require('../config/config')

// function jwtSignprofile (profile) {
//     const ONE_WEEK = 60 * 60 * 24 * 7
//     return jwt.sign(profile, config.authentication.jwtSecret, {
//         expiresIn: ONE_WEEK
//     })
// }
      // var profile;
      // Profile.create ({
      //     fullname: req.body.fullname,
      //     email: req.body.email,
      //     password: req.body.password,
      // })
      // .then(createdProfile => {
      //     profile = createdProfile
      //     const file = req.file
      //     console.log(profile)
      //     return Post.create ({
      //         file: file.filename,
      //         posts: req.body.posts
      //     })
      // })  
      // .then (post => {
      //     profile.setPost(post)
      //     res.status(201).json({ message: "Post upload!" });
      // })
      // .catch (err => {
      //     console.log(err)
      //     return res.status(500).send({ error: 'Something went wrong' });
      // })

// module.exports = (req, res) => {
//     var profile;
//     Profile.create ({
//         fullname: req.body.fullname,
//         email: req.body.email,
//         password: req.body.password,
//     })
//     .then(createdProfile => {
//         profile = createdProfile
//         const file = req.file
//         console.log(profile)
//         return Post.create ({
//             file: file.filename,
//             posts: req.body.posts
//         })
//     })  
//     .then (post => {
//         profile.setPost(post)
//         res.status(201).json({ message: "Post upload!" });
//     })
//     .catch (err => {
//         console.log(err)
//         return res.status(500).send({ error: 'Something went wrong' });
//     })
// }

// // Post a Customer
// exports.create = (req, res) => {	
// 	// Save to MySQL database
	
// 	// var customer;
// 	Customer.create({ 
// 	  //customerid: db.sequelize.Utils.generateUUID(),
// 	  firstname: req.body.firstname,
// 	  lastname: req.body.lastname,
// 	  age: req.body.age
// 	}).then(createdCustomer => {		
// 		// Send created customer to client
// 		customer = createdCustomer;
		
// 		return Address.create({
// 			street: req.body.street,
// 			phone: req.body.phone
// 		})
// 	}).then(address => {
// 		customer.setAddress(address)
// 		res.send('OK');
// 	})
// };
 
// // FETCH all Customers include Addresses
// exports.findAll = (req, res) => {
// 	Customer.findAll({
// 		attributes: [['uuid', 'customerId'], ['firstname', 'name'], 'age'],
// 		include: [{
// 			model: Address,
// 			where: { fk_customerid: db.Sequelize.col('customer.uuid') },
// 			attributes: ['street', 'phone']
// 		}]
// 	}).then(customers => {
// 	   res.send(customers);
// 	});

// };