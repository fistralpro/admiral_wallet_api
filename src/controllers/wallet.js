const Wallet = require("../models/wallet");
const id_not_found_error = 'wallet id not found';

const getWallet = ((req, res) => {
    const walletId = req.params.id;

    try {            
        Wallet.findOne({ where: { id } }).then(resource => {
            if (resource === null) {
                return res.status(404).json({message:id_not_found_error});                
            }   
            return res.status(200).json(resource)});
    } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
    }
});

const createWallet = ((req, res) => {
    Wallet.create(req.body).then((resource) => {
        return res.status(201).json(resource);
        })
        .catch((err) => {
            console.log(err);
            if (err.name === 'SequelizeValidationError') {
                if (err.errors[0].message.includes('wallet.createdDate')) {
                    return res.status(400).json({ message  : "createdDate cannot be set"} );
                }
                else {
                    return res.status(400).json({ message  : err.errors[0].message} );
                }
            } else if (err==="Cannot update read-only field" === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message  : err.errors[0].message} ); 
            } else if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message  : err.errors[0].message} ); 
            } else {
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
});

module.exports = {getWallet, createWallet};