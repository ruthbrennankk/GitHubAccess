import React from 'react';
const Form = (props) => {
  const {buttonStyle, textStyle} = styles;
  return (
    <form onSubmit={(event) => props.handleUserFormSubmit(event)}>
          <label>
            <p style={textStyle} >Enter your username in the box below:</p>
            <input name="username"
              type="text"
              placeholder="GitHub username"
              required
              value={props.formData.username}
              onChange={props.handleFormChange}
            />
          </label>
          <div>
          <input
            type="submit"
            value="Submit"
            style={buttonStyle}
          />
        </div>
    </form>
)};
export default Form;
const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#3b5998',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#3b5998',
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 25,
    paddingLeft: 25,
    marginTop: 10,
    width: 300
  }
};