import LandingScreen from './LandingScreen';
import EmailInputScreen from './EmailInputScreen';
import PasswordInputScreen from './PasswordInputScreen';
import UsernameInputScreen from './UsernameInputScreen';

import HomeScreen from './HomeScreen';
import LibraryScreen from './LibraryScreen';
import SearchScreen from './SearchScreen';

export const authScreens = {
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

export { LandingScreen, EmailInputScreen, PasswordInputScreen, UsernameInputScreen, HomeScreen, LibraryScreen, SearchScreen };

const screens = { ...authScreens, ...mainScreens };
export default screens;
