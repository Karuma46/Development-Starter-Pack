class Header {
  constructor(name, age){
    this.name = name;
    this.age = age;
  }

  describeMe(){
    console.log(`Hi, my name is ${this.name} and my number is ${this.age}`)
  }
}


var me = new Header('Steve',24.6);
me.describeMe()
