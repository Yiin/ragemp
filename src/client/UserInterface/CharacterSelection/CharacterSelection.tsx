import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader/root';
import { Classes } from 'jss';
import * as rpc from 'rage-rpc';
import withStyles, { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { MuiThemeProvider } from '@material-ui/core';

import { Character } from 'Shared/entity';

import CharacterCard from './components/Character';
import CharacterCreation from './components/CharacterCreation';
import { SharedConstants } from 'Shared/constants';
import { CharacterSelectionConstants } from '~/constants/character-selection';
import { theme } from '../_theme';

const styles: StyleRulesCallback = theme => ({
    root: {
        width: '300px',
        position: 'absolute',
        top: '10%',
        right: '5%',
        [theme.breakpoints.up('lg')]: {
            left: 'auto',
            right: '20%',
        },
    },
});

interface State {
    characters: Character[];
    selectedCharacterId: number;
};

interface Props {
    classes: Classes;
};

class CharacterSelection extends PureComponent<Props> {
    state: State = {
        characters: [],
        selectedCharacterId: 0,
    };

    componentDidMount() {
        this.loadCharacters();
    }

    async loadCharacters() {
        console.log('loadingCharacters');
        const characters = await rpc.callServer(SharedConstants.User.RPC.GET_CHARACTERS);

        console.log('characters', characters);
        this.setState({
            characters,
        });

        if (!characters.length) {
            this.handleCharacterCreation();
            return;
        }

        const lastPlayerCharacter = characters.reduce((lastPlayed, character) => {
            if (lastPlayed.lastPlayed < character.lastPlayed) {
                return character;
            }
            return lastPlayed;
        });
        this.handleCharacterSelect(lastPlayerCharacter.id);
    }

    handleCharacterSelect = characterId => {
        if (this.state.selectedCharacterId === characterId) {
            return;
        }
        
        rpc.callClient(CharacterSelectionConstants.RPC.SELECT_CHARACTER, characterId);
        
        this.setState({
            selectedCharacterId: characterId,
        });
    }

    handleCharacterDelete = () => {
        this.loadCharacters();
    };
    
    handleCharacterCreation = async () => {
        await rpc.callClient(CharacterSelectionConstants.RPC.CREATE_CHARACTER);
    };

    render() {
        const { characters, selectedCharacterId } = this.state;
        const { classes } = this.props;

        return (
            <Paper classes={ { root: classes.root } }>
                { characters.length > 0 && (
                    <React.Fragment>
                        <List>
                            { characters.map(character => (
                                <CharacterCard
                                    key={ character.id }
                                    selected={ character.id === selectedCharacterId }
                                    onClick={ this.handleCharacterSelect }
                                    onDelete={ this.handleCharacterDelete }
                                    { ...character }
                                />
                            )) }
                        </List>
                        <Divider />
                    </React.Fragment>
                ) }
                <CharacterCreation onClick={ this.handleCharacterCreation } />
                <Divider />
            </Paper>
        );
    }
};

const WithTheme = ({ classes }) => (
    <MuiThemeProvider theme={ theme }>
        <CharacterSelection classes={ classes } />
    </MuiThemeProvider>
)

export default hot(withStyles(styles)(WithTheme));
