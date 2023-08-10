import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Audio } from "expo-av";
import { useEffect } from "react";

const CustomActions = ({
  wrapperStyle,
  iconTextStyle,
  storage,
  userID,
  onSend,
}) => {
  useEffect(() => {
    return () => {
      if (recordingObject) recordingObject.stopAndUnloadAsync();
    };
  }, []);

  const actionSheet = useActionSheet();
  // recordingObject represents reference to recording object returned
  let recordingObject = null;
  //   const newUploadRef = ref(storage, "image123");
  const generateReference = (uri) => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  };

  const uploadAndSendImage = async (imageURI) => {
    // const imageURI = result.assets[0].uri;
    const uniqueRefString = generateReference(imageURI);
    const response = await fetch(imageURI);
    const blob = await response.blob();
    const newUploadRef = ref(storage, uniqueRefString);
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      console.log("File has been uploaded successfully");
      const imageURL = await getDownloadURL(snapshot.ref);
      onSend({ image: imageURL });
    });
  };

  const uploadAndSendLocation = async (currentLocation) => {
    onSend({
      location: {
        longitude: currentLocation.coords.longitude,
        latitude: currentLocation.coords.latitude,
      },
    });
  };

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        await uploadAndSendImage(result.assets[0].uri);
      } else Alert.alert("Permissions haven't been granted.");
    }
  };

  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();

    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();

      if (!result.canceled) {
        await uploadAndSendImage(result.assets[0].uri);
      } else Alert.alert("Permissions haven't been granted.");
    }
  };

  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();

    if (permissions?.granted) {
      //   const location = await Location.getCurrentPositionAsync({});
      // await are for functions that are waiting for user to provide image, audo, or location
      let result = await Location.getCurrentPositionAsync({});
      if (!result.canceled) {
        await uploadAndSendLocation(result);
      } else {
        Alert.alert("Failed to retrieve coordinates");
      }
    } else {
      Alert.alert("Permissions to read location aren't granted");
    }
  };

  const startRecording = async () => {
    try {
      let permissions = await Audio.requestPermissionsAsync();
      if (permissions?.granted) {
        // iOS specific config to allow recording on iPhone devices
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
          .then((results) => {
            return results.recording;
          })
          .then((recording) => {
            recordingObject = recording;
            Alert.alert(
              "You are recording...",
              undefined,
              [
                {
                  text: "Cancel",
                  onPress: () => {
                    stopRecording();
                  },
                },
                {
                  text: "Stop and Send",
                  onPress: () => {
                    sendRecordedSound();
                  },
                },
              ],
              { cancelable: false }
            );
          });
      }
    } catch (err) {
      Alert.alert("Failed to record!");
    }
  };

  const stopRecording = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: false,
    });
    await recordingObject.stopAndUnloadAsync();
  };

  const sendRecordedSound = async () => {
    await stopRecording();
    const uniqueRefString = generateReference(recordingObject.getURI());
    const newUploadRef = ref(storage, uniqueRefString);
    const response = await fetch(recordingObject.getURI());
    const blob = await response.blob();
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const soundURL = await getDownloadURL(snapshot.ref);
      // Gifted Chat does not directly support {audio: soundURL}
      // onSend({ text: "YOOO" });
      onSend({ audioClip: soundURL });
    });
  };

  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Record a Sound",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;

    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log("user wants to pick an image");
            pickImage();
            return;
          case 1:
            console.log("user wants to take a photo");
            takePhoto();
            return;
          case 2:
            console.log("user wants to get their location");
            getLocation();
            return;
          case 3:
            console.log("user wants to record audio");
            startRecording();
            return;
          default:
        }
      }
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 15,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

export default CustomActions;
