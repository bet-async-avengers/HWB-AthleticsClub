import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, BackHandler } from "react-native";
import { WebView } from "react-native-webview";
import { StatusBar } from "expo-status-bar";
import { EXPO_PUBLIC_APP_URL as fallbackurl } from "./fallbackvalues"

export default function App() {
  const [canGoBack, setCanGoBack] = useState(false);
  const webviewRef = useRef(null);
  const appUrl = process.env.EXPO_PUBLIC_APP_URL ?? fallbackurl;
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#b675e6",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 50,
    },
    title: {
      fontSize: 18,
      marginBottom: 10,
    },
    webview: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height - 50, // Adjust height as needed
    },
  });

//iOS
  // useEffect(() => {
  //   const handleBackButton = () => {
  //     if (canGoBack && webviewRef.current) {
  //       webviewRef.current.goBack();
  //       return true; // prevent default behavior
  //     }
  //     return false; // default behavior
  //   };

  //   BackHandler.addEventListener("hardwareBackPress", handleBackButton);

  //   return () => {
  //     BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
  //   };
  // }, [canGoBack]);

  // console.log("EXPO_PUBLIC_APP_URL:", EXPO_PUBLIC_APP_URL);
  //iOS

  const webUrl = process.env.EXPO_PUBLIC_APP_URL;
  console.log("WebView URL:", webUrl);

  console.log("WebView URL:", appUrl);
  const handleOnLoad = () => {
    webviewRef.current.injectJavaScript(`

      (function() {

        var meta = document.createElement('meta');

        meta.setAttribute('name', 'viewport');

        meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');

        document.getElementsByTagName('head')[0].appendChild(meta);

      })();

    `);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>WebView Example</Text> */}
      <WebView
        ref={webviewRef}
        source={{ uri: appUrl }}
                        
        // source={{ uri: webUrl }}

        // originWhitelist={['https://*']}
        // startInLoadingState={true}
        style={styles.webview}
        onLoadStart={() => console.log("Loading...")}
        onLoad={() => {
          console.log("Loaded");

          handleOnLoad();
        }}
        onError={(e) => console.log("Error:", e.nativeEvent)}
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
        setBuiltInZoomControls={false}
        scrollEnabled={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={false}
        mixedContentMode="always" // Allow mixed HTTP/HTTPS content

      />
      <StatusBar style="auto" />
    </View>
  );
}


