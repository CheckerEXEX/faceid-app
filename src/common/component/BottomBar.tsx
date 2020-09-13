import React, { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeArea } from 'react-native-safe-area-context';
import AnimatedTabBar, {
  TabsConfig,
  FlashyTabBarItemConfig,
} from '@gorhom/animated-tabbar';
import HomeSVG from '../styles/svg/HomeSVG';
import LikeSVG from '../styles/svg/LikeSVG';
import SearchSVG from '../styles/svg/SearchSVG';
import ProfileSVG from '../styles/svg/ProfileSVG';

import CameraScreen from "./Camera";
import HomeScreen from "../../screen/HomeScreen";
import ListScreen from "../../screen/ListScreen";
import ProfileScreen from "../../screen/ProfileScreen";
import CalendarScreen from "../../screen/CalendarScreen";
import { MainTabsParams } from './types';

const Tab = createBottomTabNavigator<MainTabsParams>();

const tabs: TabsConfig<FlashyTabBarItemConfig, MainTabsParams> = {
  Home: {
    labelStyle: {
      color: 'white',
    },
    icon: {
      component: HomeSVG,
      color: '#444',
    },
    indicator: {
      size: 4,
      color: '#5B37B7',
    },
  },
  Likes: {
    labelStyle: {
      color: 'white',
    },
    icon: {
      component: HomeSVG,
      color: '#444',
    },
    indicator: {
      size: 4,
      color: '#C9379D',
    },
  },
  Camera: {
    labelStyle: {
      color: 'white',
    },
    icon: {
      component: LikeSVG,
      color: '#444',
    },
    indicator: {
      size: 4,
      color: '#C9379D',
    },
  },
  Search: {
    labelStyle: {
      color: 'white',
    },
    icon: {
      component: SearchSVG,
      color: '#444',
    },
    indicator: {
      size: 4,
      color: '#E6A919',
    },
  },
  Profile: {
    labelStyle: {
      color: 'white',
    },
    icon: {
      component: ProfileSVG,
      color: '#444',
    },
    indicator: {
      size: 4,
      color: '#1194AA',
    },
  },
};

const BottomTab = () => {
   // hooks
  const { bottom } = useSafeArea();

  // memos
  const screenPaddingBottom = useMemo(() => {
    // icon size + margin padding + outer space + inner space + screen bottom padding
    return 20 + bottom + 12 * 2 + 12 * 2 + 12;
  }, [bottom]);

  const tabBarOptions = useMemo(
    () => ({
      safeAreaInsets: {
        bottom: 0,
      },
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 16,
        marginLeft: 32,
        marginRight: 32,
        marginBottom: bottom,
        backgroundColor: '#000',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 24,
      },
    }),
    [bottom]
  );
   // render
  return (
    <Tab.Navigator
      tabBarOptions={tabBarOptions}
      tabBar={props => (
        <AnimatedTabBar
          preset="flashy"
          tabs={tabs}
          iconSize={20}
          itemOuterSpace={12}
          itemInnerSpace={12}
          {...props}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        initialParams={{
          backgroundColor: '#000',
          nextScreen: 'Likes',
          paddingBottom: screenPaddingBottom,
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Likes"
        initialParams={{
          backgroundColor: '#000',
          nextScreen: 'Search',
          paddingBottom: screenPaddingBottom,
        }}
        component={CalendarScreen}
      />
      <Tab.Screen
        name="Search"
        initialParams={{
          backgroundColor: '#000',
          nextScreen: 'Profile',
          paddingBottom: screenPaddingBottom,
        }}
        component={CameraScreen}
      />
      <Tab.Screen
        name="Profile"
        initialParams={{
          backgroundColor: '#000',
          nextScreen: 'Home',
          paddingBottom: screenPaddingBottom,
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;