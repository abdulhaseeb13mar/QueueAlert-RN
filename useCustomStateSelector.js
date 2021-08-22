import React from 'react';
import {shallowEqual, useSelector, useStore} from 'react-redux';
import {createSelector} from 'reselect';

/**
 *
 * @param {string} stateName // ? name of parent state to use
 * @param {array} stateChildren // ? array of names of childrens to get
 * @param { compile: Boolean } opts // ? options for customization
 * @returns {array}
 *
 * @example
 * ? const [ profile ] = useCustomStateSelector('app', ['profile']);
 * ? const [ profile, tokensType ] = useCustomStateSelector('app', ['profile', 'tokensType']);
 */

const useCustomStateSelector = (
  appState,
  stateName,
  stateChildren = [],
  opts,
) => {
  // const appState = useStore().getState();

  let selectorStateArray = [];

  if (!stateChildren.length) {
    selectorStateArray = state => state[stateName];
  } else {
    selectorStateArray = stateChildren.map(
      children => state => state[stateName][children],
    );
  }

  const selector = createSelector(selectorStateArray, (...args) => {
    if (!stateChildren.length) return args[0];
    if (opts?.compile) {
      const compiledState = {};

      args.forEach(
        (stateObject, i) => (compiledState[stateChildren[i]] = stateObject),
      );

      return compiledState;
    } else {
      return args;
    }
  });

  return selector(appState);

  // const state = useSelector(
  //   state => {
  //     if (!stateName) return state;
  //     if (!stateChildren.length) return state[stateName];

  //     const stateToGet = {};

  //     stateChildren.forEach(childrenName => {
  //       stateToGet[childrenName.trim()] = state[stateName][childrenName.trim()];
  //     });

  //     return stateToGet;
  //   },
  //   !stateChildren ? () => {} : shallowEqual,
  // );

  // return state;
};

export default useCustomStateSelector;
