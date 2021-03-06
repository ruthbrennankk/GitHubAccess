import React from 'react';
import BubbleChart from './BubbleChart.jsx'

const DrawBubbleChart = (props) => {

    if (props.state.ready) {
        var objects = [];
        var lang = [];
        var max = 0;
        
        switch(props.type) {
          case 'stars':
            // number of times the repo has been starred
            for (var i=0; i<props.state.info.length;i++) {
              if ( !lang.includes(props.state.info[i].language) ) lang.push(props.state.info[i].language);
              if (props.state.info[i].stargazers_count > max) max = props.state.info[i].stargazers_count;
                objects[i] = {group: props.state.info[i].language , name: props.state.info[i].name , size: props.state.info[i].stargazers_count, type: 'Stars Count', url: props.state.info[i].html_url};
            }
            break;
          case 'forks':
            // number of times the repo has been forked
            for (var i=0; i<props.state.info.length;i++) {
              if ( !lang.includes(props.state.info[i].language) ) lang.push(props.state.info[i].language);
              if (props.state.info[i].forks_count > max) max = props.state.info[i].forks_count;
                objects[i] = {group: props.state.info[i].language , name: props.state.info[i].name , size: props.state.info[i].forks_count, type: 'Forks Count', url: props.state.info[i].html_url};
            }
            break;
          case 'issues':
            // open issues
            for (var i=0; i<props.state.info.length;i++) {
              if ( !lang.includes(props.state.info[i].language) ) lang.push(props.state.info[i].language);
              if (props.state.info[i].open_issues_count > max) max = props.state.info[i].open_issues_count;
                objects[i] = {group: props.state.info[i].language , name: props.state.info[i].name , size: props.state.info[i].open_issues_count, type: 'Open Issues Count', url: props.state.info[i].html_url};
            }
            break;
          default:
            // size
            for (var i=0; i<props.state.info.length;i++) {
              if ( !lang.includes(props.state.info[i].language) ) lang.push(props.state.info[i].language);
              if (props.state.info[i].size > max) max = props.state.info[i].size;
                objects[i] = {group: props.state.info[i].language , name: props.state.info[i].name , size: props.state.info[i].size, type: 'size', url: props.state.info[i].html_url};
            }
        }
        return (
            <div>
                <BubbleChart data={[objects, lang, max, props.type]}  lang={props.state.languages}/>
            </div>
        )
    } else {
        return null;
    }

}
export default DrawBubbleChart