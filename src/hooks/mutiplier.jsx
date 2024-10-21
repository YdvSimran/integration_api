function multiplier(num) {
    const table = [];
    for (let i = 1; i <= 10; i++) {
      table.push(<p key={i}>{`${num}*${i}=${num * i}`}</p>);
    }
    return table;
  }