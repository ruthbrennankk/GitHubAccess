import React from 'react';
const Button = (props) => {
  const {buttonStyle} = styles;
    return (
        <button className='button' onClick={()=>{props.handleClick(props.name)}} style={buttonStyle}>{props.name}</button>
    )
  };
export default Button;


const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#336633',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fca2e7',
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 25,
    paddingLeft: 25,
    marginTop: 10,
    width: 300
  }
};
