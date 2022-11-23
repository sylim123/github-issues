export const getLabelItemList = async () => {
  try {
    const resp = await fetch('http://localhost:5173/labels');
    return await resp.json();
  } catch (e) {
    console.error(e);
    return []
  }
};

export const getDelayedLabelItemListOrNull = () => {
  let abortController = null;
  return async () => {
    try {
      if (abortController !== null) {
        abortController.abort();
      }

      abortController = new AbortController();
      const signal = abortController.signal;
      const resp = await fetch(
        'http://localhost:5173/labels-delay',
        {signal},
      );
      return await resp.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  };
}

export const addLabelItemAndGetLabelItemOrNull = async item => {
  console.log('called addLabelItemAndGetLabelItemOrNull');
  try {
    const resp = await fetch('http://localhost:5173/labels', {
      method: 'POST',
      body: JSON.stringify(item),
    });
    if (resp.status === 500) {
      alert('failed to add new label');
      return null;
    }
    return await resp.json();
  } catch (e) {
    console.error(e);
    return null;
  }
};
