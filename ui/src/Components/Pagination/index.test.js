import React from "react";

import { mount } from "enzyme";

import {
  InterceptWindowEventListener,
  DispatchKeyEvent
} from "__mocks__/PressKey";
import { PageSelect } from ".";

afterEach(() => {
  jest.resetAllMocks();
});

describe("<PageSelect />", () => {
  it("calls setPageCallback on arrow key press", () => {
    const setPageCallback = jest.fn();

    const evMap = InterceptWindowEventListener();

    const tree = mount(
      <PageSelect
        totalPages={4}
        activePage={1}
        maxPerPage={5}
        totalItemsCount={17}
        setPageCallback={setPageCallback}
      />
    );
    tree.simulate("focus");

    setPageCallback.mockImplementation(val =>
      tree.setProps({ activePage: val })
    );

    DispatchKeyEvent(tree.getDOMNode(), evMap, "ArrowRight", 39);
    expect(setPageCallback).toHaveBeenLastCalledWith(2);

    DispatchKeyEvent(tree.getDOMNode(), evMap, "ArrowRight", 39);
    expect(setPageCallback).toHaveBeenLastCalledWith(3);

    DispatchKeyEvent(tree.getDOMNode(), evMap, "ArrowRight", 39);
    expect(setPageCallback).toHaveBeenLastCalledWith(4);

    DispatchKeyEvent(tree.getDOMNode(), evMap, "ArrowRight", 39);
    expect(setPageCallback).toHaveBeenLastCalledWith(4);

    DispatchKeyEvent(tree.getDOMNode(), evMap, "ArrowLeft", 37);
    expect(setPageCallback).toHaveBeenLastCalledWith(3);

    DispatchKeyEvent(tree.getDOMNode(), evMap, "ArrowLeft", 37);
    expect(setPageCallback).toHaveBeenLastCalledWith(2);

    DispatchKeyEvent(tree.getDOMNode(), evMap, "ArrowLeft", 37);
    expect(setPageCallback).toHaveBeenLastCalledWith(1);

    DispatchKeyEvent(tree.getDOMNode(), evMap, "ArrowLeft", 37);
    expect(setPageCallback).toHaveBeenLastCalledWith(1);
  });
});
