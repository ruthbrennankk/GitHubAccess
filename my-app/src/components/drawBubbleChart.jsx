import React from 'react';
import BubbleChart from './BubbleChart.jsx'

const DrawBubbleChart = (props) => {

    if (props.state.ready) {
        var objects = [];
        var lang = [];
        var max = 0;
        
        console.log(props.type);
        switch(props.type) {
          case 'stars':
            // number of times the repo has been starred
            for (var i=0; i<props.state.info.length;i++) {
              if ( !lang.includes(props.state.info[i].language) ) lang.push(props.state.info[i].language);
              if (props.state.info[i].stargazers_count > max) max = props.state.info[i].stargazers_count;
                objects[i] = {group: props.state.info[i].language , name: props.state.info[i].name , size: props.state.info[i].stargazers_count};
            }
            break;
          case 'forks':
            // number of times the repo has been forked
            for (var i=0; i<props.state.info.length;i++) {
              if ( !lang.includes(props.state.info[i].language) ) lang.push(props.state.info[i].language);
              if (props.state.info[i].forks_count > max) max = props.state.info[i].forks_count;
                objects[i] = {group: props.state.info[i].language , name: props.state.info[i].name , size: props.state.info[i].forks_count};
            }
            break;
          case 'issues':
            // open issues
            for (var i=0; i<props.state.info.length;i++) {
              if ( !lang.includes(props.state.info[i].language) ) lang.push(props.state.info[i].language);
              if (props.state.info[i].open_issues_count > max) max = props.state.info[i].open_issues_count;
                objects[i] = {group: props.state.info[i].language , name: props.state.info[i].name , size: props.state.info[i].open_issues_count};
            }
            break;
          default:
            // size
            for (var i=0; i<props.state.info.length;i++) {
              if ( !lang.includes(props.state.info[i].language) ) lang.push(props.state.info[i].language);
              if (props.state.info[i].size > max) max = props.state.info[i].size;
                objects[i] = {group: props.state.info[i].language , name: props.state.info[i].name , size: props.state.info[i].size};
            }
        }

        return (
            <div>
                <BubbleChart data={[objects, lang, max]}/>
            </div>
        )
    } else {
        return null;
    }

}
export default DrawBubbleChart