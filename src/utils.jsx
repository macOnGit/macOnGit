export const getNextHighestID = array => {
  if (!array.length) {
    return 1;
  }
  const ids = array.map(element => element.id);
  const highestId = Math.max(...ids);
  return highestId + 1;
};

export const spanWrap = (text, key, fieldNumber) => {
  const isField = typeof fieldNumber !== 'undefined';
  return (
    <span
      key={key}
      title={isField ? `field ${fieldNumber + 1}` : ''}
      className={isField ? 'yellow-text' : ''}
    >
      {text}
    </span>
  );
};
