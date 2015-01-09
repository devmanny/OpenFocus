Control = new Meteor.Collection('control');

if (Meteor.isClient) {

    Meteor.subscribe('control');

    Template.main.helpers({
        control: function () {
            return Control.find();
        }
    });

    Template.main.events({

    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        var getEmailFromUserId = function (userId) {
            var email = Meteor.users.findOne({
                _id: userId
            }, {
                emails: 1
            });
            if (email && email['emails']) {
                return email['emails'][0]['address'];
            }
            return null;
        }
        var getUserIdFromEmail = function (email) {
            return Meteor.users.findOne({
                "emails.address": {
                    $in: [email]
                }
            }, {
                _id: 1
            })
        }

        Meteor.publish('control', function () {
            return Control.find({});
        });

        Control.allow({
            insert: function (userId, doc) {
                return true | (userId && doc.owner === userId);
            },

            remove: function (userId, doc) {
                return true;
            },

            update: function (userId, doc) {
                return true | (userId && doc.owner === userId);
            }
        });
    });
}
