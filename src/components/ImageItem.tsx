import React, { useState } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';

const ImageItem: React.FC<any> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function onLoading(value: boolean) {
    setIsLoading(value);
  }

  return (
    <View>
      {isLoading && (
        <View style={{ ...props.style, marginTop: 25 }}>
          <ActivityIndicator color="blue" />
        </View>
      )}
      {
        <Image
          style={{ ...props.style }}
          source={{ uri: props.image }}
          onLoadStart={() => onLoading(true)}
          onLoad={() => onLoading(false)}
        ></Image>
      }
    </View>
  );
};

export default ImageItem;
