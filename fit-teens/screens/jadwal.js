import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Jadwal = () => {
  return (
    <View style={styles.jadwal}>
      <View style={styles.div}>
        <View style={styles.overlap}>
          <Text style={styles.textWrapper}>Masukkan aktivitas</Text>
        </View>
        <View style={styles.overlapGroup}>
          {[1, 2, 3, 4, 5].map((index) => (
            <View key={index} style={styles.textWrapperContainer}>
              <Text style={styles.textWrapper}>{`Aktivitas ${index}`}</Text>
            </View>
          ))}
          <View style={styles.line}></View>
          <View style={styles.line}></View>
          <View style={styles.line}></View>
          <View style={styles.line}></View>
          <View style={styles.line}></View>
          {[1, 2, 3, 4, 5].map((index) => (
            <TouchableOpacity key={index} style={styles.editButton}>
              <Text style={styles.textWrapper}>Edit</Text>
            </TouchableOpacity>
          ))}
          {[1, 2, 3, 4, 5].map((index) => (
            <TouchableOpacity key={index} style={styles.deleteButton}>
              <Text style={styles.textWrapper}>Hapus</Text>
            </TouchableOpacity>
          ))}
          {[1, 2, 3, 4, 5].map((index) => (
            <TouchableOpacity key={index} style={styles.completeButton}>
              <Text style={styles.textWrapper}>Selesai</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.overlap4}>
          <Text style={styles.textWrapper}>Tambah Aktivitas</Text>
        </View>
        <Text style={styles.textWrapper}>Aktivitas</Text>
        <View style={styles.overlap5}>
          {[1, 2, 3, 4, 5].map((index) => (
            <View key={index} style={styles.textWrapperContainer}>
              <Text style={styles.textWrapper}>{`Aktivitas ${index}`}</Text>
            </View>
          ))}
          <View style={styles.line}></View>
          <View style={styles.line}></View>
          <View style={styles.line}></View>
          <View style={styles.line}></View>
          <View style={styles.line}></View>
          {[1, 2, 3, 4, 5].map((index) => (
            <TouchableOpacity key={index} style={styles.deleteButton}>
              <Text style={styles.textWrapper}>Hapus</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.textWrapper}>Riwayat</Text>
        <Text style={styles.textWrapper}>Jadwal Aktivitas</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  jadwal: {
    backgroundColor: "#0f0f0f",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  div: {
    backgroundColor: "#0f0f0f",
    height: 853,
    position: "relative",
    width: 390,
  },
  overlap: {
    borderColor: "#FFE350",
    borderRadius: 5,
    borderWidth: 1,
    height: 27,
    left: 23,
    position: "absolute",
    top: 148,
    width: 344,
  },
  textWrapper: {
    color: "#FFE350",
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 21.7,
    whiteSpace: "nowrap",
  },
  overlapGroup: {
    borderColor: "#FFE350",
    borderRadius: 5,
    borderWidth: 1,
    height: 212,
    left: 23,
    position: "absolute",
    top: 263,
    width: 344,
  },
  textWrapperContainer: {
    position: "absolute",
  },
  line: {
    borderBottomWidth: 1,
    borderColor: "#FFE350",
    position: "absolute",
    width: 321,
  },
  editButton: {
    backgroundColor: "#87B87E",
    borderRadius: 4,
    height: 19,
    position: "absolute",
    width: 44,
  },
  deleteButton: {
    backgroundColor: "#B73333",
    borderRadius: 4,
    height: 19,
    position: "absolute",
    width: 44,
  },
  completeButton: {
    backgroundColor: "#338FB7",
    borderRadius: 4,
    height: 19,
    position: "absolute",
    width: 44,
  },
  overlap4: {
    backgroundColor: "#FFE350",
    borderRadius: 5,
    height: 27,
    left: 23,
    position: "absolute",
    top: 185,
    width: 344,
  },
  overlap5: {
    borderColor: "#FFE350",
    borderRadius: 5,
    borderWidth: 1,
    height: 212,
    left: 22,
    position: "absolute",
    top: 525,
    width: 344,
  },
});

export default Jadwal;