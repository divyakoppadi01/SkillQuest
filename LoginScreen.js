import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Dimensions,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';

const { height } = Dimensions.get('window');

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotVisible, setForgotVisible] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    fetch('http:// 172.19.211.47:3002/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          Alert.alert('Welcome Back!', 'Login Successful');
          setIsLoggedIn(true);
        } else {
          Alert.alert('Login Failed', data.message || 'Invalid email or password');
        }
      })
      .catch(err => {
        console.error('Login error:', err);
        Alert.alert('Error', 'Failed to login');
      });
  };

  const handleForgotPassword = () => {
    if (!recoveryEmail) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    fetch('http:// 172.19.211.47:3002/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: recoveryEmail }),
    })
      .then(res => res.json())
      .then(data => {
        Alert.alert('Success', data.message);
        setForgotVisible(false);
        setRecoveryEmail('');
      })
      .catch(err => {
        console.error('Forgot password error:', err);
        Alert.alert('Error', 'Failed to send reset link');
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {/* Static Top Animation */}
        <LinearGradient colors={['#8B5CF6', '#3B82F6']} style={styles.animationContainer}>
          <LottieView
            source={require('../assets/animations/LoginAnimation.json')}
            autoPlay={false}
            loop={false}
            progress={0}
            style={styles.animation}
          />
        </LinearGradient>

        {/* Animated Form Section */}
        <Animatable.View animation="fadeInUp" delay={200} style={styles.form}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <TextInput
              style={styles.input}
              placeholder="Email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? 'eye-off' : 'eye'} size={22} color="#777" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setForgotVisible(true)}>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login Now →</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.link}>New Here? Sign Up</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animatable.View>

        {/* Forgot Password Modal */}
        <Modal visible={forgotVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Reset Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your registered email"
                value={recoveryEmail}
                onChangeText={setRecoveryEmail}
                keyboardType="email-address"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={handleForgotPassword}>
                  <Text style={styles.buttonText}>Send Link</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                  onPress={() => setForgotVisible(false)}
                >
                  <Text style={{ color: '#000', fontSize: 18 }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  animationContainer: {
    height: height * 0.44,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: '100%',
    height: '80%',
  },
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
    marginBottom: 15,
    marginTop:20,
    fontSize: 18,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#aaa',
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 8,
  },
  forgot: {
    textAlign: 'right',
    color: '#1E90FF',
    fontSize: 17,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#1E90FF',
    fontSize: 17,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 5,
  },
});
