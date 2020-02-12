const mongoose = require("mongoose"),
    Beach = require("./models/beach"),
    Comment = require("./models/comment");

const data = [
    {
        name: "Laniakea ",
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80",
        location: "Haleiwa, Hawaii",
        lat: 21.583442,
        lng: -158.131379,
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio vero ad sit accusamus ab distinctio excepturi aperiam laudantium doloremque incidunt. Voluptatum adipisci possimus ratione maxime quos rerum est blanditiis ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis odio, facere sint ea quas totam! Odit quo dicta sint enim. Doloremque rem assumenda voluptatibus ratione iure veritatis nemo non quae?.",
        author: {
            id: "588c2e092403d111454fff76",
            username: "Jack Smith"
        }
    },
    {
        name: "McWay Falls",
        image:
            "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        location: "California",
        lat: 36.157976,
        lng: -121.672188,
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio vero ad sit accusamus ab distinctio excepturi aperiam laudantium doloremque incidunt. Voluptatum adipisci possimus ratione maxime quos rerum est blanditiis ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis odio, facere sint ea quas totam! Odit quo dicta sint enim. Doloremque rem assumenda voluptatibus ratione iure veritatis nemo non quae?",
        author: {
            id: "588c2e092403d111454fff71",
            username: "Jill Janet"
        }
    },
    {
        name: "Thoondu",
        image:
            "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80",
        location: "Fuvahmulah, Maldives",
        lat: -0.278409,
        lng: 73.415560,
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio vero ad sit accusamus ab distinctio excepturi aperiam laudantium doloremque incidunt. Voluptatum adipisci possimus ratione maxime quos rerum est blanditiis ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis odio, facere sint ea quas totam! Odit quo dicta sint enim. Doloremque rem assumenda voluptatibus ratione iure veritatis nemo non quae?.",
        author: {
            id: "588c2e092403d111454fff78",
            username: "James Rykal"
        }
    },
    {
        name: "Tamarama",
        image:
            "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        location: "New South Wales, Australia",
        lat: -33.891281,
        lng: 151.277327,
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio vero ad sit accusamus ab distinctio excepturi aperiam laudantium doloremque incidunt. Voluptatum adipisci possimus ratione maxime quos rerum est blanditiis ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis odio, facere sint ea quas totam! Odit quo dicta sint enim. Doloremque rem assumenda voluptatibus ratione iure veritatis nemo non quae?.",
        author: {
            id: "588c2e092403d111454fff79",
            username: "Tony Bennet"
        }
    },
    {
        name: "Praia do Flamengo",
        image:
            "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        location: "Rio de Janeiro, Brazil",
        lat: -22.929850,
        lng: -43.171404,
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio vero ad sit accusamus ab distinctio excepturi aperiam laudantium doloremque incidunt. Voluptatum adipisci possimus ratione maxime quos rerum est blanditiis ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis odio, facere sint ea quas totam! Odit quo dicta sint enim. Doloremque rem assumenda voluptatibus ratione iure veritatis nemo non quae?.",
        author: {
            id: "588c2e092403d111454fff80",
            username: "Kevin DuVall"
        }
    },
    {
        name: "Zuma",
        image:
            "https://images.unsplash.com/photo-1476673160081-cf065607f449?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80",
        location: "Malibu, California",
        lat: 34.022369,
        lng: -118.831379,
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio vero ad sit accusamus ab distinctio excepturi aperiam laudantium doloremque incidunt. Voluptatum adipisci possimus ratione maxime quos rerum est blanditiis ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis odio, facere sint ea quas totam! Odit quo dicta sint enim. Doloremque rem assumenda voluptatibus ratione iure veritatis nemo non quae?.",
        author: {
            id: "588c2e092403d111454fff81",
            username: "Tim Ferris"
        }
    }
];

function seedDB() {
    // remove all beaches and associating comments
    Beach.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed Beaches!");
            Comment.deleteMany({}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Removed Comments!");
                }
                // add a few beaches
                data.forEach(function (seed) {
                    Beach.create(seed, function (err, beach) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Added a Beach!");
                            // create a comment
                            Comment.create(
                                {
                                    text: "This place is great!",
                                    author: "Ryan Roman"
                                },
                                function (err, comment) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        beach.comments.push(comment);
                                        beach.save();
                                        console.log("Created new comment!");
                                    }
                                }
                            );
                        }
                    });
                });
            });
        }
    });
}

module.exports = seedDB;
