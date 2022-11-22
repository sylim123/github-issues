export const getLabelItemList = async () => {
  try {
    const resp = await fetch('data-sources/labels.json');
    return await resp.json();
  } catch (e) {
    console.error(e);
    return []
  }
};
