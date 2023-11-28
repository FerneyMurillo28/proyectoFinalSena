import React from "react";
import { FlatList, View } from "react-native";
import RepositoryItem from "./RepositoryItem.jsx";

const RepositoryList = ({ dataPublications, isOnProfile }) => {
  console.log("RepositoryList", dataPublications);
  return (
    <FlatList
      data={dataPublications}
      renderItem={({ item: repo }) => (
        <View>
          <RepositoryItem {...repo} isOnProfile={isOnProfile} />
        </View>
      )}
    />
  );
};
export default RepositoryList;
