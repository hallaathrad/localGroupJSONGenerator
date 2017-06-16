import React from 'react';
import {connect} from 'react-redux';

const Stage = props =>
  <div className="root-wrapper">
    <h1>{()=>props.moar()}</h1>
  </div>;

const mapStateToProps = state => state;

const mapDispatchToState = dispatch => ({
  moar() { dispatch({type: 'FETCHED_FORUMS'}); }
});

export default connect(mapStateToProps, mapDispatchToState)(Stage);
