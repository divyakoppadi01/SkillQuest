// import React, { useState, useEffect } from 'react';
// import { LinearGradient } from 'expo-linear-gradient';

// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Dimensions,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import LottieView from 'lottie-react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import axios from 'axios';

// const { height } = Dimensions.get('window');

// export default function SignupScreen({ navigation }) {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [enteredOtp, setEnteredOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [resendTimer, setResendTimer] = useState(0);

//   // Start countdown
//   useEffect(() => {
//     let interval = null;
//     if (resendTimer > 0) {
//       interval = setInterval(() => {
//         setResendTimer((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [resendTimer]);

//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const isStrongPassword = (password) =>
//     password.length >= 6 &&
//     /[A-Z]/.test(password) &&
//     /[a-z]/.test(password) &&
//     /\d/.test(password);
//   const sendOtp = async () => {
//   if (!name || !age || !email) {
//     Alert.alert('Missing Fields', 'Please fill in all the fields before sending OTP');
//     return;
//   }

//   if (!email.endsWith('@gmail.com')) {
//     Alert.alert('Invalid Email', 'Email must end with @gmail.com');
//     return;
//   }

//   if (!isValidEmail(email)) {
//     Alert.alert('Invalid Email', 'Please enter a valid email address');
//     return;
//   }

//   try {
//     const response = await axios.post('http://10.16.58.251:3000/send-otp', { email });
//     if (response.data.success) {
//       Alert.alert('Success', `OTP sent to ${email}`);
//       setOtpSent(true);
//       setResendTimer(30); // Start countdown
//     } else {
//       Alert.alert('Failed', response.data.message || 'Could not send OTP');
//     }
//   } catch (error) {
//     Alert.alert('Error', 'Something went wrong while sending OTP');
//     console.error('OTP Error:', error.message);
//   }
// };


//   const verifyOtp = async () => {
//     if (!enteredOtp || !email) {
//       Alert.alert('Error', 'Please enter both email and OTP');
//       return;
//     }

//     try {
//       const response = await axios.post('http://10.16.58.251:3000/verify-otp', {
//         email,
//         otp: enteredOtp,
//       });

//       if (response.data.success) {
//         setIsOtpVerified(true);
//         Alert.alert('Success', 'OTP verified!');
//       } else {
//         setIsOtpVerified(false);
//         Alert.alert('Incorrect OTP', response.data.message || 'OTP is incorrect');
//       }
//     } catch (error) {
//       setIsOtpVerified(false);
//       Alert.alert('Error', 'Could not verify OTP');
//     }
//   };

//   const handleSignup = async () => {
//     if (!name || !age || !email) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }

//     if (isNaN(age) || age <= 0 || age > 120) {
//       Alert.alert('Error', 'Please enter a valid age');
//       return;
//     }

//     if (!isValidEmail(email)) {
//       Alert.alert('Error', 'Invalid email address');
//       return;
//     }

//     if (!isStrongPassword(password)) {
//       Alert.alert('Error', 'Password must be strong (Upper, Lower, Number, 6+ chars)');
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     if (!isOtpVerified) {
//       Alert.alert('Error', 'Please verify the OTP before signing up');
//       return;
//     }

//     try {
//       const response = await fetch('http://10.16.58.251:3002/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         // body: JSON.stringify({ name, age, email, password }),
//         body: JSON.stringify({ name, age, email, password, profileImage: 'assets/placeholder.png' }),

//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert('Success', 'Account created successfully!');
//         navigation.navigate('Login');
//       } else {
//         Alert.alert('Signup Failed', data.message || 'Something went wrong');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Could not create account');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//   colors={['#8B5CF6', '#3B82F6']}
//   style={styles.animationContainer}
// >
//   <LottieView
//     source={require('../assets/animations/SignupAnimation.json')}
//     autoPlay
//     loop
//     style={styles.animation}
//   />
// </LinearGradient>


//       <Animatable.View animation="fadeInUp" delay={200} style={styles.form}>
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//           style={{ flex: 1 }}
//         >
//           <ScrollView showsVerticalScrollIndicator={false}>
//             <TextInput
//               style={styles.input}
//               placeholder="Full Name"
//               value={name}
//               onChangeText={setName}
//             />

//             <TextInput
//               style={styles.input}
//               placeholder="Age"
//               value={age}
//               onChangeText={setAge}
//               keyboardType="numeric"
//             />

//             <TextInput
//               style={styles.input}
//               placeholder="Email Address"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//             />

//             {/* Send + Resend OTP Buttons */}
//             <View style={styles.otpRow}>
//               {/* <TouchableOpacity style={styles.otpButtonHalf} onPress={sendOtp}>
//                 <Text style={styles.otpButtonText}>Send OTP</Text>
//               </TouchableOpacity> */}
//               <TouchableOpacity
//   style={[
//     styles.otpButtonHalf,
//     otpSent && { backgroundColor: '#ccc' },
//   ]}
//   onPress={!otpSent ? sendOtp : null}
//   disabled={otpSent}
// >
//   <Text style={styles.otpButtonText}>Send OTP</Text>
// </TouchableOpacity>


//               <TouchableOpacity
//                 style={[
//                   styles.otpButtonHalf,
//                   resendTimer > 0 && { backgroundColor: '#ccc' },
//                 ]}
//                 onPress={resendTimer === 0 ? sendOtp : null}
//                 disabled={resendTimer > 0}
//               >
//                 <Text style={styles.otpButtonText}>
//                   {resendTimer > 0 ? `Resend OTP (${resendTimer}s)` : 'Resend OTP'}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             {otpSent && (
//               <>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter OTP"
//                   value={enteredOtp}
//                   onChangeText={setEnteredOtp}
//                   keyboardType="numeric"
//                 />
//                 <TouchableOpacity style={styles.otpButton} onPress={verifyOtp}>
//                   <Text style={styles.otpButtonText}>Verify OTP</Text>
//                 </TouchableOpacity>
//               </>
//             )}

//             <View style={styles.passwordContainer}>
//               <TextInput
//                 style={styles.passwordInput}
//                 placeholder="Create a Password"
//                 secureTextEntry={!showPassword}
//                 value={password}
//                 onChangeText={setPassword}
//               />
//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                 <Icon name={showPassword ? 'eye-off' : 'eye'} size={22} color="#777" />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.passwordContainer}>
//               <TextInput
//                 style={styles.passwordInput}
//                 placeholder="Confirm Password"
//                 secureTextEntry={!showConfirmPassword}
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//               />
//               <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
//                 <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={22} color="#777" />
//               </TouchableOpacity>
//             </View>

//             <TouchableOpacity
//               style={[styles.button, { opacity: isOtpVerified ? 1 : 0.5 }]}
//               onPress={handleSignup}
//               disabled={!isOtpVerified}
//             >
//               <Text style={styles.buttonText}>Get Set to Explore →</Text>
//             </TouchableOpacity>

//             <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//               <Text style={styles.link}>Already a Member? Login Now</Text>
//             </TouchableOpacity>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </Animatable.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   animationContainer: {
//     height: height * 0.4,
//     backgroundColor: '#1E90FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   animation: { height: '100%', width: '100%' },
//   form: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     marginTop: -20,
//   },
//   input: {
//     borderBottomWidth: 2,
//     borderBottomColor: '#aaa',
//     fontSize: 18,
//     marginBottom: 18,
//     paddingVertical: 9,
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     borderBottomWidth: 2,
//     borderBottomColor: '#aaa',
//     alignItems: 'center',
//     marginBottom: 18,
//   },
//   passwordInput: { flex: 1, fontSize: 18, paddingVertical: 8 },
//   button: {
//     backgroundColor: '#1E90FF',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginVertical: 12,
//   },
//   buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
//   link: {
//     color: '#1E90FF',
//     fontSize: 16,
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   otpButton: {
//     backgroundColor: '#1E90FF',
//     paddingVertical: 8,
//     alignItems: 'center',
//     borderRadius: 6,
//     marginBottom: 12,
//   },
//   otpButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   otpRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//     gap: 10,
//   },
//   otpButtonHalf: {
//     flex: 1,
//     backgroundColor: '#1E90FF',
//     paddingVertical: 9,
//     alignItems: 'center',
//     borderRadius: 6,
//   },
// });

import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const { height } = Dimensions.get('window');

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isStrongPassword = (password) =>
    password.length >= 6 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password);

  const sendOtp = async () => {
    if (!name || !age || !email) {
      Alert.alert('Missing Fields', 'Please fill in all the fields before sending OTP');
      return;
    }

    if (!email.endsWith('@gmail.com')) {
      Alert.alert('Invalid Email', 'Email must end with @gmail.com');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    try {
      const response = await axios.post('http:// 172.19.211.47:3000/send-otp', { email });
      if (response.data.success) {
        Alert.alert('Success', `OTP sent to ${email}`);
        setOtpSent(true);
        setResendTimer(30);
      } else {
        Alert.alert('Failed', response.data.message || 'Could not send OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while sending OTP');
    }
  };

  const verifyOtp = async () => {
    if (!enteredOtp || !email) {
      Alert.alert('Error', 'Please enter both email and OTP');
      return;
    }

    try {
      const response = await axios.post('http:// 172.19.211.47:3000/verify-otp', {
        email,
        otp: enteredOtp,
      });

      if (response.data.success) {
        setIsOtpVerified(true);
        Alert.alert('Success', 'OTP verified!');
      } else {
        setIsOtpVerified(false);
        Alert.alert('Incorrect OTP', response.data.message || 'OTP is incorrect');
      }
    } catch (error) {
      setIsOtpVerified(false);
      Alert.alert('Error', 'Could not verify OTP');
    }
  };

  const handleSignup = async () => {
    if (!name || !age || !email) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (isNaN(age) || age <= 0 || age > 120) {
      Alert.alert('Error', 'Please enter a valid age');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Invalid email address');
      return;
    }

    if (!isStrongPassword(password)) {
      Alert.alert('Error', 'Password must be strong (Upper, Lower, Number, 6+ chars)');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!isOtpVerified) {
      Alert.alert('Error', 'Please verify the OTP before signing up');
      return;
    }

    try {
      const response = await fetch('http:// 172.19.211.47:3002/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          age,
          email,
          password,
          profileImage: 'assets/placeholder.png',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Signup Failed', data.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not create account');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <LinearGradient colors={['#8B5CF6', '#3B82F6']} style={styles.animationContainer}>
          <LottieView
            source={require('../assets/animations/SignupAnimation.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </LinearGradient>

        <Animatable.View animation="fadeInUp" delay={200} style={styles.form}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Age"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <View style={styles.otpRow}>
              <TouchableOpacity
                style={[styles.otpButtonHalf, otpSent && { backgroundColor: '#ccc' }]}
                onPress={!otpSent ? sendOtp : null}
                disabled={otpSent}
              >
                <Text style={styles.otpButtonText}>Send OTP</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.otpButtonHalf, resendTimer > 0 && { backgroundColor: '#ccc' }]}
                onPress={resendTimer === 0 ? sendOtp : null}
                disabled={resendTimer > 0}
              >
                <Text style={styles.otpButtonText}>
                  {resendTimer > 0 ? `Resend OTP (${resendTimer}s)` : 'Resend OTP'}
                </Text>
              </TouchableOpacity>
            </View>

            {otpSent && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Enter OTP"
                  value={enteredOtp}
                  onChangeText={setEnteredOtp}
                  keyboardType="numeric"
                />
                <TouchableOpacity style={styles.otpButton} onPress={verifyOtp}>
                  <Text style={styles.otpButtonText}>Verify OTP</Text>
                </TouchableOpacity>
              </>
            )}

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Create a Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? 'eye-off' : 'eye'} size={22} color="#777" />
              </TouchableOpacity>
            </View>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={22} color="#777" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.button, { opacity: isOtpVerified ? 1 : 0.5 }]}
              onPress={handleSignup}
              disabled={!isOtpVerified}
            >
              <Text style={styles.buttonText}>Get Set to Explore →</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Already a Member? Login Now</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animatable.View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  animationContainer: {
    height: height * 0.4,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: { height: '100%', width: '100%' },
  form: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#aaa',
    fontSize: 18,
    marginBottom: 18,
    paddingVertical: 9,
    marginTop:10,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#aaa',
    alignItems: 'center',
    marginBottom: 18,
  },
  passwordInput: { flex: 1, fontSize: 18, paddingVertical: 8 },
  button: {
    backgroundColor: '#1E90FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 12,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  link: {
    color: '#1E90FF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  otpButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 12,
  },
  otpButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 10,
  },
  otpButtonHalf: {
    flex: 1,
    backgroundColor: '#1E90FF',
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 6,
  },
});
