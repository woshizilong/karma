let windowEventListenerMap = {};

// https://medium.com/@DavideRama/testing-global-event-listener-within-a-react-component-b9d661e59953
const InterceptWindowEventListener = () => {
  window.addEventListener = jest.fn().mockImplementation((event, callback) => {
    const name = event.toLowerCase();
    if (windowEventListenerMap[name] === undefined) {
      windowEventListenerMap[name] = [];
    }
    windowEventListenerMap[name].push(callback);
  });
};

const DispatchKeyEvent = (target, key, code) => {
  const keyDownEvent = new KeyboardEvent("keydown", {
    key: key,
    keyCode: code
  });
  target.dispatchEvent(keyDownEvent);
  for (const handler of windowEventListenerMap.keydown) {
    handler(keyDownEvent);
  }

  if (windowEventListenerMap.keyup !== undefined) {
    const keyUpEvent = new KeyboardEvent("keyup", {
      key: key,
      keyCode: code
    });
    target.dispatchEvent(keyUpEvent);
    for (const handler of windowEventListenerMap.keyup) {
      handler(keyUpEvent);
    }
  }
};

export { InterceptWindowEventListener, DispatchKeyEvent };
