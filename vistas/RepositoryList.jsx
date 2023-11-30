import React from "react";
import { FlatList, View } from "react-native";
import RepositoryItem from "./RepositoryItem.jsx";

const RepositoryList = ({
  dataPublications,
  isOnProfile,
  refreshPublications,
}) => {
  const publicacionesInvertidas = dataPublications.slice().reverse();
  return (
    <FlatList
      data={publicacionesInvertidas}
      renderItem={({ item: repo }) => (
        <View>
          <RepositoryItem
            {...repo}
            isOnProfile={isOnProfile}
            refreshPublications={refreshPublications}
          />
        </View>
      )}
    />
  );
};
export default RepositoryList;
