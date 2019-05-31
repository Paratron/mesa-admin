const languages = {
	'de-de': 'Deutsch',
	'en-en': 'English'
};

export const getLanguageKey = () => {
	const preferredKey = window.navigator.language.toLowerCase();

	if(languages[preferredKey]){
		return preferredKey;
	}

	const [preferredMain] = preferredKey.split('-');
	const derivedMainKey = `${preferredMain}-${preferredMain}`;

	if(languages[derivedMainKey]){
		return derivedMainKey;
	}

	const alternativeMainBased = Object.keys(languages).find(key => key.substr(0,2) === preferredMain);

	if(alternativeMainBased){
		return alternativeMainBased;
	}

	return 'en-en';
};

export default languages;
