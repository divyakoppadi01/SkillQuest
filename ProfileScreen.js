// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   LayoutAnimation,
//   Platform,
//   UIManager,
//   ScrollView,
//   Alert,
//   Image,
//   TextInput,
//   Dimensions,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import * as ImagePicker from 'expo-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Swiper from 'react-native-swiper';

// const { width } = Dimensions.get('window');

// if (Platform.OS === 'android') {
//   UIManager.setLayoutAnimationEnabledExperimental &&
//     UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// export default function ProfileScreen({ setIsLoggedIn }) {
//   const [userData, setUserData] = useState({ name: '', email: '', age: '' });
//   const [expanded, setExpanded] = useState(false);
//   const [passwordExpanded, setPasswordExpanded] = useState(false);
//   const [certificatesExpanded, setCertificatesExpanded] = useState(false);
//   const [imageUri, setImageUri] = useState(null);

//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const [showOldPassword, setShowOldPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const certificates = [
//     { id: 1, title: 'Introduction to AI - NPTEL' },
//     { id: 2, title: 'Web Development Internship - Coginfyz' },
//     { id: 3, title: 'Java Programming Fundamentals - Udemy' },
//   ];

//   // useEffect(() => {
//   //   const loadData = async () => {
//   //     try {
//   //       const savedImageUri = await AsyncStorage.getItem('profileImageUri');
//   //       if (savedImageUri) setImageUri(savedImageUri);

//   //       const response = await fetch('http://192.168.137.115:3002/get-profile');
//   //       const data = await response.json();
//   //       setUserData(data);
//   //     } catch (err) {
//   //       Alert.alert('Error', 'Failed to load profile');
//   //       console.error(err);
//   //     }
//   //   };

//   //   loadData();
//   // }, []);
//   useEffect(() => {
//   const loadData = async () => {
//     try {
//       const savedImageUri = await AsyncStorage.getItem('profileImageUri');
//       if (savedImageUri) setImageUri(savedImageUri);

//       const response = await fetch('http://192.168.225.47:3002/get-profile');
//       const data = await response.json();
//       setUserData(data);

//       // Simulated notification
//       // Alert.alert('Login Successful', `Welcome back, ${data.name || 'user'}!`);
//     } catch (err) {
//       Alert.alert('Error', 'Failed to load profile');
//       console.error(err);
//     }
//   };

//   loadData();
// }, []);


//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//       allowsEditing: true,
//       aspect: [1, 1],
//     });

//     if (!result.canceled) {
//       const uri = result.assets[0].uri;
//       setImageUri(uri);
//       await AsyncStorage.setItem('profileImageUri', uri);
//     }
//   };

//   const handleChangePassword = async () => {
//     if (!oldPassword || !newPassword || !confirmPassword) {
//       Alert.alert('All fields are required');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       Alert.alert('New password and confirm password do not match');
//       return;
//     }

//     try {
//       const response = await fetch('http://192.168.225.47:3002/change-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: userData.email,
//           oldPassword,
//           newPassword,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         Alert.alert('Success', data.message);
//         setOldPassword('');
//         setNewPassword('');
//         setConfirmPassword('');
//       } else {
//         Alert.alert('Error', data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Error', 'Something went wrong');
//     }
//   };

//   const confirmLogout = () => {
//     Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Logout',
//         style: 'destructive',
//         onPress: () => setIsLoggedIn(false),
//       },
//     ]);
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#f0f4f8' }}>
//       {/* Static header */}
//       {/* <View style={styles.stickyHeader}>
//         <Text style={styles.pageHeaderText}>My Profile</Text>
//       </View> */}
//       <View style={styles.stickyHeader}>
//   <Text style={styles.pageHeaderText}>My Profile</Text>
//   <TouchableOpacity style={styles.notificationIcon} onPress={() => Alert.alert('Notifications', 'You are logged in!')}>
//     <Icon name="bell-outline" size={24} color="#333" />
//   </TouchableOpacity>
// </View>


//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.profileSection}>
//           <View style={styles.imageWrapper}>
//             {/* <Image
//               source={
//                 imageUri
//                   ? { uri: imageUri }
//                   : userData.imageUrl
//                   ? { uri: userData.imageUrl }
//                   : require('../assets/profile_placeholder.png')
//               }
//               style={styles.profileImage}
//             /> */}
//             <Image
//   source={
//     imageUri
//       ? { uri: imageUri }
//       : userData.profileImage?.startsWith('http') || userData.profileImage?.startsWith('file')
//       ? { uri: userData.profileImage }
//       : require('../assets/profile_placeholder.png')
//   }
//   style={styles.profileImage}
// />

//             <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
//               <Icon name="pencil" size={20} color="#fff" />
//             </TouchableOpacity>
//           </View>
//           <Text style={styles.userName}>{userData.name}</Text>
//         </View>

//         <Text style={styles.sectionTitle}>Account</Text>
//         <View style={styles.card}>
//           <TouchableOpacity
//             onPress={() => {
//               LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//               setExpanded(!expanded);
//             }}
//             style={styles.header}
//           >
//             <View style={styles.headerWithIcon}>
//               <Icon name="account-circle" size={24} color="#000" style={{ marginRight: 8 }} />
//               <Text style={styles.title}>Account Information</Text>
//             </View>
//             <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={28} color="#000" />
//           </TouchableOpacity>

//           {expanded && (
//             <View style={styles.infoContainer}>
//               <View style={styles.infoRow}>
//                 <Text style={styles.label}>Name:</Text>
//                 <Text style={styles.value}>{userData.name}</Text>
//               </View>
//               <View style={styles.infoRow}>
//                 <Text style={styles.label}>Email:</Text>
//                 <Text style={styles.value}>{userData.email}</Text>
//               </View>
//               <View style={styles.infoRow}>
//                 <Text style={styles.label}>Age:</Text>
//                 <Text style={styles.value}>{userData.age}</Text>
//               </View>
//             </View>
//           )}
//         </View>

//         <Text style={styles.sectionTitle}>Security</Text>
//         <View style={styles.card}>
//           <TouchableOpacity
//             onPress={() => {
//               LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//               setPasswordExpanded(!passwordExpanded);
//             }}
//             style={styles.header}
//           >
//             <View style={styles.headerWithIcon}>
//               <Icon name="lock-reset" size={24} color="#000" style={{ marginRight: 8 }} />
//               <Text style={styles.title}>Change Password</Text>
//             </View>
//             <Icon name={passwordExpanded ? 'chevron-up' : 'chevron-down'} size={28} color="#000" />
//           </TouchableOpacity>

//           {passwordExpanded && (
//             <View style={styles.infoContainer}>
//               {[{
//                 value: oldPassword,
//                 setValue: setOldPassword,
//                 placeholder: 'Old Password',
//                 show: showOldPassword,
//                 setShow: setShowOldPassword
//               }, {
//                 value: newPassword,
//                 setValue: setNewPassword,
//                 placeholder: 'New Password',
//                 show: showNewPassword,
//                 setShow: setShowNewPassword
//               }, {
//                 value: confirmPassword,
//                 setValue: setConfirmPassword,
//                 placeholder: 'Confirm Password',
//                 show: showConfirmPassword,
//                 setShow: setShowConfirmPassword
//               }].map((field, idx) => (
//                 <View key={idx} style={styles.passwordInputContainer}>
//                   <TextInput
//                     placeholder={field.placeholder}
//                     secureTextEntry={!field.show}
//                     style={styles.passwordInput}
//                     value={field.value}
//                     onChangeText={field.setValue}
//                   />
//                   <TouchableOpacity
//                     style={styles.eyeIcon}
//                     onPress={() => field.setShow(!field.show)}
//                   >
//                     <Icon name={field.show ? 'eye-off' : 'eye'} size={22} color="#555" />
//                   </TouchableOpacity>
//                 </View>
//               ))}
//               <TouchableOpacity style={styles.updateButton} onPress={handleChangePassword}>
//                 <Text style={styles.updateButtonText}>Update Password</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//         <Text style={styles.sectionTitle}>Learning</Text>
//         <View style={styles.card}>
//           <TouchableOpacity
//             onPress={() => {
//               LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//               setCertificatesExpanded(!certificatesExpanded);
//             }}
//             style={styles.header}
//           >
//             <View style={styles.headerWithIcon}>
//               <Icon name="certificate" size={24} color="#000" style={{ marginRight: 8 }} />
//               <Text style={styles.title}>My Certificates</Text>
//             </View>
//             <Icon
//               name={certificatesExpanded ? 'chevron-up' : 'chevron-down'}
//               size={28}
//               color="#000"
//             />
//           </TouchableOpacity>

//           {certificatesExpanded && (
//             <View style={{ height: 170 }}>
//               <Swiper showsButtons={false} autoplay={false} showsPagination={false}>
//                 {certificates.map((item) => (
//                   <View key={item.id} style={styles.slide}>
//                     <Icon name="school" size={20} color="#007BFF" style={{ marginRight: 8 }} />
//                     <Text style={styles.certificateText}>{item.title}</Text>
//                   </View>
//                 ))}
//               </Swiper>
//             </View>
//           )}
//         </View>

//         <Text style={styles.sectionTitle}>Others</Text>
//         <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
//           <Icon name="logout" size={20} color="#fff" style={{ marginRight: 8 }} />
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>

//         <Text style={styles.footerText}>© 2023 AI Learning Education. All rights reserved.</Text>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   stickyHeader: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     paddingTop: 30,
//     paddingBottom: 12,
//     paddingHorizontal: 24,
//     zIndex: 10,
//     backgroundColor: '#f0f4f8',
//   },
//   container: {
//     padding: 24,
//     backgroundColor: '#f0f4f8',
//     flexGrow: 1,
//     marginTop: 65,
//     alignItems: 'center',
//   },
//   notificationIcon: {
//   position: 'absolute',
//   right: 24,
//   top: 35,
//   padding: 4,
//   zIndex: 20,
// },

//   pageHeaderText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   profileSection: {
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   imageWrapper: {
//     position: 'relative',
//   },
//   profileImage: {
//     width: 110,
//     height: 110,
//     borderRadius: 55,
//     backgroundColor: '#ccc',
//     marginBottom: 5,
//     resizeMode: 'cover',
//   },
//   editIcon: {
//     position: 'absolute',
//     right: 0,
//     bottom: 0,
//     backgroundColor: '#1E90FF',
//     padding: 6,
//     borderRadius: 20,
//     borderWidth: 2,
//     borderColor: '#fff',
//   },
//   userName: {
//     fontSize: 23,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   sectionTitle: {
//     fontSize: 21,
//     fontWeight: '600',
//     alignSelf: 'flex-start',
//     marginTop: -10,
//     marginBottom: 6,
//     color: '#222',
//   },
//   card: {
//     width: '104%',
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     paddingVertical: 16,
//     paddingHorizontal: 18,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 10,
//     elevation: 3,
//     marginBottom: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   headerWithIcon: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   title: {
//     fontWeight: '600',
//     fontSize: 19,
//     color: '#000',
//   },
//   infoContainer: {
//     marginTop: 12,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   label: {
//     fontWeight: 'bold',
//     width: 80,
//     marginTop: 5,
//     fontSize: 16,
//     color: '#555',
//   },
//   value: {
//     color: '#333',
//     marginTop: 5,
//     fontSize: 16,
//   },
//   passwordInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 7,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//   },
//   passwordInput: {
//     flex: 1,
//     height: 42,
//     fontSize: 16,
//     color: '#333',
//   },
//   eyeIcon: {
//     padding: 6,
//   },
//   updateButton: {
//     marginTop: 12,
//     backgroundColor: '#1E90FF',
//     paddingVertical: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   updateButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   slide: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#eef6fd',
//     borderRadius: 12,
//     paddingHorizontal: 20,
//     paddingVertical: 72,
//     margin: 6,
//     marginHorizontal: 15,
//   },
//   certificateText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#007BFF',
//   },
//   logoutButton: {
//     flexDirection: 'row',
//     backgroundColor: '#FF4D4D',
//     paddingVertical: 14,
//     paddingHorizontal: 24,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '104%',
//     marginBottom: 15,
//   },
//   logoutText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 18,
//   },
//   footerText: {
//     fontSize: 15,
//     color: '#888',
//     marginBottom: 85,
//   },
// });

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   LayoutAnimation,
//   Platform,
//   UIManager,
//   ScrollView,
//   Alert,
//   Image,
//   TextInput,
//   Dimensions,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import * as ImagePicker from 'expo-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Swiper from 'react-native-swiper';

// const { width } = Dimensions.get('window');

// if (Platform.OS === 'android') {
//   UIManager.setLayoutAnimationEnabledExperimental &&
//     UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// export default function ProfileScreen({ setIsLoggedIn }) {
//   const [userData, setUserData] = useState({ name: '', email: '', age: '' });
//   const [expanded, setExpanded] = useState(false);
//   const [passwordExpanded, setPasswordExpanded] = useState(false);
//   const [certificatesExpanded, setCertificatesExpanded] = useState(false);
//   const [imageUri, setImageUri] = useState(null);

//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const [showOldPassword, setShowOldPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const certificates = [
//     { id: 1, title: 'Introduction to AI - NPTEL' },
//     { id: 2, title: 'Web Development Internship - Coginfyz' },
//     { id: 3, title: 'Java Programming Fundamentals - Udemy' },
//   ];

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const savedImageUri = await AsyncStorage.getItem('profileImageUri');
//         if (savedImageUri) setImageUri(savedImageUri);

//         const response = await fetch('http://192.168.188.47:3002/get-profile');
//         const data = await response.json();
//         setUserData(data);
//       } catch (err) {
//         Alert.alert('Error', 'Failed to load profile');
//         console.error(err);
//       }
//     };

//     loadData();
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//       allowsEditing: true,
//       aspect: [1, 1],
//     });

//     if (!result.canceled) {
//       const uri = result.assets[0].uri;
//       setImageUri(uri);
//       await AsyncStorage.setItem('profileImageUri', uri);
//     }
//   };

//   const handleRemoveImage = async () => {
//     setImageUri(null);
//     await AsyncStorage.removeItem('profileImageUri');
//   };

//   const handleChangePassword = async () => {
//     if (!oldPassword || !newPassword || !confirmPassword) {
//       Alert.alert('All fields are required');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       Alert.alert('New password and confirm password do not match');
//       return;
//     }

//     try {
//       const response = await fetch('http://192.168.188.47:3002/change-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: userData.email,
//           oldPassword,
//           newPassword,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         Alert.alert('Success', data.message);
//         setOldPassword('');
//         setNewPassword('');
//         setConfirmPassword('');
//       } else {
//         Alert.alert('Error', data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Error', 'Something went wrong');
//     }
//   };

//   const confirmLogout = () => {
//     Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Logout',
//         style: 'destructive',
//         onPress: () => setIsLoggedIn(false),
//       },
//     ]);
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#f0f4f8' }}>
//       <View style={styles.stickyHeader}>
//         <Text style={styles.pageHeaderText}>My Profile</Text>
//         <TouchableOpacity
//           style={styles.notificationIcon}
//           onPress={() => Alert.alert('Notifications', 'You are logged in!')}
//         >
//           <Icon name="bell-outline" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.profileSection}>
//           <View style={styles.imageWrapper}>
//             <Image
//               source={
//                 imageUri
//                   ? { uri: imageUri }
//                   : userData.profileImage?.startsWith('http') || userData.profileImage?.startsWith('file')
//                   ? { uri: userData.profileImage }
//                   : require('../assets/profile_placeholder.png')
//               }
//               style={styles.profileImage}
//             />
//             <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
//               <Icon name="pencil" size={20} color="#fff" />
//             </TouchableOpacity>
//             {imageUri && (
//               <TouchableOpacity style={styles.removeIcon} onPress={handleRemoveImage}>
//                 <Icon name="delete" size={20} color="#fff" />
//               </TouchableOpacity>
//             )}
//           </View>
//           <Text style={styles.userName}>{userData.name}</Text>
//         </View>

//         <Text style={styles.sectionTitle}>Account</Text>
//         <View style={styles.card}>
//           <TouchableOpacity
//             onPress={() => {
//               LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//               setExpanded(!expanded);
//             }}
//             style={styles.header}
//           >
//             <View style={styles.headerWithIcon}>
//               <Icon name="account-circle" size={24} color="#000" style={{ marginRight: 8 }} />
//               <Text style={styles.title}>Account Information</Text>
//             </View>
//             <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={28} color="#000" />
//           </TouchableOpacity>

//           {expanded && (
//             <View style={styles.infoContainer}>
//               <View style={styles.infoRow}>
//                 <Text style={styles.label}>Name:</Text>
//                 <Text style={styles.value}>{userData.name}</Text>
//               </View>
//               <View style={styles.infoRow}>
//                 <Text style={styles.label}>Email:</Text>
//                 <Text style={styles.value}>{userData.email}</Text>
//               </View>
//               <View style={styles.infoRow}>
//                 <Text style={styles.label}>Age:</Text>
//                 <Text style={styles.value}>{userData.age}</Text>
//               </View>
//             </View>
//           )}
//         </View>

//         <Text style={styles.sectionTitle}>Security</Text>
//         <View style={styles.card}>
//           <TouchableOpacity
//             onPress={() => {
//               LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//               setPasswordExpanded(!passwordExpanded);
//             }}
//             style={styles.header}
//           >
//             <View style={styles.headerWithIcon}>
//               <Icon name="lock-reset" size={24} color="#000" style={{ marginRight: 8 }} />
//               <Text style={styles.title}>Change Password</Text>
//             </View>
//             <Icon name={passwordExpanded ? 'chevron-up' : 'chevron-down'} size={28} color="#000" />
//           </TouchableOpacity>

//           {passwordExpanded && (
//             <View style={styles.infoContainer}>
//               {[{
//                 value: oldPassword,
//                 setValue: setOldPassword,
//                 placeholder: 'Old Password',
//                 show: showOldPassword,
//                 setShow: setShowOldPassword
//               }, {
//                 value: newPassword,
//                 setValue: setNewPassword,
//                 placeholder: 'New Password',
//                 show: showNewPassword,
//                 setShow: setShowNewPassword
//               }, {
//                 value: confirmPassword,
//                 setValue: setConfirmPassword,
//                 placeholder: 'Confirm Password',
//                 show: showConfirmPassword,
//                 setShow: setShowConfirmPassword
//               }].map((field, idx) => (
//                 <View key={idx} style={styles.passwordInputContainer}>
//                   <TextInput
//                     placeholder={field.placeholder}
//                     secureTextEntry={!field.show}
//                     style={styles.passwordInput}
//                     value={field.value}
//                     onChangeText={field.setValue}
//                   />
//                   <TouchableOpacity
//                     style={styles.eyeIcon}
//                     onPress={() => field.setShow(!field.show)}
//                   >
//                     <Icon name={field.show ? 'eye-off' : 'eye'} size={22} color="#555" />
//                   </TouchableOpacity>
//                 </View>
//               ))}
//               <TouchableOpacity style={styles.updateButton} onPress={handleChangePassword}>
//                 <Text style={styles.updateButtonText}>Update Password</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//         <Text style={styles.sectionTitle}>Learning</Text>
//         <View style={styles.card}>
//           <TouchableOpacity
//             onPress={() => {
//               LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//               setCertificatesExpanded(!certificatesExpanded);
//             }}
//             style={styles.header}
//           >
//             <View style={styles.headerWithIcon}>
//               <Icon name="certificate" size={24} color="#000" style={{ marginRight: 8 }} />
//               <Text style={styles.title}>My Certificates</Text>
//             </View>
//             <Icon
//               name={certificatesExpanded ? 'chevron-up' : 'chevron-down'}
//               size={28}
//               color="#000"
//             />
//           </TouchableOpacity>

//           {certificatesExpanded && (
//             <View style={{ height: 170 }}>
//               <Swiper showsButtons={false} autoplay={false} showsPagination={false}>
//                 {certificates.map((item) => (
//                   <View key={item.id} style={styles.slide}>
//                     <Icon name="school" size={20} color="#007BFF" style={{ marginRight: 8 }} />
//                     <Text style={styles.certificateText}>{item.title}</Text>
//                   </View>
//                 ))}
//               </Swiper>
//             </View>
//           )}
//         </View>

//         <Text style={styles.sectionTitle}>Others</Text>
//         <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
//           <Icon name="logout" size={20} color="#fff" style={{ marginRight: 8 }} />
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>

//         <Text style={styles.footerText}>© 2023 AI Learning Education. All rights reserved.</Text>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   stickyHeader: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     paddingTop: 30,
//     paddingBottom: 12,
//     paddingHorizontal: 24,
//     zIndex: 10,
//     backgroundColor: '#f0f4f8',
//   },
//   container: {
//     padding: 24,
//     backgroundColor: '#f0f4f8',
//     flexGrow: 1,
//     marginTop: 65,
//     alignItems: 'center',
//   },
//   notificationIcon: {
//     position: 'absolute',
//     right: 24,
//     top: 35,
//     padding: 4,
//     zIndex: 20,
//   },
//   pageHeaderText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   profileSection: {
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   imageWrapper: {
//     position: 'relative',
//   },
//   profileImage: {
//     width: 110,
//     height: 110,
//     borderRadius: 55,
//     backgroundColor: '#ccc',
//     marginBottom: 5,
//     resizeMode: 'cover',
//   },
//   editIcon: {
//     position: 'absolute',
//     right: 0,
//     bottom: 0,
//     backgroundColor: '#1E90FF',
//     padding: 6,
//     borderRadius: 20,
//     borderWidth: 2,
//     borderColor: '#fff',
//   },
//   removeIcon: {
//     position: 'absolute',
//     left: 0,
//     bottom: 0,
//     backgroundColor: '#FF4D4D',
//     padding: 6,
//     borderRadius: 20,
//     borderWidth: 2,
//     borderColor: '#fff',
//   },
//   userName: {
//     fontSize: 23,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   sectionTitle: {
//     fontSize: 21,
//     fontWeight: '600',
//     alignSelf: 'flex-start',
//     marginTop: -10,
//     marginBottom: 6,
//     color: '#222',
//   },
//   card: {
//     width: '104%',
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     paddingVertical: 16,
//     paddingHorizontal: 18,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 10,
//     elevation: 3,
//     marginBottom: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   headerWithIcon: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   title: {
//     fontWeight: '600',
//     fontSize: 19,
//     color: '#000',
//   },
//   infoContainer: {
//     marginTop: 12,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   label: {
//     fontWeight: 'bold',
//     width: 80,
//     marginTop: 5,
//     fontSize: 16,
//     color: '#555',
//   },
//   value: {
//     color: '#333',
//     marginTop: 5,
//     fontSize: 16,
//   },
//   passwordInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 7,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//   },
//   passwordInput: {
//     flex: 1,
//     height: 42,
//     fontSize: 16,
//     color: '#333',
//   },
//   eyeIcon: {
//     padding: 6,
//   },
//   updateButton: {
//     marginTop: 12,
//     backgroundColor: '#1E90FF',
//     paddingVertical: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   updateButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   slide: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#eef6fd',
//     borderRadius: 12,
//     paddingHorizontal: 20,
//     paddingVertical: 72,
//     margin: 6,
//     marginHorizontal: 15,
//   },
//   certificateText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#007BFF',
//   },
//   logoutButton: {
//     flexDirection: 'row',
//     backgroundColor: '#FF4D4D',
//     paddingVertical: 14,
//     paddingHorizontal: 24,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '104%',
//     marginBottom: 15,
//   },
//   logoutText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 18,
//   },
//   footerText: {
//     fontSize: 15,
//     color: '#888',
//     marginBottom: 85,
//   },
// // });

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   LayoutAnimation,
//   Platform,
//   UIManager,
//   ScrollView,
//   Alert,
//   Image,
//   TextInput,
//   Dimensions,
//   Modal,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import * as ImagePicker from 'expo-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Swiper from 'react-native-swiper';

// const { width } = Dimensions.get('window');

// if (Platform.OS === 'android') {
//   UIManager.setLayoutAnimationEnabledExperimental &&
//     UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// export default function ProfileScreen({ setIsLoggedIn }) {
//   const [userData, setUserData] = useState({ name: '', email: '', age: '' });
//   const [expanded, setExpanded] = useState(false);
//   const [passwordExpanded, setPasswordExpanded] = useState(false);
//   const [certificatesExpanded, setCertificatesExpanded] = useState(false);
//   const [imageUri, setImageUri] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);

//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const [showOldPassword, setShowOldPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const certificates = [
//     { id: 1, title: 'Introduction to AI - NPTEL' },
//     { id: 2, title: 'Web Development Internship - Coginfyz' },
//     { id: 3, title: 'Java Programming Fundamentals - Udemy' },
//   ];

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const savedImageUri = await AsyncStorage.getItem('profileImageUri');
//         if (savedImageUri) setImageUri(savedImageUri);

//         const response = await fetch('http://192.168.188.47:3002/get-profile');
//         const data = await response.json();
//         setUserData(data);
//       } catch (err) {
//         Alert.alert('Error', 'Failed to load profile');
//         console.error(err);
//       }
//     };

//     loadData();
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//       allowsEditing: true,
//       aspect: [1, 1],
//     });

//     if (!result.canceled) {
//       const uri = result.assets[0].uri;
//       setImageUri(uri);
//       await AsyncStorage.setItem('profileImageUri', uri);
//       setModalVisible(false);
//     }
//   };

//   const handleRemoveImage = async () => {
//     setImageUri(null);
//     await AsyncStorage.removeItem('profileImageUri');
//     setModalVisible(false);
//   };

//   const handleChangePassword = async () => {
//     if (!oldPassword || !newPassword || !confirmPassword) {
//       Alert.alert('All fields are required');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       Alert.alert('New password and confirm password do not match');
//       return;
//     }

//     try {
//       const response = await fetch('http://192.168.188.47:3002/change-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: userData.email,
//           oldPassword,
//           newPassword,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         Alert.alert('Success', data.message);
//         setOldPassword('');
//         setNewPassword('');
//         setConfirmPassword('');
//       } else {
//         Alert.alert('Error', data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Error', 'Something went wrong');
//     }
//   };

//   const confirmLogout = () => {
//     Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Logout',
//         style: 'destructive',
//         onPress: () => setIsLoggedIn(false),
//       },
//     ]);
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#f0f4f8' }}>
//       <View style={styles.stickyHeader}>
//         <Text style={styles.pageHeaderText}>My Profile</Text>
//         <TouchableOpacity
//           style={styles.notificationIcon}
//           onPress={() => Alert.alert('Notifications', 'You are logged in!')}
//         >
//           <Icon name="bell-outline" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.profileSection}>
//           <View style={styles.imageWrapper}>
//             <Image
//               source={
//                 imageUri
//                   ? { uri: imageUri }
//                   : userData.profileImage?.startsWith('http') || userData.profileImage?.startsWith('file')
//                   ? { uri: userData.profileImage }
//                   : require('../assets/profile_placeholder.png')
//               }
//               style={styles.profileImage}
//             />
//             <TouchableOpacity style={styles.editIcon} onPress={() => setModalVisible(true)}>
//               <Icon name="pencil" size={20} color="#fff" />
//             </TouchableOpacity>
//           </View>
//           <Text style={styles.userName}>{userData.name}</Text>
//         </View>

//         <Modal
//           transparent={true}
//           animationType="fade"
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
//                 <Text style={styles.modalButtonText}>Add Profile Image</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.modalButton} onPress={handleRemoveImage}>
//                 <Text style={styles.modalButtonText}>Remove Profile Image</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#ccc' }]} onPress={() => setModalVisible(false)}>
//                 <Text style={styles.modalButtonText}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>

//         {/* Keep rest of your profile screen sections unchanged */}

//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   stickyHeader: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     paddingTop: 30,
//     paddingBottom: 12,
//     paddingHorizontal: 24,
//     zIndex: 10,
//     backgroundColor: '#f0f4f8',
//   },
//   container: {
//     padding: 24,
//     backgroundColor: '#f0f4f8',
//     flexGrow: 1,
//     marginTop: 65,
//     alignItems: 'center',
//   },
//   notificationIcon: {
//     position: 'absolute',
//     right: 24,
//     top: 35,
//     padding: 4,
//     zIndex: 20,
//   },
//   pageHeaderText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   profileSection: {
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   imageWrapper: {
//     position: 'relative',
//   },
//   profileImage: {
//     width: 110,
//     height: 110,
//     borderRadius: 55,
//     backgroundColor: '#ccc',
//     marginBottom: 5,
//     resizeMode: 'cover',
//   },
//   editIcon: {
//     position: 'absolute',
//     right: 0,
//     bottom: 0,
//     backgroundColor: '#1E90FF',
//     padding: 6,
//     borderRadius: 20,
//     borderWidth: 2,
//     borderColor: '#fff',
//     zIndex: 10,
//   },
//   userName: {
//     fontSize: 23,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     width: 300,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 20,
//     alignItems: 'center',
//   },
//   modalButton: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginVertical: 8,
//     width: '100%',
//     alignItems: 'center',
//   },
//   modalButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
  Alert,
  Image,
  TextInput,
  Dimensions,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ProfileScreen({ setIsLoggedIn }) {
  const [userData, setUserData] = useState({ name: '', email: '', age: '' });
  const [expanded, setExpanded] = useState(false);
  const [passwordExpanded, setPasswordExpanded] = useState(false);
  const [certificatesExpanded, setCertificatesExpanded] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const certificates = [
    { id: 1, title: 'Introduction to AI - NPTEL' },
    { id: 2, title: 'Web Development Internship - Coginfyz' },
    { id: 3, title: 'Java Programming Fundamentals - Udemy' },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedImageUri = await AsyncStorage.getItem('profileImageUri');
        if (savedImageUri) setImageUri(savedImageUri);

        const response = await fetch('http:// 172.19.211.47:3002/get-profile');
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        Alert.alert('Error', 'Failed to load profile');
        console.error(err);
      }
    };
    loadData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      await AsyncStorage.setItem('profileImageUri', uri);
      setModalVisible(false);
    }
  };

  const handleRemoveImage = async () => {
    setImageUri(null);
    await AsyncStorage.removeItem('profileImageUri');
    setModalVisible(false);
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('New password and confirm password do not match');
      return;
    }

    try {
      const response = await fetch('http:// 172.19.211.47:3002/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', data.message);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const confirmLogout = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => setIsLoggedIn(false),
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f4f8' }}>
      <View style={styles.stickyHeader}>
        <Text style={styles.pageHeaderText}>My Profile</Text>
        <TouchableOpacity
          style={styles.notificationIcon}
          onPress={() => Alert.alert('Notifications', 'You are logged in!')}
        >
          <Icon name="bell-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileSection}>
          <View style={styles.imageWrapper}>
            <Image
              source={
                imageUri
                  ? { uri: imageUri }
                  : userData.profileImage?.startsWith('http') || userData.profileImage?.startsWith('file')
                  ? { uri: userData.profileImage }
                  : require('../assets/profile_placeholder.png')
              }
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editIcon} onPress={() => setModalVisible(true)}>
              <Icon name="pencil" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userData.name}</Text>
        </View>

        <Modal transparent animationType="fade" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
                <Text style={styles.modalButtonText}>Add New Profile </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleRemoveImage}>
                <Text style={styles.modalButtonText}>Remove Profile </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#ccc' }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setExpanded(!expanded);
            }}
            style={styles.header}
          >
            <View style={styles.headerWithIcon}>
              <Icon name="account-circle" size={24} color="#000" style={{ marginRight: 8 }} />
              <Text style={styles.title}>Account Information</Text>
            </View>
            <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={28} color="#000" />
          </TouchableOpacity>

          {expanded && (
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{userData.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{userData.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Age:</Text>
                <Text style={styles.value}>{userData.age}</Text>
              </View>
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Security</Text>
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setPasswordExpanded(!passwordExpanded);
            }}
            style={styles.header}
          >
            <View style={styles.headerWithIcon}>
              <Icon name="lock-reset" size={24} color="#000" style={{ marginRight: 8 }} />
              <Text style={styles.title}>Change Password</Text>
            </View>
            <Icon name={passwordExpanded ? 'chevron-up' : 'chevron-down'} size={28} color="#000" />
          </TouchableOpacity>

          {passwordExpanded && (
            <View style={styles.infoContainer}>
              {[{
                value: oldPassword, setValue: setOldPassword, placeholder: 'Old Password', show: showOldPassword, setShow: setShowOldPassword
              }, {
                value: newPassword, setValue: setNewPassword, placeholder: 'New Password', show: showNewPassword, setShow: setShowNewPassword
              }, {
                value: confirmPassword, setValue: setConfirmPassword, placeholder: 'Confirm Password', show: showConfirmPassword, setShow: setShowConfirmPassword
              }].map((field, idx) => (
                <View key={idx} style={styles.passwordInputContainer}>
                  <TextInput
                    placeholder={field.placeholder}
                    secureTextEntry={!field.show}
                    style={styles.passwordInput}
                    value={field.value}
                    onChangeText={field.setValue}
                  />
                  <TouchableOpacity style={styles.eyeIcon} onPress={() => field.setShow(!field.show)}>
                    <Icon name={field.show ? 'eye-off' : 'eye'} size={22} color="#555" />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity style={styles.updateButton} onPress={handleChangePassword}>
                <Text style={styles.updateButtonText}>Update Password</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Learning</Text>
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setCertificatesExpanded(!certificatesExpanded);
            }}
            style={styles.header}
          >
            <View style={styles.headerWithIcon}>
              <Icon name="certificate" size={24} color="#000" style={{ marginRight: 8 }} />
              <Text style={styles.title}>My Certificates</Text>
            </View>
            <Icon name={certificatesExpanded ? 'chevron-up' : 'chevron-down'} size={28} color="#000" />
          </TouchableOpacity>

          {certificatesExpanded && (
            <View style={{ height: 170 }}>
              <Swiper showsButtons={false} autoplay={false} showsPagination={false}>
                {certificates.map((item) => (
                  <View key={item.id} style={styles.slide}>
                    <Icon name="school" size={20} color="#007BFF" style={{ marginRight: 8 }} />
                    <Text style={styles.certificateText}>{item.title}</Text>
                  </View>
                ))}
              </Swiper>
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Others</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
          <Icon name="logout" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>© 2023 AI Learning Education. All rights reserved.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  stickyHeader: {
    position: 'absolute', top: 0, left: 0, right: 0,
    paddingTop: 30, paddingBottom: 12, paddingHorizontal: 24,
    zIndex: 10, backgroundColor: '#f0f4f8',
  },
  container: {
    padding: 24, backgroundColor: '#f0f4f8',
    flexGrow: 1, marginTop: 65, alignItems: 'center',
  },
  notificationIcon: {
    position: 'absolute', right: 24, top: 35, padding: 4, zIndex: 20,
  },
  pageHeaderText: { fontSize: 28, fontWeight: 'bold', color: '#000' },
  profileSection: { alignItems: 'center', marginBottom: 10 },
  imageWrapper: { position: 'relative' },
  profileImage: {
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: '#ccc', marginBottom: 5, resizeMode: 'cover',
  },
  editIcon: {
    position: 'absolute', right: 0, bottom: 0,
    backgroundColor: '#1E90FF', padding: 6, borderRadius: 20,
    borderWidth: 2, borderColor: '#fff', zIndex: 10,
  },
  userName: { fontSize: 23, fontWeight: 'bold', color: '#333' },
  sectionTitle: {
    fontSize: 21, fontWeight: '600',
    alignSelf: 'flex-start', marginTop: -10, marginBottom: 6, color: '#222',
  },
  card: {
    width: '104%', backgroundColor: '#fff', borderRadius: 15,
    paddingVertical: 16, paddingHorizontal: 18,
    shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 1 },
    shadowRadius: 10, elevation: 3, marginBottom: 20,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerWithIcon: { flexDirection: 'row', alignItems: 'center' },
  title: { fontWeight: '600', fontSize: 19, color: '#000' },
  infoContainer: { marginTop: 12 },
  infoRow: { flexDirection: 'row', marginBottom: 8 },
  label: { fontWeight: 'bold', width: 80, marginTop: 5, fontSize: 16, color: '#555' },
  value: { color: '#333', marginTop: 5, fontSize: 16 },
  passwordInputContainer: {
    flexDirection: 'row', alignItems: 'center',
    marginVertical: 7, borderWidth: 1, borderColor: '#ccc',
    borderRadius: 8, paddingHorizontal: 12,
  },
  passwordInput: { flex: 1, height: 42, fontSize: 16, color: '#333' },
  eyeIcon: { padding: 6 },
  updateButton: {
    marginTop: 12, backgroundColor: '#1E90FF',
    paddingVertical: 10, borderRadius: 10, alignItems: 'center',
  },
  updateButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  slide: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#eef6fd', borderRadius: 12,
    paddingHorizontal: 20, paddingVertical: 72,
    margin: 6, marginHorizontal: 15,
  },
  certificateText: { fontSize: 16, fontWeight: '600', color: '#007BFF' },
  logoutButton: {
    flexDirection: 'row', backgroundColor: '#FF4D4D',
    paddingVertical: 14, paddingHorizontal: 24,
    borderRadius: 12, justifyContent: 'center',
    alignItems: 'center', width: '104%', marginBottom: 15,
  },
  logoutText: { color: '#fff', fontWeight: '600', fontSize: 18 },
  footerText: { fontSize: 15, color: '#888', marginBottom: 85 },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', alignItems: 'center',
  },
  modalContent: {
    width: 300, backgroundColor: '#fff',
    borderRadius: 12, padding: 20, alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#007BFF', paddingVertical: 10,
    paddingHorizontal: 20, borderRadius: 8,
    marginVertical: 8, width: '100%', alignItems: 'center',
  },
  modalButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
