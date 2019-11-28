import React from 'react';
import Button from './Button.jsx';

    const getName = (no, props) => {
        var r=null;
        switch(no) {
        case 0:
            if (!props.state.buttons.stars) r = 'stars'
            else r = 'size'
            break;
        case 1:
            if (!props.state.buttons.stars && !props.state.buttons.size) r = 'size'
            else r = 'issues'
            break;
        case 2:
            if (!props.state.buttons.stars && !props.state.buttons.size && !props.state.buttons.issues) r = 'issues'
            else r = 'forks'
            break;
        }
        return r;
    };

    const getType = (props) =>  {
        if (props.state.buttons.stars) return 'stars';
        else if (props.state.buttons.forks) return 'forks';
        else if (props.state.buttons.issues) return 'issues';
        else return 'size';
    }


    const DrawButtons = (props) => {
        if (props.state.ready) {
            
            return (
                <div>
                    <Button
                        handleClick={props.handleClick}
                        name={getName(0, props)}
                    />
                    <Button
                        handleClick={props.handleClick}
                        name={getName(1,props)}
                    />
                    <Button
                        handleClick={props.handleClick}
                        name={getName(2,props)}
                    />
                </div>
            )
        } else {
            return null;
        }

    }
export {DrawButtons, getType};