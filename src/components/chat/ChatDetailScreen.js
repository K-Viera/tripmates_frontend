import React from 'react';
import SocketIOClient from 'socket.io-client';
import {GiftedChat} from 'react-native-gifted-chat';

class ChatDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      userId: null,
    };
    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);

    this.socket = SocketIOClient('https://floating-mesa-15296.herokuapp.com/');
    this.socket.on('message', this.onReceivedMessage);
  }
  componentDidMount() {
    this.determineUser();
  }

  determineUser() {
    const {chatId} = this.props.route.params;
    const {userId} = this.props.route.params;

    console.log('chatId: ', chatId);
    console.log('userId: ', userId);

    this.socket.emit('userJoined', chatId, userId);
  }

  onReceivedMessage(messages) {
    this._storeMessages(messages);
  }

  onSend(messages = []) {
    const {chatId} = this.props.route.params;
    this.socket.emit('message', chatId, messages[0]);
    this._storeMessages(messages);
  }

  _storeMessages(messages) {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render() {
    const {userId} = this.props.route.params;

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={userId}
      />
    );
  }
}
export default ChatDetailScreen;
