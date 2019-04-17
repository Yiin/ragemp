import React, { useEffect, useState, Fragment } from 'react';
import { callServer } from 'rage-rpc';
import { CharacterStoryline } from 'Shared/entity/CharacterStoryline';
import { getStorylineByKey } from 'Shared/storylines';

export const App = () => {
    const [storylines, setStorylines] = useState();

    useEffect(() => {
        const fetchStorylines = async () => {
            const fetchedStorylines: CharacterStoryline[] =
                await callServer('getStorylines');

            setStorylines(await Promise.all(
                fetchedStorylines.reduce<any[]>((merged, storyline) => {
                    const storylineInfo = getStorylineByKey(storyline.key);
    
                    return [
                        ...merged,
                        {
                            ...storylineInfo,
                            done: storyline.done,
                            quests: storyline.quests.map(quest => ({
                                ...storylineInfo.quests[quest.key],
                                done: quest.done,
                                availableSteps: quest.availableSteps.map(step => ({
                                    
                                }))
                            })),
                        },
                    ];
                }, [])
            ));
        };

        fetchStorylines();
    }, []);

    return (
        <div style={{ marginLeft: '50%' }}>
            { !storylines ? (
                'Loading...'
            ) : storylines.map(storyline => (
                <div>
                    <h1>{ storyline.title } { storyline.done && '(done)' }</h1>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: storyline.description,
                        }}
                    />
                    <div>
                        { Object.values(storyline.quests).map(quest => (
                            <Fragment>
                                <h3>{ quest.title } { quest.done && '(done)' }</h3>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: quest.description,
                                    }}
                                />
                            </Fragment>
                        )) }
                    </div>
                </div>
            )) }
        </div>
    )
};
