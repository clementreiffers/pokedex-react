import {ListPkm} from '../Components/List/ListPkm';
import {MAX_PKM} from '../Constants/constant';
import React, {useEffect, useState} from 'react';
import {getSprites} from '../Requests';

export const List = () => {
	const [state, setState] = useState({search: '', pokemonToShow: '', imageToShow: ''});

	const handlePokemonToShow = ({target: {value}}) => setState({...state, pokemonToShow: value});

	const handleImageToShow = imageToShow => setState({...state, imageToShow});

	const handleSearchPkm = ({target: {value}}) => setState({...state, search: value});

	useEffect(() => {
		getSprites(state.pokemonToShow)
			.then(({other}) => other['official-artwork'].front_default)
			.then(handleImageToShow);
	}, [state.pokemonToShow]);

	return <div>
		<div className={'name-searchbar'}>
			<div className={'pokemon-name'}><p>{state.pokemonToShow}</p></div>
			<div className={'pokemon-name'}><input type={'search'} onChange={handleSearchPkm} value={state.search}/></div>
		</div>
		<div className={'list-and-preview'}>
			<div className={'left'}>
				<img src={state.imageToShow} alt={''} style={{width: '100px'}}/>
			</div>
			<div className={'right'}>
				<ListPkm nbrOfPkm={MAX_PKM} handlePokemonToShow={handlePokemonToShow} pokemon={state.search}/>
			</div>
		</div>
	</div>;
};
