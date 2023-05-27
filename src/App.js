import React, {useEffect, useState} from 'react';
import './App.scss';
import {getArtwork, getIcon, getListOfPkmAvailable, getPokemon} from './request/pokemon-request';
import {getPokemonFlavourEntryWithVersion, getPokemonTypes} from './requests/pokemon-request';
import {always, andThen, applySpec, identity, pipeWith, prop} from 'ramda';
import {getPokemonNumber} from './requests/pokedex-request';

const MAX_PKM = 1281;
const App = () => {
	const defaultState = {
		pokemonName: '',
		officialArtwork: '',
		icon: '',
		type: '',
		flavourEntries: '',
		pokemonNumber: undefined,
	};
	const [state, setState] = useState(defaultState);

	const handleValuesFetched = values => setState({...state, ...values});

	const asyncPipe = (asyncFunc, resultName) => requestResult =>
		pipeWith(andThen)([
			asyncFunc,
			applySpec({[resultName]: identity}),
			result => ({...result, ...requestResult}),
		])(requestResult);

	const getAndHandleValues = async requestResult => pipeWith(andThen)([
		asyncPipe(getPokemonFlavourEntryWithVersion, 'flavourEntries'),
		applySpec({
			officialArtwork: getArtwork,
			type: getPokemonTypes,
			icon: getIcon,
			pokemonNumber: getPokemonNumber,
			flavourEntries: prop('flavourEntries'),
		}),
		handleValuesFetched,
		always(requestResult),
	])(requestResult);

	const handleSearch = event => setState({...state, pokemonName: event.target.value});

	useEffect(() => {
		// todo : voir pour les err 404 (axios)
		getPokemon(state.pokemonName)
			.then(getAndHandleValues);

		getListOfPkmAvailable(MAX_PKM).then(console.log);
	}, [state.pokemonName]);

	return (<div>
		<input type={'search'} value={state.pokemonName} onChange={handleSearch}/>
        results:
		<img src={state.officialArtwork} alt={'official-artwork'}/>
		<img src={state.icon} alt={'icon'}/>
		<p>{JSON.stringify(state)}</p>);
	</div>);
};

export default App;
