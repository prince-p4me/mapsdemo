import { NavigationActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
	console.log("setting ref");
	navigator = navigatorRef;
}

function navigate(routeName, params) {
	console.log("navigating");
	// if (navigator) {
	navigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params,
		})
	);
	// }
}

function goBack(routeName, params) {
	navigator.dispatch(
		NavigationActions.back({
			routeName,
			params,
		})
	);
}
// add other navigation functions that you need and export them

export default {
	navigate,
	goBack,
	setTopLevelNavigator,
};