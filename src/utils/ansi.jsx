import { ansiToJson } from 'anser';

const ansiToElements = (raw) => {
  const json = ansiToJson(raw);

  return (
    <>
      {json.map(({ content, fg, decorations }) => {
        const styles = {};

        if (fg) styles.color = `rgb(${fg})`;
        if (decorations) {
          decorations.forEach((decoration) => {
            if (decoration === 'italic') styles.fontStyle = 'italic';
            if (decoration === 'bold') styles.fontWeight = 600;
          });
        }

        return <span style={styles}>{content}</span>;
      })}
    </>
  );
};

export default ansiToElements;
