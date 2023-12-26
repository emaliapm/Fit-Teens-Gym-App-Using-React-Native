import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

class Button extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

// ...
const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow", 
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    elevation: 5,
  },
  text: {
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: 'bold',
    color: '#000000', 
  },
});
// ...


export default Button;
