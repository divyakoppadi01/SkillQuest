// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   ImageBackground,
// } from 'react-native';
// import LottieView from 'lottie-react-native';

// const { width, height } = Dimensions.get('window');

// export default function GetStartedScreen({ navigation }) {
//   return (
//     <ImageBackground
//       source={require('../assets/botback2.jpeg')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       {/* Semi-transparent overlay for dimming */}
//       <View style={styles.overlay} />

//       <View style={styles.container}>
//         <Text style={styles.intro}>
//           Hi, I am <Text style={styles.highlight}>Echo</Text> 👋
//         </Text>

//         <LottieView
//           source={require('../assets/getbot.json')}
//           autoPlay
//           loop
//           style={styles.lottie}
//         />

//         <Text style={styles.subheading}>
//           Your <Text style={styles.highlight}>AI Assistant</Text>
//         </Text>

//         <Text style={styles.description}>
//           All your questions will be answered{'\n'}
//           by me. Ask here, please!
//         </Text>

//         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chatbot')}>
//           <Text style={styles.buttonText}>Start</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)', 
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   intro: {
//     fontSize: 28,
//     color: '#fff',
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   lottie: {
//     width: width * 0.8,
//     height: height * 0.45,
//   },
//   subheading: {
//     fontSize: 34,
//     fontWeight: '500',
//     color: '#fff',
//     marginTop: 10,
//   },
//   highlight: {
//     color: '#007bff',
//     fontWeight: 'bold',
//   },
//   description: {
//     fontSize: 20,
//     color: '#ccc',
//     textAlign: 'center',
//     marginTop: 20,
//     lineHeight: 28,
//   },
//   button: {
//     marginTop: 35,
//     backgroundColor: '#007bff',
//     paddingVertical: 14,
//     paddingHorizontal: 40,
//     borderRadius: 30,
//     width:120,
//   },
//   buttonText: {
//     fontSize: 20,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });





// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   ImageBackground,
// } from 'react-native';
// import LottieView from 'lottie-react-native';
// import ChatbotScreen from '../ChatbotScreen'; // ✅ Import ChatbotScreen

// const { width, height } = Dimensions.get('window');

// export default function GetStartedScreen() {
//   const [started, setStarted] = useState(false); // ✅ State to switch screen

//   if (started) {
//     return <ChatbotScreen />; // ✅ Show chatbot if started
//   }

//   return (
//     <ImageBackground
//       source={require('../assets/botback2.jpeg')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       {/* Overlay */}
//       <View style={styles.overlay} />

//       <View style={styles.container}>
//         <Text style={styles.intro}>
//           Hi, I am <Text style={styles.highlight}>Echo</Text> 👋
//         </Text>

//         <LottieView
//           source={require('../assets/getbot.json')}
//           autoPlay
//           loop
//           style={styles.lottie}
//         />

//         <Text style={styles.subheading}>
//           Your <Text style={styles.highlight}>AI Assistant</Text>
//         </Text>

//         <Text style={styles.description}>
//           All your questions will be answered{'\n'}
//           by me. Ask here, please!
//         </Text>

//         {/* ✅ Set started to true */}
//         <TouchableOpacity style={styles.button} onPress={() => setStarted(true)}>
//           <Text style={styles.buttonText}>Start</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   intro: {
//     fontSize: 28,
//     color: '#fff',
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   lottie: {
//     width: width * 0.8,
//     height: height * 0.45,
//   },
//   subheading: {
//     fontSize: 34,
//     fontWeight: '500',
//     color: '#fff',
//     marginTop: 10,
//   },
//   highlight: {
//     color: '#007bff',
//     fontWeight: 'bold',
//   },
//   description: {
//     fontSize: 20,
//     color: '#ccc',
//     textAlign: 'center',
//     marginTop: 20,
//     lineHeight: 28,
//   },
//   button: {
//     marginTop: 35,
//     backgroundColor: '#007bff',
//     paddingVertical: 14,
//     paddingHorizontal: 40,
//     borderRadius: 30,
//     width: 120,
//   },
//   buttonText: {
//     fontSize: 20,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });



// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   ImageBackground,
// } from 'react-native';
// import LottieView from 'lottie-react-native';

// const { width, height } = Dimensions.get('window');

// export default function GetStartedScreen({ navigation }) {
//   const handleStartPress = () => {
//     navigation.navigate('ChatbotMain');
//   };

//   return (
//     <ImageBackground
//       source={require('../assets/botback2.jpeg')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay} />

//       <View style={styles.container}>
//         <Text style={styles.intro}>
//           Hi, I am <Text style={styles.highlight}>Echo</Text> 👋
//         </Text>

//         <LottieView
//           source={require('../assets/getbot.json')}
//           autoPlay
//           loop
//           style={styles.lottie}
//         />

//         <Text style={styles.subheading}>
//           Your <Text style={styles.highlight}>AI Assistant</Text>
//         </Text>

//         <Text style={styles.description}>
//           All your questions will be answered{'\n'}
//           by me. Ask here, please!
//         </Text>

//         <TouchableOpacity style={styles.button} onPress={handleStartPress}>
//           <Text style={styles.buttonText}>Start</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   intro: {
//     fontSize: 28,
//     color: '#fff',
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   lottie: {
//     width: width * 0.8,
//     height: height * 0.45,
//   },
//   subheading: {
//     fontSize: 34,
//     fontWeight: '500',
//     color: '#fff',
//     marginTop: 10,
//   },
//   highlight: {
//     color: '#007bff',
//     fontWeight: 'bold',
//   },
//   description: {
//     fontSize: 20,
//     color: '#ccc',
//     textAlign: 'center',
//     marginTop: 20,
//     lineHeight: 28,
//   },
//   button: {
//     marginTop: 35,
//     backgroundColor: '#007bff',
//     paddingVertical: 14,
//     paddingHorizontal: 40,
//     borderRadius: 30,
//     width: 120,
//   },
//   buttonText: {
//     fontSize: 20,
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });











// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   ImageBackground,
// } from 'react-native';
// import LottieView from 'lottie-react-native';

// const { width, height } = Dimensions.get('window');

// export default function GetStartedScreen({ navigation }) {
//   const handleStartPress = () => {
//     navigation.navigate('ChatbotMain');
//   };

//   return (
//     <ImageBackground
//       source={require('../assets/botback2.jpeg')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay} />

//       <View style={styles.container}>
//         <Text style={styles.intro}>
//           Hi, I am <Text style={styles.highlight}>Echo</Text> 👋
//         </Text>

//         <LottieView
//           source={require('../assets/getbot.json')}
//           autoPlay
//           loop
//           style={styles.lottie}
//         />

//         <Text style={styles.subheading}>
//           Your <Text style={styles.highlight}>AI Assistant</Text>
//         </Text>

//         <Text style={styles.description}>
//           All your questions will be answered{'\n'}
//           by me. Ask here, please!
//         </Text>

//         <TouchableOpacity style={styles.button} onPress={handleStartPress}>
//           <Text style={styles.buttonText}>Start</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   intro: {
//     fontSize: 28,
//     color: '#fff',
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   lottie: {
//     width: width * 0.8,
//     height: height * 0.45,
//   },
//   subheading: {
//     fontSize: 34,
//     fontWeight: '500',
//     color: '#fff',
//     marginTop: 10,
//   },
//   highlight: {
//     color: '#007bff',
//     fontWeight: 'bold',
//   },
//   description: {
//     fontSize: 20,
//     color: '#ccc',
//     textAlign: 'center',
//     marginTop: 20,
//     lineHeight: 28,
//   },
//   button: {
//     marginTop: 35,
//     backgroundColor: '#007bff',
//     paddingVertical: 14,
//     paddingHorizontal: 40,
//     borderRadius: 30,
//     width: 120,
//   },
//   buttonText: {
//     fontSize: 20,
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });



import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

export default function GetStartedScreen({ navigation }) {
  const handleStartPress = () => {
    navigation.navigate('ChatbotMain');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../assets/botback2.jpeg')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <View style={styles.container}>
          <Text style={styles.intro}>
            Hi, I am <Text style={styles.highlight}>Echo</Text> 👋
          </Text>

          <LottieView
            source={require('../assets/getbot.json')}
            autoPlay
            loop
            style={styles.lottie}
          />

          <Text style={styles.subheading}>
            Your <Text style={styles.highlight}>AI Assistant</Text>
          </Text>

          <Text style={styles.description}>
            All your questions will be answered{'\n'}
            by me. Ask here, please!
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleStartPress}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', // fallback behind ImageBackground
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'android' ? 30 : 20,
  },
  intro: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 10,
  },
  lottie: {
    width: width * 0.8,
    height: height * 0.45,
  },
  subheading: {
    fontSize: 34,
    fontWeight: '500',
    color: '#fff',
    marginTop: 10,
  },
  highlight: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 20,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 28,
  },
  button: {
    marginTop: 35,
    backgroundColor: '#007bff',
    paddingVertical: 1,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: 140,
    height:40,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    alignItems:'center',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
