import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AnimatedLoader from "../library/react-native-animated-loader/src/index";

import CameraScreen from "../component/Camera";
import HomeScreen from "../../screen/HomeScreen";
import HistoryScreen from "../../screen/HistoryScreen";
import ProfileScreen from "../../screen/ProfileScreen";
import AnalysisScreen from "../../screen/AnalysisScreen";

import HomeStyle from "../styles/home";

import { MainTabsParams } from './types';

const Tab = createBottomTabNavigator<MainTabsParams>();

const FlashyStyledScreen = () => {
  function MyTabBar({ state, descriptors, navigation }) {
    console.log('%c%s', 'color: #807160', state.index);
    
    return (
      <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          let iconName;
          if (route.name === 'Trang chủ') {
            iconName = 'home';
          } else if (route.name === 'Lịch sử') {
            iconName = 'history';
          } else if (route.name === 'Chấm công') {
            iconName = null
          } else if (route.name === 'Thông tin') {
            iconName = 'user-tie';
          } else if (route.name === 'Thống kê') {
            iconName = 'cog';
          }

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            (null != iconName) ? (<TouchableOpacity
              accessibilityRole="button"
              accessibilityState={{selected : isFocused}}
              onPress={onPress}
              key={route.key}
              onLongPress={onLongPress}
              style={HomeStyle.tabBarBarStyle}
            >
              <FontAwesome5 style={isFocused ? HomeStyle.tabFocusIn : HomeStyle.tabFocusOut} size={28} name={iconName} />
              <Text style={{ color: isFocused ? '#a91b4b' : '#19224d', fontSize:12 , paddingBottom: 3 }}>
                {label}
              </Text>
            </TouchableOpacity>) :
            (<TouchableOpacity
              accessibilityRole="button"
              accessibilityState={{selected : isFocused}}
              onPress={onPress}
              key={route.key}
              onLongPress={onLongPress}
              style={HomeStyle.tabBarBarStyle}
            >
              <View style={HomeStyle.circle}>
                <AnimatedLoader
                visible={true}
                overlayColor="#rgba(255,255,255,0)"
                source={require("../styles/loader/loading1.json")}
                animationStyle={HomeStyle.lottie}
                speed={0.5}
                loop={true}
                image={true}
              />
              </View>
              <Text style={{ color: isFocused ? '#a91b4b' : '#19224d',fontSize:12 ,top: -15 }}>
                {label}
              </Text>
            </TouchableOpacity>)
          );
        })}
      </View>
    );
  }
  // render
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />} >
      <Tab.Screen name="Trang chủ" component={HomeScreen} options={{ tabBarBadge: 3 }} />
      <Tab.Screen name="Lịch sử" component={HistoryScreen} />
      <Tab.Screen name="Chấm công" component={CameraScreen} />
      <Tab.Screen name="Thống kê" component={AnalysisScreen} />
      <Tab.Screen name="Thông tin" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default FlashyStyledScreen;
