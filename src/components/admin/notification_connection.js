import ActionCable from 'actioncable'

function NotificationConnection(callback) {
  let access_token = localStorage.getItem('auction_admin_token')

  var wsUrl = 'ws://' + process.env.REACT_APP_BACKEND_WS_URL + '/cable'
  wsUrl += '?access-token=' + access_token
  this.callback = callback

  this.connection = ActionCable.createConsumer(wsUrl)
  this.roomConnections = []
}

NotificationConnection.prototype.disconnect = function() {
  this.roomConnections.forEach(c => c.conn.consumer.connection.close())
}

NotificationConnection.prototype.createRoomConnection = function() {
  var scope = this
  return this.connection.subscriptions.create({channel: 'NotificationChannel'}, {
    connected: function() {
    },
    disconnected: function() {
    },
    received: function(data) {
      return scope.callback(data)
    },
  })
}


export default NotificationConnection
