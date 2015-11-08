var db = require('./db');
var secrets = require('./secrets');
var request = require('request');

var gcmUrl = 'https://android.googleapis.com/gcm/send';
/**
  Push notifications!

**/

var _lastNotification = {};

function _pushNotifications(ids, room, messages){
  var data = {registration_ids: ids};

  request.post({
    url: gcmUrl,
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Authorization: 'key=AIzaSyDWZfwAuII1Tnzj4qnylBuwK-spXVVkPzA',
      'Content-Type': 'application/json'
    }
  });

  ids.forEach(function(subscription){
    _lastNotification[subscription] = {
      body: 'Click to open typr.club/'+room,
      title: 'New message on ' + room + '!',
      icon: '/typr-192.jpg',
      tag: 'new-message',
      room: room,
      data: messages
    }
  })
}

module.exports = {
  notify: function(room, messages){
    db.getNotificationsIdForRoom(room, function(err, ids){
      _pushNotifications(ids, room, messages);
    })
  },

  getNotificationFromUser: function(subscription){
    return _lastNotification[subscription];
  }

}