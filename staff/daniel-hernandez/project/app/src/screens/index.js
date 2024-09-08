import LandingScreen from './initial/LandingScreen';
import EmailInputScreen from './initial/EmailInputScreen';
import PasswordInputScreen from './initial/PasswordInputScreen';
import UsernameInputScreen from './initial/UsernameInputScreen';

import HomeScreen from './main/HomeScreen';
import LibraryScreen from './main/LibraryScreen';
import SearchScreen from './main/SearchScreen';

import LoadingScreen from './LoadingScreen';

export const initialScreens = {
   LandingScreen,
   EmailInputScreen,
   PasswordInputScreen,
   UsernameInputScreen
};

export const mainScreens = {
   HomeScreen,
   LibraryScreen,
   SearchScreen
};

export { LandingScreen, EmailInputScreen, PasswordInputScreen, UsernameInputScreen, HomeScreen, LibraryScreen, SearchScreen, LoadingScreen };

const screens = { ...initialScreens, ...mainScreens, LoadingScreen };
export default screens;
