class Header {
  constructor(name, age){
    this.name = name;
    this.age = age;
  }

  describeMe(name, age){
    console.log(`Hi, my name is ${name} and my number is ${age}`)
  }
}


var me = new Header;
me.describeMe('Steve',24.6)
