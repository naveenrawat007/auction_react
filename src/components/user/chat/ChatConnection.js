import ActionCable from 'actioncable'

function ChatConnection(senderId, callback) {
  let access_token = localStorage.getItem('auction_user_token')

  var wsUrl = 'ws://' + process.env.REACT_APP_BACKEND_WS_URL + '/cable'
  wsUrl += '?access-token=' + access_token
  this.senderId = senderId
  this.callback = callback

  this.connection = ActionCable.createConsumer(wsUrl)
  this.roomConnections = []
}
ChatConnection.prototype.talk = function(message, roomId) {
  let roomConnObj = this.roomConnections.find(conn => conn.roomId == roomId)
  if (roomConnObj) {
    roomConnObj.conn.speak(message)
  } else {
    console.log('Error: Cannot find room connection')
  }
}

ChatConnection.prototype.openNewRoom = function(roomId) {
  if (roomId !== undefined) {
    this.roomConnections.push({roomId: roomId, conn: this.createRoomConnection(roomId)})
  }
}

ChatConnection.prototype.disconnect = function() {
  this.roomConnections.forEach(c => c.conn.consumer.connection.close())
}

ChatConnection.prototype.createRoomConnection = function(group_code) {
  var scope = this
  return this.connection.subscriptions.create({channel: 'GroupChannel', group_id: group_code, sender: scope.senderId}, {
    connected: function() {
      console.log('connected to GroupChannel. Room code: ' + group_code + '.')
    },
    disconnected: function() {},
    received: function(data) {
      console.log(data);
      if (data.participants.indexOf(scope.senderId) != -1) {
        return scope.callback(data)
      }
    },
    speak: function(message) {
      console.log(group_code);
      return this.perform('speak', {
        group_id: group_code,
        message: message,
        sender:  scope.senderId
      })
    }
  })
}


export default ChatConnection
