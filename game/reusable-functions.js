Game.prototype.findFreeKeyInObj = function(passedString, object){
  let found = false;
  let number = 0;
  const keyAlreadyExist = (keyProposition, object) => {
    for (key in object){
      if (key === keyProposition) return true;
    }
    return false;
  }
  while (found === false){
    if (number > 1000) alert(`Trying to find free key for "${passedString}" in "${object}" for 1000 time.`);
    const keyProposition = passedString + number;
    if (keyAlreadyExist(keyProposition) === false){
      found = true;
      return keyProposition;
    }
    number++;
  }
}
