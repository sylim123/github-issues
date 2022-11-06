export const getIssueItemList = async () => {
  try {
    const resp = await fetch('data-sources/issues.json');
    return await resp.json();
  } catch (e) {
    console.error(e);
    return []
  }
};
