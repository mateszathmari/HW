import "./App.css";

function Task() {
  let counter = 0;
  /* As I can't use 3rd party library I skipped the file reading
    and I assumed the file was already readed by lines and every four lines are added to an array 
     */
  let file = [
    // " _  _  _  _  _  _  _  _  _ ",
    // "| || || || || || || || || |",
    // "|_||_||_||_||_||_||_||_||_|",
    // "                           ",
    // "                           ",
    // "  |  |  |  |  |  |  |  |  |",
    // "  |  |  |  |  |  |  |  |  |",
    // "                           ",
    // " _  _  _  _  _  _  _  _  _ ",
    // " _| _| _| _| _| _| _| _| _|",
    // "|_ |_ |_ |_ |_ |_ |_ |_ |_ ",
    // "                           ",
    // " _  _  _  _  _  _  _  _  _ ",
    // " _| _| _| _| _| _| _| _| _|",
    // " _| _| _| _| _| _| _| _| _|",
    // "                           ",
    // "                           ",
    // "|_||_||_||_||_||_||_||_||_|",
    // "  |  |  |  |  |  |  |  |  |",
    // "                           ",
    // " _  _  _  _  _  _  _  _  _ ",
    // "|_ |_ |_ |_ |_ |_ |_ |_ |_ ",
    // " _| _| _| _| _| _| _| _| _|",
    // "                           ",
    // " _  _  _  _  _  _  _  _  _ ",
    // "|_ |_ |_ |_ |_ |_ |_ |_ |_ ",
    // "|_||_||_||_||_||_||_||_||_|",
    // "                           ",
    // " _  _  _  _  _  _  _  _  _ ",
    // "  |  |  |  |  |  |  |  |  |",
    // "  |  |  |  |  |  |  |  |  |",
    // "                           ",
    // " _  _  _  _  _  _  _  _  _ ",
    // "|_||_||_||_||_||_||_||_||_|",
    // "|_||_||_||_||_||_||_||_||_|",
    // "                           ",
    // " _  _  _  _  _  _  _  _  _ ",
    // "|_||_||_||_||_||_||_||_||_|",
    // " _| _| _| _| _| _| _| _| _|",
    // "                           ",
    // "    _  _     _  _  _  _  _ ",
    // "  | _| _||_||_ |_   ||_||_|",
    // "  ||_  _|  | _||_|  ||_| _|",
    // "                           ",
    // "    _  _  _  _  _     _  _ ",
    // "|_||_|| || ||_   |  |  | _ ",
    // "  | _||_||_||_|  |  |  | _|",
    // "                           ",
    "    _  _  _  _  _     _    ",
    "|_||_   ||_ | ||_|| || || |",
    "  | _|  | _||_||_||_||_||_|",
    "                           ",
    // " _  _     _  _        _  _ ",
    // "|_ |_ |_| _|  |  ||_||_||_ ",
    // "|_||_|  | _|  |  |  | _| _|",
    // "                           ",
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

  const validateNumber = (number) => {
    let result = 0;
    for (let i = 0; i < number.length; i++) {
      if (number[i] === "?") {
        return "ILL";
      }
      result += parseInt(number[i], 10) * (number.length - i);
    }
    if (result % 11 === 0) {
      return "OK";
    } else {
      return "ERR";
    }
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

  let validDigits = [
    " _ | ||_|   ",
    "     |  |   ",
    " _  _||_    ",
    " _  _| _|   ",
    "   |_|  |   ",
    " _ |_  _|   ",
    " _ |_ |_|   ",
    " _   |  |   ",
    " _ |_||_|   ",
    " _ |_| _|   ",
  ];

  // It reads each segment and converts to number
  const readDigits = (digits) => {
    let num = "";
    digits.forEach((digit) => {
      switch (digit) {
        case validDigits[0]:
          num += "0";
          break;
        case validDigits[1]:
          num += "1";
          break;
        case validDigits[2]:
          num += "2";
          break;
        case validDigits[3]:
          num += "3";
          break;
        case validDigits[4]:
          num += "4";
          break;
        case validDigits[5]:
          num += "5";
          break;
        case validDigits[6]:
          num += "6";
          break;
        case validDigits[7]:
          num += "7";
          break;
        case validDigits[8]:
          num += "8";
          break;
        case validDigits[9]:
          num += "9";
          break;
        default:
          num += "?";
          break;
      }
    });

    // if ((num.match(/\\??/g) || []).length > 0) {
    //   let possibleOptions = repair(digits, num);
    // }

    return num;
  };

  let repair = (digits, accountString) => {
    let goodAccountStrings = [];

    for (let i = 0; i < accountString.length; i++) {
      if (accountString[i] === "?") {
        let possibleGuesses = digitGuesser(digits[i]);
        // eslint-disable-next-line no-loop-func
        possibleGuesses.forEach((possibleGuess) => {
          digits[i] = possibleGuess;
          accountString = readDigits(digits);
          if (countQuestionMarks(accountString) > 0) {
            repair(digits, accountString).forEach((element) => {
              goodAccountStrings.push(element);
            });
          } else if (validateNumber(accountString) === "OK") {
            goodAccountStrings.push(accountString);
          }
        });
      }
    }
    return goodAccountStrings;
  };

  let countQuestionMarks = (str) => {
    let counter = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "?") {
        counter++;
      }
    }
    return counter;
  };

  let logger = (accounts) => {
    let status = "";
    console.log("| Account   | Status |");
    console.log("|-----------|--------|");
    accounts.forEach((account) => {
      status = validateNumber(account);
      console.log(
        `| ${account} | ${status === "OK" ? status + " " : status}    |`
      );
    });
    console.log("|-----------|--------|");
  };

  let digitGuesser = (wrongDigit) => {
    let diffCounter = 0;
    let possibleGuesses = [];

    /* I compare each valid digit with the wrong one if it only one difference,
     I add to possibleGuesses array.*/
    validDigits.forEach((validDigit) => {
      diffCounter = 0;

      /*compare each character, count diffs, if more than one diff, break */
      for (let i = 0; i < validDigit.length; i++) {
        if (wrongDigit[i] !== validDigit[i]) {
          diffCounter++;
          if (diffCounter > 1) {
            break;
          }
        }
      }

      if (diffCounter === 1) {
        possibleGuesses.push(validDigit);
      }
    });
    return possibleGuesses;
  };

  let convert = () => {
    let accounts = [];
    let entries = splitToEntries(file);
    entries.forEach((entry) => {
      let transformedDigits = transformDigits(entry);
      let account = readDigits(transformedDigits);
      let asd = repair(transformedDigits, account);
      accounts.push(account);
    });
    logger(accounts);

    // // this should return OK
    // console.log(validateNumber("457508000"));
    // // this should return ERR
    // console.log(validateNumber("664371495"));
    // // this should return ILL
    // console.log(validateNumber("86110??36"));
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
