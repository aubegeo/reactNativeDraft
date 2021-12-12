/* /src/components/Icons.tsx */

import React from "react";
import { Text } from "react-native";

const iconMap = {
  home: "♡",
  search: "♢",
  favorites: "♧",
  profile: "♤"
};

const Icons = ({ name,  style, ...props }) => {
  const icon = iconMap[name];

  return <Text style={[{ fontSize: 26 }, style]}>{icon}</Text>;
};

export default Icons;
