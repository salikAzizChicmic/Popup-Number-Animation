import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
  Button,
  Easing
} from "react-native";

export default function App() {
  const scaleAnimate = useRef(new Animated.Value(500)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const resetAnimation = () => {
    Animated.parallel([
      Animated.spring(scaleAnimate, {
        toValue: 500, // Reset scale to initial value
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.spring(translateX, {
        toValue: 0, // Reset horizontal position
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.spring(translateY, {
        toValue: 0, // Reset vertical position
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  };


  const animateElement = () => {
    // Ease-in effect on scale
    Animated.timing(scaleAnimate, {
      toValue: 540, // Slightly smaller than initial scale for easing
      duration: 200,
      easing: Easing.ease, // Apply ease-in
      useNativeDriver:false,
    }).start(() => {
      
        Animated.timing(scaleAnimate, {
          toValue: 20, // Slightly smaller than initial scale for easing
          duration: 1200,
          easing: Easing.ease, // Apply ease-in
          useNativeDriver:false,
        }).start(() => {
          
            Animated.timing(scaleAnimate, {
              toValue: 50,
              duration: 1000,
              useNativeDriver:false,
            }).start(() => {
                Animated.parallel([
                  Animated.timing(translateX, {
                    toValue: 170,
                    duration: 800,
                    useNativeDriver:false,
                  }),
                  Animated.timing(translateY, {
                    toValue: -350,
                    duration: 800,
                    useNativeDriver:false,
                  }),
                ]).start();
           
            });
          
        })
      
      // Rest of the animation sequence
      
        
  
    });
  };
  const animationStyle = {
    width: scaleAnimate,
    height: scaleAnimate,
    transform: [{ translateX }, { translateY }], // Apply both translations
  };

  return (
    <>
      <Button onPress={resetAnimation} title="Reset" />
      <View style={styles.container}>
        <TouchableWithoutFeedback style={{ margin: 20 }} onPress={() => animateElement()}>
          <Animated.Image
            source={require("./Assets/one.png")}
            style={animationStyle}
          />
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4b0082",
  },
});