import React from "react";
import { FlatList, View } from "react-native";
import RepositoryItem from "./RepositoryItem.jsx";

const RepositoryList = ({ dataPublications }) => {
  return (
    <FlatList
      data={dataPublications}
      //ItemSeparatorComponent={()=><Text style={{ borderBottomWidth: 12, padding: 10, borderColor:'#6c757d' }}></Text>}
      renderItem={({ item: repo }) => (
        <View>
          <RepositoryItem {...repo} />
        </View>
      )}
    />
  );
};
export default RepositoryList;
