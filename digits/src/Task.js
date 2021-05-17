import "./App.css";

function Task() {
  let counter = 0;
  /* As I can't use 3rd party library I skipped the file reading
    and I assumed the file was already readed by lines and every four lines are added to an array 
     */
  let file = [
    " _  _  _  _  _  _  _  _  _ ",
    "| || || || || || || || || |",
    "|_||_||_||_||_||_||_||_||_|",
    "                           ",
    "                           ",
    "  |  |  |  |  |  |  |  |  |",
    "  |  |  |  |  |  |  |  |  |",
    "                           ",
    " _  _  _  _  _  _  _  _  _ ",
    " _| _| _| _| _| _| _| _| _|",
    "|_ |_ |_ |_ |_ |_ |_ |_ |_ ",
    "                           ",
    " _  _  _  _  _  _  _  _  _ ",
    " _| _| _| _| _| _| _| _| _|",
    " _| _| _| _| _| _| _| _| _|",
    "                           ",
    "                           ",
    "|_||_||_||_||_||_||_||_||_|",
    "  |  |  |  |  |  |  |  |  |",
    "                           ",
    " _  _  _  _  _  _  _  _  _ ",
    "|_ |_ |_ |_ |_ |_ |_ |_ |_ ",
    " _| _| _| _| _| _| _| _| _|",
    "                           ",
    " _  _  _  _  _  _  _  _  _ ",
    "|_ |_ |_ |_ |_ |_ |_ |_ |_ ",
    "|_||_||_||_||_||_||_||_||_|",
    "                           ",
    " _  _  _  _  _  _  _  _  _ ",
    "  |  |  |  |  |  |  |  |  |",
    "  |  |  |  |  |  |  |  |  |",
    "                           ",
    " _  _  _  _  _  _  _  _  _ ",
    "|_||_||_||_||_||_||_||_||_|",
    "|_||_||_||_||_||_||_||_||_|",
    "                           ",
    " _  _  _  _  _  _  _  _  _ ",
    "|_||_||_||_||_||_||_||_||_|",
    " _| _| _| _| _| _| _| _| _|",
    "                           ",
    "    _  _     _  _  _  _  _ ",
    "  | _| _||_||_ |_   ||_||_|",
    "  ||_  _|  | _||_|  ||_| _|",
    "                           ",
  ];

  const splitToEntries = (file) => {
    let entities = [];
    let entity = [];
    file.forEach((line) => {
      entity.push(line);
      if (line === "                           " && entity.length === 4) {
        entities.push(entity);
        entity = [];
      }
    });
    return entities;
  };

  // It reads the lines and splits to 9 segments
  const transformDigits = (lines) => {
    let readFrom = 0;
    let lineToRead = 0;
    let read = 3;
    let digits = [];
    let digit = "";
    while (readFrom < lines[0].length) {
      while (lineToRead < 4) {
        digit += lines[lineToRead].slice(readFrom, readFrom + read);

        lineToRead++;
      }
      digits.push(digit);
      digit = "";
      lineToRead = 0;
      readFrom += 3;
    }
    return digits;
  };

  // It reads each segment and converts to number
  const readDigit = (digits) => {
    let num = "";
    digits.forEach((digit) => {
      switch (digit) {
        case " _ | ||_|   ":
          num += "0";
          break;
        case "     |  |   ":
          num += "1";
          break;
        case " _  _||_    ":
          num += "2";
          break;
        case " _  _| _|   ":
          num += "3";
          break;
        case "   |_|  |   ":
          num += "4";
          break;
        case " _ |_  _|   ":
          num += "5";
          break;
        case " _ |_ |_|   ":
          num += "6";
          break;
        case " _   |  |   ":
          num += "7";
          break;
        case " _ |_||_|   ":
          num += "8";
          break;
        case " _ |_| _|   ":
          num += "9";
          break;
        default:
          num += "?";
          break;
      }
    });
    return num;
  };

  let convert = () => {
    let entries = splitToEntries(file);
    entries.forEach((entry) => {
      let transformedDigits = transformDigits(entry);
      let anotherVar = readDigit(transformedDigits);
      console.log(anotherVar);
    });
  };

  return (
    <div className="App">
      <div className="number">
        <button onClick={convert}>transform</button>
        {file.map((line) => (
          <div key={counter++} className="line">
            {line}
          </div>
        ))}
      </div>
      <header className="App-header"></header>
    </div>
  );
}

export default Task;
