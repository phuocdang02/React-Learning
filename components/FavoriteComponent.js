import React, { Component } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { ListItem, Avatar } from "react-native-elements";
import Loading from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

// redux
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    favorites: state.favorites,
  };
};
import { deleteFavorite } from "../redux/ActionCreators";
const mapDispatchToProps = (dispatch) => ({
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
});

class Favorites extends Component {
  render() {
    if (this.props.dishes.isLoading) {
      return <Loading />;
    } else if (this.props.dishes.errMess) {
      return <Text>{this.props.dishes.errMess}</Text>;
    } else {
      const dishes = this.props.dishes.dishes.filter((dish) =>
        this.props.favorites.some((el) => el === dish.id)
      );
      return (
        <SwipeListView
          data={dishes}
          renderItem={({ item, index }) => this.renderMenuItem(item, index)}
          renderHiddenItem={({ item, index }) =>
            this.renderHiddenItem(item, index)
          }
          keyExtractor={(item) => item.id.toString()}
          rightOpenValue={-100}
        />
      );
    }
  }
  renderMenuItem(item, index) {
    const { navigate } = this.props.navigation;
    return (
      <ListItem
        key={index}
        onPress={() => navigate("Dishdetail", { dishId: item.id })}
      >
        <Avatar source={{ uri: baseUrl + item.image }} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }
  renderHiddenItem(item, index) {
    return (
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#DDD",
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 15,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: 100,
            backgroundColor: "red",
          }}
          onPress={() => this.props.deleteFavorite(item.id)}
        >
          <Text style={{ color: "#FFF" }}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
