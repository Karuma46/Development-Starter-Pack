class Header {
  constructor(name, age){
    this.name = name;
    this.age = age;
  }

  describeMe(){
    console.log(`Hi, my name is ${name} and my number is ${age}`)
  }
}


var me = new Header('Steve',24.6);
me.describeMe()
