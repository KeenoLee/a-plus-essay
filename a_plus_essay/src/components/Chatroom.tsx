import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from 'react-native';
import * as React from 'react';
import { Component } from 'react';
import io, { Socket } from 'socket.io-client';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import {
  Button,
  Center,
  Divider,
  Heading,
  Select,
  Stack,
  VStack,
} from 'native-base';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Input as InputN } from 'native-base';
import { env } from '../env/env';
import { AppParamList, useAppNavigation } from '../routes';
import { useGet } from '../hooks/use-get';
import { usePost } from '../hooks/use-post';

// import { Header } from '@react-navigation/native-stack'

const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0;

interface ChatMessage {
  id: number;
  sender_id: number;
  message: string;
  updated_at: string
}

interface Room {
  otherUser: { id: number; nickname: string; };
  messages: ChatMessage[];
  order: { id: number; tutor_id: number; student_id: number; title: string };
}
interface IChatroomProps {
  room: Room;
  post: ReturnType<typeof usePost>
  token: string
  title: string
}

interface IChatroomState {
  chatMessage: string;
  messages: ChatMessage[];
  file?: string;
}

class Chatroom extends Component<IChatroomProps, IChatroomState> {
  socket: Socket;
  scrollView: any;
  is_first = true;
  constructor(props: IChatroomProps) {
    super(props);
    this.state = {
      chatMessage: '',
      messages: props.room.messages,
    };
    this.scrollView = '';
    this.socket = io(`${env.BACKEND_ORIGIN}`);
    this.socket.on('connect', () => {
      console.log('connected!!!!!');
    });
  }
  componentDidMount() {
    this.socket.on('chat message', this.receivedMessage)
    console.log('reseivedMessage!!!!', this.receivedMessage);
    this.socket.emit('join', this.props.room.order.id)
    console.log('seesee this.props.room.order.id', this.props.room.order.id);
  }

  componentWillUnmount() {
    this.socket.off('chat message', this.receivedMessage)
    this.socket.emit('leave', this.props.room.order.id)


  }
  receivedMessage = (message: ChatMessage) => {
    console.log('message:', message);
    this.setState({ messages: [...this.state.messages, message] });
  }

  async submitChatMessage() {
    const orderId = this.props.room.order.id;
    const newMessage = this.state.chatMessage;
    this.props.post('send message', `/chat/${orderId}/message`, {
      // senderIsTutor, orderId, newMessage
      message: newMessage
    }, json => {
      console.log('newMessageSuccess? ', json);

      this.socket.emit('chat message', this.state.chatMessage)
      console.log('this.state.chatMessage:', this.state.chatMessage);;
      if (this.state.chatMessage == newMessage) {
        this.setState({ chatMessage: '' });
      }
    })

    // const res = await fetch(`${env.BACKEND_ORIGIN}/post/message`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ senderIsTutor, orderId, newMessage }),
    // });
    // const result = await res.json();
    // console.log('SUCCESS? ', result);

    // this.socket.emit('chat message', this.state.chatMessage);
    // this.setState({ chatMessage: '' });
  }

  render() {
    const messagesFromServer = this.props.room.messages;
    const messageFromServer = messagesFromServer.map(msg => {
      let isIncoming = msg.sender_id == this.props.room.otherUser.id
      return (
        <View
          //TODO: unique ID
          key={msg + (Math.random() * 100).toFixed(5)}
          //TODO:
          style={
            isIncoming
              ? styles.incomingMessageBox
              : styles.sendMessageBox
          }>
          {isIncoming ? (
            <View>
              <Text style={styles.otherNickname}>
                {this.props.room.otherUser.nickname}
              </Text>
              <Text style={styles.content}>{msg.message.trim() + '   '}</Text>
              <Text style={styles.timeDisplay}>
                {format(new Date(msg.updated_at), 'KK:mm aaa')}
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.content}>{msg.message.trim() + '   '}</Text>
              <Text style={styles.timeDisplay}>
                {format(new Date(msg.updated_at), 'KK:mm aaa')}
              </Text>
            </View>
          )}
        </View>
      )
    }
    );
    return (
      <>
        <SafeAreaView
          edges={['bottom', 'left', 'right']}
          style={{ flex: 1, backgroundColor: 'rgb(188,211,207)' }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.outerContainer}
            keyboardVerticalOffset={keyboardVerticalOffset}>
            <View style={{ flex: 1, backgroundColor: 'rgb(215,226,225)' }}>
              {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
              {/* <Text>debug：{JSON.stringify(this.props.room) + '-'.repeat(30)}</Text> */}
              <ImageBackground
                style={{ flex: 1, width: '100%', height: '100%' }}
                source={require('../assets/chatbg.jpg')}
                imageStyle={{ opacity: 0.35 }}>
                <ScrollView
                  style={{ flex: 1, marginBottom: 40 }}
                  ref={ref => {
                    this.scrollView = ref;
                  }}
                  onContentSizeChange={() => {
                    this.scrollView.scrollToEnd({ animated: !this.is_first })
                    this.is_first = false
                  }
                  }
                  automaticallyAdjustContentInsets={true}>
                  {messageFromServer}
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      width: 50,
                      height: 30,
                      // height: 300,
                    }}></View>
                </ScrollView>
                <View style={styles.inputContainer}>
                  {/* <Ionicons size={24} name="add-circle-outline" /> */}
                  <TextInput
                    style={styles.textInput}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    placeholder={'Type a message'}
                    value={this.state.chatMessage}
                    onSubmitEditing={() => this.submitChatMessage()}
                    onChangeText={chatMessage => {
                      this.setState({ chatMessage });
                    }}
                  />
                  <Ionicons
                    size={24}
                    name="send"
                    onPress={() => this.submitChatMessage()}
                  />
                </View>
              </ImageBackground>
            </View>
          </KeyboardAvoidingView>
          {/* </TouchableWithoutFeedback> */}
        </SafeAreaView>
      </>
    );
  }
}
const ConnectedChatroom = (props: {
  route: { params: AppParamList['Chatroom'] }
  token: string
  title: string
}) => {
  //   const navigation = useAppNavigation();
  // navigation.getState().routes
  const room = useGet<{ error?: string; room?: Room }>(
    'chatroom',
    '/chat/' + props.route.params.id + '/message',
    {
      error: 'loading',
    },
  );
  const post = usePost()
  return room.render(json => <Chatroom room={json.room!} post={post} token={props.route.params.token} title={json.room!.order.title} />);
};

export default ConnectedChatroom;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: 'rgb(,211,207)',
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    // marginTop: -40

    // top: 0,
    // bottom: 15
  },
  container: {
    // backgroundColor: 'red',
    flex: 1,
    width: '100%',
    position: 'relative',
    // top: 0,
    // bottom: 15
  },

  incomingMessageBox: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    maxWidth: '70%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 3,
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  sendMessageBox: {
    backgroundColor: 'rgb(209,237,255)',
    borderRadius: 15,
    maxWidth: '70%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 3,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  otherNickname: {
    fontSize: 10,
    alignSelf: 'flex-start',
    flex: 0.2,
    color: '#000',
  },
  content: {
    flex: 1,
  },
  timeDisplay: {
    fontSize: 10,
    alignSelf: 'flex-end',
    flex: 0.2,
    color: '#888',
    // marginBottom: -2
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // margin: 10,
    backgroundColor: 'rgb(188,211,207)',
    width: '100%',
    alignItems: 'center',
    marginTop: -40,
  },
  textInput: {
    // flex: 1,
    // alignItems: 'flex-end',
    paddingHorizontal: 10,
    marginHorizontal: 8,
    marginTop: 5,
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderRadius: 50,
    position: 'relative',
    bottom: 0,
    backgroundColor: 'white',
  },
  buttonContainer: {},
});
