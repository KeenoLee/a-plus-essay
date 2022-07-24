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
import {Component} from 'react';
import io from 'socket.io-client';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {format} from 'date-fns';
import {
  Button,
  Center,
  Divider,
  Heading,
  Select,
  Stack,
  VStack,
} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Input as InputN} from 'native-base';
import {env} from '../env/env';
import {AppParamList, useAppNavigation} from '../../routes';
import {useGet} from '../hooks/use-get';

// import { Header } from '@react-navigation/native-stack'

const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0;
// export default function Chatroom() {
//     const socket = io("http://192.168.168.94:8111")
//     return (
//         <View>
//             <Text>Chatroom</Text>
//         </View>
//     )
// }

interface Room {
  otherUser: {id: number; nickname: string; is_tutor: Boolean};
  messages: [
    {id: number; sent_by_tutor: Boolean; message: string; updated_at: string},
  ];
  order: {id: number; tutor_id: number; student_id: number; title: string};
}
interface IChatroomProps {
  room: Room;
}

interface IChatroomState {
  chatMessage: string;
  chatMessages: string[];
  file?: string;
}

class Chatroom extends Component<IChatroomProps, IChatroomState> {
  socket: any;
  is_hardcode_tutor: boolean;
  scrollView: any;
  constructor(props: IChatroomProps) {
    super(props);
    this.state = {
      chatMessage: '',
      chatMessages: [],
    };
    this.is_hardcode_tutor = true;
    this.scrollView = '';
  }
  componentDidMount() {
    this.socket = io(`${env.BACKEND_ORIGIN}`);
    this.socket.on('chat message', (msg: string) => {
      this.setState({chatMessages: [...this.state.chatMessages, msg]});
    });
  }

  async submitChatMessage() {
    this.socket.emit(
      'chat message',
      'istutor: ' + JSON.stringify(!this.props.room.otherUser.is_tutor),
    );
    this.socket.emit(
      'chat message',
      'orderid:' + JSON.stringify(this.props.room.order.id),
    );
    const senderIsTutor = !this.props.room.otherUser.is_tutor;
    const orderId = this.props.room.order.id;
    const newMessage = this.state.chatMessage;
    const res = await fetch(`${env.BACKEND_ORIGIN}/post/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({senderIsTutor, orderId, newMessage}),
    });
    const result = await res.json();
    console.log('SUCCESS? ', result);

    this.socket.emit('chat message', this.state.chatMessage);
    this.setState({chatMessage: ''});
  }

  // addFile = () => {
  //     this.openGallery(file => {
  //         setState(file)
  //     })
  // }

  // openGallery = (callback: (file: { uri: string, filename: string, type: string, base64Data: string }) => void) => {
  //     launchImageLibrary({
  //         mediaType: 'photo',
  //         includeBase64: true
  //     }, (res) => {
  //         if (res.didCancel) {
  //             console.log('user cancelled image picker')
  //         } else if (res.errorMessage) {
  //             console.log('Error: ', res.errorMessage)
  //         } else {
  //             let uri = res.assets?.[0].uri
  //             let filename = res.assets?.[0].fileName
  //             let type = res.assets?.[0].type
  //             let base64Data = res.assets?.[0].base64
  //             // console.log(base64.decode(base64Format!))
  //             // console.log('base64', base64Format)
  //             if (uri && filename && type && base64Data) {
  //                 callback({ uri, filename, type, base64Data })
  //                 return
  //             }
  //             console.log('file is not found')
  //             return
  //         }
  //     })
  // }

  render() {
    const otherUser_is_tutor = this.props.room.otherUser.is_tutor;
    const messagesFromServer = this.props.room.messages;
    const messageFromServer = messagesFromServer.map(msg => (
      <View
        //TODO: unique ID
        key={msg + (Math.random() * 100).toFixed(5)}
        //TODO:
        style={
          otherUser_is_tutor == msg.sent_by_tutor
            ? styles.incomingMessageBox
            : styles.sendMessageBox
        }>
        {otherUser_is_tutor == msg.sent_by_tutor ? (
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
    ));

    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <View
        //TODO: unique ID
        key={chatMessage + (Math.random() * 100).toFixed(5)}
        //TODO:
        style={
          this.props.room.otherUser.is_tutor
            ? styles.sendMessageBox
            : styles.incomingMessageBox
        }>
        <View>
          <Text style={styles.content}>
            {chatMessage.toString().trim() + '   '}
          </Text>
          <Text numberOfLines={1} style={styles.timeDisplay}>
            {format(new Date(), 'KK:mm aaa')}
          </Text>
        </View>
      </View>
    ));
    return (
      <>
        <SafeAreaView
          edges={['bottom', 'left', 'right']}
          style={{flex: 1, backgroundColor: 'rgb(188,211,207)'}}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.outerContainer}
            keyboardVerticalOffset={keyboardVerticalOffset}>
            <View style={{flex: 1, backgroundColor: 'rgb(215,226,225)'}}>
              {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
              <Text>
                debug：{JSON.stringify(this.props.room) + '-'.repeat(30)}
              </Text>
              <ImageBackground
                style={{flex: 1, width: '100%', height: '100%'}}
                source={require('../assets/chatbg.jpg')}
                imageStyle={{opacity: 0.35}}>
                <ScrollView
                  style={{flex: 1, marginBottom: 40}}
                  ref={ref => {
                    this.scrollView = ref;
                  }}
                  onContentSizeChange={() =>
                    this.scrollView.scrollToEnd({animated: true})
                  }
                  automaticallyAdjustContentInsets={true}>
                  {messageFromServer}
                  {chatMessages}
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      width: 50,
                      height: 300,
                    }}></View>
                </ScrollView>
                <View style={styles.inputContainer}>
                  <Ionicons size={24} name="add-circle-outline" />
                  <TextInput
                    style={styles.textInput}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    placeholder={'Type a message'}
                    value={this.state.chatMessage}
                    onSubmitEditing={() => this.submitChatMessage()}
                    onChangeText={chatMessage => {
                      this.setState({chatMessage});
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
const ConnectedChatroom = (props: {id: number}) => {
  //   const navigation = useAppNavigation();
  // navigation.getState().routes
  const room = useGet<{error?: string; room?: Room}>(
    'chatroom',
    '/chat/' + props.id + '/message',
    {
      error: 'loading',
    },
  );
  return room.render(json => <Chatroom room={json.room!} />);
};

class ChatroomScreen extends Component<{
  route: {params: AppParamList['Chatroom']};
}> {
  render() {
    let id = this.props.route.params.id;
    return <ConnectedChatroom id={id} />;
  }
}
export default ChatroomScreen;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: 'rgb(188,211,207)',
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
