
// import React, { useState, useRef, useEffect } from 'react';
// import {
//   SafeAreaView, StyleSheet, View, FlatList, Text, TextInput, KeyboardAvoidingView,
//   Platform, TouchableWithoutFeedback, Keyboard, Animated, ImageBackground, ToastAndroid,ScrollView
// } from 'react-native';
// import { TouchableOpacity, Pressable } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import * as Clipboard from 'expo-clipboard';

// const TypingIndicator = () => {
//   const dot1 = useRef(new Animated.Value(0)).current;
//   const dot2 = useRef(new Animated.Value(0)).current;
//   const dot3 = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const animateDot = (dot, delay) => {
//       return Animated.loop(
//         Animated.sequence([
//           Animated.timing(dot, { toValue: -5, duration: 300, delay, useNativeDriver: true }),
//           Animated.timing(dot, { toValue: 0, duration: 300, useNativeDriver: true }),
//         ])
//       ).start();
//     };
//     animateDot(dot1, 0);
//     animateDot(dot2, 150);
//     animateDot(dot3, 300);
//   }, []);

//   return (
//     <View style={styles.typingContainer}>
//       {[dot1, dot2, dot3].map((dot, idx) => (
//         <Animated.View key={idx} style={[styles.typingDotCircle, { transform: [{ translateY: dot }] }]} />
//       ))}
//     </View>
//   );
// };

// export default function ChatbotScreen({ navigation }) {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const flatListRef = useRef(null);

//   useEffect(() => {
//     setMessages([{ type: 'bot', text: 'Hi, Echo here!!' }]);
//   }, []);

//   const scrollToBottom = () => {
//     flatListRef.current?.scrollToEnd({ animated: true });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, isTyping]);

//   const sendMessage = async () => {
//     if (!userInput.trim()) return;
//     const userMessage = { type: 'user', text: userInput };
//     setMessages(prev => [...prev, userMessage]);
//     setUserInput('');
//     setIsTyping(true);

//     try {
//       const startTime = Date.now();
//       const response = await fetch('http://10.16.63.246:5000/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: userInput })
//       });

//       const data = await response.json();
//       const botReply = data.reply || Error: ${data.error || 'Unexpected response'};
//       const responseTime = ((Date.now() - startTime) / 1000).toFixed(2);

//       setMessages(prev => [...prev, { type: 'bot', text: botReply, responseTime, liked: null }]);
//     } catch (error) {
//       setMessages(prev => [...prev, { type: 'bot', text: '❌ Error reaching server.' }]);
//     }
//     setIsTyping(false);
//   };

//   const handleLikeDislike = (index, type) => {
//     setMessages(prev =>
//       prev.map((msg, i) => (i === index && msg.type === 'bot' ? { ...msg, liked: msg.liked === type ? null : type } : msg))
//     );
//   };

//   const handleLongPressFeedback = (type) => {
//     ToastAndroid.show(type === 'good' ? 'Good response' : 'Bad response', ToastAndroid.SHORT);
//   };

//   const renderMessageText = (text) => {
//     if (!text.includes('')) {
//       return <Text style={styles.messageText}>{text}</Text>;
//     }

//     const codeBlockRegex = /(?:[a-zA-Z])\n([\s\S]?)```/g;
//     const parts = [];
//     let lastIndex = 0;
//     let match;

//     while ((match = codeBlockRegex.exec(text)) !== null) {
//       if (match.index > lastIndex) {
//         parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
//       }
//       parts.push({ type: 'code', content: match[1] });
//       lastIndex = codeBlockRegex.lastIndex;
//     }

//     if (lastIndex < text.length) {
//       parts.push({ type: 'text', content: text.slice(lastIndex) });
//     }

//     return parts.map((part, i) => {
//       if (part.type === 'code') {
//         return (
//           <View key={i} style={styles.codeBlockWrapper}>
//             <ScrollView style={styles.codeScrollWrapper} horizontal>
//               <Text selectable style={styles.codeText}>{part.content}</Text>
//             </ScrollView>
//             <TouchableOpacity
//               style={styles.copyButton}
//               onPress={() => {
//                 Clipboard.setStringAsync(part.content);
//                 ToastAndroid.show('Code copied!', ToastAndroid.SHORT);
//               }}
//             >
//               <Ionicons name="copy-outline" size={20} color="#007AFF" />
//             </TouchableOpacity>
//           </View>
//         );
//       }
//       return <Text key={i} style={styles.messageText}>{part.content}</Text>;
//     });
//   };

//   const renderItem = ({ item, index }) => (
//     <View style={[styles.messageRow, { justifyContent: item.type === 'user' ? 'flex-end' : 'flex-start' }]}>
//       <View style={item.type === 'user' ? styles.rightAlign : styles.leftAlign}>
//         <View style={item.type === 'user' ? styles.userBubble : styles.botBubble}>
//           {renderMessageText(item.text)}
//         </View>
//         {item.type === 'bot' && item.responseTime && (
//           <View style={styles.botMessageFooter}>
//             <View style={styles.iconContainer}>
//               <Pressable onPress={() => handleLikeDislike(index, 'up')} onLongPress={() => handleLongPressFeedback('good')} style={styles.footerIconButton}>
//                 <Ionicons name={item.liked === 'up' ? 'thumbs-up' : 'thumbs-up-outline'} size={18} color={'snow'} />
//               </Pressable>
//               <Pressable onPress={() => handleLikeDislike(index, 'down')} onLongPress={() => handleLongPressFeedback('bad')} style={styles.footerIconButton}>
//                 <Ionicons name={item.liked === 'down' ? 'thumbs-down' : 'thumbs-down-outline'} size={18} color={'snow'} />
//               </Pressable>
//               <Text style={styles.responseTimeTextRight}>⏱:{item.responseTime}s</Text>
//             </View>
//           </View>
//         )}
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ImageBackground source={require('../assets/bg1.jpeg')} style={styles.backgroundImage}>
//         <View style={styles.overlay} />
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={28} color="white" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>What can I do for you?</Text>
//         </View>
//         <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//           <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//             <View style={{ flex: 1 }}>
//               <FlatList
//                 ref={flatListRef}
//                 data={messages}
//                 renderItem={renderItem}
//                 keyExtractor={(_, index) => index.toString()}
//                 contentContainerStyle={{ padding: 12, flexGrow: 1 }}
//                 keyboardShouldPersistTaps="handled"
//                 showsVerticalScrollIndicator={false}
//                 onContentSizeChange={scrollToBottom}
//                 ListFooterComponent={isTyping ? (
//                   <View style={[styles.messageRow, { justifyContent: 'flex-start' }]}>
//                     <View style={styles.leftAlign}>
//                       <View style={styles.botBubble}><TypingIndicator /></View>
//                     </View>
//                   </View>
//                 ) : null}
//               />
//               <View style={styles.inputWrapper}>
//                 <View style={styles.inputRow}>
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Ask something..."
//                     value={userInput}
//                     onChangeText={setUserInput}
//                     onSubmitEditing={sendMessage}
//                     returnKeyType="send"
//                   />
//                   <TouchableOpacity onPress={sendMessage} style={styles.iconButton}>
//                     <Ionicons name="send" size={22} color="#007AFF" />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </TouchableWithoutFeedback>
//         </KeyboardAvoidingView>
//       </ImageBackground>
//     </SafeAreaView>
//   );
// }

// // reuse your original styles from before

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#000' },
//   backgroundImage: { flex: 1 },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     zIndex: 0,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     backgroundColor: 'transparent',
//     zIndex: 10,
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 16,
//     // height:30,
//     // backgroundColor:'skyblue',
//     // width:'100%',
//   },
//   container: { flex: 1 },
//   inner: { flex: 1 },
//   messageRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     marginVertical: 4,
//   },
//   leftAlign: {
//     flexDirection: 'column',
//     alignItems: 'flex-start'
//   },
//   rightAlign: { flexDirection: 'row', alignItems: 'flex-end' },
//   userBubble: {
//     backgroundColor: '#DCF8C6',
//     padding: 12,
//     borderRadius: 18,
//     borderBottomRightRadius: 4,
//     maxWidth: '100%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.5,
//     elevation: 2,
//   },
//   botBubble: {
//     backgroundColor: '#E5E5EA',
//     padding: 12,
//     borderRadius: 18,
//     borderBottomLeftRadius: 4,
//     maxWidth: '90%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.5,
//     elevation: 2,
//     marginLeft: 2,
//   },
//   messageText: { fontSize: 16, color: '#000' },
//   inputWrapper: {
//     paddingHorizontal: 10,
//     paddingBottom: 10,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderRadius: 50,
//     paddingHorizontal: 10,
//     backgroundColor: '#f9f9f9',
//     height: 55,
//   },
//   helperText: {
//     color: 'snow',
//     fontSize: 13,
//     marginTop: 4,
//     paddingLeft: '25%',
//   },
//   input: { flex: 1, paddingVertical: 8, paddingHorizontal: 10, fontSize: 16 },
//   iconButton: { padding: 6 },
//   typingContainer: { flexDirection: 'row', alignItems: 'center', height: 20 },
//   typingDotCircle: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: '#555',
//     marginHorizontal: 3,
//   },
//   codeScrollWrapper: {
//     backgroundColor: '#1e1e1e',
//     borderRadius: 8,
//     padding: 12,
//     marginTop: 6,
//     marginBottom: 6,
//     maxWidth: '100%',
//     maxHeight: 300,
//   },
//   codeText: {
//     color: '#f8f8f2',
//     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   codeBlockWrapper: { position: 'relative', marginTop: 6, marginBottom: 6 },
//   copyButton: {
//     position: 'absolute',
//     top: 6,
//     right: 6,
//     padding: 4,
//     backgroundColor: '#ffffffcc',
//     borderRadius: 6,
//     zIndex: 1,
//   },
//   botMessageFooter: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//     width: '99%',
//     paddingLeft: 12,
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//   },
//   footerIconButton: {
//     padding: 4,
//     marginRight: 8,
//   },
//   responseTimeTextRight: {
//     fontSize: 12,
//     color: 'snow',
//     marginLeft: 4,
//     marginRight: 8,
//   },
// });

// import React, { useState, useRef, useEffect } from 'react';
// import {
//   SafeAreaView, StyleSheet, View, FlatList, Text, TextInput, KeyboardAvoidingView,
//   Platform, TouchableWithoutFeedback, Keyboard, Animated, ImageBackground, ToastAndroid, ScrollView
// } from 'react-native';
// import { TouchableOpacity, Pressable } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import * as Clipboard from 'expo-clipboard';

// const TypingIndicator = () => {
//   const dot1 = useRef(new Animated.Value(0)).current;
//   const dot2 = useRef(new Animated.Value(0)).current;
//   const dot3 = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const animateDot = (dot, delay) => {
//       return Animated.loop(
//         Animated.sequence([
//           Animated.timing(dot, { toValue: -5, duration: 300, delay, useNativeDriver: true }),
//           Animated.timing(dot, { toValue: 0, duration: 300, useNativeDriver: true }),
//         ])
//       ).start();
//     };
//     animateDot(dot1, 0);
//     animateDot(dot2, 150);
//     animateDot(dot3, 300);
//   }, []);

//   return (
//     <View style={styles.typingContainer}>
//       {[dot1, dot2, dot3].map((dot, idx) => (
//         <Animated.View key={idx} style={[styles.typingDotCircle, { transform: [{ translateY: dot }] }]} />
//       ))}
//     </View>
//   );
// };

// export default function ChatbotScreen({ navigation }) {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const flatListRef = useRef(null);

//   useEffect(() => {
//     setMessages([{ type: 'bot', text: 'Hi, Echo here!!' }]);
//   }, []);

//   const scrollToBottom = () => {
//     flatListRef.current?.scrollToEnd({ animated: true });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, isTyping]);

//   const sendMessage = async () => {
//     if (!userInput.trim()) return;
//     const userMessage = { type: 'user', text: userInput };
//     setMessages(prev => [...prev, userMessage]);
//     setUserInput('');
//     setIsTyping(true);

//     try {
//       const startTime = Date.now();
//       const response = await fetch('http://10.16.63.81:5000/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: userInput })
//       });

//       const data = await response.json();
//       const botReply = data.reply || `Error: ${data.error || 'Unexpected response'}`;
//       const responseTime = ((Date.now() - startTime) / 1000).toFixed(2);

//       setMessages(prev => [...prev, { type: 'bot', text: botReply, responseTime, liked: null }]);
//     } catch (error) {
//       setMessages(prev => [...prev, { type: 'bot', text: '❌ Error reaching server.' }]);
//     }
//     setIsTyping(false);
//   };

//   const handleLikeDislike = (index, type) => {
//     setMessages(prev =>
//       prev.map((msg, i) => (i === index && msg.type === 'bot' ? { ...msg, liked: msg.liked === type ? null : type } : msg))
//     );
//   };

//   const handleLongPressFeedback = (type) => {
//     ToastAndroid.show(type === 'good' ? 'Good response' : 'Bad response', ToastAndroid.SHORT);
//   };

//   const renderMessageText = (text) => {
//     const parts = [];
//     const regex = /```([\s\S]*?)```/g;
//     let lastIndex = 0;
//     let match;

//     while ((match = regex.exec(text)) !== null) {
//       if (match.index > lastIndex) {
//         parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
//       }
//       parts.push({ type: 'code', content: match[1].trim() });
//       lastIndex = regex.lastIndex;
//     }

//     if (lastIndex < text.length) {
//       parts.push({ type: 'text', content: text.slice(lastIndex) });
//     }

//     return parts.map((part, i) => {
//       if (part.type === 'code') {
//         return (
//           <View key={i} style={styles.codeBlockWrapper}>
//             <ScrollView style={styles.codeScrollWrapper} horizontal>
//               <Text selectable style={styles.codeText}>{part.content}</Text>
//             </ScrollView>
//             <TouchableOpacity
//               style={styles.copyButton}
//               onPress={() => {
//                 Clipboard.setStringAsync(part.content);
//                 ToastAndroid.show('Code copied!', ToastAndroid.SHORT);
//               }}
//             >
//               <Ionicons name="copy-outline" size={20} color="#007AFF" />
//             </TouchableOpacity>
//           </View>
//         );
//       }
//       return <Text key={i} style={styles.messageText}>{part.content}</Text>;
//     });
//   };

//   const renderItem = ({ item, index }) => (
//     <View style={[styles.messageRow, { justifyContent: item.type === 'user' ? 'flex-end' : 'flex-start' }]}>
//       <View style={item.type === 'user' ? styles.rightAlign : styles.leftAlign}>
//         <View style={item.type === 'user' ? styles.userBubble : styles.botBubble}>
//           {renderMessageText(item.text)}
//         </View>
//         {item.type === 'bot' && item.responseTime && (
//           <View style={styles.botMessageFooter}>
//             <View style={styles.iconContainer}>
//               <Pressable onPress={() => handleLikeDislike(index, 'up')} onLongPress={() => handleLongPressFeedback('good')} style={styles.footerIconButton}>
//                 <Ionicons name={item.liked === 'up' ? 'thumbs-up' : 'thumbs-up-outline'} size={18} color={'snow'} />
//               </Pressable>
//               <Pressable onPress={() => handleLikeDislike(index, 'down')} onLongPress={() => handleLongPressFeedback('bad')} style={styles.footerIconButton}>
//                 <Ionicons name={item.liked === 'down' ? 'thumbs-down' : 'thumbs-down-outline'} size={18} color={'snow'} />
//               </Pressable>
//               <Text style={styles.responseTimeTextRight}>⏱:{item.responseTime}s</Text>
//             </View>
//           </View>
//         )}
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ImageBackground source={require('../assets/bg1.jpeg')} style={styles.backgroundImage}>
//         <View style={styles.overlay} />
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={28} color="white" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>What can I do for you?</Text>
//         </View>
//         <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//           <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//             <View style={{ flex: 1 }}>
//               <FlatList
//                 ref={flatListRef}
//                 data={messages}
//                 renderItem={renderItem}
//                 keyExtractor={(_, index) => index.toString()}
//                 contentContainerStyle={{ padding: 12, flexGrow: 1 }}
//                 keyboardShouldPersistTaps="handled"
//                 showsVerticalScrollIndicator={false}
//                 onContentSizeChange={scrollToBottom}
//                 ListFooterComponent={isTyping ? (
//                   <View style={[styles.messageRow, { justifyContent: 'flex-start' }]}>
//                     <View style={styles.leftAlign}>
//                       <View style={styles.botBubble}><TypingIndicator /></View>
//                     </View>
//                   </View>
//                 ) : null}
//               />
//               <View style={styles.inputWrapper}>
//                 <View style={styles.inputRow}>
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Ask something..."
//                     value={userInput}
//                     onChangeText={setUserInput}
//                     onSubmitEditing={sendMessage}
//                     returnKeyType="send"
//                   />
//                   <TouchableOpacity onPress={sendMessage} style={styles.iconButton}>
//                     <Ionicons name="send" size={22} color="#007AFF" />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </TouchableWithoutFeedback>
//         </KeyboardAvoidingView>
//       </ImageBackground>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#000' },
//   backgroundImage: { flex: 1 },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     zIndex: 0,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     backgroundColor: 'transparent',
//     zIndex: 10,
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 16,
//   },
//   container: { flex: 1 },
//   messageRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     marginVertical: 4,
//   },
//   leftAlign: {
//     flexDirection: 'column',
//     alignItems: 'flex-start'
//   },
//   rightAlign: { flexDirection: 'row', alignItems: 'flex-end' },
//   userBubble: {
//     backgroundColor: '#DCF8C6',
//     padding: 12,
//     borderRadius: 18,
//     borderBottomRightRadius: 4,
//     maxWidth: '100%',
//   },
//   botBubble: {
//     backgroundColor: '#E5E5EA',
//     padding: 12,
//     borderRadius: 18,
//     borderBottomLeftRadius: 4,
//     maxWidth: '90%',
//     marginLeft: 2,
//   },
//   messageText: { fontSize: 16, color: '#000' },
//   inputWrapper: {
//     paddingHorizontal: 10,
//     paddingBottom: 10,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderRadius: 50,
//     paddingHorizontal: 10,
//     backgroundColor: '#f9f9f9',
//     height: 55,
//   },
//   input: { flex: 1, paddingVertical: 8, paddingHorizontal: 10, fontSize: 16 },
//   iconButton: { padding: 6 },
//   typingContainer: { flexDirection: 'row', alignItems: 'center', height: 20 },
//   typingDotCircle: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: '#555',
//     marginHorizontal: 3,
//   },
//   codeScrollWrapper: {
//     backgroundColor: '#1e1e1e',
//     borderRadius: 8,
//     padding: 12,
//     marginTop: 6,
//     marginBottom: 6,
//     maxWidth: '100%',
//     maxHeight: 300,
//   },
//   codeText: {
//     color: '#f8f8f2',
//     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   codeBlockWrapper: { position: 'relative', marginTop: 6, marginBottom: 6 },
//   copyButton: {
//     position: 'absolute',
//     top: 6,
//     right: 6,
//     padding: 4,
//     backgroundColor: '#ffffffcc',
//     borderRadius: 6,
//     zIndex: 1,
//   },
//   botMessageFooter: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//     width: '99%',
//     paddingLeft: 12,
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//   },
//   footerIconButton: {
//     padding: 4,
//     marginRight: 8,
//   },
//   responseTimeTextRight: {
//     fontSize: 12,
//     color: 'snow',
//     marginLeft: 4,
//     marginRight: 8,
//   },
// });



// working
import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  ScrollView,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import { TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

const TypingIndicator = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot, delay) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: -5,
            duration: 300,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 150);
    animateDot(dot3, 300);
  }, []);

  return (
    <View style={styles.typingContainer}>
      <Animated.View style={[styles.typingDotCircle, { transform: [{ translateY: dot1 }] }]} />
      <Animated.View style={[styles.typingDotCircle, { transform: [{ translateY: dot2 }] }]} />
      <Animated.View style={[styles.typingDotCircle, { transform: [{ translateY: dot3 }] }]} />
    </View>
  );
};

export default function ChatbotScreen({ navigation }) {
  const [messages, setMessages] = useState([{ type: 'bot', text: 'Hi, Echo here!!' }]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [inputBottomMargin, setInputBottomMargin] = useState(10);
  const flatListRef = useRef(null);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => setInputBottomMargin(0));
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => setInputBottomMargin(10));
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { type: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsTyping(true);

    const startTime = Date.now();

    try {
      const response = await fetch('http:// 172.19.211.47:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      const botReply = data.reply || `Error: ${data.error || 'Unexpected response'}`;
      const endTime = Date.now();
      const responseTime = ((endTime - startTime) / 1000).toFixed(2);

      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: botReply, responseTime, liked: null }]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Request failed:', error);
      setMessages(prev => [...prev, { type: 'bot', text: '❌ Error reaching server.' }]);
      setIsTyping(false);
    }
  };

  const handleLikeDislike = (messageIndex, type) => {
    setMessages(prevMessages =>
      prevMessages.map((msg, index) =>
        index === messageIndex && msg.type === 'bot'
          ? { ...msg, liked: msg.liked === type ? null : type }
          : msg
      )
    );
  };

  const handleLongPressFeedback = (feedbackType) => {
    ToastAndroid.show(feedbackType === 'good' ? 'Good response' : 'Bad response', ToastAndroid.SHORT);
  };

  const renderMessageText = (text) => {
    const parts = [];
    const regex = /```([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
      }
      parts.push({ type: 'code', content: match[1].trim() });
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return parts.map((part, index) => {
      if (part.type === 'code') {
        return (
          <View key={index} style={styles.codeBlockWrapper}>
            <ScrollView style={styles.codeScrollWrapper} horizontal>
              <ScrollView style={{ maxHeight: 300 }}>
                <Text selectable style={styles.codeText}>{part.content}</Text>
              </ScrollView>
            </ScrollView>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => {
                Clipboard.setStringAsync(part.content);
                ToastAndroid.show('Code copied!', ToastAndroid.SHORT);
              }}
            >
              <Ionicons name="copy-outline" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
        );
      }
      return <Text key={index} style={styles.messageText}>{part.content}</Text>;
    });
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.messageRow, { justifyContent: item.type === 'user' ? 'flex-end' : 'flex-start' }]}>
      <View style={item.type === 'user' ? styles.rightAlign : styles.leftAlign}>
        <View style={item.type === 'user' ? styles.userBubble : styles.botBubble}>
          {item.type === 'bot' ? renderMessageText(item.text) : <Text style={styles.messageText}>{item.text}</Text>}
        </View>
        {item.type === 'bot' && item.responseTime && (
          <View style={styles.botMessageFooter}>
            <View style={styles.iconContainer}>
              <Pressable onPress={() => handleLikeDislike(index, 'up')} onLongPress={() => handleLongPressFeedback('good')} style={styles.footerIconButton}>
                <Ionicons name={item.liked === 'up' ? 'thumbs-up' : 'thumbs-up-outline'} size={18} color={'snow'} />
              </Pressable>
              <Pressable onPress={() => handleLikeDislike(index, 'down')} onLongPress={() => handleLongPressFeedback('bad')} style={styles.footerIconButton}>
                <Ionicons name={item.liked === 'down' ? 'thumbs-down' : 'thumbs-down-outline'} size={18} color={'snow'} />
              </Pressable>
              <Text style={styles.responseTimeTextRight}>⏱: {item.responseTime}s</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={require('../assets/bg1.jpeg')} style={styles.backgroundImage} imageStyle={{ opacity: 1 }}>
        <View style={styles.overlay} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>What can I do for you?</Text>
        </View>

        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={80}>
          <View style={{ flex: 1 }}>
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={{ padding: 12 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              onContentSizeChange={scrollToBottom}
              ListFooterComponent={
                isTyping && (
                  <View style={[styles.messageRow, { justifyContent: 'flex-start' }]}>
                    <View style={styles.leftAlign}>
                      <View style={styles.botBubble}>
                        <TypingIndicator />
                      </View>
                    </View>
                  </View>
                )
              }
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={[styles.inputWrapper, { paddingBottom: inputBottomMargin }]}>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.input}
                    placeholder="Ask something..."
                    value={userInput}
                    onChangeText={setUserInput}
                    onSubmitEditing={sendMessage}
                    returnKeyType="send"
                  />
                  <TouchableOpacity onPress={sendMessage} style={styles.iconButton}>
                    <Ionicons name="send" size={22} color="#007AFF" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.helperText}>Echo is listening to your query…</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  backgroundImage: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 0 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 14, paddingHorizontal: 16 },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 16 },
  container: { flex: 1 },
  messageRow: { flexDirection: 'row', alignItems: 'flex-end', marginVertical: 4 },
  leftAlign: { flexDirection: 'column', alignItems: 'flex-start' },
  rightAlign: { flexDirection: 'row', alignItems: 'flex-end' },
  userBubble: {
    backgroundColor: '#DCF8C6',
    padding: 12,
    borderRadius: 18,
    borderBottomRightRadius: 4,
    maxWidth: '100%',
    elevation: 2,
  },
  botBubble: {
    backgroundColor: '#E5E5EA',
    padding: 12,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    maxWidth: '90%',
    elevation: 2,
    marginLeft: 2,
  },
  messageText: { fontSize: 16, color: '#000' },
  inputWrapper: { paddingHorizontal: 10, paddingBottom: 10 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    height: 55,
  },
  input: { flex: 1, paddingVertical: 8, paddingHorizontal: 10, fontSize: 16 },
  iconButton: { padding: 6 },
  helperText: { color: 'snow', fontSize: 13, marginTop: 4, paddingLeft: '25%' },
  typingContainer: { flexDirection: 'row', alignItems: 'center', height: 20 },
  typingDotCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#555',
    marginHorizontal: 3,
  },
  codeScrollWrapper: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
    marginBottom: 6,
    maxWidth: '100%',
    maxHeight: 300,
  },
  codeText: {
    color: '#f8f8f2',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 14,
    lineHeight: 20,
  },
  codeBlockWrapper: { position: 'relative', marginTop: 6, marginBottom: 6 },
  copyButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    padding: 4,
    backgroundColor: '#ffffffcc',
    borderRadius: 6,
    zIndex: 1,
  },
  botMessageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    width: '99%',
    paddingLeft: 12,
  },
  iconContainer: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  footerIconButton: { padding: 4, marginRight: 8 },
  responseTimeTextRight: { fontSize: 12, color: 'snow', marginLeft: 4, marginRight: 8 },
});
