import React, {useEffect, useState} from 'react';
import {getSprites} from '../../Requests';
import PropTypes from 'prop-types';
import ShowAllSpriteOfObject from './ShowAllSpriteOfArrays';

const Version = props => Object.keys(props.v).map(k => <><h1>{k}</h1>
	<ShowAllSpriteOfObject ObjectOfUrl={props.v[k]}/>
</>);

const Generation = props => <>
	{Object.keys(props.resp).map((v, i) => <Version key={i} v={props.resp[v]}/>)}
</>;

const VersionSprites = ({pokemon}) => {
	const [state, setState] = useState([]);

	useEffect(() => {
		getSprites(pokemon)
			.then(({versions}) => versions)
			.then(setState);
	}, [pokemon]);
	return (
		<ul>
			<Generation resp={state}/>
		</ul>);
};

VersionSprites.propTypes = {
	pokemon: PropTypes.string.isRequired,
};

export default VersionSprites;
