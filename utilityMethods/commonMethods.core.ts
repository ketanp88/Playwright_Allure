

export class CommonMethods {

  public static generateRandomString(count: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < count; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  public static generateRandomNumber(count: number):string {
    let text = '';
    const possible = '123456789';

    for (let i = 0; i < count; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  public generatePassword() {
    const password = CommonMethods.generateRandomString(5) + '@' + CommonMethods.generateRandomNumber(5);
    return password;
  }

  getNowDate() {
    var returnDate = "";
    var formattedDate = "";
    //get datetime now
    var today = new Date();
    //split
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //because January is 0! 
    var yyyy = today.getFullYear();
    //Interpolation date
    if (mm < 10) {
      returnDate += `0${mm}/`;
    } else {
      returnDate += `${mm}/`;
    }
    if (dd < 10) {
      returnDate += `0${dd}/`;
    } else {
      returnDate += `${dd}/`;
    }
    formattedDate = returnDate + yyyy;
    return formattedDate;
  }

  public static formatStringData(originalString: string, searchText: string, replaceText: string): string {
    let newString = originalString.replace(searchText, replaceText);
    return newString;

  }

  public static getCurrentDateTimeWithHHMM(): string {
    const now = new Date();
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
  
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    
    return formattedDateTime;
  }
}