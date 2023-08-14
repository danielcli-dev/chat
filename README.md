# Project description

Chat App is used to communicate with other users through messaging that is displayed in a chatroom format.

# How to get the project running

The app can be accessed through the expo app on your mobile device or by using an emulator such as Android Studio.

```bash
npm install # to install any necessary dependancies
```

```bash
npx expo start # to start hosting your app
```

## Getting Started with Expo

Create an account at https://expo.dev/

Log into Expo through terminal by running:

```bash
expo login
```

If you want to serve app on mobile device, make sure phone and computer are on the same network and download the Expo Go app on your phone. Then in the terminal run:
```bash
npx expo start
```

You should find the project under Development Servers on your phone. If not displayed, scan the QR Code provided in the terminal. If it is still not working, click on Send link with email option and open email on your phone.

## Getting Started with Android Studio

To install Android Studio, download at https://developer.android.com/studio

1. Install Type: Choose Custom.
2. SDK Components Setup: make sure Android Virtual Device is selected.
3. Select location on your device where you want to install Android Studio.

4. Accept all the license agreements.
5. Then tick Accept button.
6. Press Finish.

**Configure Android Studio**

1. Click More Actions -> SDK Manager.
2. Check Show Package Details.
3. Check which Android SDK Platform is installed by default.
4. Select the corresponding Google Play System Image to install (Ensure Google Play System Image selected matches your OS). For example, if you see "Android 12L" SDK Platform is installed which is Android SDK Platform 32.

5. You will also install Google Play System Image of the same API level (32) which is also OS-specific (e.g. Google Play ARM 64 v8a System Image).
6. Click Apply button
7. When System Image installation is complete, go to SDK Tools tab (Some items will be checked by default such as Android SDK Platform-Tools).
8. Make sure Android SDK Build-Tools is installed.
9. Click Apply

**For Windows Users:**

**AMD CPU Users Only:** Enable and install Android Emulator Hypervisor Driver for AMD processors. If it's not already installed, tick its box and apply it.

**Intel CPU Users Only:** Enable and install Intel x86 Emulator Accelerator(HAXM installer). If it's not already installed, tick its box and apply it.

**For MacOS Users:**
Add the location of Android SFK to your PATH.

1. Copy the path next to Android SDK Location.
2. Check what shell your terminal is using.
3. Location and open your \~/.bash_profile or \~/.bashrc file (or \~/.zshrc if you have a zsh terminal instead of bash).
4. Add default stored lcoation of ANDROID_SDK on system by adding the following to your \~/.bash_profile or \~/.bashrc file (or \~/.zshrc if you have zsh terminal instead of bash): export ANDROID_SDK=/Users/myuser/Library/Android/sdk
5. Add the location for the tools you will need to interact with the Android device by adding Platform-Tools (located as sub-directory of ANDROID_SDK on your system). If Android SDK Platform-Tools is not installed, check the box next to "Android SDK Platform-Tools" and click Apply.
6. Add Platform-Tools to your \~/.bash_profile or \~/.bashrc file (or \~/.zshrc if you have zsh terminal instead of bash) via the following line of code:\
export PATH=$ANDROID_SDK/platform-tools:$PATH
7. Save the file and close it.
When you have finished installing these additional components, you can continue setup process.
Close SDK Manager window by pressing OK.

**Virtual Device Manager**
1. From your Android Studio welcome screen, click More Actions again, followed by Virtual Device Manager:
2. Select Create Virtual Device, which will open a new window where you can choose your virtual device. A variety of devices are available. Pick whichever mobile phone device has a Google Play Store icon next to it and is not too old.
3. Click next.
4. At the System Image interface, click on Recommended tab and select system image that:
- includes Google Play store in it
- has the same API level as the system image you downloaded earlier (e.g. 32).
5. If an option is not selectable, just download it by clicking download icon next to it.
6. Once done, click Next.
7. A new window will appear that displays the final specs of the emulator that you’ll create.
Go ahead and click on Show Advanced Settings to change your emulator’s storage size. Scroll down to the Memory and Storage section, and adjust the values of Internal Storage and SD card to 4096 MB each.
8. Once done, click Finish.
9. Start Your Emulator. Click Play to start your newly created emulator. Your selected device will be rendered on your screen, ready to emulate your code!

After you run npx expo start in terminal, it will start the Expo Metro Bundler. Press a for android or i for iOS to have the bundler search for your emulators and to serve the app to the emulator.

# Project dependencies

expo
expo-status-bar
expo-image-picker
expo-media-library
expo-location
expo-av
firebase
react
react-native
react-native-gifted-chat
react-native-screens
react-native-safe-area-context
@react-navigation/native
@react-navigation/native-stack
@react-native-community/netinfo
@react-native-async-storage/async-storage
react-native-maps

# Which API the project uses

Firebase
