import React from 'react';
import { StyleSheet, Image } from "react-native";

const Logo = () => <Image
style={styles.avatarImage}
source={require("../assets/logo.png")}
/>;

const styles = StyleSheet.create({
    avatarImage: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    }
  });
  

export default Logo;
