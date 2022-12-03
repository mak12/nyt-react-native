import React, {forwardRef, memo, useImperativeHandle} from 'react';
import isEqual from 'react-fast-compare';
import {Action} from 'redux';
import {AnyAction} from '@reduxjs/toolkit';
import {useAppDispatch} from '@redux/hooks';

type ActionBase = Action<string>;

const AppDispatchComp = forwardRef((props, ref) => {
  const dispatch = useAppDispatch();

  useImperativeHandle(
    ref,
    () => ({
      dispatch: (action: AnyAction) => {
        dispatch(action);
      },
    }),
    [dispatch],
  );

  return null;
});

type AppDispatchType = {
  dispatch: (action: AnyAction) => void;
};

const dispatchRef = React.createRef<AppDispatchType>();

export const AppDispatchHOC = memo(
  () => <AppDispatchComp ref={dispatchRef} />,
  isEqual,
);

export const dispatch = (action: AnyAction) => {
  if (dispatchRef.current) {
    dispatchRef.current.dispatch(action);
  }
};
