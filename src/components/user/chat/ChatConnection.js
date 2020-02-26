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
  let roomConnObj = this.roomConnections.find(conn => conn.roomId === roomId)
  if (roomConnObj) {
    roomConnObj.conn.speak(message)
  } else {
    // console.log('Error: Cannot find room connection')
  }
}
ChatConnection.prototype.read = function(user_id, message_id, roomId) {
  let roomConnObj = this.roomConnections.find(conn => conn.roomId === roomId)
  if (roomConnObj) {
    roomConnObj.conn.read(user_id, message_id)
  } else {
    // console.log('Error: Cannot find room connection')
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

ChatConnection.prototype.createRoomConnection = function(room_code) {
  var scope = this
  return this.connection.subscriptions.create({channel: 'RoomChannel', room_id: room_code, sender: scope.senderId}, {
    connected: function() {
      // console.log('connected to RoomChannel. Room code: ' + room_code + '.')
    },
    disconnected: function() {},
    received: function(data) {
        return scope.callback(data)
      // if (data.participants.indexOf(scope.senderId) != -1) {
      // }
    },
    speak: function(message) {
      return this.perform('speak', {
        room_id: room_code,
        message: message,
        sender:  scope.senderId
      })
    },
    read: function(user_id, message_id) {
      console.log("sended read");
      return this.perform('read', {
        message: message_id,
        sender:  user_id
      })
    }
  })
}


export default ChatConnection
