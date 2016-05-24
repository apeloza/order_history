var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';

router.get('/', function(req, res) {
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }
        client.query("SELECT customers.first_name|| ' ' || customers.last_name AS fullname, customers.id, COUNT(orders.id) FROM customers JOIN addresses ON addresses.customer_id = customers.id LEFT OUTER JOIN orders ON orders.address_id = addresses.id GROUP BY customers.first_name, customers.last_name, customers.id;", function(err, result) {
            if (err) {
                console.log(err);
            }

            done();
            res.send(result.rows);
        });
    });
});
router.get('/:id', function(req, res) {
    var id = req.params.id;
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }
        client.query("SELECT products.description, line_items.quantity, line_items.unit_price, (line_items.quantity *line_items.unit_price) AS cost, customers.id AS customer_id, orders.id AS order_id, orders.order_date, addresses.street || ' ' || addresses.city || ' ' || addresses.state || ' ' || addresses.zip AS address  FROM line_items JOIN products ON products.id = line_items.product_id JOIN orders ON orders.id = line_items.order_id JOIN addresses ON addresses.id = orders.address_id JOIN customers ON customers.id = addresses.customer_id WHERE customers.id = $1 ORDER BY orders.order_date DESC;", [id], function(err, result) {
            if (err) {
                console.log(err);
            }
            done();
            res.send(result.rows);

        });
    });
});
/*router.get('/ordertotal/:id',
    function(req, res) {
        var id = req.params.id;
        pg.connect(connectionString, function(err, client, done) {
            if (err) {
                res.sendStatus(500);
            }
            client.query("", [id], function(err, result) {
                if (err) {
                    console.log(err);
                }
                done();
                res.send(result.rows);

            });
        });
    });*/
module.exports = router;
